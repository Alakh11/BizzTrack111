
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Plus, Search, FileText, Users, ClipboardList, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
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
        </div>
      </div>
    </header>
  );
};

export default Header;
