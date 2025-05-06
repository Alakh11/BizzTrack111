
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
      icon: <LayoutDashboard size={24} />, 
      href: "/", 
      active: location.pathname === "/" 
    },
    { 
      title: "Invoices", 
      icon: <Receipt size={24} />, 
      href: "/invoices", 
      active: location.pathname.includes("/invoices") 
    },
    { 
      title: "Clients", 
      icon: <Users size={24} />, 
      href: "/clients", 
      active: location.pathname.includes("/clients") 
    },
    { 
      title: "Products", 
      icon: <PackageOpen size={24} />, 
      href: "/products", 
      active: location.pathname.includes("/products") 
    },
    { 
      title: "Services", 
      icon: <Briefcase size={24} />, 
      href: "/services", 
      active: location.pathname.includes("/services") 
    },
    { 
      title: "Expenses", 
      icon: <FileText size={24} />, 
      href: "/expenses", 
      active: location.pathname.includes("/expenses") 
    },
    { 
      title: "Reports", 
      icon: <BarChartBig size={24} />, 
      href: "/reports", 
      active: location.pathname.includes("/reports") 
    },
    { 
      title: "Settings", 
      icon: <Settings size={24} />, 
      href: "/settings", 
      active: location.pathname.includes("/settings") 
    },
  ];

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "relative h-full border-r bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#334155] text-white transition-all duration-300 ease-in-out shadow-lg",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex flex-col h-full">
        {/* User Info */}
        {user && (
          <div className={cn("mb-6 border-b pb-4 border-gray-600", isCollapsed ? "flex justify-center" : "")}>
            <div className={cn("flex items-center", isCollapsed ? "flex-col" : "flex-row")}>
              <Avatar className="h-10 w-10 border border-white shadow-md">
                <AvatarImage src="" alt="User" />
                <AvatarFallback>
                  <User size={20} />
                </AvatarFallback>
              </Avatar>
              
              {!isCollapsed && (
                <div className="ml-3 overflow-hidden">
                  <p className="font-semibold text-white truncate">
                    {userProfile?.username || user.email?.split('@')[0]}
                  </p>
                  <p className="text-xs text-gray-300 truncate">
                    {user.email}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center py-3 px-3 rounded-md transition-colors font-medium",
                item.active
                  ? "bg-white text-[#0f172a]"
                  : "text-gray-300 hover:bg-gray-700/40 hover:text-white",
                isCollapsed ? "justify-center" : "justify-start"
              )}
            >
              <span>{item.icon}</span>
              {!isCollapsed && <span className="ml-3">{item.title}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={signOut}
          className={cn(
            "flex items-center py-3 px-3 mt-4 rounded-md text-gray-300 hover:bg-red-600 hover:text-white transition-colors",
            isCollapsed ? "justify-center" : "justify-start"
          )}
        >
          <LogOut size={24} />
          {!isCollapsed && <span className="ml-3">Sign Out</span>}
        </button>

        {/* Decorative Bottom Design */}
        {!isCollapsed && (
          <div className="mt-auto pt-4 text-center text-sm text-gray-400 border-t border-gray-600">
            <p>BizzTrack © {new Date().getFullYear()}</p>
            <p className="text-xs">Crafted with ❤️ by Alakh</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
