export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick_reply' | 'card' | 'list';
  data?: any;
}

export interface QuickReply {
  text: string;
  payload: string;
}

export interface ChatResponse {
  message: string;
  type: 'text' | 'quick_reply' | 'card' | 'list';
  quickReplies?: QuickReply[];
  data?: any;
}

export class ChatbotService {
  private momoKnowledgeBase = {
    // MoMo Account & Registration
    'account_creation': {
      keywords: ['create account', 'register', 'sign up', 'new account', 'open account'],
      response: "To create an MTN MoMo account:\n\n1. Dial *165# from your MTN line\n2. Select option 1 'Register'\n3. Create a 5-digit PIN\n4. Confirm your PIN\n5. Accept terms and conditions\n\nYou'll receive a confirmation SMS. Your account is now ready to use! 📱💰",
      quickReplies: [
        { text: "PIN Requirements", payload: "pin_requirements" },
        { text: "Account Limits", payload: "account_limits" },
        { text: "Required Documents", payload: "required_docs" }
      ]
    },
    'pin_requirements': {
      keywords: ['pin requirements', 'pin rules', 'password rules'],
      response: "MoMo PIN Requirements:\n\n✅ Must be exactly 5 digits\n✅ Cannot be sequential (12345)\n✅ Cannot be repetitive (11111)\n✅ Should not be your birth year\n✅ Keep it secret and secure\n\nTip: Choose a PIN you can remember but others can't guess! 🔐",
      quickReplies: [
        { text: "Forgot PIN", payload: "forgot_pin" },
        { text: "Change PIN", payload: "change_pin" }
      ]
    },
    'account_limits': {
      keywords: ['limits', 'maximum', 'minimum', 'daily limit', 'monthly limit'],
      response: "MoMo Account Limits:\n\n📊 **Daily Limits:**\n• Send Money: R3,000\n• Cash Out: R2,000\n• Buy Airtime: R1,000\n\n📊 **Monthly Limits:**\n• Total Transactions: R25,000\n\n💡 Limits can be increased with KYC verification and account upgrades.",
      quickReplies: [
        { text: "Upgrade Account", payload: "upgrade_account" },
        { text: "KYC Process", payload: "kyc_process" }
      ]
    },

    // Money Transfers
    'send_money': {
      keywords: ['send money', 'transfer', 'send cash', 'money transfer'],
      response: "To send money via MoMo:\n\n1. Dial *165#\n2. Select '1. Send Money'\n3. Enter recipient's number\n4. Enter amount (min R1, max R3,000)\n5. Enter your PIN\n6. Confirm transaction\n\n💸 Fees: R1.50 for amounts up to R50, R3 for R51-R200, R5 for R201+",
      quickReplies: [
        { text: "Transfer Fees", payload: "transfer_fees" },
        { text: "Send to Bank", payload: "send_to_bank" },
        { text: "International Transfer", payload: "international_transfer" }
      ]
    },
    'transfer_fees': {
      keywords: ['fees', 'charges', 'cost', 'how much'],
      response: "MoMo Transfer Fees:\n\n💰 **Send Money:**\n• R1 - R50: R1.50\n• R51 - R200: R3.00\n• R201 - R500: R5.00\n• R501 - R1000: R7.50\n• R1001+: R10.00\n\n💰 **Cash Out:**\n• R1 - R50: R5.00\n• R51 - R200: R8.00\n• R201+: R12.00",
      quickReplies: [
        { text: "Free Transfers", payload: "free_transfers" },
        { text: "Bank Fees", payload: "bank_fees" }
      ]
    },

    // Payments & Bills
    'pay_bills': {
      keywords: ['pay bills', 'electricity', 'water', 'dstv', 'prepaid'],
      response: "Pay bills easily with MoMo:\n\n1. Dial *165#\n2. Select '3. Pay Bills'\n3. Choose service (Electricity, Water, DSTV, etc.)\n4. Enter account/meter number\n5. Enter amount\n6. Enter PIN to confirm\n\n⚡ Available services: Eskom, City Power, DSTV, Showmax, Netflix, and more!",
      quickReplies: [
        { text: "Electricity Payment", payload: "electricity_payment" },
        { text: "DSTV Payment", payload: "dstv_payment" },
        { text: "Water Bills", payload: "water_bills" }
      ]
    },

    // Troubleshooting
    'forgot_pin': {
      keywords: ['forgot pin', 'reset pin', 'pin blocked'],
      response: "To reset your MoMo PIN:\n\n1. Dial *165#\n2. Select '6. My Account'\n3. Select 'Reset PIN'\n4. Follow SMS instructions\n5. Visit MTN store with ID if needed\n\n🆘 If PIN is blocked, wait 24 hours or visit MTN store with ID document.",
      quickReplies: [
        { text: "MTN Store Locator", payload: "store_locator" },
        { text: "Required Documents", payload: "required_docs" }
      ]
    },
    'transaction_failed': {
      keywords: ['failed transaction', 'transaction error', 'money not received'],
      response: "If your transaction failed:\n\n1. Check your SMS for error details\n2. Verify recipient number\n3. Ensure sufficient balance\n4. Try again after 5 minutes\n5. Contact 135 if money was deducted\n\n🔄 Most failed transactions reverse automatically within 24 hours.",
      quickReplies: [
        { text: "Check Balance", payload: "check_balance" },
        { text: "Contact Support", payload: "contact_support" }
      ]
    }
  };

