
import React from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  ChartPie, 
  FileText, 
  FileChartLine 
} from "lucide-react";

const Reports = () => {
  // Mock reports data
  const reports = [
    {
      id: 1,
      title: "Monthly Asset Utilization",
      description: "Overview of asset usage and allocation across departments",
      icon: ChartPie,
      date: "May 1, 2025"
    },
    {
      id: 2,
      title: "Maintenance Schedule",
      description: "Upcoming maintenance activities for all tracked assets",
      icon: FileText,
      date: "April 28, 2025"
    },
    {
      id: 3,
      title: "Asset Lifecycle Analysis",
      description: "Analysis of asset depreciation and replacement forecasts",
      icon: FileChartLine,
      date: "April 25, 2025"
    }
  ];

  return (
    <div className="flex h-screen">
      <AppSidebar className="h-screen" />
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500">
            View and download reports for your configuration items
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="bg-blue-50 p-2 rounded-md">
                  <report.icon className="h-6 w-6 text-cmdb-blue" />
                </div>
                <div>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <CardDescription className="text-xs">{report.date}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{report.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
