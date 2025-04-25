
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

const ReportsFinancial = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Financial Reports</h1>
          <p className="text-muted-foreground">
            View and download your financial reports
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Profit & Loss</CardTitle>
              <CardDescription>
                View your income and expenses over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Last updated: April 23, 2025
              </p>
              <Button className="w-full">
                <FileText className="h-4 w-4 mr-2" /> View Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Balance Sheet</CardTitle>
              <CardDescription>
                View your assets, liabilities, and equity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Last updated: April 22, 2025
              </p>
              <Button className="w-full">
                <FileText className="h-4 w-4 mr-2" /> View Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cash Flow</CardTitle>
              <CardDescription>
                Track your cash inflows and outflows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Last updated: April 21, 2025
              </p>
              <Button className="w-full">
                <FileText className="h-4 w-4 mr-2" /> View Report
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Summary</CardTitle>
            <CardDescription>
              Revenue breakdown by month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-muted rounded-md">
              <p className="text-muted-foreground">
                Revenue chart will be displayed here
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" /> Export as CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ReportsFinancial;
