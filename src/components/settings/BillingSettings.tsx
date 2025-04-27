import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, IndianRupee } from "lucide-react";

const BillingSettings = () => {
  const plans = [
    {
      name: "Free",
      price: 0,
      description: "Basic features for small businesses",
      features: [
        "5 invoices per month",
        "Basic invoice templates",
        "Customer management",
        "Email support",
      ],
      current: false,
    },
    {
      name: "Standard",
      price: 499,
      description: "Everything you need for growing businesses",
      features: [
        "Unlimited invoices",
        "10 invoice templates",
        "Customer & vendor management",
        "Expense tracking",
        "Basic reporting",
        "Priority email support",
      ],
      current: true,
    },
    {
      name: "Professional",
      price: 999,
      description: "Advanced features for established businesses",
      features: [
        "Everything in Standard",
        "All premium templates",
        "Advanced reporting",
        "Team access (up to 3 users)",
        "Automated reminders",
        "Dedicated support",
        "API access",
      ],
      current: false,
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`border rounded-lg p-6 transition-all ${
                  plan.current
                    ? "border-primary shadow-md bg-primary/5"
                    : "hover:border-primary/50 hover:shadow-sm"
                }`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg font-playfair">
                    {plan.name}
                  </h3>
                  {plan.current && (
                    <Badge className="bg-primary/10 text-primary border-primary">
                      Current Plan
                    </Badge>
                  )}
                </div>

                <div className="mt-4 flex items-baseline">
                  <span className="flex items-center text-3xl font-bold">
                    <IndianRupee className="h-5 w-5 mr-1" />
                    {plan.price}
                  </span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>

                <p className="mt-2 text-muted-foreground text-sm">
                  {plan.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full mt-6 ${
                    plan.current
                      ? "bg-primary/20 text-primary hover:bg-primary/30 border border-primary"
                      : "bg-primary"
                  }`}
                  variant={plan.current ? "outline" : "default"}
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : "Upgrade"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center border p-4 rounded-md">
              <div className="flex items-center">
                <div className="h-10 w-14 bg-slate-200 rounded mr-4"></div>
                <div>
                  <div className="font-medium">•••• •••• •••• 4242</div>
                  <div className="text-sm text-muted-foreground">
                    Expires 12/24
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Change
              </Button>
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              Add Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-md">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-border">
                  <tr>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      04/15/2023
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      Standard Plan - Monthly
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm flex items-center">
                      <IndianRupee className="h-3 w-3 mr-1" />
                      499.00
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      <Badge
                        variant="outline"
                        className="bg-success/10 text-success border-success"
                      >
                        Paid
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      03/15/2023
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      Standard Plan - Monthly
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm flex items-center">
                      <IndianRupee className="h-3 w-3 mr-1" />
                      499.00
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      <Badge
                        variant="outline"
                        className="bg-success/10 text-success border-success"
                      >
                        Paid
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      02/15/2023
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      Standard Plan - Monthly
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm flex items-center">
                      <IndianRupee className="h-3 w-3 mr-1" />
                      499.00
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      <Badge
                        variant="outline"
                        className="bg-success/10 text-success border-success"
                      >
                        Paid
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSettings;
