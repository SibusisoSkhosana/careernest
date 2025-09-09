import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Successful_diverse_professionals_background_cb6dc2ad.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Professional career growth"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-slate-700/80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Build Your 
          <span className="block bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
            Career Journey
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
          Discover your potential, explore career paths, and connect with opportunities designed to transform your future.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#careers">
            <Button 
            size="lg"
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-elegant"
            
          >
            Start Your Journey
          </Button>
          </a>
          
        </div>
        
        <div className="mt-12 flex justify-center items-center space-x-8 text-white/80">
          <div className="text-center">
            <div className="text-2xl font-bold">10K+</div>
            <div className="text-sm">People Empowered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">500+</div>
            <div className="text-sm">Career Paths</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">95%</div>
            <div className="text-sm">Success Rate</div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
