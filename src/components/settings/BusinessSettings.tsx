
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

const BusinessSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [businessData, setBusinessData] = useState({
    business_name: "",
    business_address: "",
    city: "",
    state: "",
    pincode: "",
    gst_number: "",
    website: "",
  });

  useEffect(() => {
    const loadBusinessData = async () => {
      if (!user?.id) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (data) {
        setBusinessData({
          business_name: data.business_name || "",
          business_address: data.business_address || "",
          city: data.city || "",
          state: data.state || "",
          pincode: data.pincode || "",
          gst_number: data.gst_number || "",
          website: data.website || "",
        });
      }
    };

    loadBusinessData();
  }, [user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...businessData,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Business information updated",
        description: "Your business details have been successfully saved.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusinessData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Information</CardTitle>
        <CardDescription>
          Manage your business details and GST information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="business-name">Business Name</Label>
              <Input
                id="business-name"
                name="business_name"
                value={businessData.business_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="business-address">Business Address</Label>
              <Input
                id="business-address"
                name="business_address"
                value={businessData.business_address}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="business-city">City</Label>
                <Input
                  id="business-city"
                  name="city"
                  value={businessData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="business-state">State</Label>
                <Input
                  id="business-state"
                  name="state"
                  value={businessData.state}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="business-pincode">PIN Code</Label>
                <Input
                  id="business-pincode"
                  name="pincode"
                  value={businessData.pincode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gst-number">GST Number</Label>
                <Input
                  id="gst-number"
                  name="gst_number"
                  value={businessData.gst_number}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="business-website">Website</Label>
              <Input
                id="business-website"
                name="website"
                value={businessData.website}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Business Information"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BusinessSettings;
