
import React from "react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-background py-6 border-t mt-auto">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Alakh Corporation</h3>
            <p className="text-muted-foreground">
              Your trusted invoicing partner for small businesses and freelancers.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center">
                <span className="font-medium mr-2">Address:</span> 
                Mirzapur, UP, India - 231312
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-2">Phone:</span> 
                <a href="tel:+919580813770" className="hover:underline">+91 9580813770</a>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-2">Email:</span> 
                <a href="mailto:alakh1304@gmail.com" className="hover:underline">alakh1304@gmail.com</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/invoices" className="text-muted-foreground hover:text-foreground transition-colors">
                  Invoices
                </a>
              </li>
              <li>
                <a href="/clients" className="text-muted-foreground hover:text-foreground transition-colors">
                  Clients
                </a>
              </li>
              <li>
                <a href="/reports" className="text-muted-foreground hover:text-foreground transition-colors">
                  Reports
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Alakh Corporation. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
