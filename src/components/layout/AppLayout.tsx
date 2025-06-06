
import React from "react";
import { AppSidebar } from "./AppSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  hideNavigation?: boolean;
}

const AppLayout = ({ children, hideNavigation = false }: AppLayoutProps) => {
  if (hideNavigation) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AppSidebar className="w-64 hidden md:block" />
      <div className="flex-1 ml-0 md:ml-64">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
