
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Store,
  PenTool,
  Receipt,
  BarChart,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
  description?: string;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    description: "Overview of your business",
  },
  {
    label: "Billing",
    icon: Receipt,
    href: "/billing",
    description: "Create invoices and receipts",
  },
  {
    label: "Invoices",
    icon: FileText,
    href: "/invoices",
    description: "Manage invoices",
  },
  {
    label: "Products",
    icon: ShoppingCart,
    href: "/products",
    description: "Manage your inventory",
  },
  {
    label: "Services",
    icon: PenTool,
    href: "/services",
    description: "Manage your services",
  },
  {
    label: "Clients",
    icon: Users,
    href: "/clients",
    description: "Manage your clients",
  },
  {
    label: "Expenses",
    icon: Store,
    href: "/expenses",
    description: "Track your expenses",
  },
  {
    label: "Reports",
    icon: BarChart,
    href: "/reports",
    description: "Business analytics",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    description: "Manage your account",
  },
];

const Sidebar = () => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleSignOut = () => {
    signOut();
    navigate("/login");
  };

  const initials =
    userProfile?.first_name && userProfile?.last_name
      ? `${userProfile.first_name[0]}${userProfile.last_name[0]}`
      : user?.email?.substring(0, 2).toUpperCase() || "U";

  return (
    <aside
      className={cn(
        "flex flex-col h-screen border-r bg-sidebar text-sidebar-foreground border-sidebar-border shrink-0 transition-all duration-300 ease-in-out overflow-hidden",
        expanded ? "w-[280px]" : "w-[70px]"
      )}
    >
      <div
        className={cn(
          "flex items-center h-16 px-4 border-b border-sidebar-border shrink-0",
          !expanded && "justify-center"
        )}
      >
        <Button
          variant="outline"
          size="icon"
          className="mr-2 border-sidebar-border"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform"
            style={{
              transform: expanded ? "rotate(0deg)" : "rotate(180deg)",
            }}
          >
            <path d="M15 6l-6 6l6 6" />
          </svg>
        </Button>

        {expanded && (
          <div className="flex items-center ml-2">
            <span className="text-xl font-semibold ml-1">BizzTrack</span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto py-1">
        <nav className="grid gap-0.5 px-2 group-[[data-collapsed=true]]:justify-center">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground",
                  !expanded && "justify-center px-0"
                )
              }
            >
              <item.icon className={cn("h-5 w-5", !expanded && "h-6 w-6")} />
              {expanded && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex flex-col mt-auto border-t border-sidebar-border p-4">
        <div className={cn("flex items-center justify-between mb-2", !expanded && "justify-center")}>
          {expanded ? (
            <>
              <div className="flex items-center">
                <div className="mr-2">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={userProfile?.avatar_url || ""} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {userProfile?.first_name || user?.email?.split("@")[0]}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user?.email || ""}
                  </p>
                </div>
              </div>
              <ThemeToggle />
            </>
          ) : (
            <ThemeToggle />
          )}
        </div>

        <Button
          variant="ghost"
          className={cn(
            "justify-start px-2",
            !expanded && "justify-center"
          )}
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {expanded && <span>Sign out</span>}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
