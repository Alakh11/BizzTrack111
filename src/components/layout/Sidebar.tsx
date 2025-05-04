
import {
  Home,
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  Coins,
  BarChart,
  Package,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

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
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <div
      className={`fixed left-0 top-0 z-50 flex h-full flex-col border-r bg-white transition-transform dark:border-neutral-700 dark:bg-neutral-900  ${
        isOpen ? "w-64 translate-x-0" : "-translate-x-full w-0 md:w-16"
      } md:translate-x-0`}
    >
      <div className="px-4 py-6">
        <NavLink to="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6" />
          <span
            className={`text-xl font-bold ${
              isOpen ? "inline" : "hidden"
            } dark:text-white`}
          >
            Invoicer
          </span>
        </NavLink>
      </div>
      <nav className="flex-grow px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-800 ${
                    isActive
                      ? "bg-gray-100 dark:bg-neutral-800 font-medium"
                      : ""
                  }`
                }
                onClick={closeSidebar}
              >
                <item.icon className="h-4 w-4" />
                <span className={isOpen ? "inline" : "hidden"}>
                  {item.title}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
