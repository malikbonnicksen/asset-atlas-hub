
import React, { useState, useEffect } from "react";
import { Azure, Cloud, Trash } from "lucide-react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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

interface DeviceImport {
  source: "azure" | "intune";
  apiKey: string;
  tenantId: string;
  timestamp: string;
}

interface DeviceImportsListProps {
  onDelete: () => void;
  refreshTrigger: number;
}

const DeviceImportsList = ({ onDelete, refreshTrigger }: DeviceImportsListProps) => {
  const [imports, setImports] = useState<DeviceImport[]>([]);

  useEffect(() => {
    // Load saved imports from localStorage
    const savedImports = localStorage.getItem("deviceImports");
    if (savedImports) {
      try {
        const parsedImports = JSON.parse(savedImports) as DeviceImport[];
        setImports(parsedImports);
      } catch (error) {
        console.error("Error parsing saved imports", error);
      }
    }
  }, [refreshTrigger]);

  const handleDeleteImport = (index: number) => {
    const updatedImports = [...imports];
    updatedImports.splice(index, 1);
    
    localStorage.setItem("deviceImports", JSON.stringify(updatedImports));
    setImports(updatedImports);
    onDelete();
    toast.success("Import history deleted");
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch (error) {
      return dateString;
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "azure":
        return <Azure className="h-4 w-4 mr-1 text-blue-500" />;
      case "intune":
        return <Cloud className="h-4 w-4 mr-1 text-green-500" />;
      default:
        return null;
    }
  };

  if (imports.length === 0) {
    return (
      <div className="text-center p-4 border rounded-md bg-gray-50">
        <p className="text-gray-500">No device imports found</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Source</TableHead>
            <TableHead>Tenant ID</TableHead>
            <TableHead>Import Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {imports.map((importEntry, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center">
                  {getSourceIcon(importEntry.source)}
                  {importEntry.source === "azure" ? "Azure" : "Intune"}
                </div>
              </TableCell>
              <TableCell>{importEntry.tenantId}</TableCell>
              <TableCell>{formatDate(importEntry.timestamp)}</TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Trash className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Import History</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this import history? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteImport(index)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DeviceImportsList;
