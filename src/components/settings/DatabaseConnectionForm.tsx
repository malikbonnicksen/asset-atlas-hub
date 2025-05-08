
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Database, Shield } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const databaseConnectionSchema = z.object({
  type: z.enum(["mysql", "postgres", "sqlserver"], {
    required_error: "Please select a database type.",
  }),
  host: z.string().min(1, "Host is required"),
  port: z.string().min(1, "Port is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  database: z.string().min(1, "Database name is required"),
});

type DatabaseConnectionValues = z.infer<typeof databaseConnectionSchema>;

interface DatabaseConnectionFormProps {
  onSubmit: (data: DatabaseConnectionValues) => void;
}

const DatabaseConnectionForm = ({ onSubmit }: DatabaseConnectionFormProps) => {
  const form = useForm<DatabaseConnectionValues>({
    resolver: zodResolver(databaseConnectionSchema),
    defaultValues: {
      type: "mysql",
      host: "",
      port: "",
      username: "",
      password: "",
      database: "",
    },
  });

  const handleSubmit = (values: DatabaseConnectionValues) => {
    // In a real app, you would save this to localStorage or a server
    localStorage.setItem("databaseConnection", JSON.stringify(values));
    onSubmit(values);
    toast.success("Database connection saved successfully");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Database Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mysql" id="mysql" />
                    <Label htmlFor="mysql" className="flex items-center">
                      <Database className="h-4 w-4 mr-1 text-blue-500" />
                      MySQL
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="postgres" id="postgres" />
                    <Label htmlFor="postgres" className="flex items-center">
                      <Database className="h-4 w-4 mr-1 text-green-500" />
                      PostgreSQL
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sqlserver" id="sqlserver" />
                    <Label htmlFor="sqlserver" className="flex items-center">
                      <Database className="h-4 w-4 mr-1 text-red-500" />
                      SQL Server
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="host"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Host</FormLabel>
                <FormControl>
                  <Input placeholder="localhost" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="port"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Port</FormLabel>
                <FormControl>
                  <Input placeholder="3306" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Database username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Database password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="database"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Database Name</FormLabel>
              <FormControl>
                <Input placeholder="Database name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full md:w-auto">
          <Database className="h-4 w-4 mr-2" />
          Save Connection
        </Button>
      </form>
    </Form>
  );
};

export default DatabaseConnectionForm;
