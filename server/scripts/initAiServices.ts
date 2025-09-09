import { db } from "../db";
import { aiServices, jobListings } from "@shared/schema";
import { eq } from "drizzle-orm";

async function initializeAiServices() {
  console.log("Initializing AI Services...");

  // Initialize AI Services (prices in ZAR base, will be converted to local currencies)
  const services = [
    {
      name: "AI CV Generator",
      description: "Professional CV generation with AI-powered content optimization and ATS-friendly formatting",
      price: "50.00", // Base price in ZAR - equivalent to ₦2,200, ₵15, 1,650 CFA, etc.
      currency: "ZAR",
      serviceType: "cv_generation",
      isActive: true
    },
    {
      name: "AI Cover Letter Generator",
      description: "Personalized cover letters tailored to specific job applications with company research integration",
      price: "50.00", // Base price in ZAR - equivalent to ₦2,200, ₵15, 1,650 CFA, etc.
      currency: "ZAR",
      serviceType: "cover_letter",
      isActive: true
    },
    {
      name: "Personalized Job Alerts",
      description: "AI-curated job recommendations sent directly to your email with skills-based matching",
      price: "100.00", // Base price in ZAR - equivalent to ₦4,400, ₵30, 3,300 CFA, etc.
      currency: "ZAR",
      serviceType: "job_alerts",
      isActive: true
    }
  ];

  for (const service of services) {
    const existing = await db.select().from(aiServices).where(eq(aiServices.serviceType, service.serviceType)).limit(1);
    if (existing.length === 0) {
      await db.insert(aiServices).values(service);
      console.log(`✅ Created service: ${service.name}`);
    } else {
      console.log(`⏭️  Service already exists: ${service.name}`);
    }
  }

  // Initialize Sample Job Listings
  const jobs = [
    {
      title: "Senior Software Developer",
      company: "TechCorp SA",
      location: "Cape Town, Western Cape",
      description: "We are looking for a passionate Senior Software Developer to join our growing team. You will be responsible for developing scalable web applications, mentoring junior developers, and contributing to architectural decisions.",
      requirements: JSON.stringify(["5+ years experience", "React/TypeScript", "Node.js", "PostgreSQL", "AWS", "Team Leadership"]),
      salaryMin: "450000",
      salaryMax: "650000",
      currency: "ZAR",
      jobType: "full-time",
      industry: "Technology",
      experienceLevel: "senior",
      skills: JSON.stringify(["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker", "Kubernetes"]),
      benefits: JSON.stringify(["Medical Aid", "Pension Fund", "Flexible Hours", "Remote Work", "Learning Budget"]),
      applicationUrl: "https://techcorp.co.za/careers/senior-dev",
      isActive: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    },
    {
      title: "Digital Marketing Specialist",
      company: "Marketing Pro",
      location: "Johannesburg, Gauteng", 
      description: "Join our dynamic marketing team and help drive digital transformation for our clients. You will manage social media campaigns, create content strategies, and analyze performance metrics.",
      requirements: JSON.stringify(["3+ years experience", "Google Ads", "Social Media Management", "Analytics", "Content Creation"]),
      salaryMin: "280000",
      salaryMax: "420000",
      currency: "ZAR",
      jobType: "full-time",
      industry: "Marketing",
      experienceLevel: "mid",
      skills: JSON.stringify(["Google Ads", "Facebook Ads", "SEO", "Content Marketing", "Analytics", "Photoshop"]),
      benefits: JSON.stringify(["Medical Aid", "Performance Bonus", "Training Budget", "Flexible Hours"]),
      applicationUrl: "https://marketingpro.co.za/jobs/digital-specialist",
      isActive: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
      title: "Registered Nurse - ICU",
      company: "HealthCare Plus",
      location: "Durban, KwaZulu-Natal",
      description: "Compassionate Registered Nurse needed for our private hospital ICU. You will provide critical care to patients, work with multidisciplinary teams, and ensure the highest standards of patient care.",
      requirements: JSON.stringify(["SANC Registration", "3+ years ICU experience", "Critical Care Certification", "BLS/ACLS Certified"]),
      salaryMin: "280000",
      salaryMax: "420000",
      currency: "ZAR",
      jobType: "full-time",
      industry: "Healthcare",
      experienceLevel: "mid",
      skills: JSON.stringify(["Patient Care", "Critical Care", "Medical Procedures", "Documentation", "Team Collaboration", "Emergency Response"]),
      benefits: JSON.stringify(["Medical Aid", "Pension Fund", "Shift Allowances", "Study Leave", "Professional Development"]),
      applicationUrl: "https://healthcareplus.co.za/careers/icu-nurse",
      isActive: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
      title: "Junior Data Scientist",
      company: "Data Insights Ltd",
      location: "Cape Town, Western Cape",
      description: "Entry-level position for a passionate Data Scientist to join our analytics team. You will work on machine learning projects, data visualization, and statistical analysis.",
      requirements: JSON.stringify(["Bachelor's in Data Science/Statistics", "Python/R", "SQL", "Machine Learning basics", "Statistics"]),
      salaryMin: "250000",
      salaryMax: "350000",
      currency: "ZAR",
      jobType: "full-time",
      industry: "Technology",
      experienceLevel: "entry",
      skills: JSON.stringify(["Python", "R", "SQL", "Machine Learning", "Statistics", "Tableau", "Excel"]),
      benefits: JSON.stringify(["Medical Aid", "Learning Budget", "Mentorship Program", "Flexible Hours"]),
      applicationUrl: "https://datainsights.co.za/careers/junior-data-scientist",
      isActive: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
      title: "Project Manager",
      company: "Construction Pro",
      location: "Johannesburg, Gauteng",
      description: "Experienced Project Manager needed to oversee construction projects from inception to completion. You will manage timelines, budgets, and coordinate with various stakeholders.",
      requirements: JSON.stringify(["5+ years project management", "PMP Certification preferred", "Construction experience", "Budget management"]),
      salaryMin: "400000",
      salaryMax: "600000",
      currency: "ZAR",
      jobType: "full-time",
      industry: "Construction",
      experienceLevel: "senior",
      skills: JSON.stringify(["Project Management", "Budget Management", "Stakeholder Management", "Risk Assessment", "MS Project", "Leadership"]),
      benefits: JSON.stringify(["Medical Aid", "Pension Fund", "Car Allowance", "Performance Bonus"]),
      applicationUrl: "https://constructionpro.co.za/careers/project-manager",
      isActive: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
      title: "Graphic Designer",
      company: "Creative Studio",
      location: "Cape Town, Western Cape",
      description: "Creative Graphic Designer to join our design team. You will create visual content for digital and print media, work on branding projects, and collaborate with clients.",
      requirements: JSON.stringify(["3+ years design experience", "Adobe Creative Suite", "Portfolio required", "Brand design experience"]),
      salaryMin: "220000",
      salaryMax: "320000",
      currency: "ZAR",
      jobType: "full-time",
      industry: "Creative",
      experienceLevel: "mid",
      skills: JSON.stringify(["Adobe Photoshop", "Adobe Illustrator", "InDesign", "Brand Design", "Typography", "Web Design"]),
      benefits: JSON.stringify(["Medical Aid", "Creative Freedom", "Flexible Hours", "Equipment Allowance"]),
      applicationUrl: "https://creativestudio.co.za/careers/graphic-designer",
      isActive: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
      title: "Financial Analyst",
      company: "Finance Corp",
      location: "Johannesburg, Gauteng",
      description: "Financial Analyst to support our finance team with budgeting, forecasting, and financial reporting. You will analyze financial data and provide insights to management.",
      requirements: JSON.stringify(["Bachelor's in Finance/Accounting", "2+ years experience", "Excel proficiency", "Financial modeling"]),
      salaryMin: "300000",
      salaryMax: "450000",
      currency: "ZAR",
      jobType: "full-time",
      industry: "Finance",
      experienceLevel: "mid",
      skills: JSON.stringify(["Financial Analysis", "Excel", "Financial Modeling", "Budgeting", "Forecasting", "PowerBI"]),
      benefits: JSON.stringify(["Medical Aid", "Pension Fund", "Study Assistance", "Performance Bonus"]),
      applicationUrl: "https://financecorp.co.za/careers/financial-analyst",
      isActive: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
      title: "Customer Service Representative",
      company: "Service Excellence",
      location: "Durban, KwaZulu-Natal",
      description: "Customer Service Representative to handle customer inquiries, resolve issues, and ensure customer satisfaction. Training will be provided.",
      requirements: JSON.stringify(["Matric/Grade 12", "Good communication skills", "Computer literacy", "Customer service experience preferred"]),
      salaryMin: "180000",
      salaryMax: "250000",
      currency: "ZAR",
      jobType: "full-time",
      industry: "Customer Service",
      experienceLevel: "entry",
      skills: JSON.stringify(["Communication", "Problem Solving", "Computer Skills", "Patience", "Multitasking"]),
      benefits: JSON.stringify(["Medical Aid", "Training Program", "Career Growth", "Transport Allowance"]),
      applicationUrl: "https://serviceexcellence.co.za/careers/customer-service",
      isActive: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
  ];

  for (const job of jobs) {
    const existing = await db.select().from(jobListings).where(eq(jobListings.title, job.title)).limit(1);
    if (existing.length === 0) {
      await db.insert(jobListings).values(job);
      console.log(`✅ Created job: ${job.title} at ${job.company}`);
    } else {
      console.log(`⏭️  Job already exists: ${job.title} at ${job.company}`);
    }
  }

  console.log("✅ AI Services and Job Listings initialization complete!");
}

// Run the initialization
initializeAiServices().catch(console.error);
