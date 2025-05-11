
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, ImagePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LogoUploadProps {
  businessLogo: string;
  onLogoUpload: (logoUrl: string) => void;
}

const LogoUpload: React.FC<LogoUploadProps> = ({ businessLogo, onLogoUpload }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    businessLogo || null,
  );
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, or SVG)",
        variant: "destructive",
      });
      return;
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 2MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // Here you would normally upload the file to a server
    // For this demo, we'll just use a local URL
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      onLogoUpload(result);
      setIsUploading(false);
      toast({
        title: "Logo uploaded",
        description: "Your business logo has been updated",
      });
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div
          className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden"
          onClick={triggerFileInput}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Business logo"
              className="w-full h-full object-contain"
            />
          ) : (
            <ImagePlus className="h-8 w-8 text-gray-400" />
          )}
        </div>

        <div className="space-y-2">
          <Button
            type="button"
            variant="outline"
            onClick={triggerFileInput}
            disabled={isUploading}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading
              ? "Uploading..."
              : previewUrl
                ? "Change Logo"
                : "Upload Logo"}
          </Button>

          {previewUrl && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setPreviewUrl(null);
                onLogoUpload("");
              }}
              className="w-full text-destructive hover:text-destructive"
            >
              Remove Logo
            </Button>
          )}
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/jpg, image/svg+xml"
        className="hidden"
      />

      <p className="text-xs text-muted-foreground">
        Upload your business logo (JPG, PNG, or SVG). Max size 2MB.
      </p>
    </div>
  );
};

export default LogoUpload;
