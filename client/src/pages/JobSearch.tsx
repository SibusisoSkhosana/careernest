import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, MapPin, Building, DollarSign, Clock, Mail, Bell, ExternalLink, CreditCard } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salaryMin: number;
  salaryMax: number;
  currency: string;
  jobType: string;
  industry: string;
  experienceLevel: string;
  skills: string[];
  benefits: string[];
  applicationUrl: string;
  createdAt: string;
}

interface JobSearchParams {
  keywords: string[];
  location: string;
  industry: string;
  jobType: string;
  salaryMin: number;
  experienceLevel: string;
  limit: number;
}

const JobSearch = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<Partial<JobSearchParams>>({
    keywords: [],
    location: "",
    industry: "",
    jobType: "",
    experienceLevel: "",
    limit: 20
  });
  const [keywordInput, setKeywordInput] = useState("");
  const [showJobAlerts, setShowJobAlerts] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  // Sample job data (in production, this would come from API)
  const sampleJobs: Job[] = [
    {
      id: 1,
      title: "Software Developer",
      company: "TechCorp SA",
      location: "Cape Town, Western Cape",
      description: "We are looking for a passionate Software Developer to join our growing team...",
      requirements: ["3+ years experience", "React/TypeScript", "Node.js", "SQL"],
      salaryMin: 350000,
      salaryMax: 550000,
      currency: "ZAR",
      jobType: "full-time",
      industry: "Technology",
      experienceLevel: "mid",
      skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
      benefits: ["Medical Aid", "Pension Fund", "Flexible Hours", "Remote Work"],
      applicationUrl: "https://techcorp.co.za/careers",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Digital Marketing Specialist",
      company: "Marketing Pro",
      location: "Johannesburg, Gauteng",
      description: "Join our dynamic marketing team and help drive digital transformation...",
      requirements: ["2+ years experience", "Google Ads", "Social Media", "Analytics"],
      salaryMin: 280000,
      salaryMax: 420000,
      currency: "ZAR",
      jobType: "full-time",
      industry: "Marketing",
      experienceLevel: "mid",
      skills: ["Google Ads", "Facebook Ads", "SEO", "Content Marketing"],
      benefits: ["Medical Aid", "Performance Bonus", "Training Budget"],
      applicationUrl: "https://marketingpro.co.za/jobs",
      createdAt: "2024-01-14"
    },
    {
      id: 3,
      title: "Registered Nurse",
      company: "HealthCare Plus",
      location: "Durban, KwaZulu-Natal",
      description: "Compassionate Registered Nurse needed for our private hospital...",
      requirements: ["SANC Registration", "2+ years experience", "Critical Care", "BLS Certified"],
      salaryMin: 250000,
      salaryMax: 380000,
      currency: "ZAR",
      jobType: "full-time",
      industry: "Healthcare",
      experienceLevel: "mid",
      skills: ["Patient Care", "Medical Procedures", "Documentation", "Team Collaboration"],
      benefits: ["Medical Aid", "Pension Fund", "Shift Allowances", "Study Leave"],
      applicationUrl: "https://healthcareplus.co.za/careers",
      createdAt: "2024-01-13"
    }
  ];

  useEffect(() => {
    // Initialize with sample jobs
    setJobs(sampleJobs);
  }, []);

  const searchJobs = async () => {
    setLoading(true);
    try {
      // In production, this would call the actual API
      // const response = await fetch('/api/ai-services/search-jobs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(searchParams),
      // });
      // const data = await response.json();
      
      // For demo, filter sample jobs
      let filteredJobs = sampleJobs;
      
      if (searchParams.keywords && searchParams.keywords.length > 0) {
        filteredJobs = filteredJobs.filter(job =>
          searchParams.keywords!.some(keyword =>
            job.title.toLowerCase().includes(keyword.toLowerCase()) ||
            job.description.toLowerCase().includes(keyword.toLowerCase()) ||
            job.skills.some(skill => skill.toLowerCase().includes(keyword.toLowerCase()))
          )
        );
      }
      
      if (searchParams.location) {
        filteredJobs = filteredJobs.filter(job =>
          job.location.toLowerCase().includes(searchParams.location!.toLowerCase())
        );
      }
      
      if (searchParams.industry) {
        filteredJobs = filteredJobs.filter(job =>
          job.industry.toLowerCase() === searchParams.industry!.toLowerCase()
        );
      }
      
      setJobs(filteredJobs);
      
    } catch (error) {
      console.error('Error searching jobs:', error);
      toast({
        title: "Search Error",
        description: "Failed to search jobs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !searchParams.keywords?.includes(keywordInput.trim())) {
      setSearchParams({
        ...searchParams,
        keywords: [...(searchParams.keywords || []), keywordInput.trim()]
      });
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setSearchParams({
      ...searchParams,
      keywords: searchParams.keywords?.filter(k => k !== keyword) || []
    });
  };

  const subscribeToJobAlerts = async () => {
    setSubscribing(true);
    try {
      const phoneNumber = prompt("Enter your MTN MoMo phone number to pay R100 for personalized job alerts:");
      if (!phoneNumber) {
        setSubscribing(false);
        return;
      }

      // First purchase the job alerts service
      const purchaseResponse = await fetch('/api/ai-services/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: 3, // Job alerts service ID
          phoneNumber
        }),
      });

      const purchaseData = await purchaseResponse.json();
      
      if (purchaseData.success) {
        toast({
          title: "Payment Initiated",
          description: "Please complete the payment on your phone. Job alerts will be activated once payment is confirmed.",
        });

        // Poll for payment confirmation
        setTimeout(async () => {
          try {
            const verifyResponse = await fetch(`/api/ai-services/verify-payment/${purchaseData.transactionId}`, {
              method: 'POST',
            });
            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              // Create job alert subscription
              const alertResponse = await fetch('/api/ai-services/job-alerts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  keywords: searchParams.keywords || [],
                  location: searchParams.location || "",
                  industry: searchParams.industry || "",
                  jobType: searchParams.jobType || "",
                  experienceLevel: searchParams.experienceLevel || "",
                  frequency: "daily"
                }),
              });

              const alertData = await alertResponse.json();
              
              if (alertData.success) {
                toast({
                  title: "Job Alerts Activated!",
                  description: "You'll receive personalized job recommendations daily via email.",
                });
                setShowJobAlerts(false);
              }
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
          }
        }, 10000); // Check after 10 seconds

      } else {
        toast({
          title: "Payment Failed",
          description: purchaseData.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error subscribing to job alerts:', error);
      toast({
        title: "Subscription Error",
        description: "Failed to subscribe to job alerts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubscribing(false);
    }
  };

  const formatSalary = (min: number, max: number, currency: string) => {
    const formatNumber = (num: number) => {
      if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
      return num.toString();
    };
    return `${currency} ${formatNumber(min)} - ${formatNumber(max)}`;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Job Search</h1>
          <p className="text-muted-foreground">
            Find your dream job in South Africa. Get personalized job alerts for R100/month via MoMo.
          </p>
        </div>

      <Tabs defaultValue="search" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search">Search Jobs</TabsTrigger>
          <TabsTrigger value="alerts">Job Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          {/* Search Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label>Keywords</Label>
                  <div className="flex gap-2">
                    <Input
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      placeholder="e.g., React, Marketing"
                      onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                    />
                    <Button onClick={addKeyword} size="sm">Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {searchParams.keywords?.map((keyword) => (
                      <Badge key={keyword} variant="secondary" className="cursor-pointer" onClick={() => removeKeyword(keyword)}>
                        {keyword} ×
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Location</Label>
                  <Input
                    value={searchParams.location || ""}
                    onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                    placeholder="e.g., Cape Town"
                  />
                </div>

                <div>
                  <Label>Industry</Label>
                  <Select value={searchParams.industry || ""} onValueChange={(value) => setSearchParams({...searchParams, industry: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Industries</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Job Type</Label>
                  <Select value={searchParams.jobType || ""} onValueChange={(value) => setSearchParams({...searchParams, jobType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Experience Level</Label>
                  <Select value={searchParams.experienceLevel || ""} onValueChange={(value) => setSearchParams({...searchParams, experienceLevel: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Levels</SelectItem>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={searchJobs} disabled={loading} className="w-full md:w-auto">
                {loading ? "Searching..." : "Search Jobs"}
              </Button>
            </CardContent>
          </Card>

          {/* Job Results */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {jobs.length} Job{jobs.length !== 1 ? 's' : ''} Found
              </h2>
              <Dialog open={showJobAlerts} onOpenChange={setShowJobAlerts}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Get Job Alerts
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Personalized Job Alerts</DialogTitle>
                    <DialogDescription>
                      Get AI-curated job recommendations sent to your email daily for R100/month via MoMo.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-medium mb-2">What you get:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Daily personalized job recommendations</li>
                        <li>• AI-powered job matching based on your profile</li>
                        <li>• Salary range filtering</li>
                        <li>• Location and industry preferences</li>
                        <li>• 30-day subscription</li>
                      </ul>
                    </div>
                    <Button 
                      onClick={subscribeToJobAlerts} 
                      disabled={subscribing}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-600"
                    >
                      {subscribing ? (
                        "Processing Payment..."
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pay R100 with MoMo
                        </>
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-green-600 font-medium">
                        <DollarSign className="h-4 w-4" />
                        {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                      </div>
                      <Badge variant="secondary">{job.jobType}</Badge>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-2">{job.description}</p>

                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium">Skills: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {job.skills.slice(0, 4).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.skills.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Badge>{job.industry}</Badge>
                        <Badge variant="secondary">{job.experienceLevel}</Badge>
                      </div>
                      <Button asChild>
                        <a href={job.applicationUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Apply Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Job Alert Subscriptions
              </CardTitle>
              <CardDescription>
                Manage your personalized job alert subscriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No Active Job Alerts</h3>
                <p className="text-muted-foreground mb-4">
                  Subscribe to get personalized job recommendations delivered to your email.
                </p>
                <Button onClick={() => setShowJobAlerts(true)}>
                  Subscribe to Job Alerts
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </Layout>
  );
};

export default JobSearch;
