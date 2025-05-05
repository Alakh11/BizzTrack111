
import {
  Home,
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  Coins,
  BarChart,
  Package,
  LogOut,
  LogIn,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const { user, signOut } = useAuth();

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
    },
    {
      title: "Invoices",
      icon: FileText,
      href: "/invoices",
    },
    {
      title: "Expenses",
      icon: Coins,
      href: "/expenses",
    },
    {
      title: "Reports",
      icon: BarChart,
      href: "/reports",
    },
    {
      title: "Clients",
      icon: Users,
      href: "/clients",
    },
    {
      title: "Products",
      icon: Package,
      href: "/products",
    },
    {
      title: "Services",
      icon: Package,
      href: "/services",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <div
      className={`fixed left-0 top-0 z-50 flex h-full flex-col transition-all duration-300 ease-in-out dark:bg-neutral-900 bg-white border-r dark:border-neutral-700 shadow-md ${
        isOpen ? "w-64 translate-x-0" : "w-[70px] translate-x-0"
      } md:translate-x-0`}
    >
      <div className="flex justify-between items-center px-4 py-6">
        <NavLink to="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-primary" />
          {isOpen && (
            <span
              className="text-xl font-bold dark:text-white bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent transition-opacity duration-300"
            >
              BizzTrack
            </span>
          )}
        </NavLink>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto hidden md:flex"
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>
      <nav className="flex-grow px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-700">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-800 transition-colors ${
                    isActive
                      ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground font-medium border-l-2 border-primary"
                      : ""
                  }`
                }
                onClick={closeSidebar}
                title={item.title}
              >
                <item.icon className={cn("h-5 w-5", isOpen ? "" : "mx-auto")} />
                {isOpen && <span>{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* User profile section at bottom */}
      <div className="mt-auto border-t dark:border-neutral-700 p-4">
        {user ? (
          <div className={`flex ${isOpen ? "items-center justify-between" : "flex-col items-center"} gap-2`}>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/20 text-primary">
                  {user.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              {isOpen && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium truncate max-w-[120px] dark:text-white">
                    {user.email}
                  </span>
                  <span className="text-xs text-muted-foreground">Logged in</span>
                </div>
              )}
            </div>
            {isOpen ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={signOut}
                className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={signOut}
                className="h-8 w-8 mt-2 rounded-full hover:bg-destructive/10 hover:text-destructive"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <NavLink
              to="/login"
              className="flex items-center gap-2 w-full justify-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-800 transition-all duration-200"
              title="Login"
            >
              <LogIn className="h-4 w-4" />
              {isOpen && <span>Login</span>}
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
