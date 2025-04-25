
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  FileText,
  Users,
  ClipboardList,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  Receipt,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Sidebar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    {
      name: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      href: "/",
    },
    {
      name: "Invoices",
      icon: <FileText className="h-5 w-5" />,
      isDropdown: true,
      items: [
        {
          name: "All Invoices",
          href: "/invoices",
        },
        {
          name: "Create Invoice",
          href: "/invoices/new",
        },
      ],
    },
    {
      name: "Expenses",
      icon: <Receipt className="h-5 w-5" />,
      href: "/expenses",
    },
    {
      name: "Clients",
      icon: <Users className="h-5 w-5" />,
      href: "/clients",
    },
    {
      name: "Services",
      icon: <ClipboardList className="h-5 w-5" />,
      href: "/services",
    },
    {
      name: "Reports",
      icon: <BarChart3 className="h-5 w-5" />,
      isDropdown: true,
      items: [
        {
          name: "Financial Reports",
          href: "/reports/financial",
        },
        {
          name: "Tax Reports",
          href: "/reports/tax",
        },
        {
          name: "Client Reports",
          href: "/reports/clients",
        },
      ],
    },
    {
      name: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/settings",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const renderNavItem = (item: any) => {
    if (item.isDropdown) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={cn(
              "nav-link w-full",
              location.pathname.startsWith(item.items[0].href) && "nav-link-active"
            )}>
              {item.icon}
              <span>{item.name}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {item.items.map((subItem: any) => (
              <DropdownMenuItem key={subItem.href} asChild>
                <Link 
                  to={subItem.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full"
                >
                  {subItem.name === "Create Invoice" && <Plus className="mr-2 h-4 w-4" />}
                  {subItem.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Link
        to={item.href}
        className={cn(
          "nav-link",
          location.pathname === item.href && "nav-link-active"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {item.icon}
        <span>{item.name}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobileMenu}
          className="relative"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-border">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-white font-bold">B</span>
              </div>
              <span className="text-primary font-bold text-xl">BizzTrack</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.name} className="group/menu-item relative">
                {renderNavItem(item)}
              </div>
            ))}
          </nav>

          {/* User Profile & Logout */}
          <div className="border-t border-border p-4 bg-gray-50">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-medium text-primary text-xl">
                  {user?.email?.[0].toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <p className="font-semibold text-primary text-sm">{user?.email}</p>
                <p className="text-xs text-muted-foreground">Logged in</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start text-primary hover:bg-primary/5"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
