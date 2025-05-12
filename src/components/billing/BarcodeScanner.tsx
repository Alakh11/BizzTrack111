
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const constraints = {
          video: {
            facingMode: "environment",
          },
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        
        // Here you would integrate a barcode scanning library
        // For demo purposes, we'll simulate scanning after a few seconds
        
        setTimeout(() => {
          // Simulate a scan result
          const mockBarcode = "PRD" + Math.floor(10000000000 + Math.random() * 90000000000);
          onScan(mockBarcode);
          
          // Stop the camera after scan
          if (stream) {
            stream.getTracks().forEach(track => {
              track.stop();
            });
          }
        }, 3000);
        
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };
    
    startCamera();
    
    return () => {
      // Clean up by stopping all tracks when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, [onScan]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Scan Barcode</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="relative aspect-video bg-gray-900 rounded-md overflow-hidden mb-4">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            playsInline
          ></video>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover opacity-0"></canvas>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="border-2 border-red-500 w-3/4 h-1/3 rounded-md"></div>
          </div>
        </div>
        
        <p className="text-sm text-center text-muted-foreground">
          Center the barcode within the frame to scan
        </p>
      </div>
    </div>
  );
};

export default BarcodeScanner;
