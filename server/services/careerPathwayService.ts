import { db } from "../db";
import { careerInterests, careerPathways, pathwaySteps } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface UserInterests {
  interests: string[];
  passions: string[];
  skills?: string[];
  experience?: string[];
  preferredIndustries?: string[];
  workEnvironmentPreferences?: {
    remote: boolean;
    office: boolean;
    hybrid: boolean;
    teamSize: 'small' | 'medium' | 'large';
    pace: 'fast' | 'moderate' | 'relaxed';
  };
  salaryExpectations?: string;
  locationPreferences?: string[];
}

export interface PathwayStep {
  stepNumber: number;
  title: string;
  description: string;
  category: 'education' | 'skill' | 'experience' | 'certification' | 'networking';
  estimatedDuration: string;
  resources: string[];
  prerequisites: string[];
}

export interface CareerPathwayPlan {
  targetCareer: string;
  currentLevel: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: string;
  difficultyLevel: 'easy' | 'moderate' | 'challenging';
  description: string;
  salaryRange: string;
  jobOutlook: string;
  steps: PathwayStep[];
}

// Career database with pathways for different interests/passions
const CAREER_PATHWAYS_DB = {
  'technology': {
    'software-development': {
      title: 'Software Developer',
      salaryRange: 'R250K - R650K',
      jobOutlook: 'Excellent - High demand',
      description: 'Design, develop, and maintain software applications and systems.',
      steps: [
        {
          stepNumber: 1,
          title: 'Learn Programming Fundamentals',
          description: 'Master basic programming concepts and choose a primary language (Python, JavaScript, or Java)',
          category: 'education' as const,
          estimatedDuration: '2-3 months',
          resources: [
            'FreeCodeCamp - JavaScript Basics',
            'Python.org Tutorial',
            'Codecademy Programming Courses',
            'YouTube - Programming with Mosh'
          ],
          prerequisites: []
        },
        {
          stepNumber: 2,
          title: 'Build Your First Projects',
          description: 'Create 3-5 small projects to practice coding and build a portfolio',
          category: 'experience' as const,
          estimatedDuration: '1-2 months',
          resources: [
            'GitHub for portfolio hosting',
            'Project ideas: Calculator, To-do app, Weather app',
            'Stack Overflow for problem solving'
          ],
          prerequisites: ['Programming Fundamentals']
        },
        {
          stepNumber: 3,
          title: 'Learn Web Development',
          description: 'Master HTML, CSS, and JavaScript for front-end development',
          category: 'skill' as const,
          estimatedDuration: '2-3 months',
          resources: [
            'MDN Web Docs',
            'CSS Grid and Flexbox tutorials',
            'React or Vue.js framework courses'
          ],
          prerequisites: ['Programming Fundamentals']
        },
        {
          stepNumber: 4,
          title: 'Database and Backend Skills',
          description: 'Learn database management and server-side programming',
          category: 'skill' as const,
          estimatedDuration: '2-3 months',
          resources: [
            'SQL tutorials and practice',
            'Node.js or Django courses',
            'Database design principles'
          ],
          prerequisites: ['Web Development']
        },
        {
          stepNumber: 5,
          title: 'Build Full-Stack Projects',
          description: 'Create complete web applications with front-end and back-end',
          category: 'experience' as const,
          estimatedDuration: '2-3 months',
          resources: [
            'Full-stack project tutorials',
            'Deployment platforms (Heroku, Netlify)',
            'Version control with Git'
          ],
          prerequisites: ['Database and Backend Skills']
        },
        {
          stepNumber: 6,
          title: 'Get Certified',
          description: 'Obtain relevant certifications to validate your skills',
          category: 'certification' as const,
          estimatedDuration: '1 month',
          resources: [
            'AWS Cloud Practitioner',
            'Google Developer Certification',
            'Microsoft Azure Fundamentals'
          ],
          prerequisites: ['Full-Stack Projects']
        },
        {
          stepNumber: 7,
          title: 'Network and Apply for Jobs',
          description: 'Build professional network and start applying for entry-level positions',
          category: 'networking' as const,
          estimatedDuration: '1-3 months',
          resources: [
            'LinkedIn networking',
            'Tech meetups and conferences',
            'Job boards: AngelList, Stack Overflow Jobs',
            'Practice coding interviews'
          ],
          prerequisites: ['Certifications']
        }
      ]
    },
    'data-science': {
      title: 'Data Scientist',
      salaryRange: 'R280K - R580K',
      jobOutlook: 'Very High - Critical demand',
      description: 'Analyze complex data to help organizations make informed decisions.',
      steps: [
        {
          stepNumber: 1,
          title: 'Mathematics and Statistics Foundation',
          description: 'Build strong foundation in statistics, probability, and linear algebra',
          category: 'education' as const,
          estimatedDuration: '2-3 months',
          resources: [
            'Khan Academy Statistics',
            'Coursera Linear Algebra courses',
            'StatQuest YouTube channel'
          ],
          prerequisites: []
        },
        {
          stepNumber: 2,
          title: 'Learn Python for Data Science',
          description: 'Master Python programming with focus on data analysis libraries',
          category: 'skill' as const,
          estimatedDuration: '2-3 months',
          resources: [
            'Python for Data Science Handbook',
            'Pandas documentation and tutorials',
            'NumPy and Matplotlib guides'
          ],
          prerequisites: ['Mathematics Foundation']
        },
        {
          stepNumber: 3,
          title: 'Data Visualization and Analysis',
          description: 'Learn to create meaningful visualizations and perform exploratory data analysis',
          category: 'skill' as const,
          estimatedDuration: '1-2 months',
          resources: [
            'Seaborn and Plotly tutorials',
            'Tableau Public training',
            'Power BI learning path'
          ],
          prerequisites: ['Python for Data Science']
        },
        {
          stepNumber: 4,
          title: 'Machine Learning Fundamentals',
          description: 'Understand ML algorithms and implement basic models',
          category: 'education' as const,
          estimatedDuration: '3-4 months',
          resources: [
            'Scikit-learn documentation',
            'Andrew Ng Machine Learning Course',
            'Hands-On Machine Learning book'
          ],
          prerequisites: ['Data Visualization']
        },
        {
          stepNumber: 5,
          title: 'Work on Real Data Projects',
          description: 'Complete end-to-end data science projects for your portfolio',
          category: 'experience' as const,
          estimatedDuration: '2-3 months',
          resources: [
            'Kaggle competitions and datasets',
            'GitHub for project hosting',
            'Jupyter Notebook best practices'
          ],
          prerequisites: ['Machine Learning Fundamentals']
        },
        {
          stepNumber: 6,
          title: 'Specialize and Get Certified',
          description: 'Choose a specialization and obtain relevant certifications',
          category: 'certification' as const,
          estimatedDuration: '1-2 months',
          resources: [
            'Google Data Analytics Certificate',
            'IBM Data Science Professional Certificate',
            'Microsoft Azure Data Scientist Associate'
          ],
          prerequisites: ['Real Data Projects']
        }
      ]
    }
  },
  'healthcare': {
    'nursing': {
      title: 'Registered Nurse',
      salaryRange: 'R180K - R420K',
      jobOutlook: 'Excellent - High demand',
      description: 'Provide patient care and support in various healthcare settings.',
      steps: [
        {
          stepNumber: 1,
          title: 'Complete High School with Science Focus',
          description: 'Ensure strong foundation in biology, chemistry, and mathematics',
          category: 'education' as const,
          estimatedDuration: '1-2 years',
          resources: [
            'Matric science subjects',
            'Additional science courses if needed',
            'Study groups and tutoring'
          ],
          prerequisites: []
        },
        {
          stepNumber: 2,
          title: 'Enroll in Nursing Diploma/Degree',
          description: 'Complete formal nursing education at accredited institution',
          category: 'education' as const,
          estimatedDuration: '3-4 years',
          resources: [
            'University of Cape Town Nursing',
            'University of the Witwatersrand',
            'Nursing colleges across SA'
          ],
          prerequisites: ['High School Science']
        },
        {
          stepNumber: 3,
          title: 'Complete Clinical Rotations',
          description: 'Gain hands-on experience in various healthcare settings',
          category: 'experience' as const,
          estimatedDuration: 'Included in degree',
          resources: [
            'Hospital partnerships',
            'Community health centers',
            'Specialized care units'
          ],
          prerequisites: ['Nursing Education']
        },
        {
          stepNumber: 4,
          title: 'Pass SANC Registration Exam',
          description: 'Obtain registration with South African Nursing Council',
          category: 'certification' as const,
          estimatedDuration: '1-2 months',
          resources: [
            'SANC exam preparation materials',
            'Study groups with peers',
            'Practice exams and mock tests'
          ],
          prerequisites: ['Clinical Rotations']
        },
        {
          stepNumber: 5,
          title: 'Gain Entry-Level Experience',
          description: 'Work in entry-level nursing positions to build experience',
          category: 'experience' as const,
          estimatedDuration: '1-2 years',
          resources: [
            'Public and private hospitals',
            'Clinics and healthcare centers',
            'Mentorship programs'
          ],
          prerequisites: ['SANC Registration']
        },
        {
          stepNumber: 6,
          title: 'Consider Specialization',
          description: 'Pursue additional training in specialized nursing areas',
          category: 'education' as const,
          estimatedDuration: '1-2 years',
          resources: [
            'ICU nursing certification',
            'Pediatric nursing specialization',
            'Mental health nursing'
          ],
          prerequisites: ['Entry-Level Experience']
        }
      ]
    }
  },
  'business': {
    'digital-marketing': {
      title: 'Digital Marketing Specialist',
      salaryRange: 'R180K - R450K',
      jobOutlook: 'High - Growing demand',
      description: 'Develop and execute digital marketing strategies across various online platforms.',
      steps: [
        {
          stepNumber: 1,
          title: 'Learn Digital Marketing Fundamentals',
          description: 'Understand core concepts of digital marketing and online consumer behavior',
          category: 'education' as const,
          estimatedDuration: '1-2 months',
          resources: [
            'Google Digital Marketing Course',
            'HubSpot Academy free courses',
            'Digital Marketing Institute materials'
          ],
          prerequisites: []
        },
        {
          stepNumber: 2,
          title: 'Master Social Media Marketing',
          description: 'Learn to create and manage effective social media campaigns',
          category: 'skill' as const,
          estimatedDuration: '1-2 months',
          resources: [
            'Facebook Blueprint certification',
            'Instagram for Business guides',
            'LinkedIn Learning social media courses'
          ],
          prerequisites: ['Digital Marketing Fundamentals']
        },
        {
          stepNumber: 3,
          title: 'Learn SEO and Content Marketing',
          description: 'Understand search engine optimization and content strategy',
          category: 'skill' as const,
          estimatedDuration: '2-3 months',
          resources: [
            'Moz SEO Learning Center',
            'Google Search Console training',
            'Content Marketing Institute resources'
          ],
          prerequisites: ['Social Media Marketing']
        },
        {
          stepNumber: 4,
          title: 'Google Ads and PPC Certification',
          description: 'Master paid advertising platforms and campaign management',
          category: 'certification' as const,
          estimatedDuration: '1-2 months',
          resources: [
            'Google Ads certification',
            'Microsoft Advertising certification',
            'Facebook Ads Manager training'
          ],
          prerequisites: ['SEO and Content Marketing']
        },
        {
          stepNumber: 5,
          title: 'Build Portfolio with Real Campaigns',
          description: 'Create and manage actual marketing campaigns for portfolio',
          category: 'experience' as const,
          estimatedDuration: '2-3 months',
          resources: [
            'Volunteer for local businesses',
            'Personal brand development',
            'Case study documentation'
          ],
          prerequisites: ['PPC Certification']
        },
        {
          stepNumber: 6,
          title: 'Analytics and Data Analysis',
          description: 'Learn to measure and analyze marketing campaign performance',
          category: 'skill' as const,
          estimatedDuration: '1-2 months',
          resources: [
            'Google Analytics certification',
            'Data Studio training',
            'Marketing analytics tools'
          ],
          prerequisites: ['Portfolio Building']
        }
      ]
    }
  }
};

