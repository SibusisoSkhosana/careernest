import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SuccessStories = () => {
  const stories = [
    {
      name: "Nomsa Mthembu",
      beforeRole: "Domestic Worker",
      afterRole: "Healthcare Administrator",
      company: "Netcare",
      story: "From cleaning homes to managing hospital operations, Nomsa transformed her life through our healthcare career path and earned her diploma while working.",
      timeframe: "18 months",
      salaryIncrease: "R8,000 to R28,000",
      avatar: "👩🏿‍💼"
    },
    {
      name: "Lerato Mokoena",
      beforeRole: "Shop Assistant",
      afterRole: "Digital Marketing Manager",
      company: "Takealot",
      story: "After completing matric at 25, Lerato discovered her passion for digital marketing through our assessment and is now leading e-commerce campaigns.",
      timeframe: "14 months", 
      salaryIncrease: "R6,500 to R35,000",
      avatar: "👩🏽‍💻"
    },
    {
      name: "Thandi Ndlovu",
      beforeRole: "Factory Worker",
      afterRole: "Primary School Teacher",
      company: "Gauteng Department of Education",
      story: "Thandi always loved working with children. Through our education pathway, she completed her teaching diploma and now inspires young minds in Soweto.",
      timeframe: "36 months",
      salaryIncrease: "R4,800 to R22,000",
      avatar: "👩🏿‍🏫"
    }
  ];

  return (
    <section id="stories" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">
            Real Stories, Real Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Be inspired by the incredible journeys of people who transformed their careers and lives through CareerNest.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <Card key={index} className="bg-card-gradient border-border/50 hover:shadow-elegant transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-4xl">{story.avatar}</div>
                  <div>
                    <CardTitle className="text-xl font-bold text-foreground">{story.name}</CardTitle>
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm text-muted-foreground line-through">{story.beforeRole}</span>
                      <span className="text-sm font-semibold text-primary">{story.afterRole} at {story.company}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Badge variant="secondary" className="bg-success/20 text-success">
                    {story.timeframe}
                  </Badge>
                  <Badge variant="secondary" className="bg-warm/20 text-warm">
                    {story.salaryIncrease}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  "{story.story}"
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 text-muted-foreground">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-sm">Career Transition Success</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success">R35K</div>
              <div className="text-sm">Average Salary Increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warm">10K+</div>
              <div className="text-sm">Women Empowered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;