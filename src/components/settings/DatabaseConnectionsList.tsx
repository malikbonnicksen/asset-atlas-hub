
import React, { useState, useEffect } from "react";
import { Database, Trash } from "lucide-react";
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

interface DatabaseConnection {
  type: "mysql" | "postgres" | "sqlserver";
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
}

interface DatabaseConnectionsListProps {
  onDelete: () => void;
}

const DatabaseConnectionsList = ({ onDelete }: DatabaseConnectionsListProps) => {
  const [connections, setConnections] = useState<DatabaseConnection[]>([]);

  useEffect(() => {
    // Load saved connections from localStorage
    const savedConnection = localStorage.getItem("databaseConnection");
    if (savedConnection) {
      try {
        const parsedConnection = JSON.parse(savedConnection) as DatabaseConnection;
        setConnections([parsedConnection]);
      } catch (error) {
        console.error("Error parsing saved connections", error);
      }
    }
  }, []);

  const handleDeleteConnection = () => {
    localStorage.removeItem("databaseConnection");
    setConnections([]);
    onDelete();
    toast.success("Database connection deleted");
  };

  const getDatabaseIcon = (type: string) => {
    switch (type) {
      case "mysql":
        return "text-blue-500";
      case "postgres":
        return "text-green-500";
      case "sqlserver":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  if (connections.length === 0) {
    return (
      <div className="text-center p-4 border rounded-md bg-gray-50">
        <p className="text-gray-500">No database connections configured</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Host</TableHead>
            <TableHead>Database</TableHead>
            <TableHead>Username</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {connections.map((connection, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center">
                  <Database className={`h-4 w-4 mr-1 ${getDatabaseIcon(connection.type)}`} />
                  {connection.type.charAt(0).toUpperCase() + connection.type.slice(1)}
                </div>
              </TableCell>
              <TableCell>{`${connection.host}:${connection.port}`}</TableCell>
              <TableCell>{connection.database}</TableCell>
              <TableCell>{connection.username}</TableCell>
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
                      <AlertDialogTitle>Delete Database Connection</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this database connection? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteConnection}>
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

export default DatabaseConnectionsList;
