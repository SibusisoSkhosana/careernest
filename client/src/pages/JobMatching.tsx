import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const JobMatching = () => {
  const [selectedField, setSelectedField] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const jobs = [
    {
      title: "Junior Software Developer",
      company: "Takealot",
      location: "Cape Town",
      salary: "R240,000 - R320,000",
      field: "technology",
      type: "Full-time",
      remote: true,
      requirements: ["Matric", "Basic coding knowledge", "Willingness to learn"],
      description: "Join our tech team as a junior developer. We provide extensive training and mentorship.",
      posted: "2 days ago",
      applications: 23
    },
    {
      title: "Healthcare Administrator",
      company: "Netcare",
      location: "Johannesburg",
      salary: "R220,000 - R280,000",
      field: "healthcare",
      type: "Full-time",
      remote: false,
      requirements: ["Matric", "Healthcare administration diploma preferred", "Computer literacy"],
      description: "Manage hospital administrative operations and coordinate with medical staff.",
      posted: "5 days ago",
      applications: 41
    },
    {
      title: "Digital Marketing Specialist",
      company: "Allan Gray",
      location: "Cape Town",
      salary: "R200,000 - R350,000",
      field: "technology",
      type: "Full-time",
      remote: true,
      requirements: ["Matric", "Marketing qualification", "Social media experience"],
      description: "Drive our digital marketing campaigns and social media presence.",
      posted: "1 week ago",
      applications: 67
    },
    {
      title: "Primary School Teacher",
      company: "Western Cape Education Department",
      location: "Stellenbosch",
      salary: "R180,000 - R250,000",
      field: "education",
      type: "Full-time",
      remote: false,
      requirements: ["Teaching diploma", "SACE registration", "English proficiency"],
      description: "Inspire young minds in a supportive environment with excellent benefits.",
      posted: "3 days ago",
      applications: 89
    },
    {
      title: "Community Health Worker",
      company: "Department of Health - Gauteng",
      location: "Soweto",
      salary: "R120,000 - R180,000",
      field: "healthcare",
      type: "Full-time",
      remote: false,
      requirements: ["Matric", "Health promotion certificate", "Community engagement skills"],
      description: "Make a difference in your community by promoting health and wellness.",
      posted: "4 days ago",
      applications: 156
    },
    {
      title: "Data Analyst Trainee",
      company: "Standard Bank",
      location: "Johannesburg",
      salary: "R180,000 - R280,000",
      field: "technology",
      type: "Full-time",
      remote: true,
      requirements: ["Degree in related field", "Excel proficiency", "Analytical thinking"],
      description: "Entry-level position with comprehensive training in data analysis and visualization.",
      posted: "1 day ago",
      applications: 34
    },
    {
      title: "HR Coordinator",
      company: "Shoprite",
      location: "Cape Town",
      salary: "R160,000 - R220,000",
      field: "business",
      type: "Full-time",
      remote: false,
      requirements: ["HR qualification", "HRIS experience", "Communication skills"],
      description: "Support our HR operations and employee development initiatives.",
      posted: "6 days ago",
      applications: 78
    },
    {
      title: "Registered Nurse - ICU",
      company: "Life Healthcare",
      location: "Durban",
      salary: "R250,000 - R380,000",
      field: "healthcare",
      type: "Full-time",
      remote: false,
      requirements: ["Nursing degree", "SANC registration", "ICU experience preferred"],
      description: "Join our critical care team with opportunities for specialization and growth.",
      posted: "2 days ago",
      applications: 92
    },
    {
      title: "Corporate Trainer",
      company: "FNB",
      location: "Johannesburg",
      salary: "R280,000 - R420,000",
      field: "education",
      type: "Full-time",
      remote: true,
      requirements: ["Training qualification", "Facilitation skills", "Banking experience preferred"],
      description: "Design and deliver training programs for our growing workforce.",
      posted: "1 week ago",
      applications: 45
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesField = selectedField === "all" || job.field === selectedField;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesField && matchesSearch;
  });

  const getFieldColor = (field: string) => {
    switch (field) {
      case "technology": return "bg-primary/20 text-primary";
      case "healthcare": return "bg-success/20 text-success";
      case "education": return "bg-warm/20 text-warm";
      case "business": return "bg-secondary/20 text-secondary-foreground";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-hero-gradient bg-clip-text text-transparent">
              Job Opportunity Matching
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find positions that match your skills and career goals. We partner with leading South African employers committed to women's advancement.
            </p>
          </div>

          {/* Search and Filter Section */}
          <Card className="bg-card-gradient border-border/50 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Find Your Perfect Match</CardTitle>
              <CardDescription>Filter jobs by field and search for specific opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by job title, company, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-full md:w-48">
                  <Select value={selectedField} onValueChange={setSelectedField}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Fields</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="text-center bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary">{filteredJobs.length}</div>
                <p className="text-sm text-muted-foreground">Available Positions</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-success/5 border-success/20">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-success">85%</div>
                <p className="text-sm text-muted-foreground">Women-Friendly Companies</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-warm/5 border-warm/20">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-warm">72</div>
                <p className="text-sm text-muted-foreground">Partner Companies</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-secondary/5 border-secondary/20">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-secondary-foreground">94%</div>
                <p className="text-sm text-muted-foreground">Placement Success Rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <Card key={index} className="bg-card-gradient border-border/50 hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge className={getFieldColor(job.field)} variant="secondary">
                          {job.field}
                        </Badge>
                        <Badge variant="outline">{job.type}</Badge>
                        {job.remote && (
                          <Badge variant="outline" className="text-primary">Remote OK</Badge>
                        )}
                      </div>
                      <CardTitle className="text-2xl font-bold text-foreground">{job.title}</CardTitle>
                      <CardDescription className="text-lg">
                        <span className="font-medium text-primary">{job.company}</span> • {job.location}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-success">{job.salary}</div>
                      <div className="text-sm text-muted-foreground">Posted {job.posted}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">{job.description}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">Requirements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req, reqIndex) => (
                          <Badge key={reqIndex} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-border/50">
                      <div className="text-sm text-muted-foreground">
                        💼 {job.applications} applications so far
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">Save Job</Button>
                        <Button className="bg-hero-gradient hover:opacity-90">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold mb-2">No jobs found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or check back later for new opportunities.</p>
              </CardContent>
            </Card>
          )}

          {/* Job Alert Section */}
          <Card className="bg-primary/5 border-primary/20 mt-12">
            <CardHeader>
              <CardTitle className="text-center text-primary">Get Job Alerts</CardTitle>
              <CardDescription className="text-center">
                Never miss an opportunity! Set up alerts for jobs that match your preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input placeholder="Enter your email" className="flex-1" />
                <Button className="bg-hero-gradient hover:opacity-90">
                  Set Up Alerts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobMatching;