
import { User, Users, Receipt } from "lucide-react";
import DashboardCard from "./DashboardCard";

const ClientStats = () => {
  return (
    <DashboardCard title="Client Overview">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Users className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-2xl font-semibold">24</p>
            <p className="text-sm text-gray-500">Total Clients</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <User className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-2xl font-semibold">3</p>
            <p className="text-sm text-gray-500">New This Month</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Receipt className="w-8 h-8 text-purple-500" />
          <div>
            <p className="text-2xl font-semibold">$12,400</p>
            <p className="text-sm text-gray-500">Outstanding</p>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default ClientStats;
