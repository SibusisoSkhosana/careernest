import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      title: "Personal Career Assessment",
      description: "Discover your strengths, interests, and ideal career matches through our comprehensive assessment tools.",
      icon: "🎯",
      badge: "Popular",
      path: "/career-assessment"
    },
    {
      title: "Skill Development Hub",
      description: "Access curated learning resources, online courses, and workshops to build in-demand skills.",
      icon: "📚",
      badge: "Free",
      path: "/skills-development"
    },
    {
      title: "Mentorship Network",
      description: "Connect with successful professionals who can guide your career journey.",
      icon: "🤝",
      badge: "Premium",
      path: "/mentorship"
    },
    {
      title: "Success Stories",
      description: "Get inspired by real stories from people who've transformed their careers and lives.",
      icon: "⭐",
      badge: "Inspiring",
      path: "/success-stories"
    },
    {
      title: "Professional CV Generator",
      description: "Create stunning CVs that stand out to employers using our professional templates.",
      icon: "📄",
      badge: "New",
      path: "/cv-generator"
    },
    {
      title: "Cover Letter Generator",
      description: "Write compelling cover letters that get you noticed with smart templates.",
      icon: "✉️",
      badge: "New",
      path: "/cover-letter"
    },
    {
      title: "Job Opportunity Matching",
      description: "Find positions that align with your skills, values, and career goals.",
      icon: "💼",
      badge: "AI-Powered",
      path: "/job-matching"
    },
    {
      title: "Community Support",
      description: "Join a supportive community of like-minded individuals on similar journeys.",
      icon: "👥",
      badge: "24/7",
      path: "/communities"
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools, resources, and support you need to discover and pursue your ideal career path.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="relative bg-card-gradient border-border/50 hover:shadow-elegant transition-all duration-300 group cursor-pointer"
              onClick={() => navigate(feature.path)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;