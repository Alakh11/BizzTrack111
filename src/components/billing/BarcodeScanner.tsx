
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [countdown, setCountdown] = useState<number | null>(null);
  
  useEffect(() => {
    const startCamera = async () => {
      try {
        const constraints = {
          video: {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        
        // In a real application, we would integrate a barcode scanning library
        // like Quagga.js or ZXing here, but for this example we'll simulate a scan
        // Don't worry, keyboard barcode scanners work like keyboard inputs and will
        // be detected automatically when used in the search field
        
        // Simulate scanning countdown for demonstration
        setCountdown(3);
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev === null || prev <= 1) {
              clearInterval(timer);
              simulateScan();
              return null;
            }
            return prev - 1;
          });
        }, 1000);
        
        return () => {
          clearInterval(timer);
        };
        
      } catch (error) {
        console.error("Error accessing camera:", error);
        setError("Could not access the camera. Please make sure you have granted camera permissions.");
      }
    };
    
    if (scanning) {
      startCamera();
    }
    
    return () => {
      // Stop camera on component unmount
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, [scanning]);
  
  const simulateScan = () => {
    if (!scanning) return;
    
    // For demonstration: generate a mock barcode
    const mockBarcode = "PRD" + Math.floor(10000000000 + Math.random() * 90000000000);
    
    // In a real app, we would capture frames from the video and analyze them
    // for barcodes using a library like Quagga.js
    
    setScanning(false);
    onScan(mockBarcode);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Scan Barcode</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {error ? (
          <div className="text-red-500 text-center p-4">
            {error}
          </div>
        ) : (
          <>
            <div className="relative aspect-video bg-gray-900 rounded-md overflow-hidden mb-4">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                playsInline
              ></video>
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover opacity-0"></canvas>
              
              {/* Targeting frame */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border-2 border-red-500 w-3/4 h-1/3 rounded-md"></div>
              </div>
              
              {/* Countdown overlay */}
              {countdown !== null && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <div className="bg-white p-3 rounded-full w-12 h-12 flex items-center justify-center">
                    <span className="text-xl font-bold">{countdown}</span>
                  </div>
                </div>
              )}
            </div>
            
            <p className="text-sm text-center text-muted-foreground">
              Center the barcode within the frame to scan
            </p>
            
            <div className="mt-4 flex justify-between">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button 
                onClick={() => {
                  setScanning(true);
                  setCountdown(3);
                }}
                disabled={countdown !== null}
              >
                Rescan
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BarcodeScanner;
