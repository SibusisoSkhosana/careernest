import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  BookOpen,
  Award,
  Users,
  Briefcase
} from "lucide-react";

interface PathwayStep {
  id: number;
  stepNumber: number;
  title: string;
  description: string;
  category: string;
  estimatedDuration: string;
  resources: string[];
  prerequisites: string[];
  isCompleted: boolean;
  completedAt?: string;
}

interface CareerPathway {
  id: number;
  targetCareer: string;
  currentLevel: string;
  estimatedDuration: string;
  difficultyLevel: string;
  pathway: string; // JSON string
  status: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

const CareerPathwayProgress = () => {
  const [pathways, setPathways] = useState<CareerPathway[]>([]);
  const [selectedPathway, setSelectedPathway] = useState<CareerPathway | null>(null);
  const [pathwaySteps, setPathwaySteps] = useState<PathwayStep[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserPathways();
  }, []);

  const fetchUserPathways = async () => {
    try {
      const response = await fetch('/api/career/my-pathways');
      if (response.ok) {
        const data = await response.json();
        setPathways(data.pathways);
        if (data.pathways.length > 0) {
          setSelectedPathway(data.pathways[0]);
          fetchPathwaySteps(data.pathways[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching pathways:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPathwaySteps = async (pathwayId: number) => {
    try {
      const response = await fetch(`/api/career/pathway/${pathwayId}/steps`);
      if (response.ok) {
        const data = await response.json();
        setPathwaySteps(data.steps);
      }
    } catch (error) {
      console.error('Error fetching pathway steps:', error);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'education':
        return BookOpen;
      case 'certification':
        return Award;
      case 'networking':
        return Users;
      case 'experience':
        return Briefcase;
      default:
        return Target;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'education':
        return 'bg-blue-100 text-blue-800';
      case 'certification':
        return 'bg-green-100 text-green-800';
      case 'networking':
        return 'bg-purple-100 text-purple-800';
      case 'experience':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Career Pathway Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (pathways.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Career Pathway Progress</CardTitle>
          <CardDescription>
            Start your personalized career journey
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Career Pathways Yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first personalized career pathway to get started on your journey.
          </p>
          <Button asChild>
            <a href="/career-pathway">
              Generate My Pathway <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pathway Overview */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {selectedPathway?.targetCareer}
              </CardTitle>
              <CardDescription>
                {selectedPathway?.currentLevel} level • {selectedPathway?.estimatedDuration}
              </CardDescription>
            </div>
            <Badge variant={
              selectedPathway?.difficultyLevel === 'easy' ? 'default' :
              selectedPathway?.difficultyLevel === 'moderate' ? 'secondary' : 'destructive'
            }>
              {selectedPathway?.difficultyLevel}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>{selectedPathway?.progress || 0}%</span>
              </div>
              <Progress value={selectedPathway?.progress || 0} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Started {new Date(selectedPathway?.createdAt || '').toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                <span>{pathwaySteps.filter(s => s.isCompleted).length} of {pathwaySteps.length} steps completed</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
          <CardDescription>
            Focus on these upcoming milestones in your career journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pathwaySteps
              .filter(step => !step.isCompleted)
              .slice(0, 3)
              .map((step) => {
                const IconComponent = getCategoryIcon(step.category);
                return (
                  <div key={step.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {step.stepNumber}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{step.title}</h4>
                        <Badge variant="outline" className={`text-xs ${getCategoryColor(step.category)}`}>
                          <IconComponent className="h-3 w-3 mr-1" />
                          {step.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {step.estimatedDuration}
                        </span>
                        <span>{step.resources.length} resources available</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Start Step
                    </Button>
                  </div>
                );
              })}
          </div>
          
          {pathwaySteps.filter(s => !s.isCompleted).length === 0 && (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Pathway Completed!</h3>
              <p className="text-muted-foreground">
                Congratulations! You've completed all steps in your career pathway.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Multiple Pathways Selector */}
      {pathways.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Career Pathways</CardTitle>
            <CardDescription>
              Switch between your different career goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {pathways.map((pathway) => (
                <div
                  key={pathway.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedPathway?.id === pathway.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => {
                    setSelectedPathway(pathway);
                    fetchPathwaySteps(pathway.id);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{pathway.targetCareer}</h4>
                      <p className="text-sm text-muted-foreground">
                        {pathway.progress}% complete • {pathway.currentLevel} level
                      </p>
                    </div>
                    <Badge variant="outline">{pathway.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CareerPathwayProgress;
