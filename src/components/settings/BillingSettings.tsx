import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SettingsTable from "./SettingsTable";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}

const Badge = ({ children, variant = "default", className = "" }: BadgeProps) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
      ${variant === "default" ? "bg-primary text-primary-foreground" : "border"}
      ${className}`}
  >
    {children}
  </span>
);

const BillingSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing & Subscription</CardTitle>
        <CardDescription>
          Manage your subscription plan and payment methods
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">Current Plan</h3>
                <p className="text-sm text-muted-foreground">
                  You're currently on the Pro plan
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">$29/month</p>
                <p className="text-sm text-muted-foreground">
                  Next billing date: May 23, 2025
                </p>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Pro Plan Features:</h4>
                <Badge variant="outline">Current Plan</Badge>
              </div>
              <ul className="space-y-1 text-sm">
                <li>• Unlimited invoices</li>
                <li>• Up to 100 clients</li>
                <li>• Custom branding</li>
                <li>• Export financial reports</li>
                <li>• Email support</li>
              </ul>
              <div className="mt-4 flex gap-2">
                <Button variant="outline">Change Plan</Button>
                <Button variant="outline" className="text-destructive">
                  Cancel Subscription
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">Payment Methods</h3>
            <div className="bg-card border rounded-lg p-3 mb-3 flex justify-between">
              <div className="flex gap-3">
                <div className="w-10 h-7 bg-[#1434CB] rounded flex items-center justify-center text-white text-xs">
                  VISA
                </div>
                <div>
                  <p className="text-sm font-medium">Visa ending in 4242</p>
                  <p className="text-xs text-muted-foreground">
                    Expires 12/2025
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">Default</Badge>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Payment Method
            </Button>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">Billing History</h3>
            <div className="border rounded-lg overflow-hidden">
              <SettingsTable>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>May 15, 2025</TableCell>
                      <TableCell>Pro Plan Subscription</TableCell>
                      <TableCell>$29.00</TableCell>
                      <TableCell>
                        <Badge variant="outline">Paid</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </SettingsTable>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingSettings;
