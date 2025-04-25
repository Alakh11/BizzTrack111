
import { Copyright, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary/5 border-t mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">BizzTrack</h3>
            <p className="text-muted-foreground mb-4">
              Simplify your business finances with our comprehensive invoicing and expense tracking solution.
            </p>
            <div className="flex items-center space-x-1 text-sm">
              <Copyright className="h-4 w-4" />
              <span>{currentYear} BizzTrack. All rights reserved.</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary">Dashboard</Link></li>
              <li><Link to="/invoices" className="hover:text-primary">Invoices</Link></li>
              <li><Link to="/expenses" className="hover:text-primary">Expenses</Link></li>
              <li><Link to="/clients" className="hover:text-primary">Clients</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/reports" className="hover:text-primary">Reports</Link></li>
              <li><Link to="#" className="hover:text-primary">Help Center</Link></li>
              <li><Link to="#" className="hover:text-primary">FAQ</Link></li>
              <li><Link to="#" className="hover:text-primary">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>support@bizztrack.com</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>123 Business Park, Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
