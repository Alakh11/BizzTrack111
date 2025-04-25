
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText } from "lucide-react";

const ReportsTax = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Tax Reports</h1>
          <p className="text-muted-foreground">
            View and download your tax reports
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>GST Reports</CardTitle>
            <CardDescription>
              Goods and Services Tax reports for filing returns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Type</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>GSTR-1</TableCell>
                  <TableCell>Jan 2025 - Mar 2025</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-success-light text-success border-success">
                      Ready
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-2" /> Download
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>GSTR-3B</TableCell>
                  <TableCell>Jan 2025 - Mar 2025</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-success-light text-success border-success">
                      Ready
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-2" /> Download
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>GST Reconciliation</TableCell>
                  <TableCell>Apr 2025</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-warning-light text-warning border-warning">
                      Pending
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" disabled>
                      <Download className="h-4 w-4 mr-2" /> Download
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            
            <div className="flex justify-end">
              <Button>
                <FileText className="h-4 w-4 mr-2" /> Generate New Report
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>TDS Reports</CardTitle>
            <CardDescription>
              Tax Deducted at Source reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Type</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Form 16A</TableCell>
                  <TableCell>FY 2024-2025</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-success-light text-success border-success">
                      Ready
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-2" /> Download
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Form 26Q</TableCell>
                  <TableCell>Q4 FY 2024-2025</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-success-light text-success border-success">
                      Ready
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-2" /> Download
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ReportsTax;