  private careerKnowledgeBase = {
    // Career Assessment
    'career_assessment': {
      keywords: ['career assessment', 'what career', 'career test', 'find career'],
      response: "Our Career Assessment helps you discover your ideal career path! 🎯\n\nIt evaluates:\n✅ Your interests and passions\n✅ Natural strengths and skills\n✅ Work style preferences\n✅ Values and motivations\n\nTakes 15-20 minutes and provides personalized career recommendations with salary insights.",
      quickReplies: [
        { text: "Start Assessment", payload: "start_assessment" },
        { text: "Sample Questions", payload: "sample_questions" },
        { text: "Career Pathways", payload: "career_pathways" }
      ]
    },
    'career_pathways': {
      keywords: ['career pathway', 'career roadmap', 'how to become', 'career plan'],
      response: "Career Pathways provide step-by-step roadmaps to your dream job! 🗺️\n\nWe create personalized plans for:\n🔹 Technology (Software Dev, Data Science)\n🔹 Healthcare (Nursing, Medical)\n🔹 Business (Marketing, Finance)\n🔹 Creative (Design, Media)\n\nEach pathway includes timeline, resources, and salary expectations.",
      quickReplies: [
        { text: "Generate My Pathway", payload: "generate_pathway" },
        { text: "Popular Careers", payload: "popular_careers" },
        { text: "Salary Information", payload: "salary_info" }
      ]
    },
    'popular_careers': {
      keywords: ['popular careers', 'in-demand jobs', 'best careers', 'high paying'],
      response: "🔥 Most In-Demand Careers in South Africa:\n\n💻 **Technology:**\n• Software Developer (R250K-R650K)\n• Data Scientist (R280K-R580K)\n• Cybersecurity Specialist (R300K-R700K)\n\n🏥 **Healthcare:**\n• Registered Nurse (R180K-R420K)\n• Pharmacist (R350K-R600K)\n\n💼 **Business:**\n• Digital Marketer (R180K-R450K)\n• Project Manager (R400K-R800K)",
      quickReplies: [
        { text: "Tech Careers", payload: "tech_careers" },
        { text: "Healthcare Careers", payload: "healthcare_careers" },
        { text: "Business Careers", payload: "business_careers" }
      ]
    },

    // Skills Development
    'skills_development': {
      keywords: ['learn skills', 'upskill', 'training', 'courses'],
      response: "Boost your career with our Skills Development resources! 📚\n\n🎓 **Available Training:**\n• Online courses and certifications\n• Practical workshops\n• Mentorship programs\n• Industry-specific training\n\n💡 **Popular Skills:**\n• Digital literacy\n• Communication\n• Leadership\n• Technical skills",
      quickReplies: [
        { text: "Free Courses", payload: "free_courses" },
        { text: "Certifications", payload: "certifications" },
        { text: "Find Mentor", payload: "find_mentor" }
      ]
    },

    // Job Search
    'job_search': {
      keywords: ['find job', 'job search', 'employment', 'hiring'],
      response: "Let's help you find your perfect job! 🔍\n\n🎯 **Job Matching Features:**\n• AI-powered job recommendations\n• Skills-based matching\n• Salary range filtering\n• Location preferences\n\n📝 **Application Tools:**\n• Professional CV generator\n• Cover letter templates\n• Interview preparation",
      quickReplies: [
        { text: "Browse Jobs", payload: "browse_jobs" },
        { text: "Create CV", payload: "create_cv" },
        { text: "Interview Tips", payload: "interview_tips" }
      ]
    },

    // CV and Applications
    'cv_help': {
      keywords: ['cv help', 'resume', 'cv tips', 'application'],
      response: "Create a winning CV with our AI-powered tools! 📄\n\n✨ **AI CV Generator (R50):**\n• Professional templates\n• AI-powered content optimization\n• ATS-friendly designs\n• Skills highlighting\n• Achievement focus\n\n💡 **Pro Tips:**\n• Tailor for each job\n• Use action verbs\n• Quantify achievements\n• Keep it concise (2 pages max)",
      quickReplies: [
        { text: "AI Services", payload: "ai_services" },
        { text: "Generate CV", payload: "generate_cv" },
        { text: "Cover Letter", payload: "cover_letter" }
      ]
    },

    // AI Services
    'ai_services': {
      keywords: ['ai services', 'ai cv', 'ai cover letter', 'job alerts', 'momo payment'],
      response: "🤖 **AI-Powered Career Services:**\n\n💼 **CV Generator (R50):**\n• AI-optimized content\n• Professional templates\n• ATS-friendly format\n\n📝 **Cover Letter Generator (R50):**\n• Personalized for each job\n• Company research integration\n• Skills matching\n\n📧 **Job Alerts (R100/month):**\n• AI-curated job matching\n• Daily email notifications\n• Personalized recommendations\n\n💳 **Pay easily with MTN MoMo!**",
      quickReplies: [
        { text: "Browse AI Services", payload: "browse_ai_services" },
        { text: "MoMo Payment Help", payload: "momo_payment" },
        { text: "Job Search", payload: "job_search_help" }
      ]
    },

    'job_search_help': {
      keywords: ['job search', 'find job', 'job hunting', 'employment'],
      response: "🔍 **Find Your Dream Job:**\n\n🎯 **Job Search Features:**\n• Advanced filtering options\n• Salary range search\n• Location preferences\n• Industry-specific results\n\n📧 **Personalized Job Alerts (R100/month):**\n• AI-curated recommendations\n• Daily email delivery\n• Skills-based matching\n• 30-day subscription\n\n💡 **Tips:** Update your profile regularly and set up job alerts for the best matches!",
      quickReplies: [
        { text: "Search Jobs", payload: "search_jobs" },
        { text: "Job Alerts", payload: "job_alerts" },
        { text: "CV Help", payload: "cv_help" }
      ]
    },

    'momo_payment': {
      keywords: ['momo payment', 'pay with momo', 'mobile money', 'payment help'],
      response: "💳 **Pay for AI Services with MTN MoMo:**\n\n🔹 **CV Generation:** R50\n🔹 **Cover Letter:** R50\n🔹 **Job Alerts:** R100/month\n\n📱 **How to Pay:**\n1. Select service\n2. Enter MoMo number\n3. Approve payment on phone\n4. Service activates instantly\n\n✅ **Secure & Instant** - Your services activate immediately after payment!",
      quickReplies: [
        { text: "MoMo Help", payload: "send_money" },
        { text: "AI Services", payload: "ai_services" },
        { text: "Payment Issues", payload: "transaction_failed" }
      ]
    }
  };

