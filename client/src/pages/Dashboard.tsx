import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import CareerPathwayProgress from "@/components/CareerPathwayProgress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Target,
  BookOpen,
  Users,
  Search,
  FileText,
  Mail,
  MessageSquare,
  Trophy,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
  Sparkles
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const { t, getWelcome, formatPrice } = useTranslation();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Take Career Assessment",
      description: "Discover your ideal career path",
      icon: Target,
      action: "Start Assessment",
      path: "/career-assessment",
      color: "from-blue-500 to-blue-600",
      popular: true
    },
    {
      title: "Create Your CV",
      description: "Build a professional CV that stands out",
      icon: FileText,
      action: "Create CV",
      path: "/cv-generator",
      color: "from-green-500 to-green-600",
      new: true
    },
    {
      title: "Write Cover Letter",
      description: "Generate compelling cover letters",
      icon: Mail,
      action: "Write Letter",
      path: "/cover-letter",
      color: "from-purple-500 to-purple-600",
      new: true
    },
    {
      title: "Find Jobs",
      description: "Discover opportunities that match your skills",
      icon: Search,
      action: "Browse Jobs",
      path: "/job-search",
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "AI Services",
      description: "CV generation, cover letters & job alerts with MoMo",
      icon: Sparkles,
      action: "Explore AI",
      path: "/ai-services",
      color: "from-cyan-500 to-blue-600",
      new: true
    }
  ];

  const allFeatures = [
    {
      title: "Personal Career Assessment",
      description: "Discover your strengths, interests, and ideal career matches through our comprehensive assessment tools.",
      icon: Target,
      badge: "Popular",
      path: "/career-assessment"
    },
    {
      title: "Career Pathway Generator",
      description: "Get a personalized step-by-step roadmap to reach your dream career based on your interests and passions.",
      icon: TrendingUp,
      badge: "Personalized",
      path: "/career-pathway"
    },
    {
      title: "Skill Development Hub",
      description: "Access curated learning resources, online courses, and workshops to build in-demand skills.",
      icon: BookOpen,
      badge: "Free",
      path: "/skills-development"
    },
    {
      title: "Mentorship Network",
      description: "Connect with successful professionals who can guide your career journey.",
      icon: Users,
      badge: "Premium",
      path: "/mentorship"
    },
    {
      title: "Professional CV Generator",
      description: "Create stunning CVs that stand out to employers using our professional templates.",
      icon: FileText,
      badge: "New",
      path: "/cv-generator"
    },
    {
      title: "Cover Letter Generator",
      description: "Write compelling cover letters that get you noticed with smart templates.",
      icon: Mail,
      badge: "New",
      path: "/cover-letter"
    },
    {
      title: "Job Opportunity Matching",
      description: "Find positions that align with your skills, values, and career goals.",
      icon: Search,
      badge: "AI-Powered",
      path: "/job-matching"
    },
    {
      title: "Community Support",
      description: "Join a supportive community of like-minded individuals on similar journeys.",
      icon: MessageSquare,
      badge: "24/7",
      path: "/communities"
    },
    {
      title: "Success Stories",
      description: "Get inspired by real stories from people who've transformed their careers and lives.",
      icon: Trophy,
      badge: "Inspiring",
      path: "/success-stories"
    }
  ];

  const recentActivity = [
    { action: "Completed profile setup", time: "2 hours ago", status: "completed" },
    { action: "Started career assessment", time: "1 day ago", status: "pending" },
    { action: "Joined CareerNest community", time: "2 days ago", status: "completed" }
  ];

  const recommendations = [
    {
      title: "Complete Your Career Assessment",
      description: "Get personalized career recommendations based on your interests and skills.",
      action: "Start Now",
      path: "/career-assessment"
    },
    {
      title: "Update Your Profile",
      description: "A complete profile helps us provide better job recommendations.",
      action: "Update Profile",
      path: "/profile"
    },
    {
      title: "Create Your First CV",
      description: "Build a professional CV to start applying for opportunities.",
      action: "Create CV",
      path: "/cv-generator"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
                    {user?.name ? getWelcome(user.name) : t('welcome')} 👋
                  </h1>
                  <p className="text-slate-600 text-lg">
                    Ready to take the next step in your career journey?
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-800">85%</div>
                    <div className="text-sm text-slate-600">Profile Complete</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Quick Actions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Card 
                  key={index} 
                  className="relative cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50 group"
                  onClick={() => navigate(action.path)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${action.color} text-white`}>
                        <action.icon className="h-6 w-6" />
                      </div>
                      {action.popular && <Badge variant="default">Popular</Badge>}
                      {action.new && <Badge className="bg-green-100 text-green-700">New</Badge>}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {action.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {action.description}
                    </CardDescription>
                    <Button size="sm" variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {action.action}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Features */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 text-foreground">All Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {allFeatures.map((feature, index) => (
                  <Card 
                    key={index} 
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50 group"
                    onClick={() => navigate(feature.path)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <feature.icon className="h-8 w-8 text-slate-600" />
                        <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                          {feature.badge}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
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

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold text-sm">{rec.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{rec.description}</p>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => navigate(rec.path)}
                        className="text-xs"
                      >
                        {rec.action}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      {activity.status === 'completed' && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Career Pathway Progress */}
              <CareerPathwayProgress />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Dashboard;