import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Star, Users, Target, TrendingUp } from "lucide-react";
import heroImage from "@assets/generated_images/Successful_diverse_professionals_background_cb6dc2ad.png";
import Auth from "@/components/Auth";

const Landing = () => {
  const [showAuth, setShowAuth] = useState(false);

  const handleAuthSuccess = () => {
    setShowAuth(false);
    window.location.reload();
  };

  const features = [
    {
      icon: Target,
      title: "Career Assessment",
      description: "Discover your strengths and ideal career paths through comprehensive assessment tools.",
      highlight: "AI-Powered"
    },
    {
      icon: Users,
      title: "CV & Cover Letter Generator",
      description: "Create professional documents that stand out to employers with our smart templates.",
      highlight: "Professional"
    },
    {
      icon: TrendingUp,
      title: "Job Matching & Mentorship",
      description: "Get matched with opportunities and connect with industry professionals for guidance.",
      highlight: "Personalized"
    }
  ];

  const benefits = [
    "Comprehensive career assessment and guidance",
    "Professional CV and cover letter generation",
    "Industry-specific job matching",
    "One-on-one mentorship connections",
    "Skills development resources",
    "24/7 AI career assistant"
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Marketing Manager",
      content: "CareerNest helped me transition from retail to marketing. The CV generator and mentorship program were game-changers!",
      rating: 5
    },
    {
      name: "David L.",
      role: "Software Developer",
      content: "The career assessment opened my eyes to opportunities I never considered. Now I'm thriving in tech!",
      rating: 5
    },
    {
      name: "Nomsa K.",
      role: "Project Manager",
      content: "From unemployed to project manager in 6 months. The job matching feature connected me with my dream job.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">
              CareerNest
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">
              Success Stories
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setShowAuth(true)}>
              Sign In
            </Button>
            <Button 
              className="bg-gradient-to-r from-slate-600 to-slate-800 hover:opacity-90 transition-opacity"
              onClick={() => setShowAuth(true)}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🚀 Transform Your Career Today
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                Discover Your
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Dream Career
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Join thousands of professionals who've transformed their careers with CareerNest. 
                Get personalized guidance, professional tools, and connect with opportunities that match your potential.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-slate-600 to-slate-800 hover:opacity-90 transition-opacity text-lg px-8 py-6"
                  onClick={() => setShowAuth(true)}
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>
              
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold">10,000+</div>
                  <div className="text-gray-300">Careers Transformed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">95%</div>
                  <div className="text-gray-300">Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-gray-300">AI Support</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
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

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <Card key={index} className="relative border-border/50 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <feature.icon className="h-12 w-12 text-slate-600" />
                      <Badge variant="secondary">{feature.highlight}</Badge>
                    </div>
                    <CardTitle className="text-xl font-semibold">
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

            <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-6 text-slate-800">
                    Why Choose CareerNest?
                  </h3>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-slate-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-xl p-8 shadow-lg">
                    <div className="text-4xl font-bold text-slate-800 mb-2">Free</div>
                    <div className="text-slate-600 mb-6">to get started</div>
                    <Button
                      className="w-full bg-gradient-to-r from-slate-600 to-slate-800 hover:opacity-90"
                      onClick={() => setShowAuth(true)}
                    >
                      Create Free Account
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">
                Success Stories
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Hear from professionals who've transformed their careers with CareerNest
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-border/50">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-slate-600 to-slate-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
              Join thousands of professionals who've discovered their dream careers with CareerNest. 
              Start your journey today - it's completely free!
            </p>
            <Button
              size="lg"
              className="bg-white text-slate-800 hover:bg-gray-100 text-lg px-8 py-6"
              onClick={() => setShowAuth(true)}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">
              CareerNest
            </span>
          </div>
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 CareerNest. All rights reserved. Empowering careers across South Africa.</p>
          </div>
        </div>
      </footer>

      {showAuth && (
        <Auth 
          onClose={() => setShowAuth(false)} 
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
};

export default Landing;