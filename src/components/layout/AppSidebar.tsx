
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Database, 
  LayoutDashboard, 
  Search,
  Settings,
  FileText,
  Folder,
  Menu,
  LogOut,
  FolderArchive,
  FolderInput,
  FolderOpen,
  FolderTree,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent,
  SidebarGroup,
  SidebarTrigger,
  SidebarFooter,
  SidebarInput,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { logout, userEmail } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Submenu state for Categories
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <Sidebar className={cn(className)}>
      <SidebarHeader className="flex items-center p-4">
        <div className="flex items-center space-x-2">
          <Database className="h-6 w-6 text-cmdb-blue" />
          <h1 className="text-xl font-bold">Asset Atlas</h1>
        </div>
        <SidebarTrigger className="ml-auto">
          <Menu className="h-5 w-5" />
        </SidebarTrigger>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="px-2 mb-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-9"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/")}>
                  <Link to="/" className="flex items-center">
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/configuration-items")}>
                  <Link to="/configuration-items" className="flex items-center">
                    <Database className="mr-2 h-5 w-5" />
                    <span>Configuration Items</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/reports")}>
                  <Link to="/reports" className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    <span>Reports</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {/* Enhanced Categories Menu */}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive("/categories") || categoriesOpen}
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                >
                  <div className="flex items-center justify-between w-full cursor-pointer">
                    <div className="flex items-center">
                      <Folder className="mr-2 h-5 w-5" />
                      <span>Categories</span>
                    </div>
                    <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">5</span>
                  </div>
                </SidebarMenuButton>
                
                {categoriesOpen && (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link to="/categories" className="flex items-center">
                          <FolderOpen className="mr-2 h-4 w-4" />
                          <span>All Categories</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link to="/categories?filter=hardware" className="flex items-center">
                          <FolderInput className="mr-2 h-4 w-4" />
                          <span>Hardware</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link to="/categories?filter=software" className="flex items-center">
                          <FolderArchive className="mr-2 h-4 w-4" />
                          <span>Software</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link to="/categories?filter=network" className="flex items-center">
                          <FolderTree className="mr-2 h-4 w-4" />
                          <span>Network</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="mb-2 px-2">
          {userEmail && (
            <p className="text-sm text-muted-foreground truncate">
              Logged in as: {userEmail}
            </p>
          )}
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/settings")}>
              <Link to="/settings" className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="flex items-center text-destructive w-full">
              <LogOut className="mr-2 h-5 w-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
