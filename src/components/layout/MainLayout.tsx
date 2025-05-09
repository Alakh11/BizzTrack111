import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { ThemeToggle } from "../ui/theme-toggle";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout = ({ children, className }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Check if user prefers dark mode or has previously selected it
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-[#0f172a] dark:text-white transition-colors duration-300">
      <Header
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="fixed top-16 bottom-0 left-0 h-[calc(100vh-4rem)] z-10">
          <Sidebar
            isCollapsed={!isSidebarOpen}
            setIsCollapsed={(collapsed) => setIsSidebarOpen(!collapsed)}
          />
        </div>
        <main
          className={`flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300 ${className} dark:bg-gradient-to-b dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#334155]`}
          style={{ marginLeft: isSidebarOpen ? "16rem" : "4rem" }}
        >
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>

      <Footer isSidebarOpen={isSidebarOpen} />
    </div>
  );
};

export default MainLayout;
