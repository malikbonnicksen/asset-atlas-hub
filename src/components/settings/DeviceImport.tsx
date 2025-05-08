
import React, { useState } from "react";
import { Import, Cloud } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const importFormSchema = z.object({
  source: z.enum(["azure", "intune"], {
    required_error: "Please select a source.",
  }),
  apiKey: z.string().min(1, "API Key is required"),
  tenantId: z.string().min(1, "Tenant ID is required"),
});

type ImportFormValues = z.infer<typeof importFormSchema>;

interface DeviceImportProps {
  onImportComplete: () => void;
}

const DeviceImport = ({ onImportComplete }: DeviceImportProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<ImportFormValues>({
    resolver: zodResolver(importFormSchema),
    defaultValues: {
      source: "azure",
      apiKey: "",
      tenantId: "",
    },
  });

  const onSubmit = (values: ImportFormValues) => {
    // In a real application, this would make an API call to Azure/Intune
    // For now, just simulate a successful import
    console.log("Importing devices from:", values);

    // Store the import configuration in localStorage
    const importConfig = {
      source: values.source,
      apiKey: values.apiKey,
      tenantId: values.tenantId,
      timestamp: new Date().toISOString()
    };

    // Get existing imports from localStorage
    const existingImportsStr = localStorage.getItem("deviceImports");
    const existingImports = existingImportsStr ? JSON.parse(existingImportsStr) : [];
    
    // Add new import to the list
    localStorage.setItem("deviceImports", JSON.stringify([...existingImports, importConfig]));

    // Close dialog and notify user
    setIsDialogOpen(false);
    form.reset();
    onImportComplete();
    toast.success(`Devices imported from ${values.source === "azure" ? "Azure" : "Intune"}`);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Import className="h-4 w-4 mr-2" />
          Import Devices
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Devices</DialogTitle>
          <DialogDescription>
            Import devices from Azure or Intune. Enter your API credentials to continue.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Import Source</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="azure">
                        <div className="flex items-center">
                          <Cloud className="h-4 w-4 mr-2 text-blue-500" />
                          Azure
                        </div>
                      </SelectItem>
                      <SelectItem value="intune">
                        <div className="flex items-center">
                          <Cloud className="h-4 w-4 mr-2" />
                          Intune
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your API key" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tenantId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tenant ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your tenant ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Import Devices</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceImport;
