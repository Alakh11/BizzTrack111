
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Check, X } from "lucide-react";

interface EditableBillingSectionProps {
  title: string;
  defaultDetails: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  onSave?: (details: any) => void;
}

const EditableBillingSection = ({
  title,
  defaultDetails,
  onSave,
}: EditableBillingSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState(defaultDetails);
  const [tempDetails, setTempDetails] = useState(defaultDetails);

  const handleEdit = () => {
    setTempDetails(details);
    setIsEditing(true);
  };

  const handleSave = () => {
    setDetails(tempDetails);
    setIsEditing(false);
    if (onSave) onSave(tempDetails);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setTempDetails((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium font-playfair">{title}</h3>
        {!isEditing ? (
          <Button variant="ghost" size="sm" onClick={handleEdit}>
            <Pencil className="h-4 w-4 mr-2" /> Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSave}>
              <Check className="h-4 w-4 mr-2" /> Save
            </Button>
          </div>
        )}
      </div>

      <Card className="shadow-sm">
        <CardContent className={`p-4 ${isEditing ? "space-y-3" : "space-y-2"}`}>
          {isEditing ? (
            <>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Name
                </label>
                <Input
                  value={tempDetails.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="h-9"
                />
              </div>
              
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Address
                </label>
                <Input
                  value={tempDetails.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="h-9"
                />
              </div>
              
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Phone
                </label>
                <Input
                  value={tempDetails.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="h-9"
                />
              </div>
              
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Email
                </label>
                <Input
                  value={tempDetails.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="h-9"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <p className="font-medium">{details.name}</p>
              </div>
              <p className="text-sm text-muted-foreground">{details.address}</p>
              <p className="text-sm text-muted-foreground">{details.phone}</p>
              <p className="text-sm text-muted-foreground">{details.email}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EditableBillingSection;
