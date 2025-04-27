import React from "react";
import { cn } from "@/lib/utils";

interface SettingsTableProps {
  children: React.ReactNode;
  className?: string;
}

const SettingsTable: React.FC<SettingsTableProps> = ({
  children,
  className,
}) => {
  return <div className={cn("border rounded-md", className)}>{children}</div>;
};

export default SettingsTable;
