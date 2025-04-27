import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: ReactNode;
  className?: string;
}

const StatCard = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
  className,
}: StatCardProps) => {
  return (
    <div className={cn("dashboard-card", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {change && (
            <div className="mt-1 flex items-center">
              <span
                className={`text-xs font-medium ${
                  isPositive ? "text-success" : "text-destructive"
                }`}
              >
                {isPositive ? "+" : ""}
                {change}
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                vs last month
              </span>
            </div>
          )}
        </div>
        <div className="h-10 w-10 rounded-full bg-refrens-light-blue flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
