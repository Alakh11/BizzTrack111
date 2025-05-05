
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const { signOut } = useAuth();
  const isMobile = useIsMobile();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      {/* Watermark Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden z-0">
        <div className="rotate-[-15deg] text-[200px] text-gray-900 font-bold">
          INVOICE
        </div>
      </div>
      
      {/* Logo Container */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        <div className="flex items-center h-14 mb-8">
          <div
            className={cn(
              "flex items-center transition-all duration-300",
              isCollapsed ? "justify-center w-full" : "justify-start"
            )}
          >
            <span className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <Receipt size={18} className="text-white" />
            </span>
            {!isCollapsed && (
              <span className="ml-2 font-semibold text-lg">InvoiceApp</span>
            )}
          </div>
        </div>

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

        {/* Logout Button */}
        <button
          onClick={signOut}
          className={cn(
            "flex items-center py-3 px-3 rounded-md text-gray-700 hover:bg-muted/80 transition-colors mb-4",
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
