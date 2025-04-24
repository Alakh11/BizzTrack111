
import { Link } from "react-router-dom";
import { AuthForm } from "@/components/auth/AuthForm";

export default function Auth({ mode = "login" }: { mode?: "login" | "signup" }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">
            {mode === "login" ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-muted-foreground">
            {mode === "login"
              ? "Enter your credentials to access your account"
              : "Enter your details to create your account"}
          </p>
        </div>

        <AuthForm mode={mode} />

        <p className="text-center text-sm">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
