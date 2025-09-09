import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Star, MapPin } from "lucide-react";

interface AssessmentQuestion {
  id: number;
  question: string;
  options: string[];
  category: "education" | "skills" | "interests" | "work-style";
}

interface CareerMatch {
  title: string;
  match: number;
  description: string;
  salary: string;
  education: string;
  skills: string[];
  locations: string[];
}

const CareerAssessment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const questions: AssessmentQuestion[] = [
    {
      id: 1,
      question: "What is your highest level of education?",
      options: ["Matric/Grade 12", "Certificate/Diploma", "Bachelor's Degree", "Honours/Postgraduate"],
      category: "education"
    },
    {
      id: 2,
      question: "Which field best describes your educational background?",
      options: ["Science/Mathematics", "Business/Commerce", "Arts/Humanities", "Technical/Vocational", "No formal education"],
      category: "education"
    },
    {
      id: 3,
      question: "Which skills do you feel most confident about?",
      options: ["Problem-solving & Analysis", "Communication & People Skills", "Creative & Design", "Technical & Digital"],
      category: "skills"
    },
    {
      id: 4,
      question: "What type of work environment appeals to you most?",
      options: ["Office/Corporate", "Healthcare/Community", "Creative Studio/Remote", "Hands-on/Practical"],
      category: "work-style"
    },
    {
      id: 5,
      question: "What motivates you most in a career?",
      options: ["Helping others and making a difference", "Innovation and problem-solving", "Financial growth and stability", "Creative expression and flexibility"],
      category: "interests"
    },
    {
      id: 6,
      question: "How comfortable are you with technology?",
      options: ["Very comfortable - I love learning new tech", "Somewhat comfortable - I can adapt", "Basic level - I use what I need to", "Not comfortable - I prefer non-tech roles"],
      category: "skills"
    },
    {
      id: 7,
      question: "What work schedule would suit you best?",
      options: ["Traditional 9-5 weekdays", "Flexible hours/remote work", "Shift work (including evenings/weekends)", "Project-based/freelance"],
      category: "work-style"
    },
    {
      id: 8,
      question: "Which of these activities do you enjoy most?",
      options: ["Teaching or training others", "Analyzing data and solving problems", "Creating or designing things", "Managing projects and teams"],
      category: "interests"
    }
  ];

  const careerMatches: Record<string, CareerMatch> = {
    "healthcare-education": {
      title: "Healthcare Professional",
      match: 92,
      description: "Nursing, healthcare administration, or community health worker roles in SA's growing healthcare sector.",
      salary: "R180,000 - R450,000",
      education: "Certificate to Degree level",
      skills: ["Patient care", "Communication", "Problem-solving"],
      locations: ["Cape Town", "Johannesburg", "Durban", "Pretoria"]
    },
    "tech-analyst": {
      title: "Data Analyst / IT Specialist",
      match: 88,
      description: "Growing tech sector in SA needs skilled analysts and IT professionals for banks, telecoms, and startups.",
      salary: "R250,000 - R650,000",
      education: "Certificate to Degree",
      skills: ["Data analysis", "Technology", "Problem-solving"],
      locations: ["Cape Town", "Johannesburg", "Stellenbosch"]
    },
    "business-manager": {
      title: "Business Manager / Coordinator",
      match: 85,
      description: "Management roles in retail, banking, or corporate sectors with growth opportunities.",
      salary: "R200,000 - R550,000",
      education: "Diploma to Degree",
      skills: ["Leadership", "Communication", "Project management"],
      locations: ["Major cities nationwide"]
    },
    "education-trainer": {
      title: "Education / Training Specialist",
      match: 90,
      description: "Teaching, corporate training, or educational program development in SA's education sector.",
      salary: "R150,000 - R400,000",
      education: "Diploma to Degree",
      skills: ["Teaching", "Communication", "Curriculum development"],
      locations: ["All provinces"]
    },
    "creative-digital": {
      title: "Digital Marketing / Creative",
      match: 83,
      description: "Growing digital economy needs creative professionals for marketing, design, and content creation.",
      salary: "R180,000 - R480,000",
      education: "Certificate to Degree",
      skills: ["Creativity", "Digital marketing", "Design"],
      locations: ["Cape Town", "Johannesburg", "Durban"]
    },
    "admin-support": {
      title: "Administrative / Support Professional",
      match: 78,
      description: "Essential support roles in government, corporate, and non-profit sectors.",
      salary: "R120,000 - R320,000",
      education: "Matric to Diploma",
      skills: ["Organization", "Communication", "Computer literacy"],
      locations: ["All major towns and cities"]
    }
  };

  const calculateCareerMatch = (): CareerMatch => {
    const education = answers[1] || "";
    const field = answers[2] || "";
    const skills = answers[3] || "";
    const environment = answers[4] || "";
    const motivation = answers[5] || "";
    const techComfort = answers[6] || "";

    // Healthcare path
    if (motivation.includes("Helping others") && (environment.includes("Healthcare") || skills.includes("People Skills"))) {
      return careerMatches["healthcare-education"];
    }
    
    // Tech path
    if (techComfort.includes("Very comfortable") && (skills.includes("Problem-solving") || field.includes("Science"))) {
      return careerMatches["tech-analyst"];
    }
    
    // Education path
    if (motivation.includes("Helping others") && answers[8]?.includes("Teaching")) {
      return careerMatches["education-trainer"];
    }
    
    // Business path
    if (environment.includes("Office") && (skills.includes("Problem-solving") || field.includes("Business"))) {
      return careerMatches["business-manager"];
    }
    
    // Creative path
    if (motivation.includes("Creative expression") || skills.includes("Creative")) {
      return careerMatches["creative-digital"];
    }
    
    // Default administrative path
    return careerMatches["admin-support"];
  };

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [questions[currentStep].id]: answer }));
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const resetAssessment = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsComplete(false);
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];
  const topMatch = calculateCareerMatch();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-hero-gradient hover:opacity-90 transition-opacity text-lg px-8 py-6">
          Take Career Assessment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {isComplete ? "Your Career Match Results" : "Career Assessment Survey"}
          </DialogTitle>
        </DialogHeader>

        {!isComplete ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Question {currentStep + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto py-4 px-6 hover:bg-primary/10 hover:border-primary"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="bg-gradient-primary/10 border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-primary flex items-center gap-2">
                    <Star className="h-6 w-6" />
                    Top Career Match
                  </CardTitle>
                  <Badge className="bg-primary text-white text-lg px-3 py-1">
                    {topMatch.match}% Match
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-3xl font-bold text-foreground">{topMatch.title}</h3>
                <p className="text-lg text-muted-foreground">{topMatch.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary">Expected Salary (South Africa)</h4>
                    <p className="text-xl font-bold text-success">{topMatch.salary}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary">Education Required</h4>
                    <p className="text-foreground">{topMatch.education}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Key Skills Needed</h4>
                  <div className="flex flex-wrap gap-2">
                    {topMatch.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-primary flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    Job Locations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {topMatch.locations.map((location, index) => (
                      <Badge key={index} variant="outline">{location}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-success">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">Assessment Complete!</span>
              </div>
              
              <div className="flex gap-4 justify-center">
                <Button onClick={resetAssessment} variant="outline">
                  Retake Assessment
                </Button>
                <Button className="bg-hero-gradient">
                  Explore Learning Paths
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CareerAssessment;