export class CareerPathwayService {
  async saveUserInterests(userId: number, interests: UserInterests): Promise<void> {
    await db.insert(careerInterests).values({
      userId,
      interests: JSON.stringify(interests.interests),
      passions: JSON.stringify(interests.passions),
      skills: interests.skills ? JSON.stringify(interests.skills) : null,
      experience: interests.experience ? JSON.stringify(interests.experience) : null,
      preferredIndustries: interests.preferredIndustries ? JSON.stringify(interests.preferredIndustries) : null,
      workEnvironmentPreferences: interests.workEnvironmentPreferences ? JSON.stringify(interests.workEnvironmentPreferences) : null,
      salaryExpectations: interests.salaryExpectations || null,
      locationPreferences: interests.locationPreferences ? JSON.stringify(interests.locationPreferences) : null,
    }).onConflictDoUpdate({
      target: careerInterests.userId,
      set: {
        interests: JSON.stringify(interests.interests),
        passions: JSON.stringify(interests.passions),
        skills: interests.skills ? JSON.stringify(interests.skills) : null,
        experience: interests.experience ? JSON.stringify(interests.experience) : null,
        preferredIndustries: interests.preferredIndustries ? JSON.stringify(interests.preferredIndustries) : null,
        workEnvironmentPreferences: interests.workEnvironmentPreferences ? JSON.stringify(interests.workEnvironmentPreferences) : null,
        salaryExpectations: interests.salaryExpectations || null,
        locationPreferences: interests.locationPreferences ? JSON.stringify(interests.locationPreferences) : null,
        updatedAt: new Date(),
      },
    });
  }

  generateCareerPathways(interests: UserInterests): CareerPathwayPlan[] {
    const pathways: CareerPathwayPlan[] = [];
    const userInterests = interests.interests.map(i => i.toLowerCase());
    const userPassions = interests.passions.map(p => p.toLowerCase());
    const allUserInputs = [...userInterests, ...userPassions];

    // Match interests/passions to career pathways
    for (const [industry, careers] of Object.entries(CAREER_PATHWAYS_DB)) {
      if (this.matchesUserInterests(industry, allUserInputs)) {
        for (const [careerKey, careerData] of Object.entries(careers)) {
          if (this.matchesUserInterests(careerKey, allUserInputs) || 
              this.matchesUserInterests(careerData.title, allUserInputs)) {
            
            const currentLevel = this.determineCurrentLevel(interests, careerKey);
            const pathway: CareerPathwayPlan = {
              targetCareer: careerData.title,
              currentLevel,
              estimatedDuration: this.calculateDuration(careerData.steps, currentLevel),
              difficultyLevel: this.calculateDifficulty(careerData.steps),
              description: careerData.description,
              salaryRange: careerData.salaryRange,
              jobOutlook: careerData.jobOutlook,
              steps: careerData.steps,
            };
            pathways.push(pathway);
          }
        }
      }
    }

    // If no direct matches, suggest popular careers based on broad categories
    if (pathways.length === 0) {
      pathways.push(...this.getDefaultSuggestions(allUserInputs));
    }

    return pathways.slice(0, 3); // Return top 3 matches
  }

