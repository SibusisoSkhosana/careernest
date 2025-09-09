import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Communities = () => {
  const communities = {
    technology: [
      {
        name: "Women in Tech SA",
        members: 2847,
        description: "Supporting women in technology careers across South Africa. Share experiences, find mentors, and grow your network.",
        activity: "Very Active",
        featured: true,
        topics: ["Career Growth", "Coding", "Startup Life", "Work-Life Balance"],
        meetups: "Monthly in Cape Town & Johannesburg"
      },
      {
        name: "Data Science Sisterhood",
        members: 1293,
        description: "Community for women working in data science, analytics, and machine learning fields.",
        activity: "Active",
        featured: false,
        topics: ["Python", "Machine Learning", "Analytics", "Research"],
        meetups: "Quarterly workshops"
      },
      {
        name: "Digital Marketing Mavens",
        members: 1856,
        description: "Connect with fellow digital marketers, share strategies, and stay updated with industry trends.",
        activity: "Active",
        featured: false,
        topics: ["Social Media", "SEO", "Content Strategy", "E-commerce"],
        meetups: "Bi-monthly virtual events"
      }
    ],
    healthcare: [
      {
        name: "Healthcare Heroes Network",
        members: 3421,
        description: "A supportive community for women in healthcare - from nurses to administrators to community health workers.",
        activity: "Very Active",
        featured: true,
        topics: ["Patient Care", "Career Development", "Healthcare Policy", "Wellness"],
        meetups: "Monthly across major cities"
      },
      {
        name: "Nursing Excellence Circle",
        members: 2156,
        description: "Professional development and support for nurses at all levels of their careers.",
        activity: "Active",
        featured: false,
        topics: ["Clinical Skills", "Leadership", "Specialization", "Work Stress"],
        meetups: "Monthly clinical workshops"
      },
      {
        name: "Community Health Champions",
        members: 987,
        description: "Empowering community health workers and advocates across rural and urban communities.",
        activity: "Moderate",
        featured: false,
        topics: ["Community Outreach", "Health Education", "Public Health", "Advocacy"],
        meetups: "Regional gatherings"
      }
    ],
    education: [
      {
        name: "Educators United SA",
        members: 4123,
        description: "The largest community for female educators in South Africa. Share resources, teaching tips, and career advice.",
        activity: "Very Active",
        featured: true,
        topics: ["Teaching Methods", "Curriculum", "Student Engagement", "Leadership"],
        meetups: "Provincial chapters"
      },
      {
        name: "Early Childhood Development Network",
        members: 1567,
        description: "Supporting practitioners in early childhood development and foundation phase education.",
        activity: "Active",
        featured: false,
        topics: ["Child Development", "Play-Based Learning", "Parent Engagement", "Assessments"],
        meetups: "Quarterly workshops"
      },
      {
        name: "Corporate Training Professionals",
        members: 892,
        description: "Network for women in corporate training, skills development, and workplace learning.",
        activity: "Moderate",
        featured: false,
        topics: ["Adult Learning", "Training Design", "L&D Strategy", "Technology"],
        meetups: "Monthly virtual sessions"
      }
    ],
    business: [
      {
        name: "Women in Business SA",
        members: 5234,
        description: "The premier network for women in business, from entrepreneurs to corporate leaders.",
        activity: "Very Active",
        featured: true,
        topics: ["Leadership", "Entrepreneurship", "Networking", "Investment"],
        meetups: "Regular networking events"
      },
      {
        name: "HR Professionals Circle",
        members: 1654,
        description: "Connect with HR professionals and learn about people management, compliance, and workplace culture.",
        activity: "Active",
        featured: false,
        topics: ["Talent Management", "Employment Law", "Culture", "Performance"],
        meetups: "Monthly HR breakfast sessions"
      },
      {
        name: "Project Management Guild",
        members: 1189,
        description: "For women managing projects across various industries and sectors.",
        activity: "Active",
        featured: false,
        topics: ["Agile", "Risk Management", "Team Leadership", "Stakeholder Management"],
        meetups: "Bi-monthly workshops"
      }
    ]
  };

  const events = [
    {
      title: "Women in Tech Conference 2024",
      date: "March 15-16, 2024",
      location: "Sandton Convention Centre",
      community: "Women in Tech SA",
      attendees: 500,
      type: "Conference"
    },
    {
      title: "Healthcare Leadership Workshop",
      date: "March 22, 2024",
      location: "UCT Health Sciences",
      community: "Healthcare Heroes Network",
      attendees: 120,
      type: "Workshop"
    },
    {
      title: "Teaching Innovation Summit",
      date: "April 5, 2024",
      location: "Wits Education Campus",
      community: "Educators United SA",
      attendees: 300,
      type: "Summit"
    },
    {
      title: "Women Entrepreneurs Networking",
      date: "April 10, 2024",
      location: "V&A Waterfront",
      community: "Women in Business SA",
      attendees: 200,
      type: "Networking"
    }
  ];

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case "Very Active": return "bg-success text-success-foreground";
      case "Active": return "bg-primary text-primary-foreground";
      case "Moderate": return "bg-warm text-warm-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-hero-gradient bg-clip-text text-transparent">
              Join Our Communities
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with like-minded women in your field. Share experiences, get support, and build lasting professional relationships across South Africa.
            </p>
          </div>

          <Tabs defaultValue="communities" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="communities">Browse Communities</TabsTrigger>
              <TabsTrigger value="events">Upcoming Events</TabsTrigger>
            </TabsList>

            <TabsContent value="communities" className="space-y-8">
              {Object.entries(communities).map(([field, fieldCommunities]) => (
                <div key={field}>
                  <h3 className="text-2xl font-bold mb-4 text-foreground capitalize">
                    {field} Communities
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fieldCommunities.map((community, index) => (
                      <Card key={index} className={`border-border/50 hover:shadow-elegant transition-all duration-300 ${
                        community.featured ? 'bg-primary/5 border-primary/20' : 'bg-card-gradient'
                      }`}>
                        <CardHeader>
                          <div className="flex justify-between items-start mb-2">
                            <Badge className={getActivityColor(community.activity)} variant="secondary">
                              {community.activity}
                            </Badge>
                            {community.featured && (
                              <Badge variant="default" className="bg-hero-gradient">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-xl font-bold">{community.name}</CardTitle>
                          <CardDescription>
                            <div className="flex items-center space-x-4 text-sm">
                              <span>👥 {community.members.toLocaleString()} members</span>
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">{community.description}</p>
                            
                            <div>
                              <h5 className="font-semibold mb-2 text-foreground">Popular Topics:</h5>
                              <div className="flex flex-wrap gap-2">
                                {community.topics.map((topic, topicIndex) => (
                                  <Badge key={topicIndex} variant="outline" className="text-xs">
                                    {topic}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="p-3 bg-muted/50 rounded-lg">
                              <p className="text-sm">
                                <span className="font-medium">📅 Meetups:</span> {community.meetups}
                              </p>
                            </div>

                            <Button className="w-full bg-hero-gradient hover:opacity-90">
                              Join Community
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
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
                        <Badge variant="secondary" className="bg-success/20 text-success">
                          {event.attendees} attending
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-bold">{event.title}</CardTitle>
                      <CardDescription>
                        <div className="space-y-1">
                          <p className="font-medium">📅 {event.date}</p>
                          <p>📍 {event.location}</p>
                          <p className="text-primary">Hosted by {event.community}</p>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          More Info
                        </Button>
                        <Button className="flex-1 bg-hero-gradient hover:opacity-90">
                          Register
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-center text-primary">Host Your Own Event</CardTitle>
                  <CardDescription className="text-center">
                    Want to organize a meetup or workshop for your community? We'll help you get started!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <Button className="bg-hero-gradient hover:opacity-90">
                      Become an Event Host
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Community Stats */}
          <div className="mt-16 grid md:grid-cols-4 gap-6">
            <Card className="text-center bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary">15,000+</div>
                <p className="text-sm text-muted-foreground">Active Members</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-success/5 border-success/20">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-success">24</div>
                <p className="text-sm text-muted-foreground">Communities</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-warm/5 border-warm/20">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-warm">150+</div>
                <p className="text-sm text-muted-foreground">Events This Year</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-secondary/5 border-secondary/20">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-secondary-foreground">9</div>
                <p className="text-sm text-muted-foreground">Cities</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Communities;