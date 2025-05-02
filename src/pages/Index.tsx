
import React from "react";
import { Database, Layers, Clock, Archive, Menu } from "lucide-react";
import { metricsData, auditLogs } from "@/data/mockData";
import { AppSidebar } from "@/components/layout/AppSidebar";
import MetricCard from "@/components/dashboard/MetricCard";
import AuditTable from "@/components/dashboard/AuditTable";
import CIDistributionChart from "@/components/dashboard/CIDistributionChart";
import CreateCIButton from "@/components/dashboard/CreateCIButton";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardPage: React.FC = () => {
  const iconComponents = [
    <Database className="h-5 w-5" />,
    <Layers className="h-5 w-5" />,
    <Clock className="h-5 w-5" />,
    <Archive className="h-5 w-5" />,
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 overflow-auto">
          <header className="sticky top-0 z-30 border-b bg-background">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </SidebarTrigger>
                <h1 className="text-xl font-semibold">Dashboard</h1>
              </div>
              <CreateCIButton />
            </div>
          </header>

          <main className="p-4 md:p-6 space-y-6">
            <section>
              <h2 className="text-lg font-semibold mb-4">Key Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metricsData.map((metric, index) => (
                  <MetricCard
                    key={metric.label}
                    title={metric.label}
                    value={metric.value}
                    change={metric.change}
                    icon={iconComponents[index]}
                  />
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-lg font-semibold mb-4">Recent Changes</h2>
                <AuditTable audits={auditLogs} />
              </div>
              <div>
                <CIDistributionChart />
              </div>
            </section>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardPage;
