
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Database, Menu, Filter, Search } from "lucide-react";
import CreateCIButton from "@/components/dashboard/CreateCIButton";

// Define the ConfigItem type for type safety
export interface ConfigItem {
  id: string;
  name: string;
  type: string;
  status: string;
  owner: string;
  lastUpdated: string;
}

// Mock data for configuration items
const mockConfigItems = [
  { 
    id: "CI-1001", 
    name: "Web Server", 
    type: "Server", 
    status: "Active", 
    owner: "IT Infrastructure",
    lastUpdated: "2025-04-28"
  },
  { 
    id: "CI-1002", 
    name: "Database Server", 
    type: "Server", 
    status: "Active", 
    owner: "Database Team",
    lastUpdated: "2025-04-26"
  },
  { 
    id: "CI-1003", 
    name: "Employee Portal", 
    type: "Application", 
    status: "Under Maintenance", 
    owner: "Internal Applications",
    lastUpdated: "2025-04-25"
  },
  { 
    id: "CI-1004", 
    name: "VPN Gateway", 
    type: "Network", 
    status: "Active", 
    owner: "Network Operations",
    lastUpdated: "2025-04-22"
  },
  { 
    id: "CI-1005", 
    name: "Customer Relationship Management", 
    type: "Application", 
    status: "Active", 
    owner: "Sales Operations",
    lastUpdated: "2025-04-20"
  },
  { 
    id: "CI-1006", 
    name: "File Storage System", 
    type: "Storage", 
    status: "Active", 
    owner: "Infrastructure Team",
    lastUpdated: "2025-04-18"
  },
];

// Create a custom event for CI creation
export const addConfigItem = (newItem: Omit<ConfigItem, "id" | "lastUpdated">) => {
  // Generate a new ID
  const newId = `CI-${1000 + Math.floor(Math.random() * 9000)}`;
  
  // Get current date
  const today = new Date().toISOString().split('T')[0];
  
  // Create the complete item
  const completeItem: ConfigItem = {
    id: newId,
    name: newItem.name,
    type: newItem.type,
    status: newItem.status,
    owner: newItem.owner,
    lastUpdated: today
  };
  
  // Dispatch a custom event with the new item data
  const event = new CustomEvent('ci-created', { detail: completeItem });
  window.dispatchEvent(event);
  
  return completeItem;
};

const ConfigurationItems: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [configItems, setConfigItems] = useState<ConfigItem[]>(mockConfigItems);
  
  // Listen for new CI creation events
  React.useEffect(() => {
    const handleCICreated = (event: CustomEvent<ConfigItem>) => {
      setConfigItems(prev => [event.detail, ...prev]);
    };
    
    // Add event listener
    window.addEventListener('ci-created', handleCICreated as EventListener);
    
    // Cleanup
    return () => {
      window.removeEventListener('ci-created', handleCICreated as EventListener);
    };
  }, []);
  
  // Filter configuration items based on search term
  const filteredItems = configItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 overflow-auto">
          <header className="sticky top-0 z-30 border-b bg-background">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <Menu className="h-5 w-5 lg:hidden" />
                <Database className="h-5 w-5 text-cmdb-blue hidden sm:block" />
                <h1 className="text-xl font-semibold">Configuration Items</h1>
              </div>
              <CreateCIButton />
            </div>
          </header>

          <div className="p-4 md:p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex w-full max-w-md items-center">
                <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search configuration items..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <TableRow key={item.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === "Active" ? "bg-green-100 text-green-800" : 
                            item.status === "Under Maintenance" ? "bg-amber-100 text-amber-800" : 
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {item.status}
                          </span>
                        </TableCell>
                        <TableCell>{item.owner}</TableCell>
                        <TableCell>{item.lastUpdated}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        No configuration items found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ConfigurationItems;
