
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Book, Database, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-4">Asset Atlas Hub</h1>
          <p className="text-xl text-gray-600 mb-8">
            The complete solution for tracking and managing your IT assets and configuration items
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              onClick={() => navigate("/register")} 
              size="lg" 
              className="text-base px-8"
            >
              Get Started <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button 
              onClick={() => navigate("/login")} 
              variant="outline" 
              size="lg" 
              className="text-base px-8"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Database className="h-10 w-10 text-blue-500" />}
              title="Asset Tracking"
              description="Organize and track all your IT assets in one centralized platform. Never lose track of hardware, software, or licenses again."
            />
            <FeatureCard 
              icon={<Users className="h-10 w-10 text-green-500" />}
              title="Role-Based Access"
              description="Control who can manage your assets with admin and user roles, ensuring the right people have the right access."
            />
            <FeatureCard 
              icon={<Book className="h-10 w-10 text-purple-500" />}
              title="Detailed Reporting"
              description="Generate comprehensive reports about your assets, their status, and distribution across your organization."
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to take control of your assets?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start managing your IT inventory efficiently today. Create an account to begin.
          </p>
          <Button 
            onClick={() => navigate("/register")} 
            size="lg" 
            className="text-base px-8"
          >
            Create Account
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Asset Atlas Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <Card className="border-0 shadow-md">
      <CardContent className="pt-6">
        <div className="mb-4 flex justify-center">{icon}</div>
        <CardTitle className="text-xl mb-3 text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default LandingPage;
