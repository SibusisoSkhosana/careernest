import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MentorshipNetwork = () => {
  const mentors = {
    technology: [
      {
        name: "Kgomotso Moremi",
        title: "Senior Software Engineer",
        company: "Takealot",
        experience: "8 years",
        specialties: ["React", "Node.js", "Mobile Development"],
        bio: "Passionate about helping women transition into tech careers. Started as a call center agent and became a senior engineer.",
        avatar: "👩🏿‍💻",
        available: true
      },
      {
        name: "Naledi Mthembu", 
        title: "Data Science Manager",
        company: "Standard Bank",
        experience: "10 years",
        specialties: ["Machine Learning", "Python", "Financial Analytics"],
        bio: "Leading data science initiatives and mentoring junior analysts. Advocate for women in STEM.",
        avatar: "👩🏽‍🔬",
        available: true
      },
      {
        name: "Zanele Dlamini",
        title: "Product Manager",
        company: "Discovery",
        experience: "6 years",
        specialties: ["Product Strategy", "UX/UI", "Agile"],
        bio: "Helping women navigate tech leadership roles. Former teacher who transitioned to product management.",
        avatar: "👩🏿‍💼",
        available: false
      }
    ],
    healthcare: [
      {
        name: "Dr. Mpho Setshedi",
        title: "Hospital Administrator",
        company: "Chris Hani Baragwanath Hospital",
        experience: "12 years",
        specialties: ["Healthcare Management", "Public Health", "Operations"],
        bio: "Leading healthcare transformation initiatives. Mentor to aspiring healthcare administrators.",
        avatar: "👩🏿‍⚕️",
        available: true
      },
      {
        name: "Sister Nomsa Khumalo",
        title: "Nursing Manager",
        company: "Netcare",
        experience: "15 years",
        specialties: ["Critical Care", "Nursing Management", "Training"],
        bio: "Passionate about nursing excellence and developing the next generation of healthcare professionals.",
        avatar: "👩🏽‍⚕️",
        available: true
      },
      {
        name: "Lindiwe Mbeki",
        title: "Community Health Coordinator",
        company: "Department of Health",
        experience: "7 years",
        specialties: ["Community Outreach", "Health Education", "Program Management"],
        bio: "Dedicated to improving community health outcomes and mentoring community health workers.",
        avatar: "🧑🏿‍⚕️",
        available: true
      }
    ],
    education: [
      {
        name: "Precious Molefe",
        title: "School Principal",
        company: "Gauteng Department of Education",
        experience: "18 years",
        specialties: ["Educational Leadership", "Curriculum Development", "Teacher Training"],
        bio: "Transforming education in townships. Mentor to aspiring teachers and educational leaders.",
        avatar: "👩🏿‍🏫",
        available: true
      },
      {
        name: "Thabo Mogale",
        title: "Corporate Training Manager",
        company: "Vodacom",
        experience: "9 years",
        specialties: ["Adult Learning", "Skills Development", "Training Design"],
        bio: "Bridging the skills gap through innovative training programs. Passionate about women's development.",
        avatar: "👨🏿‍🏫",
        available: false
      }
    ],
    business: [
      {
        name: "Boitumelo Ramphele",
        title: "Senior Manager",
        company: "PwC",
        experience: "11 years",
        specialties: ["Strategy Consulting", "Change Management", "Leadership"],
        bio: "Helping women break through the glass ceiling in corporate environments.",
        avatar: "👩🏿‍💼",
        available: true
      },
      {
        name: "Thandiwe Nkomo",
        title: "HR Director",
        company: "Anglo American",
        experience: "14 years",
        specialties: ["Talent Development", "Diversity & Inclusion", "HR Strategy"],
        bio: "Champion of workplace diversity and women's career advancement in mining and corporate sectors.",
        avatar: "👩🏽‍💼",
        available: true
      }
    ]
  };

  const mentorshipPrograms = [
    {
      title: "Tech Transition Program",
      duration: "6 months",
      meetings: "Bi-weekly",
      focus: "Career change into technology",
      mentors: 12,
      cost: "Free"
    },
    {
      title: "Healthcare Leadership Circle",
      duration: "12 months",
      meetings: "Monthly",
      focus: "Leadership development in healthcare",
      mentors: 8,
      cost: "R500/month"
    },
    {
      title: "Education Excellence Network",
      duration: "9 months",
      meetings: "Monthly",
      focus: "Teaching and educational leadership",
      mentors: 15,
      cost: "Free"
    },
    {
      title: "Corporate Advancement Track",
      duration: "12 months",
      meetings: "Bi-weekly",
      focus: "Corporate career advancement",
      mentors: 10,
      cost: "R800/month"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-hero-gradient bg-clip-text text-transparent">
              Mentorship Network
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with successful South African women who've walked the path you want to take. Get guidance, support, and real insights from industry leaders.
            </p>
          </div>

          <Tabs defaultValue="mentors" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="mentors">Find a Mentor</TabsTrigger>
              <TabsTrigger value="programs">Mentorship Programs</TabsTrigger>
            </TabsList>

            <TabsContent value="mentors" className="space-y-8">
              {Object.entries(mentors).map(([field, fieldMentors]) => (
                <div key={field}>
                  <h3 className="text-2xl font-bold mb-4 text-foreground capitalize">
                    {field} Mentors
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fieldMentors.map((mentor, index) => (
                      <Card key={index} className="bg-card-gradient border-border/50 hover:shadow-elegant transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-4">
                            <div className="text-4xl">{mentor.avatar}</div>
                            <Badge 
                              variant={mentor.available ? "default" : "secondary"}
                              className={mentor.available ? "bg-success text-success-foreground" : ""}
                            >
                              {mentor.available ? "Available" : "Waitlist"}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl font-bold">{mentor.name}</CardTitle>
                          <CardDescription>
                            <div className="space-y-1">
                              <p className="font-medium text-primary">{mentor.title}</p>
                              <p className="text-sm">{mentor.company} • {mentor.experience}</p>
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">{mentor.bio}</p>
                            <div>
                              <h5 className="font-semibold mb-2 text-foreground">Specialties:</h5>
                              <div className="flex flex-wrap gap-2">
                                {mentor.specialties.map((specialty, specIndex) => (
                                  <Badge key={specIndex} variant="outline" className="text-xs">
                                    {specialty}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button 
                              className="w-full bg-hero-gradient hover:opacity-90"
                              disabled={!mentor.available}
                            >
                              {mentor.available ? "Connect" : "Join Waitlist"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="programs" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {mentorshipPrograms.map((program, index) => (
                  <Card key={index} className="bg-card-gradient border-border/50 hover:shadow-elegant transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="text-primary">
                          {program.duration}
                        </Badge>
                        <Badge variant="secondary" className="bg-success/20 text-success">
                          {program.cost}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl font-bold">{program.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {program.focus}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-foreground">Meetings:</span>
                            <p className="text-muted-foreground">{program.meetings}</p>
                          </div>
                          <div>
                            <span className="font-medium text-foreground">Available Mentors:</span>
                            <p className="text-muted-foreground">{program.mentors}</p>
                          </div>
                        </div>
                        <Button className="w-full bg-hero-gradient hover:opacity-90">
                          Apply for Program
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-center text-primary">How Mentorship Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6 text-center">
                    <div className="space-y-2">
                      <div className="text-3xl">📝</div>
                      <h4 className="font-semibold">Apply</h4>
                      <p className="text-sm text-muted-foreground">Complete your profile and career goals</p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl">🤝</div>
                      <h4 className="font-semibold">Match</h4>
                      <p className="text-sm text-muted-foreground">Get matched with the perfect mentor</p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl">💬</div>
                      <h4 className="font-semibold">Connect</h4>
                      <p className="text-sm text-muted-foreground">Regular meetings and guidance</p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl">🚀</div>
                      <h4 className="font-semibold">Grow</h4>
                      <p className="text-sm text-muted-foreground">Achieve your career goals</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentorshipNetwork;