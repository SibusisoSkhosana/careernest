import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ChatBot from "./ChatBot";

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showChatBot?: boolean;
}

const Layout = ({ 
  children, 
  showHeader = true, 
  showFooter = true, 
  showChatBot = true 
}: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {showHeader && <Header />}
      <main className={showHeader ? "pt-20" : ""}>
        {children}
      </main>
      {showFooter && <Footer />}
      {showChatBot && <ChatBot />}
    </div>
  );
};

export default Layout;
