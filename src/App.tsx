
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import Index from "./pages/Index";
import ConfigurationItems from "./pages/ConfigurationItems";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import LandingPage from "./pages/LandingPage";

const queryClient = new QueryClient();

// Check if this is first time visit
const FirstTimeCheck = ({ children }: { children: React.ReactNode }) => {
  const { users } = useAuth();
  
  // If no users are registered, redirect to register page
  if (users.length === 0) {
    return <Navigate to="/register" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={
                <AppLayout hideNavigation>
                  <LandingPage />
                </AppLayout>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected routes - must be logged in */}
              <Route element={<ProtectedRoute />}>
                {/* Also check if this is first time visit */}
                <Route element={<FirstTimeCheck children={<></>} />}>
                  <Route path="/dashboard" element={<Index />} />
                  <Route path="/configuration-items" element={<ConfigurationItems />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