  detectIntent(message: string): { category: 'momo' | 'career' | 'general', confidence: number } {
    const lowerMessage = message.toLowerCase();
    
    // MoMo keywords
    const momoKeywords = ['momo', 'money', 'transfer', 'send', 'pay', 'bill', 'pin', 'account', 'balance', 'cash', 'airtime', 'data'];
    const momoMatches = momoKeywords.filter(keyword => lowerMessage.includes(keyword)).length;
    
    // Career keywords
    const careerKeywords = ['career', 'job', 'work', 'skill', 'cv', 'resume', 'interview', 'salary', 'training', 'course', 'mentor'];
    const careerMatches = careerKeywords.filter(keyword => lowerMessage.includes(keyword)).length;
    
    if (momoMatches > careerMatches) {
      return { category: 'momo', confidence: momoMatches / momoKeywords.length };
    } else if (careerMatches > 0) {
      return { category: 'career', confidence: careerMatches / careerKeywords.length };
    } else {
      return { category: 'general', confidence: 0 };
    }
  }

  findBestMatch(message: string, knowledgeBase: any): { key: string, score: number } | null {
    const lowerMessage = message.toLowerCase();
    let bestMatch = { key: '', score: 0 };

    for (const [key, data] of Object.entries(knowledgeBase)) {
      const keywords = (data as any).keywords;
      let score = 0;
      
      for (const keyword of keywords) {
        if (lowerMessage.includes(keyword.toLowerCase())) {
          score += keyword.split(' ').length; // Multi-word keywords get higher scores
        }
      }
      
      if (score > bestMatch.score) {
        bestMatch = { key, score };
      }
    }

    return bestMatch.score > 0 ? bestMatch : null;
  }

  generateResponse(message: string): ChatResponse {
    const intent = this.detectIntent(message);
    
    if (intent.category === 'momo') {
      const match = this.findBestMatch(message, this.momoKnowledgeBase);
      if (match) {
        const data = this.momoKnowledgeBase[match.key as keyof typeof this.momoKnowledgeBase];
        return {
          message: data.response,
          type: 'quick_reply',
          quickReplies: data.quickReplies
        };
      }
    } else if (intent.category === 'career') {
      const match = this.findBestMatch(message, this.careerKnowledgeBase);
      if (match) {
        const data = this.careerKnowledgeBase[match.key as keyof typeof this.careerKnowledgeBase];
        return {
          message: data.response,
          type: 'quick_reply',
          quickReplies: data.quickReplies
        };
      }
    }

    // Default responses
    return this.getDefaultResponse(message);
  }

  handleQuickReply(payload: string): ChatResponse {
    // Handle MoMo quick replies
    if (this.momoKnowledgeBase[payload as keyof typeof this.momoKnowledgeBase]) {
      const data = this.momoKnowledgeBase[payload as keyof typeof this.momoKnowledgeBase];
      return {
        message: data.response,
        type: 'quick_reply',
        quickReplies: data.quickReplies
      };
    }

    // Handle Career quick replies
    if (this.careerKnowledgeBase[payload as keyof typeof this.careerKnowledgeBase]) {
      const data = this.careerKnowledgeBase[payload as keyof typeof this.careerKnowledgeBase];
      return {
        message: data.response,
        type: 'quick_reply',
        quickReplies: data.quickReplies
      };
    }

    // Handle special actions
    switch (payload) {
      case 'start_assessment':
        return {
          message: "Great! Let's start your career assessment. I'll redirect you to our comprehensive assessment tool.",
          type: 'text',
          data: { action: 'redirect', url: '/career-assessment' }
        };
      case 'generate_pathway':
        return {
          message: "Perfect! Let's create your personalized career pathway. I'll take you to our pathway generator.",
          type: 'text',
          data: { action: 'redirect', url: '/career-pathway' }
        };
      case 'generate_cv':
        return {
          message: "Excellent! Let's create your professional CV. I'll redirect you to our CV generator.",
          type: 'text',
          data: { action: 'redirect', url: '/cv-generator' }
        };
      case 'browse_ai_services':
        return {
          message: "Perfect! Let me take you to our AI services where you can purchase CV generation, cover letters, and job alerts.",
          type: 'text',
          data: { action: 'redirect', url: '/ai-services' }
        };
      case 'search_jobs':
        return {
          message: "Great! Let's find your perfect job. I'll redirect you to our job search platform.",
          type: 'text',
          data: { action: 'redirect', url: '/job-search' }
        };
      case 'job_alerts':
        return {
          message: "Excellent choice! Job alerts will send you personalized job recommendations daily. Let me take you to set this up.",
          type: 'text',
          data: { action: 'redirect', url: '/job-search' }
        };
      default:
        return this.getDefaultResponse(payload);
    }
  }

  private getDefaultResponse(message: string): ChatResponse {
    const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'];
    const lowerMessage = message.toLowerCase();

    if (greetings.some(greeting => lowerMessage.includes(greeting))) {
      return {
        message: "Hello! 👋 I'm your CareerNest assistant. I can help you with:\n\n💰 MTN MoMo questions (transfers, payments, troubleshooting)\n🎯 Career guidance (assessments, pathways, job search)\n\nWhat would you like to know about?",
        type: 'quick_reply',
        quickReplies: [
          { text: "MoMo Help", payload: "momo_help" },
          { text: "Career Guidance", payload: "career_help" },
          { text: "Popular Questions", payload: "popular_questions" }
        ]
      };
    }

    return {
      message: "I'm here to help with MTN MoMo and career guidance questions! 🤖\n\nTry asking me about:\n• MoMo transfers and payments\n• Career assessments and pathways\n• Job search and CV tips\n• Skills development\n\nWhat would you like to know?",
      type: 'quick_reply',
      quickReplies: [
        { text: "MoMo Questions", payload: "momo_help" },
        { text: "Career Help", payload: "career_help" },
        { text: "Browse Topics", payload: "browse_topics" }
      ]
    };
  }

  getPopularQuestions(): ChatResponse {
    return {
      message: "🔥 Most Popular Questions:\n\n💰 **MoMo:**\n• How to send money?\n• What are the transfer fees?\n• How to reset PIN?\n\n🎯 **Career:**\n• What career suits me?\n• How to create a CV?\n• Popular careers in SA?",
      type: 'quick_reply',
      quickReplies: [
        { text: "Send Money Guide", payload: "send_money" },
        { text: "Career Assessment", payload: "career_assessment" },
        { text: "CV Help", payload: "cv_help" }
      ]
    };
  }
}

export const chatbotService = new ChatbotService();
