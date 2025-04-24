
import { Link } from "react-router-dom";
import { AuthForm } from "@/components/auth/AuthForm";

export default function Auth({ mode = "login" }: { mode?: "login" | "signup" }) {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="w-full max-w-sm space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">
            {mode === "login" ? "Welcome to BizzTrack" : "Join BizzTrack"}
          </h1>
          <p className="text-gray-200">
            {mode === "login"
              ? "Enter your credentials to access your account"
              : "Enter your details to create your account"}
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-xl">
          <AuthForm mode={mode} />
        </div>

        <p className="text-center text-sm text-white">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary-foreground hover:underline font-semibold">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link to="/login" className="text-primary-foreground hover:underline font-semibold">
                Sign in
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
