
import React from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Bell, Menu, Receipt } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header = ({ toggleSidebar, isSidebarOpen }: HeaderProps) => {
  const { user, signOut } = useAuth();

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 lg:px-6">
        <div className="flex items-center gap-2 lg:gap-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="flex items-center">
            <span className="h-8 w-8 rounded-md bg-primary flex items-center justify-center mr-2">
              <Receipt size={18} className="text-white" />
            </span>
            <span className="text-lg font-semibold tracking-tight">
              BizzTrack
            </span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          {user && (
            <Button
              variant="ghost"
              className="text-xs"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
