import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { 
  Target, 
  Plus, 
  X, 
  Lightbulb, 
  Heart, 
  Briefcase, 
  MapPin, 
  DollarSign,
  Users,
  Clock,
  ArrowRight,
  Sparkles
} from "lucide-react";

interface UserInterests {
  interests: string[];
  passions: string[];
  skills?: string[];
  experience?: string[];
  preferredIndustries?: string[];
  workEnvironmentPreferences?: {
    remote: boolean;
    office: boolean;
    hybrid: boolean;
    teamSize: 'small' | 'medium' | 'large';
    pace: 'fast' | 'moderate' | 'relaxed';
  };
  salaryExpectations?: string;
  locationPreferences?: string[];
}

interface CareerPathway {
  targetCareer: string;
  currentLevel: string;
  estimatedDuration: string;
  difficultyLevel: string;
  description: string;
  salaryRange: string;
  jobOutlook: string;
  steps: Array<{
    stepNumber: number;
    title: string;
    description: string;
    category: string;
    estimatedDuration: string;
    resources: string[];
    prerequisites: string[];
  }>;
}

const CareerPathwayGenerator = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPathways, setGeneratedPathways] = useState<CareerPathway[]>([]);
  
  const [formData, setFormData] = useState<UserInterests>({
    interests: [],
    passions: [],
    skills: [],
    experience: [],
    preferredIndustries: [],
    workEnvironmentPreferences: {
      remote: false,
      office: false,
      hybrid: false,
      teamSize: 'medium',
      pace: 'moderate',
    },
    salaryExpectations: '',
    locationPreferences: [],
  });

  const [currentInput, setCurrentInput] = useState('');

  const addToArray = (field: keyof UserInterests, value: string) => {
    if (value.trim() && Array.isArray(formData[field])) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()]
      }));
      setCurrentInput('');
    }
  };

  const removeFromArray = (field: keyof UserInterests, index: number) => {
    if (Array.isArray(formData[field])) {
      setFormData(prev => ({
        ...prev,
        [field]: (prev[field] as string[]).filter((_, i) => i !== index)
      }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, field: keyof UserInterests) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addToArray(field, currentInput);
    }
  };

  const generatePathways = async () => {
    if (formData.interests.length === 0 || formData.passions.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please add at least one interest and one passion.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/career/generate-pathways', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate pathways');
      }

      const data = await response.json();
      setGeneratedPathways(data.pathways);
      setCurrentStep(3);
      
      toast({
        title: "Pathways Generated!",
        description: `Found ${data.count} personalized career pathways for you.`,
      });
    } catch (error) {
      console.error('Error generating pathways:', error);
      toast({
        title: "Error",
        description: "Failed to generate career pathways. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const savePathway = async (pathway: CareerPathway) => {
    try {
      const response = await fetch('/api/career/save-pathway', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pathway }),
      });

      if (!response.ok) {
        throw new Error('Failed to save pathway');
      }

      toast({
        title: "Pathway Saved!",
        description: "Your career pathway has been saved to your dashboard.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving pathway:', error);
      toast({
        title: "Error",
        description: "Failed to save pathway. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderStep1 = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lightbulb className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl">What Are Your Interests?</CardTitle>
        <CardDescription>
          Tell us what topics, activities, or fields genuinely interest you. Think about what you enjoy learning about or doing in your free time.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="interests">Your Interests</Label>
          <div className="flex gap-2 mt-2">
            <Input
              id="interests"
              placeholder="e.g., Technology, Art, Sports, Science..."
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'interests')}
            />
            <Button 
              type="button" 
              onClick={() => addToArray('interests', currentInput)}
              size="sm"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.interests.map((interest, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {interest}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeFromArray('interests', index)}
                />
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <div></div>
          <Button 
            onClick={() => setCurrentStep(2)}
            disabled={formData.interests.length === 0}
          >
            Next: Passions <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl">What Are Your Passions?</CardTitle>
        <CardDescription>
          What drives you? What activities make you lose track of time? What causes or purposes do you care deeply about?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="passions">Your Passions</Label>
          <div className="flex gap-2 mt-2">
            <Input
              id="passions"
              placeholder="e.g., Helping others, Creating things, Solving problems..."
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'passions')}
            />
            <Button 
              type="button" 
              onClick={() => addToArray('passions', currentInput)}
              size="sm"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.passions.map((passion, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {passion}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeFromArray('passions', index)}
                />
              </Badge>
            ))}
          </div>
        </div>

        {/* Optional additional fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="skills">Current Skills (Optional)</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="skills"
                placeholder="e.g., Communication, Excel, Design..."
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'skills')}
              />
              <Button 
                type="button" 
                onClick={() => addToArray('skills', currentInput)}
                size="sm"
                variant="outline"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {formData.skills?.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs flex items-center gap-1">
                  {skill}
                  <X 
                    className="h-2 w-2 cursor-pointer" 
                    onClick={() => removeFromArray('skills', index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="experience">Experience Areas (Optional)</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="experience"
                placeholder="e.g., Customer service, Teaching..."
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'experience')}
              />
              <Button 
                type="button" 
                onClick={() => addToArray('experience', currentInput)}
                size="sm"
                variant="outline"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {formData.experience?.map((exp, index) => (
                <Badge key={index} variant="outline" className="text-xs flex items-center gap-1">
                  {exp}
                  <X 
                    className="h-2 w-2 cursor-pointer" 
                    onClick={() => removeFromArray('experience', index)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(1)}>
            Back
          </Button>
          <Button 
            onClick={generatePathways}
            disabled={formData.passions.length === 0 || isLoading}
          >
            {isLoading ? (
              <>Generating... <Sparkles className="h-4 w-4 ml-2 animate-spin" /></>
            ) : (
              <>Generate My Pathways <Sparkles className="h-4 w-4 ml-2" /></>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Your Personalized Career Pathways</h2>
        <p className="text-muted-foreground">
          Based on your interests and passions, here are {generatedPathways.length} career paths tailored for you.
        </p>
      </div>

      <div className="grid gap-6">
        {generatedPathways.map((pathway, index) => (
          <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{pathway.targetCareer}</CardTitle>
                  <CardDescription className="mt-2">{pathway.description}</CardDescription>
                </div>
                <Badge variant={
                  pathway.difficultyLevel === 'easy' ? 'default' :
                  pathway.difficultyLevel === 'moderate' ? 'secondary' : 'destructive'
                }>
                  {pathway.difficultyLevel}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{pathway.estimatedDuration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{pathway.salaryRange}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{pathway.jobOutlook}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Pathway Steps ({pathway.steps.length} steps):</h4>
                <div className="space-y-2">
                  {pathway.steps.slice(0, 3).map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                        {step.stepNumber}
                      </div>
                      <div>
                        <h5 className="font-medium text-sm">{step.title}</h5>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                        <Badge variant="outline" className="text-xs mt-1">{step.estimatedDuration}</Badge>
                      </div>
                    </div>
                  ))}
                  {pathway.steps.length > 3 && (
                    <p className="text-sm text-muted-foreground text-center">
                      +{pathway.steps.length - 3} more steps...
                    </p>
                  )}
                </div>
              </div>

              <Button 
                onClick={() => savePathway(pathway)}
                className="w-full"
              >
                Choose This Pathway
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" onClick={() => setCurrentStep(1)}>
          Start Over
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    currentStep > step ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </main>
      <Footer />
    </div>
  );
};

export default CareerPathwayGenerator;
