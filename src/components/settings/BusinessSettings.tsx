
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

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
            <Input id="business-website" defaultValue="https://mybusiness.com" />
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

export default BusinessSettings;
