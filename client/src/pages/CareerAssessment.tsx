import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CareerAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What is your highest level of education?",
      options: [
        "Grade 10 or below",
        "Grade 12/Matric",
        "Certificate/Diploma",
        "Bachelor's Degree",
        "Postgraduate Degree"
      ]
    },
    {
      question: "Which subjects did you enjoy most in school?",
      options: [
        "Mathematics and Science",
        "Languages and Communication",
        "Business and Economics",
        "Arts and Creative subjects",
        "Life Sciences and Health"
      ]
    },
    {
      question: "What type of work environment appeals to you?",
      options: [
        "Office-based with computer work",
        "Healthcare or community settings",
        "Creative studios or flexible spaces",
        "Outdoor or field work",
        "Educational institutions"
      ]
    },
    {
      question: "How do you prefer to solve problems?",
      options: [
        "Using logic and analytical thinking",
        "Through collaboration and discussion",
        "Creative and innovative approaches",
        "Hands-on practical solutions",
        "Research and systematic methods"
      ]
    },
    {
      question: "What motivates you most at work?",
      options: [
        "High salary and financial security",
        "Helping others and making a difference",
        "Creative expression and innovation",
        "Leadership and career advancement",
        "Work-life balance and flexibility"
      ]
    },
    {
      question: "Which skills do you feel are your strongest?",
      options: [
        "Technical and computer skills",
        "Communication and people skills",
        "Creative and artistic abilities",
        "Organizational and planning skills",
        "Analytical and research skills"
      ]
    },
    {
      question: "How comfortable are you with technology?",
      options: [
        "Very comfortable - I love learning new tech",
        "Comfortable with basic computer use",
        "Somewhat comfortable but need training",
        "Not very comfortable but willing to learn",
        "Prefer non-tech focused roles"
      ]
    },
    {
      question: "What is most important in your ideal career?",
      options: [
        "Job security and stable income",
        "Making a positive impact on society",
        "Opportunities for creativity",
        "Fast career growth potential",
        "Good work-life balance"
      ]
    }
  ];

  const careerRecommendations = {
    "tech": {
      title: "Technology & Digital Careers",
      careers: [
        { name: "Software Developer", salary: "R250K-R650K", demand: "Critical" },
        { name: "Data Analyst", salary: "R280K-R580K", demand: "Very High" },
        { name: "Digital Marketing Specialist", salary: "R180K-R450K", demand: "High" }
      ],
      description: "Your analytical thinking and comfort with technology make you perfect for the growing tech sector."
    },
    "healthcare": {
      title: "Healthcare & Social Services",
      careers: [
        { name: "Registered Nurse", salary: "R180K-R420K", demand: "Critical" },
        { name: "Healthcare Administrator", salary: "R200K-R380K", demand: "High" },
        { name: "Community Health Worker", salary: "R120K-R250K", demand: "High" }
      ],
      description: "Your desire to help others and strong people skills align perfectly with healthcare careers."
    },
    "education": {
      title: "Education & Training",
      careers: [
        { name: "Primary School Teacher", salary: "R180K-R350K", demand: "High" },
        { name: "Corporate Trainer", salary: "R220K-R480K", demand: "Medium" },
        { name: "Skills Development Facilitator", salary: "R180K-R420K", demand: "Medium" }
      ],
      description: "Your communication skills and passion for helping others develop make education ideal for you."
    },
    "business": {
      title: "Business & Administration",
      careers: [
        { name: "Project Manager", salary: "R300K-R550K", demand: "High" },
        { name: "Human Resources Specialist", salary: "R220K-R380K", demand: "Medium" },
        { name: "Business Administrator", salary: "R180K-R320K", demand: "Medium" }
      ],
      description: "Your organizational skills and leadership potential make you suited for business roles."
    },
    "creative": {
      title: "Creative & Media",
      careers: [
        { name: "Graphic Designer", salary: "R150K-R350K", demand: "Medium" },
        { name: "Social Media Manager", salary: "R180K-R400K", demand: "High" },
        { name: "Content Creator", salary: "R120K-R450K", demand: "Medium" }
      ],
      description: "Your creative abilities and innovative thinking are perfect for creative industries."
    }
  };

  const getRecommendation = () => {
    // Simple scoring system based on answers
    const scores = {
      tech: 0,
      healthcare: 0,
      education: 0,
      business: 0,
      creative: 0
    };

    // Score based on education level
    if (answers[0] === "Bachelor's Degree" || answers[0] === "Postgraduate Degree") {
      scores.tech += 2;
      scores.business += 2;
    }

    // Score based on favorite subjects
    if (answers[1] === "Mathematics and Science") {
      scores.tech += 3;
    } else if (answers[1] === "Life Sciences and Health") {
      scores.healthcare += 3;
    } else if (answers[1] === "Languages and Communication") {
      scores.education += 2;
      scores.business += 1;
    } else if (answers[1] === "Arts and Creative subjects") {
      scores.creative += 3;
    } else if (answers[1] === "Business and Economics") {
      scores.business += 3;
    }

    // Score based on work environment
    if (answers[2] === "Office-based with computer work") {
      scores.tech += 2;
      scores.business += 2;
    } else if (answers[2] === "Healthcare or community settings") {
      scores.healthcare += 3;
    } else if (answers[2] === "Creative studios or flexible spaces") {
      scores.creative += 3;
    } else if (answers[2] === "Educational institutions") {
      scores.education += 3;
    }

    // Score based on problem solving
    if (answers[3] === "Using logic and analytical thinking") {
      scores.tech += 2;
    } else if (answers[3] === "Through collaboration and discussion") {
      scores.education += 2;
      scores.healthcare += 1;
    } else if (answers[3] === "Creative and innovative approaches") {
      scores.creative += 2;
    }

    // Score based on motivation
    if (answers[4] === "Helping others and making a difference") {
      scores.healthcare += 2;
      scores.education += 2;
    } else if (answers[4] === "Creative expression and innovation") {
      scores.creative += 2;
    } else if (answers[4] === "Leadership and career advancement") {
      scores.business += 2;
    }

    // Score based on skills
    if (answers[5] === "Technical and computer skills") {
      scores.tech += 3;
    } else if (answers[5] === "Communication and people skills") {
      scores.education += 2;
      scores.healthcare += 1;
    } else if (answers[5] === "Creative and artistic abilities") {
      scores.creative += 3;
    } else if (answers[5] === "Organizational and planning skills") {
      scores.business += 2;
    }

    // Score based on tech comfort
    if (answers[6] === "Very comfortable - I love learning new tech") {
      scores.tech += 3;
    } else if (answers[6] === "Prefer non-tech focused roles") {
      scores.healthcare += 1;
      scores.education += 1;
    }

    // Find the highest scoring category
    const maxScore = Math.max(...Object.values(scores));
    const recommendedField = Object.keys(scores).find(key => scores[key as keyof typeof scores] === maxScore) as keyof typeof careerRecommendations;
    
    return careerRecommendations[recommendedField];
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restartAssessment = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const recommendation = getRecommendation();
    
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-hero-gradient bg-clip-text text-transparent">
                  Your Career Recommendation
                </h1>
                <p className="text-xl text-muted-foreground">
                  Based on your assessment, here are the best career paths for you
                </p>
              </div>

              <Card className="bg-card-gradient border-border/50 mb-8">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-center text-primary">
                    {recommendation.title}
                  </CardTitle>
                  <CardDescription className="text-center text-lg">
                    {recommendation.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {recommendation.careers.map((career, index) => (
                      <Card key={index} className="bg-muted/30">
                        <CardHeader>
                          <CardTitle className="text-lg">{career.name}</CardTitle>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="text-success">
                              {career.salary}
                            </Badge>
                            <Badge variant="secondary">
                              {career.demand} Demand
                            </Badge>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Want to explore these careers further? Check out our Skills Development Hub and Mentorship Network!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={restartAssessment}
                    variant="outline"
                  >
                    Retake Assessment
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/skills-development'}
                    className="bg-hero-gradient hover:opacity-90"
                  >
                    Explore Skills Development
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-hero-gradient bg-clip-text text-transparent">
                Career Assessment
              </h1>
              <p className="text-xl text-muted-foreground">
                Discover your ideal career path in the South African job market
              </p>
            </div>

            <Card className="bg-card-gradient border-border/50">
              <CardHeader>
                <div className="flex justify-between items-center mb-4">
                  <CardTitle>Question {currentQuestion + 1} of {questions.length}</CardTitle>
                  <Badge variant="outline">{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</Badge>
                </div>
                <Progress value={((currentQuestion + 1) / questions.length) * 100} className="mb-4" />
                <CardDescription className="text-lg font-medium text-foreground">
                  {questions[currentQuestion].question}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers[currentQuestion] || ""}
                  onValueChange={handleAnswer}
                  className="space-y-4"
                >
                  {questions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={previousQuestion}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={nextQuestion}
                    disabled={!answers[currentQuestion]}
                    className="bg-hero-gradient hover:opacity-90"
                  >
                    {currentQuestion === questions.length - 1 ? "Get Results" : "Next"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CareerAssessment;