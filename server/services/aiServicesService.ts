import { db } from "../db";
import { aiServices, userAiServices, generatedCvs, generatedCoverLetters, jobListings, jobAlertSubscriptions, transactions } from "@shared/schema";
import { eq, and, desc, gte } from "drizzle-orm";
import { momoService } from "./momoService";

export interface AiServicePurchase {
  serviceId: number;
  userId: number;
  phoneNumber: string;
}

export interface CvGenerationRequest {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    professionalTitle: string;
    summary: string;
  };
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    grade?: string;
  }>;
  skills: string[];
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
  template: string;
}

export interface CoverLetterRequest {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
  jobDetails: {
    jobTitle: string;
    companyName: string;
    jobDescription: string;
  };
  userBackground: {
    relevantExperience: string;
    keySkills: string[];
    motivation: string;
  };
}

export interface JobSearchRequest {
  keywords: string[];
  location?: string;
  industry?: string;
  jobType?: string;
  salaryMin?: number;
  experienceLevel?: string;
  limit?: number;
}

export class AiServicesService {
  // Initialize default AI services
  async initializeServices(): Promise<void> {
    const services = [
      {
        name: "AI CV Generator",
        description: "Professional CV generation with AI-powered content optimization",
        price: "50.00",
        serviceType: "cv_generation"
      },
      {
        name: "AI Cover Letter Generator",
        description: "Personalized cover letters tailored to specific job applications",
        price: "50.00",
        serviceType: "cover_letter"
      },
      {
        name: "Personalized Job Alerts",
        description: "AI-curated job recommendations sent directly to your email",
        price: "100.00",
        serviceType: "job_alerts"
      }
    ];

    for (const service of services) {
      const existing = await db.select().from(aiServices).where(eq(aiServices.serviceType, service.serviceType)).limit(1);
      if (existing.length === 0) {
        await db.insert(aiServices).values(service);
      }
    }
  }

  async getAvailableServices() {
    return await db.select().from(aiServices).where(eq(aiServices.isActive, true));
  }

