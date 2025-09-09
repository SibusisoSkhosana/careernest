import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm here to help you with your career questions. Ask me about career paths, skills development, or how to get started in different fields!",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const careerResponses = {
    "tech": "Technology offers great opportunities in SA! Consider starting with coding bootcamps, online courses, or exploring roles like web development, data analysis, or IT support. Many companies like Capitec, Discovery, and MTN are hiring. What specific tech area interests you?",
    "business": "Business careers are diverse in SA! You could explore marketing, project management, entrepreneurship, or consulting. Companies like Shoprite, Woolworths, and Pick n Pay offer growth opportunities. What aspect of business excites you most?",
    "healthcare": "Healthcare is incredibly rewarding and in high demand in SA! Consider nursing, healthcare administration, community health work, or therapy. Both public and private sectors offer opportunities. Are you interested in direct patient care or administration?",
    "education": "Education is vital in SA! Teaching, corporate training, or educational program development offer great impact. Consider specializing in early childhood, primary, or adult education. What age group or subject interests you?",
    "creative": "Creative fields are growing in SA! Graphic design, content creation, digital marketing, or media production offer exciting opportunities. Cape Town and Joburg have thriving creative scenes. What type of creative work inspires you?",
    "skills": "Focus on both hard and soft skills! Communication, problem-solving, and adaptability are universally valuable. Consider online courses, SETA programs, or skills development initiatives. What skills would you like to develop?",
    "start": "Starting your career journey in SA is exciting! First, identify your interests and strengths. Research different fields, network with professionals, and consider learnerships or internships. What's your educational background?",
    "salary": "Salaries in SA vary by field and experience. Entry-level positions typically start from R8,000-R15,000, while skilled professionals can earn R25,000-R50,000+ monthly. Location and industry make a big difference. What field are you considering?",
    "default": "That's a great question! Career paths in SA are diverse and growing. Consider your interests, skills, and the job market in your area. I'd recommend taking our career assessment to get personalized recommendations. What specific aspect interests you?"
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("tech") || message.includes("coding") || message.includes("programming") || message.includes("it")) {
      return careerResponses.tech;
    } else if (message.includes("business") || message.includes("marketing") || message.includes("management")) {
      return careerResponses.business;
    } else if (message.includes("health") || message.includes("medical") || message.includes("nurse")) {
      return careerResponses.healthcare;
    } else if (message.includes("teach") || message.includes("education") || message.includes("school")) {
      return careerResponses.education;
    } else if (message.includes("creative") || message.includes("design") || message.includes("art") || message.includes("writing")) {
      return careerResponses.creative;
    } else if (message.includes("skill") || message.includes("learn") || message.includes("develop")) {
      return careerResponses.skills;
    } else if (message.includes("start") || message.includes("begin") || message.includes("how")) {
      return careerResponses.start;
    } else if (message.includes("salary") || message.includes("money") || message.includes("pay") || message.includes("earn")) {
      return careerResponses.salary;
    } else {
      return careerResponses.default;
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className="h-14 w-14 rounded-full bg-gradient-to-r from-slate-600 to-slate-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0">
            <div className="flex flex-col h-full">
              <SheetHeader className="p-6 border-b bg-gradient-to-r from-slate-50 to-slate-100">
                <SheetTitle className="flex items-center gap-2 text-slate-800">
                  <Bot className="h-5 w-5" />
                  CareerNest AI Assistant
                </SheetTitle>
              </SheetHeader>

              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.isBot ? "justify-start" : "justify-end"
                      }`}
                    >
                      {message.isBot && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-600 to-slate-800 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.isBot
                            ? "bg-muted text-muted-foreground"
                            : "bg-gradient-to-r from-slate-600 to-slate-800 text-white"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                      {!message.isBot && (
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-secondary-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t bg-background">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask me about your career..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    size="icon"
                    className="bg-gradient-to-r from-slate-600 to-slate-800 hover:opacity-90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default ChatBot;