
import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout = ({ children, className }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen flex-col">
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        <div className="fixed top-16 bottom-0 left-0 h-[calc(100vh-4rem)] z-10">
          <Sidebar isCollapsed={!isSidebarOpen} setIsCollapsed={(collapsed) => setIsSidebarOpen(!collapsed)} />
        </div>
        <main
          className={`flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300 ${className}`}
          style={{ marginLeft: isSidebarOpen ? '16rem' : '4rem' }}
        >
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>

      <Footer isSidebarOpen={isSidebarOpen} />
    </div>
  );
};

export default MainLayout;
