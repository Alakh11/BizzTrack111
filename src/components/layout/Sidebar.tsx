
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  Users,
  PackageOpen,
  FileText,
  BarChartBig,
  Settings,
  Briefcase,
  LogOut,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const { signOut, user } = useAuth();
  const isMobile = useIsMobile();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    
    // Fetch user profile when user is available
    const fetchUserProfile = async () => {
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (data) {
          setUserProfile(data);
        }
      }
    };
    
    fetchUserProfile();
  }, [user]);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile && !isCollapsed) {
      setIsCollapsed(true);
    }
  }, [location.pathname, isMobile, isCollapsed, setIsCollapsed]);

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      href: "/",
      active: location.pathname === "/",
    },
    {
      title: "Invoices",
      icon: <Receipt size={20} />,
      href: "/invoices",
      active: location.pathname.includes("/invoices"),
    },
    {
      title: "Clients",
      icon: <Users size={20} />,
      href: "/clients",
      active: location.pathname.includes("/clients"),
    },
    {
      title: "Products",
      icon: <PackageOpen size={20} />,
      href: "/products",
      active: location.pathname.includes("/products"),
    },
    {
      title: "Services",
      icon: <Briefcase size={20} />,
      href: "/services",
      active: location.pathname.includes("/services"),
    },
    {
      title: "Expenses",
      icon: <FileText size={20} />,
      href: "/expenses",
      active: location.pathname.includes("/expenses"),
    },
    {
      title: "Reports",
      icon: <BarChartBig size={20} />,
      href: "/reports",
      active: location.pathname.includes("/reports"),
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      href: "/settings",
      active: location.pathname.includes("/settings"),
    },
  ];

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "relative h-full border-r bg-background transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="relative z-10 p-4 flex flex-col h-full">
        {/* User Profile - Simplified to only show name and email */}
        {user && (
          <div className={cn(
            "mb-6 border-b pb-4",
            isCollapsed ? "flex justify-center" : ""
          )}>
            <div className={cn(
              "flex items-center",
              isCollapsed ? "flex-col" : "flex-row"
            )}>
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt="User" />
                <AvatarFallback>
                  <User size={20} />
                </AvatarFallback>
              </Avatar>
              
              {!isCollapsed && (
                <div className="ml-3 overflow-hidden">
                  <p className="font-medium truncate">
                    {user.email?.split('@')[0]}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Nav Items */}
        <nav className="flex-1 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center py-3 px-3 rounded-md text-gray-700 hover:bg-muted/80 transition-colors",
                item.active && "bg-muted font-medium text-primary",
                isCollapsed ? "justify-center" : "justify-start"
              )}
            >
              <span className={item.active ? "text-primary" : ""}>{item.icon}</span>
              {!isCollapsed && <span className="ml-3">{item.title}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout Button - Fixing margin */}
        <button
          onClick={signOut}
          className={cn(
            "flex items-center py-3 px-3 rounded-md text-gray-700 hover:bg-muted/80 transition-colors mt-2",
            isCollapsed ? "justify-center" : "justify-start"
          )}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="ml-3">Sign Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
