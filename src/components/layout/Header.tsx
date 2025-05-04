
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu } from "lucide-react";
import { useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Sidebar from "./Sidebar";

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header = ({ onToggleSidebar, isSidebarOpen }: HeaderProps) => {
  const isMobile = useIsMobile();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <>
      <header className="border-b bg-background sticky top-0 z-30">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="mr-4">
            {!isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleSidebar}
                aria-label="Toggle sidebar"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileSidebar}
                aria-label="Open mobile sidebar"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">Invoicify</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button size="sm" className="hidden md:flex">
              Upgrade
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile sidebar */}
      {isMobile && isMobileSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm">
          <div
            ref={sidebarRef}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-background shadow-lg animate-in slide-in-from-left duration-300"
          >
            <Sidebar isOpen={true} />
          </div>
          <div
            className="fixed inset-0 z-40"
            onClick={toggleMobileSidebar}
            aria-hidden="true"
          ></div>
        </div>
      )}
    </>
  );
};

export default Header;
