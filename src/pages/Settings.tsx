
import MainLayout from "@/components/layout/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Settings = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 md:w-auto">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <ProfileSettings />
          </TabsContent>
          
          <TabsContent value="business" className="space-y-4">
            <BusinessSettings />
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <NotificationSettings />
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-4">
            <BillingSettings />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

const ProfileSettings = () => {
  const formSchema = z.object({
    name: z.string().min(2, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(6, { message: "Phone number is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // In a real app, you would save these values to your backend
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Manage your personal information and how it appears on Refrens
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="space-y-2 w-full sm:w-auto">
            <Label htmlFor="avatar">Profile Picture</Label>
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Change
                </Button>
                <Button variant="outline" size="sm" className="text-destructive">
                  Remove
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-medium mb-4">Password</h3>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <div className="flex justify-end">
              <Button>Update Password</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const BusinessSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Information</CardTitle>
        <CardDescription>
          Manage your business details and branding
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="business-name">Business Name</Label>
            <Input id="business-name" defaultValue="My Business" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="business-address">Business Address</Label>
            <Input id="business-address" defaultValue="123 Business Street" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="business-city">City</Label>
              <Input id="business-city" defaultValue="San Francisco" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="business-state">State</Label>
              <Input id="business-state" defaultValue="California" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="business-zip">ZIP Code</Label>
              <Input id="business-zip" defaultValue="94101" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="business-country">Country</Label>
              <Input id="business-country" defaultValue="United States" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tax-id">Tax ID / VAT Number</Label>
            <Input id="tax-id" defaultValue="123-45-6789" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="business-website">Website</Label>
            <Input
              id="business-website"
              defaultValue="https://mybusiness.com"
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-medium mb-4">Business Logo</h3>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-md bg-refrens-light-blue flex items-center justify-center">
              <span className="text-primary font-bold text-xl">MB</span>
            </div>
            <div className="flex gap-2">
              <Button>Upload Logo</Button>
              <Button variant="outline" className="text-destructive">
                Remove
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Save Business Information</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const NotificationSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Manage how and when you receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Email Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Invoice Activity</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when there's activity on your invoices
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Client Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when clients update their information
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Payment Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about payment status changes
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Service Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about changes to your services
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive marketing and promotional emails
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">Browser Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Browser Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications in your browser when you're online
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Save Notification Settings</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

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
                <Badge>Current Plan</Badge>
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
                <Badge variant="outline" className="mr-2">
                  Default
                </Badge>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Apr 23, 2024</TableCell>
                    <TableCell>$29.00</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-success-light text-success border-success">
                        Paid
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mar 23, 2024</TableCell>
                    <TableCell>$29.00</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-success-light text-success border-success">
                        Paid
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Feb 23, 2024</TableCell>
                    <TableCell>$29.00</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-success-light text-success border-success">
                        Paid
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Table = ({ children }: { children: React.ReactNode }) => (
  <table className="w-full">{children}</table>
);

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead>{children}</thead>
);

const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr className="border-b last:border-b-0">{children}</tr>
);

const TableHead = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <th className={`px-4 py-3 text-left text-sm font-medium ${className}`}>{children}</th>
);

const TableCell = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <td className={`px-4 py-3 text-sm ${className}`}>{children}</td>
);

const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody>{children}</tbody>
);

const Badge = ({ children, variant = "default", className = "" }: { 
  children: React.ReactNode; 
  variant?: "default" | "outline"; 
  className?: string; 
}) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
      ${variant === "default" ? "bg-primary text-primary-foreground" : "border"}
      ${className}`}
  >
    {children}
  </span>
);

export default Settings;
