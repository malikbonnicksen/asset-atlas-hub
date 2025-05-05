
import React, { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { 
  Folder,
  Plus,
  FolderEdit,
  Trash2,
  Menu
} from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreateCategoryDialog } from "@/components/categories/CreateCategoryDialog";
import { toast } from "sonner";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Define category type
interface Category {
  id: number;
  name: string;
  description: string;
  itemCount: number;
  color: string;
}

const Categories = () => {
  // Mock categories data
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Hardware",
      description: "Physical equipment including servers, desktops, and networking devices",
      itemCount: 127,
      color: "blue"
    },
    {
      id: 2,
      name: "Software",
      description: "Applications, operating systems, and middleware",
      itemCount: 94,
      color: "green"
    },
    {
      id: 3,
      name: "Network",
      description: "Routers, switches, and connectivity equipment",
      itemCount: 53,
      color: "amber"
    },
    {
      id: 4,
      name: "Cloud Services",
      description: "Virtual machines, storage, and cloud-based resources",
      itemCount: 86,
      color: "purple"
    },
    {
      id: 5,
      name: "IoT Devices",
      description: "Connected devices and sensors",
      itemCount: 42,
      color: "rose"
    }
  ]);

  // Handler to add a new category
  const handleAddCategory = (category: Category) => {
    setCategories([...categories, category]);
  };

  // Handler to delete a category
  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter(category => category.id !== id));
    toast.success("Category deleted successfully");
  };

  // Get color class based on category color
  const getColorClass = (color: string) => {
    switch(color) {
      case "blue": return "bg-blue-100 text-blue-800";
      case "green": return "bg-green-100 text-green-800";
      case "amber": return "bg-amber-100 text-amber-800";
      case "purple": return "bg-purple-100 text-purple-800";
      case "rose": return "bg-rose-100 text-rose-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar className="h-screen" />
        <div className="flex-1 overflow-auto">
          <header className="sticky top-0 z-30 border-b bg-background">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </SidebarTrigger>
                <h1 className="text-xl font-semibold">Categories</h1>
              </div>
              <CreateCategoryDialog onCategoryCreate={handleAddCategory} />
            </div>
          </header>

          <main className="p-4 md:p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Manage Categories</h2>
                <p className="text-sm text-muted-foreground">
                  Create, edit and organize your configuration item categories
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card key={category.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-md ${getColorClass(category.color)}`}>
                          <Folder className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                      </div>
                      <Badge variant="outline">{category.itemCount} items</Badge>
                    </div>
                    <CardDescription className="text-sm mt-2">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <FolderEdit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Category</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{category.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteCategory(category.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Categories;
