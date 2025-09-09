import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SkillsDevelopment = () => {
  const courses = [
    {
      category: "Technology",
      items: [
        {
          title: "Web Development Bootcamp",
          provider: "CodeSpace Academy",
          duration: "6 months",
          cost: "R45,000",
          type: "Bootcamp",
          description: "Learn HTML, CSS, JavaScript, React and Node.js"
        },
        {
          title: "Data Analytics Certificate",
          provider: "University of Cape Town",
          duration: "4 months",
          cost: "R25,000",
          type: "Certificate",
          description: "Master Excel, SQL, Python and data visualization"
        },
        {
          title: "Digital Marketing Course",
          provider: "Red & Yellow Creative School",
          duration: "3 months",
          cost: "R18,000",
          type: "Course",
          description: "Social media, SEO, Google Ads, content marketing"
        }
      ]
    },
    {
      category: "Healthcare",
      items: [
        {
          title: "Healthcare Administration Diploma",
          provider: "Damelin",
          duration: "12 months",
          cost: "R32,000",
          type: "Diploma",
          description: "Healthcare systems, medical records, administration"
        },
        {
          title: "Community Health Worker Training",
          provider: "Department of Health",
          duration: "6 weeks",
          cost: "Free",
          type: "Certificate",
          description: "Primary healthcare, community outreach"
        },
        {
          title: "First Aid & CPR Certification",
          provider: "St John Ambulance",
          duration: "2 days",
          cost: "R850",
          type: "Certificate",
          description: "Emergency response and basic life support"
        }
      ]
    },
    {
      category: "Education",
      items: [
        {
          title: "Early Childhood Development Diploma",
          provider: "UNISA",
          duration: "3 years",
          cost: "R15,000/year",
          type: "Diploma",
          description: "Child development, teaching methods, curriculum"
        },
        {
          title: "Adult Basic Education Training",
          provider: "Skills University",
          duration: "6 months",
          cost: "R12,000",
          type: "Certificate",
          description: "Teaching literacy and numeracy to adults"
        },
        {
          title: "Skills Development Facilitator",
          provider: "ETDP SETA",
          duration: "12 months",
          cost: "R28,000",
          type: "Qualification",
          description: "Workplace training and development"
        }
      ]
    }
  ];

  const universities = [
    {
      name: "University of Cape Town",
      programs: ["Business Administration", "Computer Science", "Health Sciences"],
      location: "Cape Town",
      bursaries: "Available for women in STEM"
    },
    {
      name: "University of the Witwatersrand",
      programs: ["Engineering", "Medicine", "Commerce"],
      location: "Johannesburg",
      bursaries: "Women in Mining bursary program"
    },
    {
      name: "Stellenbosch University",
      programs: ["Agriculture", "Technology", "Education"],
      location: "Stellenbosch",
      bursaries: "Rural women development fund"
    },
    {
      name: "UNISA",
      programs: ["All fields - Distance Learning"],
      location: "Nationwide",
      bursaries: "NSFAS funding available"
    }
  ];

  const events = [
    {
      title: "Women in Tech Conference 2024",
      date: "March 15-16, 2024",
      location: "Sandton Convention Centre",
      type: "Conference",
      cost: "R500"
    },
    {
      title: "Healthcare Skills Workshop",
      date: "April 8, 2024",
      location: "University of Cape Town",
      type: "Workshop",
      cost: "Free"
    },
    {
      title: "Digital Marketing Masterclass",
      date: "March 25, 2024",
      location: "Online",
      type: "Webinar",
      cost: "R150"
    },
    {
      title: "Entrepreneurship for Women",
      date: "April 12, 2024",
      location: "Durban ICC",
      type: "Seminar",
      cost: "R300"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-hero-gradient bg-clip-text text-transparent">
              Skills Development Hub
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Build the skills you need for your dream career with courses, workshops, and educational opportunities across South Africa.
            </p>
          </div>

          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="courses">Courses & Training</TabsTrigger>
              <TabsTrigger value="universities">Universities</TabsTrigger>
              <TabsTrigger value="events">Events & Workshops</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-8">
              {courses.map((category, index) => (
                <div key={index}>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{category.category} Courses</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {category.items.map((course, courseIndex) => (
                      <Card key={courseIndex} className="bg-card-gradient border-border/50 hover:shadow-elegant transition-all duration-300">
                        <CardHeader>
                          <div className="flex justify-between items-start mb-2">
                            <Badge variant="outline" className="text-primary">
                              {course.type}
                            </Badge>
                            <Badge variant="secondary" className="bg-success/20 text-success">
                              {course.cost}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
                          <CardDescription>
                            <div className="space-y-1">
                              <p className="font-medium text-primary">{course.provider}</p>
                              <p className="text-sm">Duration: {course.duration}</p>
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">{course.description}</p>
                          <Button className="w-full bg-hero-gradient hover:opacity-90">
                            Learn More
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="universities" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {universities.map((university, index) => (
                  <Card key={index} className="bg-card-gradient border-border/50 hover:shadow-elegant transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-primary">{university.name}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        📍 {university.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-foreground">Popular Programs:</h4>
                          <div className="flex flex-wrap gap-2">
                            {university.programs.map((program, programIndex) => (
                              <Badge key={programIndex} variant="outline">
                                {program}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="p-3 bg-success/10 rounded-lg">
                          <p className="text-sm font-medium text-success">💰 {university.bursaries}</p>
                        </div>
                        <Button className="w-full bg-hero-gradient hover:opacity-90">
                          View Programs
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {events.map((event, index) => (
                  <Card key={index} className="bg-card-gradient border-border/50 hover:shadow-elegant transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="text-primary">
                          {event.type}
                        </Badge>
                        <Badge variant="secondary" className="bg-warm/20 text-warm">
                          {event.cost}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-bold">{event.title}</CardTitle>
                      <CardDescription>
                        <div className="space-y-1">
                          <p className="font-medium">📅 {event.date}</p>
                          <p>📍 {event.location}</p>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-hero-gradient hover:opacity-90">
                        Register Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SkillsDevelopment;