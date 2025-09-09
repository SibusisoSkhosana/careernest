import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SuccessStoriesPage = () => {
  const stories = {
    "career-change": [
      {
        name: "Nomsa Mthembu",
        beforeRole: "Domestic Worker",
        afterRole: "Healthcare Administrator",
        company: "Netcare",
        story: "After working as a domestic worker for 8 years, I discovered empowerHER through a friend. The career assessment showed my potential in healthcare administration. With their support, I completed my diploma while working part-time. Today, I manage hospital operations and help coordinate care for thousands of patients. My children are so proud, and I'm proof that it's never too late to change your life.",
        timeframe: "18 months",
        salaryIncrease: "R8,000 to R28,000",
        avatar: "👩🏿‍💼",
        challenges: "Language barriers in medical terminology, balancing studies with work",
        support: "English classes, study groups, flexible learning schedule"
      },
      {
        name: "Lerato Mokoena",
        beforeRole: "Shop Assistant",
        afterRole: "Digital Marketing Manager",
        company: "Takealot",
        story: "I was 25 when I finally finished matric. Working as a shop assistant, I felt stuck with no clear path forward. The empowerHER assessment revealed my natural talent for communication and creativity. I enrolled in their digital marketing program, learning everything from social media to data analytics. Now I lead campaigns for South Africa's biggest online retailer. My journey shows that your starting point doesn't determine your destination.",
        timeframe: "14 months",
        salaryIncrease: "R6,500 to R35,000",
        avatar: "👩🏽‍💻",
        challenges: "Limited computer skills, financial constraints during training",
        support: "Free computer training, bursary program, mentorship"
      },
      {
        name: "Thandi Ndlovu",
        beforeRole: "Factory Worker",
        afterRole: "Primary School Teacher",
        company: "Gauteng Department of Education",
        story: "For 12 years, I worked night shifts at a textile factory. I always loved helping neighborhood children with homework, but never thought I could become a teacher. empowerHER helped me see my potential and provided a pathway to education. Through their partner programs, I completed my teaching diploma while working reduced hours. Now I teach Grade 3 in Soweto, inspiring the next generation every day.",
        timeframe: "36 months",
        salaryIncrease: "R4,800 to R22,000",
        avatar: "👩🏿‍🏫",
        challenges: "Night shift schedule affecting studies, self-doubt about abilities",
        support: "Flexible study options, confidence building workshops, peer support"
      }
    ],
    "advancement": [
      {
        name: "Palesa Moloi",
        beforeRole: "Junior Nurse",
        afterRole: "Nursing Unit Manager",
        company: "Chris Hani Baragwanath Hospital",
        story: "I started as a student nurse with big dreams but felt lost in the system. Through empowerHER's mentorship program, I connected with senior nurses who guided my career path. They helped me identify leadership opportunities and supported my pursuit of management qualifications. Today, I lead a team of 40 nurses in one of Africa's largest hospitals.",
        timeframe: "24 months",
        salaryIncrease: "R180,000 to R320,000",
        avatar: "👩🏽‍⚕️",
        challenges: "Workplace politics, imposter syndrome, work-life balance",
        support: "Leadership training, mentorship, stress management workshops"
      },
      {
        name: "Sibongile Khumalo",
        beforeRole: "Administrative Assistant",
        afterRole: "IT Project Manager",
        company: "Standard Bank",
        story: "I was stuck in admin for 5 years, watching IT projects from the sidelines. I was fascinated by technology but didn't think I belonged in that world. empowerHER's career coaching helped me identify transferable skills and create a transition plan. With their support, I completed IT certifications while building internal relationships. Now I manage digital transformation projects for one of Africa's largest banks.",
        timeframe: "30 months",
        salaryIncrease: "R180,000 to R450,000",
        avatar: "👩🏿‍💼",
        challenges: "Technical knowledge gaps, male-dominated environment",
        support: "Technical mentorship, confidence coaching, networking opportunities"
      }
    ],
    "entrepreneurship": [
      {
        name: "Mpho Serame",
        beforeRole: "Unemployed Graduate",
        afterRole: "Tech Startup Founder",
        company: "EduTech Solutions",
        story: "After graduating with a teaching degree, I couldn't find work for two years. I was discouraged and considering giving up on my dreams. empowerHER's entrepreneurship program showed me how to turn my passion for education into a business. I developed an app helping students with math, starting from my bedroom. Today, my company serves 50,000+ students across South Africa.",
        timeframe: "48 months",
        salaryIncrease: "R0 to R400,000+",
        avatar: "👩🏽‍💻",
        challenges: "No startup capital, technical development skills, business knowledge",
        support: "Seed funding, coding bootcamp, business mentorship, investor connections"
      },
      {
        name: "Zinhle Makhanya",
        beforeRole: "Community Health Worker",
        afterRole: "Health Services Entrepreneur",
        company: "Community Care Network",
        story: "Working in rural KwaZulu-Natal, I saw how hard it was for people to access healthcare. I had an idea for mobile health clinics but didn't know how to make it happen. empowerHER's business incubator gave me the tools and confidence to launch my social enterprise. We now provide healthcare services to 15 rural communities, employing 25 local women.",
        timeframe: "42 months",
        salaryIncrease: "R120,000 to R350,000",
        avatar: "👩🏿‍⚕️",
        challenges: "Rural infrastructure, funding healthcare equipment, regulatory compliance",
        support: "Social enterprise accelerator, healthcare sector mentors, impact investors"
      }
    ]
  };

  const stats = [
    { label: "Women Empowered", value: "10,000+", icon: "👩" },
    { label: "Career Transitions", value: "2,847", icon: "🔄" },
    { label: "Average Salary Increase", value: "185%", icon: "📈" },
    { label: "Mentorship Connections", value: "5,200", icon: "🤝" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-hero-gradient bg-clip-text text-transparent">
              Success Stories
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Be inspired by the incredible journeys of South African women who transformed their careers and lives through empowerHER. These are real stories of courage, determination, and success.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-card-gradient border-border/50">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="career-change" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="career-change">Career Change</TabsTrigger>
              <TabsTrigger value="advancement">Career Advancement</TabsTrigger>
              <TabsTrigger value="entrepreneurship">Entrepreneurship</TabsTrigger>
            </TabsList>

            {Object.entries(stories).map(([category, categoryStories]) => (
              <TabsContent key={category} value={category} className="space-y-8">
                <div className="grid gap-8">
                  {categoryStories.map((story, index) => (
                    <Card key={index} className="bg-card-gradient border-border/50 hover:shadow-elegant transition-all duration-300">
                      <CardHeader>
                        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                          <div className="flex items-center space-x-4">
                            <div className="text-6xl">{story.avatar}</div>
                            <div>
                              <CardTitle className="text-2xl font-bold text-foreground">{story.name}</CardTitle>
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-muted-foreground line-through">{story.beforeRole}</span>
                                  <span className="text-sm">→</span>
                                  <span className="text-sm font-semibold text-primary">{story.afterRole}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">at {story.company}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 lg:ml-auto">
                            <Badge variant="secondary" className="bg-success/20 text-success">
                              {story.timeframe}
                            </Badge>
                            <Badge variant="secondary" className="bg-warm/20 text-warm">
                              {story.salaryIncrease}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <blockquote className="text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-4">
                            "{story.story}"
                          </blockquote>
                          
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                              <h4 className="font-semibold mb-2 text-red-800 dark:text-red-300">Challenges Faced:</h4>
                              <p className="text-sm text-red-700 dark:text-red-400">{story.challenges}</p>
                            </div>
                            
                            <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                              <h4 className="font-semibold mb-2 text-success">Support Received:</h4>
                              <p className="text-sm text-success/80">{story.support}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Share Your Story Section */}
          <Card className="bg-hero-gradient text-white mt-16">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold">Share Your Success Story</CardTitle>
              <CardDescription className="text-center text-white/90">
                Have you transformed your career with empowerHER? Inspire others by sharing your journey.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-white/90">
                  Your story could be the inspiration another woman needs to take the first step toward her dreams.
                </p>
                <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  Submit Your Story
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Impact Metrics */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-8 text-foreground">Our Collective Impact</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">R2.8B</div>
                <p className="text-muted-foreground">Additional income generated for our community</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-success">47,000</div>
                <p className="text-muted-foreground">Family members positively impacted</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-warm">850</div>
                <p className="text-muted-foreground">New businesses launched by our alumni</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SuccessStoriesPage;