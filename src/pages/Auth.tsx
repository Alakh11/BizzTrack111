
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";

export default function Auth({
  mode = "login",
}: {
  mode?: "login" | "signup" | "forgotPassword";
}) {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Please enter your email address");
      return;
    }
    
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setResetSent(true);
      toast({
        title: "Password reset email sent",
        description: "Check your inbox for instructions to reset your password",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
        variant: "destructive",
      });
      setError(error.message);
    }
  };

  const renderForgotPassword = () => (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-xl">
      <div className="space-y-4">
        {resetSent ? (
          <div className="text-center space-y-4">
            <Mail className="mx-auto h-12 w-12 text-primary" />
            <h2 className="text-xl font-bold">Check your email</h2>
            <p>We've sent password reset instructions to your email address.</p>
            <Button asChild className="w-full">
              <Link to="/login">Back to Login</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h2 className="text-xl font-bold">Forgot Password</h2>
              <p className="text-sm text-muted-foreground">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
            </form>
            <div className="text-center">
              <Button variant="link" asChild>
                <Link to="/login">Back to Login</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="w-full max-w-sm space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">
            {mode === "login"
              ? "Welcome to BizzTrack"
              : mode === "signup"
                ? "Join BizzTrack"
                : "Reset Password"}
          </h1>
          <p className="text-gray-200">
            {mode === "login"
              ? "Enter your credentials to access your account"
              : mode === "signup"
                ? "Enter your details to create your account"
                : "We'll help you recover your account"}
          </p>
        </div>

        {mode === "forgotPassword" ? (
          renderForgotPassword()
        ) : (
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-xl">
            <AuthForm mode={mode as any} />

            {mode === "login" && (
              <div className="text-center mt-4">
                <Button variant="link" asChild className="p-0">
                  <Link to="/forgot-password">Forgot password?</Link>
                </Button>
              </div>
            )}
          </div>
        )}

        <p className="text-center text-sm text-white">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary-foreground hover:underline font-semibold"
              >
                Sign up
              </Link>
            </>
          ) : mode === "signup" ? (
            <>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary-foreground hover:underline font-semibold"
              >
                Sign in
              </Link>
            </>
          ) : null}
        </p>
      </div>
    </div>
  );
}