  private matchesUserInterests(careerTerm: string, userInputs: string[]): boolean {
    const careerWords = careerTerm.toLowerCase().split(/[-\s]+/);
    return userInputs.some(input => 
      careerWords.some(word => 
        input.includes(word) || word.includes(input) || 
        this.getSynonyms(word).some(synonym => input.includes(synonym))
      )
    );
  }

  private getSynonyms(word: string): string[] {
    const synonymMap: Record<string, string[]> = {
      'technology': ['tech', 'computer', 'digital', 'software', 'programming', 'coding'],
      'healthcare': ['medical', 'health', 'nursing', 'medicine', 'care'],
      'business': ['marketing', 'management', 'finance', 'sales', 'entrepreneurship'],
      'software': ['programming', 'coding', 'development', 'apps'],
      'data': ['analytics', 'statistics', 'analysis', 'science'],
    };
    return synonymMap[word] || [];
  }

  private determineCurrentLevel(interests: UserInterests, careerKey: string): 'beginner' | 'intermediate' | 'advanced' {
    const relevantSkills = interests.skills || [];
    const relevantExperience = interests.experience || [];
    
    if (relevantExperience.length > 2 || relevantSkills.length > 5) {
      return 'intermediate';
    } else if (relevantExperience.length > 0 || relevantSkills.length > 2) {
      return 'beginner';
    }
    return 'beginner';
  }

