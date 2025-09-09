import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CareerAssessment from "@/components/CareerAssessment";

const CareerPaths = () => {
  const careerPaths = [
    {
      category: "Technology & Digital",
      color: "primary",
      paths: [
        { title: "Software Developer", demand: "High", salary: "R250K-R650K" },
        { title: "Data Analyst", demand: "Very High", salary: "R280K-R580K" },
        { title: "Digital Marketing", demand: "High", salary: "R180K-R450K" },
        { title: "IT Support Specialist", demand: "Critical", salary: "R150K-R380K" }
      ]
    },
    {
      category: "Healthcare & Social",
      color: "success",
      paths: [
        { title: "Registered Nurse", demand: "Critical", salary: "R180K-R420K" },
        { title: "Healthcare Administrator", demand: "High", salary: "R200K-R380K" },
        { title: "Community Health Worker", demand: "High", salary: "R120K-R250K" },
        { title: "Social Worker", demand: "High", salary: "R150K-R320K" }
      ]
    },
    {
      category: "Education & Training",
      color: "warm",
      paths: [
        { title: "Primary School Teacher", demand: "High", salary: "R180K-R350K" },
        { title: "Corporate Trainer", demand: "Medium", salary: "R220K-R480K" },
        { title: "Early Childhood Development", demand: "High", salary: "R120K-R280K" },
        { title: "Skills Development Facilitator", demand: "Medium", salary: "R180K-R420K" }
      ]
    }
  ];

  const getDemandBadgeColor = (demand: string) => {
    switch (demand) {
      case "Critical": return "bg-red-500 text-white";
      case "Very High": return "bg-orange-500 text-white";
      case "High": return "bg-success text-success-foreground";
      case "Medium": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section id="careers" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Explore Career Paths
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover high-demand careers across various industries, complete with salary ranges and growth opportunities.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {careerPaths.map((category, index) => (
            <Card key={index} className="bg-background border-border hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${
                    category.color === 'primary' ? 'bg-primary' :
                    category.color === 'success' ? 'bg-success' : 'bg-warm'
                  }`}></div>
                  {category.category}
                </CardTitle>
                <CardDescription>High-growth opportunities in {category.category.toLowerCase()}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.paths.map((path, pathIndex) => (
                  <div key={pathIndex} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-foreground">{path.title}</h4>
                      <Badge className={getDemandBadgeColor(path.demand)}>
                        {path.demand}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{path.salary}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <CareerAssessment />
        </div>
      </div>
    </section>
  );
};

export default CareerPaths;