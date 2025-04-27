<<<<<<< HEAD

=======
>>>>>>> tempRepo/main
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Clients from "./pages/Clients";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
=======
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import InvoiceGeneration from "./pages/InvoiceGeneration";
import Clients from "./pages/Clients";
import Services from "./pages/Services";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Expenses from "./pages/Expenses";
import Reports from "./pages/Reports";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
>>>>>>> tempRepo/main

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
<<<<<<< HEAD
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
=======
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Auth mode="login" />} />
            <Route path="/signup" element={<Auth mode="signup" />} />
            <Route
              path="/forgot-password"
              element={<Auth mode="forgotPassword" />}
            />
            <Route path="/" element={<Dashboard />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/invoices/new" element={<InvoiceGeneration />} />
            <Route path="/invoices/edit/:id" element={<InvoiceGeneration />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/services" element={<Services />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
>>>>>>> tempRepo/main
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
