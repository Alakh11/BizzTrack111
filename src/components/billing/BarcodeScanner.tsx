
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
  const [manualEntry, setManualEntry] = useState<string>("");
  
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
          startScanning();
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        setError("Could not access the camera. Please make sure you have granted camera permissions.");
      }
    };
    
    if (scanning) {
      startCamera();
    }
    
    // Listen for keyboard input for barcode scanners that act like keyboards
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && manualEntry.length > 0) {
        handleManualSubmit();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      // Stop camera on component unmount
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
      
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [scanning, manualEntry]);
  
  const startScanning = () => {
    if (!canvasRef.current || !videoRef.current) return;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    // In a real implementation, we'd use a library like QuaggaJS or ZXing
    // For now, simulate scanning with a countdown
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
  };
  
  const simulateScan = () => {
    if (!scanning) return;
    
    // For demonstration: generate a mock barcode
    // In a real implementation, this would be replaced with actual barcode detection
    const mockBarcode = "PRD" + Math.floor(10000000000 + Math.random() * 90000000000);
    
    setScanning(false);
    onScan(mockBarcode);
  };
  
  const handleManualSubmit = () => {
    if (manualEntry.trim()) {
      onScan(manualEntry.trim());
      setManualEntry("");
    }
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
                <div className="border-2 border-red-500 w-3/4 h-1/3 rounded-md">
                  {/* Add scanning line animation */}
                  <div className="absolute left-0 right-0 top-0 h-0.5 bg-red-500 animate-[scan_2s_ease-in-out_infinite]"></div>
                </div>
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
            
            <p className="text-sm text-center text-muted-foreground mb-4">
              Center the barcode within the frame to scan
            </p>
            
            {/* Manual entry option */}
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={manualEntry}
                onChange={(e) => setManualEntry(e.target.value)}
                placeholder="Enter barcode manually"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button onClick={handleManualSubmit} type="button">Enter</Button>
            </div>
            
            <div className="mt-4 flex justify-between">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button 
                onClick={() => {
                  setScanning(true);
                  setCountdown(3);
                  startScanning();
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