  private calculateDuration(steps: PathwayStep[], currentLevel: string): string {
    const totalMonths = steps.reduce((total, step) => {
      const duration = step.estimatedDuration;
      const months = this.parseDurationToMonths(duration);
      return total + months;
    }, 0);

    const adjustedMonths = currentLevel === 'intermediate' ? totalMonths * 0.7 : 
                          currentLevel === 'advanced' ? totalMonths * 0.5 : totalMonths;

    if (adjustedMonths < 12) {
      return `${Math.ceil(adjustedMonths)} months`;
    } else {
      const years = Math.floor(adjustedMonths / 12);
      const remainingMonths = Math.ceil(adjustedMonths % 12);
      return remainingMonths > 0 ? `${years} year${years > 1 ? 's' : ''} ${remainingMonths} months` : 
                                   `${years} year${years > 1 ? 's' : ''}`;
    }
  }

  private parseDurationToMonths(duration: string): number {
    const monthMatch = duration.match(/(\d+)-?(\d+)?\s*months?/);
    const yearMatch = duration.match(/(\d+)-?(\d+)?\s*years?/);
    
    if (monthMatch) {
      const min = parseInt(monthMatch[1]);
      const max = monthMatch[2] ? parseInt(monthMatch[2]) : min;
      return (min + max) / 2;
    }
    
    if (yearMatch) {
      const min = parseInt(yearMatch[1]);
      const max = yearMatch[2] ? parseInt(yearMatch[2]) : min;
      return ((min + max) / 2) * 12;
    }
    
    return 3; // Default to 3 months if can't parse
  }

  private calculateDifficulty(steps: PathwayStep[]): 'easy' | 'moderate' | 'challenging' {
    const educationSteps = steps.filter(s => s.category === 'education').length;
    const certificationSteps = steps.filter(s => s.category === 'certification').length;
    
    if (educationSteps >= 3 || certificationSteps >= 2) {
      return 'challenging';
    } else if (educationSteps >= 2 || certificationSteps >= 1) {
      return 'moderate';
    }
    return 'easy';
  }

  private getDefaultSuggestions(userInputs: string[]): CareerPathwayPlan[] {
    // Return popular, accessible career paths as defaults
    return [
      CAREER_PATHWAYS_DB.business['digital-marketing'],
      CAREER_PATHWAYS_DB.technology['software-development']
    ].map(career => ({
      targetCareer: career.title,
      currentLevel: 'beginner' as const,
      estimatedDuration: this.calculateDuration(career.steps, 'beginner'),
      difficultyLevel: this.calculateDifficulty(career.steps),
      description: career.description,
      salaryRange: career.salaryRange,
      jobOutlook: career.jobOutlook,
      steps: career.steps,
    }));
  }

  async saveCareerPathway(userId: number, pathway: CareerPathwayPlan): Promise<number> {
    const [savedPathway] = await db.insert(careerPathways).values({
      userId,
      targetCareer: pathway.targetCareer,
      currentLevel: pathway.currentLevel,
      estimatedDuration: pathway.estimatedDuration,
      difficultyLevel: pathway.difficultyLevel,
      pathway: JSON.stringify(pathway),
    }).returning({ id: careerPathways.id });

    // Save individual steps
    for (const step of pathway.steps) {
      await db.insert(pathwaySteps).values({
        pathwayId: savedPathway.id,
        stepNumber: step.stepNumber,
        title: step.title,
        description: step.description,
        category: step.category,
        estimatedDuration: step.estimatedDuration,
        resources: JSON.stringify(step.resources),
        prerequisites: JSON.stringify(step.prerequisites),
      });
    }

    return savedPathway.id;
  }

  async getUserPathways(userId: number) {
    return await db.select().from(careerPathways).where(eq(careerPathways.userId, userId));
  }

  async getPathwaySteps(pathwayId: number) {
    return await db.select().from(pathwaySteps).where(eq(pathwaySteps.pathwayId, pathwayId));
  }
}

export const careerPathwayService = new CareerPathwayService();
