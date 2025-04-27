
<<<<<<< HEAD
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Plus, Search, FileText, Users, ClipboardList, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
=======
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  UserCircle2,
  Settings,
  LogOut,
  User,
} from "lucide-react";
>>>>>>> tempRepo/main
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
<<<<<<< HEAD
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center bg-white border-b border-border px-4 lg:px-6">
      <div className="flex flex-1 items-center justify-between">
        {/* Search */}
        <div className="hidden md:flex relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search invoices, clients..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Right section: buttons & notifications */}
        <div className="flex items-center gap-2">
          {/* Mobile search button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          {/* Notifications */}
=======
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

const Header = ({ onToggleSidebar, isSidebarOpen = true }: HeaderProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <header className="border-b py-3 px-4 md:px-6 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleSidebar}
            className="hidden lg:flex"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative hidden md:flex">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-64 rounded-md border border-input bg-transparent pl-8 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-white flex items-center justify-center">
              3
            </span>
          </Button>

>>>>>>> tempRepo/main
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
<<<<<<< HEAD
                size="icon"
                className="relative"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2 text-center border-b border-border">
                <h3 className="font-medium">Notifications</h3>
              </div>
              <div className="p-4 text-center text-sm text-muted-foreground">
                <p>No new notifications</p>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Create New Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="btn-primary">
                <Plus className="h-4 w-4 mr-1" /> Create New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate('/invoices/new')}>
                <FileText className="h-4 w-4 mr-2" />
                New Invoice
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/clients')}>
                <Users className="h-4 w-4 mr-2" />
                New Client
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/services')}>
                <ClipboardList className="h-4 w-4 mr-2" />
                New Service
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Logout Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={signOut}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
          </Button>
=======
                className="flex items-center space-x-2 rounded-full"
              >
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-medium text-primary">
                    {user?.email?.[0].toUpperCase() || "U"}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">{user?.email}</div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/settings")}
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/settings")}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
>>>>>>> tempRepo/main
        </div>
      </div>
    </header>
  );
};

export default Header;
