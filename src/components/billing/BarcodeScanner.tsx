
import React, { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface BarcodeScannerProps {
  onDetected: (barcode: string) => void;
  onError: (error: string) => void;
  timeout?: number; // timeout in seconds
  scanning: boolean;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  onDetected,
  onError,
  timeout = 30,
  scanning
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [timer, setTimer] = useState(timeout);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!scanning) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setActive(false);
      return;
    }

    // Reset timer when starting
    setTimer(timeout);
    setActive(true);

    const startScanner = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
          });
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.setAttribute("playsinline", "true"); // iOS Safari
            
            videoRef.current.onloadedmetadata = () => {
              if (videoRef.current) {
                videoRef.current.play();
                requestAnimationFrame(tick);
              }
            };
          }
        } else {
          onError("Camera access not supported by this browser.");
        }
      } catch (error) {
        onError("Could not access the camera: " + (error as Error).message);
      }
    };

    // Function to process frames
    const tick = () => {
      if (!active || !videoRef.current || !canvasRef.current) return;
      
      if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        
        // Set canvas dimensions to match video
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // We're just simulating barcode detection here
          // In a real app, you'd integrate a barcode library like zxing-js or quagga.js
          
          // For testing, simulate a barcode detection after a random delay
          if (Math.random() < 0.01 && active) { // ~1% chance per frame
            // Generate a random barcode for testing
            const randomBarcode = "DEMO" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
            
            // Cleanup
            if (videoRef.current && videoRef.current.srcObject) {
              const stream = videoRef.current.srcObject as MediaStream;
              const tracks = stream.getTracks();
              tracks.forEach(track => track.stop());
            }
            
            setActive(false);
            
            // Call the detection handler
            onDetected(randomBarcode);
            return;
          }
        }
      }
      
      // Continue processing frames
      if (active) {
        requestAnimationFrame(tick);
      }
    };

    startScanner();

    // Timer countdown
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          
          // Clean up video stream
          if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
          }
          
          setActive(false);
          onError("Barcode scanning timed out. Please try again.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      setActive(false);
      
      // Clean up video stream
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [scanning, onDetected, onError, timeout]);

  if (!scanning) return null;

  return (
    <Card className="overflow-hidden relative">
      <div className="aspect-video bg-black relative">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          muted
        />
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Scanner line animation */}
        <div className="absolute inset-0 pointer-events-none border-2 border-green-500 rounded">
          <div className="absolute left-0 right-0 h-0.5 bg-red-500 animate-scan" />
        </div>
        
        {/* Timer display */}
        <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded font-mono text-sm">
          {timer}s
        </div>
        
        {/* Instructions */}
        <div className="absolute bottom-2 left-2 right-2 bg-black/60 text-white p-2 text-center text-sm rounded">
          Position barcode within the frame
        </div>
      </div>
    </Card>
  );
};

export default BarcodeScanner;