  async purchaseService(purchase: AiServicePurchase): Promise<{ success: boolean; transactionId?: string; message: string }> {
    try {
      // Get service details
      const service = await db.select().from(aiServices).where(eq(aiServices.id, purchase.serviceId)).limit(1);
      if (service.length === 0) {
        return { success: false, message: "Service not found" };
      }

      const serviceData = service[0];
      
      // Create MoMo transaction
      const momoTransaction = momoService.createTransaction(
        serviceData.price,
        "ZAR",
        `ai_service_${purchase.serviceId}_${Date.now()}`,
        purchase.phoneNumber,
        "msisdn",
        `Payment for ${serviceData.name}`
      );

      const referenceId = await momoService.requestToPay(momoTransaction);

      // Create transaction record
      const [transactionRecord] = await db.insert(transactions).values({
        userId: purchase.userId,
        externalId: momoTransaction.externalId,
        momoTransactionId: referenceId,
        type: "collection",
        purpose: `ai_service_${serviceData.serviceType}`,
        amount: serviceData.price,
        currency: "ZAR",
        status: "pending",
        payerPartyId: purchase.phoneNumber,
        description: `Payment for ${serviceData.name}`,
        metadata: JSON.stringify({ serviceId: purchase.serviceId })
      }).returning({ id: transactions.id });

      // Create user service record (pending)
      await db.insert(userAiServices).values({
        userId: purchase.userId,
        serviceId: purchase.serviceId,
        transactionId: transactionRecord.id,
        status: "pending",
        maxUsage: serviceData.serviceType === "job_alerts" ? 30 : 1, // Job alerts valid for 30 days
        expiresAt: serviceData.serviceType === "job_alerts" ? 
          new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : // 30 days for job alerts
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)    // 7 days for CV/Cover letter
      });

      return {
        success: true,
        transactionId: referenceId,
        message: "Payment initiated. Please complete the payment on your phone."
      };

    } catch (error) {
      console.error("Purchase service error:", error);
      return { success: false, message: "Failed to process payment" };
    }
  }

  async verifyPayment(transactionId: string): Promise<{ success: boolean; message: string }> {
    try {
      const status = await momoService.getCollectionTransactionStatus(transactionId);
      
      // Update transaction status
      await db.update(transactions)
        .set({ 
          status: status.status.toLowerCase() as any,
          updatedAt: new Date()
        })
        .where(eq(transactions.momoTransactionId, transactionId));

      if (status.status === "SUCCESSFUL") {
        // Activate user service
        await db.update(userAiServices)
          .set({ status: "completed" })
          .where(eq(userAiServices.transactionId, 
            (await db.select({ id: transactions.id }).from(transactions).where(eq(transactions.momoTransactionId, transactionId)).limit(1))[0].id
          ));

        return { success: true, message: "Payment successful! Service activated." };
      } else if (status.status === "FAILED") {
        return { success: false, message: "Payment failed. Please try again." };
      } else {
        return { success: false, message: "Payment is still pending." };
      }

    } catch (error) {
      console.error("Verify payment error:", error);
      return { success: false, message: "Failed to verify payment" };
    }
  }

  async hasActiveService(userId: number, serviceType: string): Promise<boolean> {
    const activeServices = await db.select()
      .from(userAiServices)
      .innerJoin(aiServices, eq(userAiServices.serviceId, aiServices.id))
      .where(
        and(
          eq(userAiServices.userId, userId),
          eq(aiServices.serviceType, serviceType),
          eq(userAiServices.status, "completed"),
          gte(userAiServices.expiresAt, new Date())
        )
      );

    return activeServices.length > 0;
  }

  async generateCv(userId: number, cvData: CvGenerationRequest): Promise<{ success: boolean; cvId?: number; message: string }> {
    try {
      // Check if user has active CV generation service
      const hasService = await this.hasActiveService(userId, "cv_generation");
      if (!hasService) {
        return { success: false, message: "Please purchase CV generation service first" };
      }

      // Generate CV content using AI (simplified version)
      const cvContent = this.generateCvContent(cvData);

      // Save generated CV
      const [savedCv] = await db.insert(generatedCvs).values({
        userId,
        title: `${cvData.personalInfo.fullName} - ${cvData.personalInfo.professionalTitle}`,
        content: JSON.stringify(cvData),
        template: cvData.template
      }).returning({ id: generatedCvs.id });

      // Update service usage
      await db.update(userAiServices)
        .set({ usageCount: db.select().from(userAiServices).where(eq(userAiServices.userId, userId)) })
        .where(
          and(
            eq(userAiServices.userId, userId),
            eq(userAiServices.status, "completed")
          )
        );

      return { success: true, cvId: savedCv.id, message: "CV generated successfully!" };

    } catch (error) {
      console.error("Generate CV error:", error);
      return { success: false, message: "Failed to generate CV" };
    }
  }

  async generateCoverLetter(userId: number, letterData: CoverLetterRequest): Promise<{ success: boolean; letterId?: number; message: string }> {
    try {
      // Check if user has active cover letter service
      const hasService = await this.hasActiveService(userId, "cover_letter");
      if (!hasService) {
        return { success: false, message: "Please purchase cover letter service first" };
      }

      // Generate cover letter content using AI
      const letterContent = this.generateCoverLetterContent(letterData);

      // Save generated cover letter
      const [savedLetter] = await db.insert(generatedCoverLetters).values({
        userId,
        jobTitle: letterData.jobDetails.jobTitle,
        companyName: letterData.jobDetails.companyName,
        content: letterContent
      }).returning({ id: generatedCoverLetters.id });

      return { success: true, letterId: savedLetter.id, message: "Cover letter generated successfully!" };

    } catch (error) {
      console.error("Generate cover letter error:", error);
      return { success: false, message: "Failed to generate cover letter" };
    }
  }

  async searchJobs(searchParams: JobSearchRequest) {
    try {
      let query = db.select().from(jobListings).where(eq(jobListings.isActive, true));

      // Apply filters (simplified - in production, use proper query building)
      const jobs = await query.limit(searchParams.limit || 20).orderBy(desc(jobListings.createdAt));

      return { success: true, jobs, count: jobs.length };

    } catch (error) {
      console.error("Search jobs error:", error);
      return { success: false, jobs: [], count: 0 };
    }
  }

  async subscribeToJobAlerts(userId: number, alertData: any): Promise<{ success: boolean; message: string }> {
    try {
      // Check if user has active job alerts service
      const hasService = await this.hasActiveService(userId, "job_alerts");
      if (!hasService) {
        return { success: false, message: "Please purchase job alerts service first" };
      }

      // Create job alert subscription
      await db.insert(jobAlertSubscriptions).values({
        userId,
        keywords: JSON.stringify(alertData.keywords),
        location: alertData.location,
        industry: alertData.industry,
        jobType: alertData.jobType,
        salaryMin: alertData.salaryMin,
        experienceLevel: alertData.experienceLevel,
        frequency: alertData.frequency || "daily"
      });

      return { success: true, message: "Job alerts subscription created successfully!" };

    } catch (error) {
      console.error("Subscribe to job alerts error:", error);
      return { success: false, message: "Failed to create job alerts subscription" };
    }
  }

  private generateCvContent(cvData: CvGenerationRequest): string {
    // Simplified AI CV generation - in production, integrate with actual AI service
    const sections = {
      header: `${cvData.personalInfo.fullName}\n${cvData.personalInfo.professionalTitle}\n${cvData.personalInfo.email} | ${cvData.personalInfo.phone} | ${cvData.personalInfo.location}`,
      summary: cvData.personalInfo.summary,
      experience: cvData.experience.map(exp => 
        `${exp.position} at ${exp.company} (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate})\n${exp.description}`
      ).join('\n\n'),
      education: cvData.education.map(edu => 
        `${edu.degree} in ${edu.field}\n${edu.institution} (${edu.startDate} - ${edu.endDate})`
      ).join('\n\n'),
      skills: cvData.skills.join(', '),
      languages: cvData.languages.map(lang => `${lang.language} (${lang.proficiency})`).join(', ')
    };

    return JSON.stringify(sections);
  }

  private generateCoverLetterContent(letterData: CoverLetterRequest): string {
    // Simplified AI cover letter generation
    const content = `Dear Hiring Manager,

I am writing to express my strong interest in the ${letterData.jobDetails.jobTitle} position at ${letterData.jobDetails.companyName}. With my background in ${letterData.userBackground.relevantExperience}, I am confident that I would be a valuable addition to your team.

${letterData.userBackground.motivation}

My key skills include ${letterData.userBackground.keySkills.join(', ')}, which align perfectly with the requirements for this role. I am excited about the opportunity to contribute to ${letterData.jobDetails.companyName} and would welcome the chance to discuss how my experience can benefit your organization.

Thank you for considering my application. I look forward to hearing from you.

Sincerely,
${letterData.personalInfo.fullName}
${letterData.personalInfo.email}
${letterData.personalInfo.phone}`;

    return content;
  }

  async getUserServices(userId: number) {
    return await db.select({
      id: userAiServices.id,
      serviceName: aiServices.name,
      serviceType: aiServices.serviceType,
      status: userAiServices.status,
      usageCount: userAiServices.usageCount,
      maxUsage: userAiServices.maxUsage,
      expiresAt: userAiServices.expiresAt,
      createdAt: userAiServices.createdAt
    })
    .from(userAiServices)
    .innerJoin(aiServices, eq(userAiServices.serviceId, aiServices.id))
    .where(eq(userAiServices.userId, userId))
    .orderBy(desc(userAiServices.createdAt));
  }

  async getUserCvs(userId: number) {
    return await db.select().from(generatedCvs).where(eq(generatedCvs.userId, userId)).orderBy(desc(generatedCvs.createdAt));
  }

  async getUserCoverLetters(userId: number) {
    return await db.select().from(generatedCoverLetters).where(eq(generatedCoverLetters.userId, userId)).orderBy(desc(generatedCoverLetters.createdAt));
  }
}

export const aiServicesService = new AiServicesService();
