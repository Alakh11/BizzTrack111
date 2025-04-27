<<<<<<< HEAD

import Navbar from "@/components/Navbar";
import RecentInvoices from "@/components/RecentInvoices";
import ClientStats from "@/components/ClientStats";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-20 pb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <RecentInvoices />
          <ClientStats />
        </div>
      </main>
    </div>
  );
=======
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard
    navigate("/");
  }, [navigate]);

  return null;
>>>>>>> tempRepo/main
};

export default Index;
