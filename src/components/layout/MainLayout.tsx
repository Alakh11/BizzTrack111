
import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useIsMobile } from "@/hooks/use-mobile";
import Footer from "./Footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex">
        {!isMobile && isSidebarOpen && <Sidebar onToggle={toggleSidebar} />}
        <div className="flex-1 flex flex-col">
          <Header onToggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
          <main className="flex-1 p-4 md:p-6 bg-gray-50">
            <div className="container mx-auto">{children}</div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
