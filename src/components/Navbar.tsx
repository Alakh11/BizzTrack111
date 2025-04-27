
import { FileText, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-semibold text-gray-800">
              InvoiceManager
            </Link>
          </div>
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 ${
                isActive("/") 
                  ? "text-blue-600" 
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Invoices</span>
            </Link>
            <Link
              to="/clients"
              className={`flex items-center space-x-2 ${
                isActive("/clients") 
                  ? "text-blue-600" 
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Clients</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
