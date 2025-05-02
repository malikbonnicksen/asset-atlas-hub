
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { ciTypeDistribution, ciEnvironmentDistribution } from "@/data/mockData";

const COLORS = ["#0EA5E9", "#10B981", "#F59E0B", "#6366F1", "#EC4899", "#8B5CF6"];

interface ChartData {
  name: string;
  value: number;
}

const CIDistributionChart: React.FC = () => {
  const [chartData, setChartData] = useState<"type" | "environment">("type");

  const renderActiveChart = () => {
    const data = chartData === "type" ? ciTypeDistribution : ciEnvironmentDistribution;
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [value, name]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>CI Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="type" value={chartData} onValueChange={(value) => setChartData(value as "type" | "environment")}>
          <TabsList className="mb-4">
            <TabsTrigger value="type">By Type</TabsTrigger>
            <TabsTrigger value="environment">By Environment</TabsTrigger>
          </TabsList>
          <TabsContent value="type">
            {renderActiveChart()}
          </TabsContent>
          <TabsContent value="environment">
            {renderActiveChart()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CIDistributionChart;
