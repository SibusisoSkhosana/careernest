import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CareerPaths from "@/components/CareerPaths";
import SuccessStories from "@/components/SuccessStories";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <CareerPaths />
        <SuccessStories />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;