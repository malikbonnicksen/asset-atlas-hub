
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Trash, Shield, UserPlus, UserMinus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth, type UserRole, type User } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import AppLayout from "@/components/layout/AppLayout";

const userFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["admin", "user"], {
    required_error: "Please select a role.",
  }),
});

type UserFormValues = z.infer<typeof userFormSchema>;

const Settings = () => {
  const { users, addUser, removeUser, currentUser, hasRole, deleteAllData } = useAuth();
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      role: "user",
    },
  });

  const onAddUser = (values: UserFormValues) => {
    // Check if user already exists
    if (users.some(user => user.email === values.email)) {
      toast({
        title: "Error",
        description: "User already exists",
        variant: "destructive",
      });
      return;
    }

    // Add new user
    const success = addUser(values.email, values.role);
    
    if (success) {
      toast({
        title: "Success",
        description: "User added successfully",
      });
      form.reset();
    } else {
      toast({
        title: "Error",
        description: "Failed to add user",
        variant: "destructive",
      });
    }
  };

  const handleRemoveUser = (email: string) => {
    // Prevent removing yourself
    if (email === currentUser?.email) {
      toast({
        title: "Error",
        description: "You cannot remove your own account",
        variant: "destructive",
      });
      return;
    }

    removeUser(email);
    toast({
      title: "Success",
      description: "User removed successfully",
    });
  };

  const handleDeleteAllData = () => {
    deleteAllData();
    setIsDeleteDialogOpen(false);
    toast({
      title: "Success",
      description: "All data has been deleted",
    });
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        {/* User Management Section */}
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Add or remove users and set their permission levels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current users table */}
              <div>
                <h3 className="text-lg font-medium mb-2">Users</h3>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground py-4">
                            No users found
                          </TableCell>
                        </TableRow>
                      ) : (
                        users.map((user) => (
                          <TableRow key={user.email}>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                {user.role === "admin" ? (
                                  <Shield className="h-4 w-4 mr-1 text-blue-500" />
                                ) : (
                                  <Shield className="h-4 w-4 mr-1 text-gray-500" />
                                )}
                                {user.role === "admin" ? "Administrator" : "User"}
                                {user.email === currentUser?.email && (
                                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                    You
                                  </span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              {user.email !== currentUser?.email && (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <UserMinus className="h-4 w-4 mr-1" />
                                      Remove
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Remove User</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to remove this user? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleRemoveUser(user.email)}>
                                        Remove
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Add new user form */}
              {hasRole("admin") && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-medium mb-4">Add New User</h3>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onAddUser)} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="email@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Role</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="admin" id="admin" />
                                      <Label htmlFor="admin" className="flex items-center">
                                        <Shield className="h-4 w-4 mr-1 text-blue-500" />
                                        Administrator
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="user" id="user" />
                                      <Label htmlFor="user" className="flex items-center">
                                        <Shield className="h-4 w-4 mr-1 text-gray-500" />
                                        User
                                      </Label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button type="submit">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Add User
                        </Button>
                      </form>
                    </Form>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Danger Zone */}
          {hasRole("admin") && (
            <Card className="border-red-200">
              <CardHeader className="text-red-600">
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription className="text-red-500">
                  Irreversible actions that affect your account and data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash className="h-4 w-4 mr-2" />
                        Delete All Data
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete All Data</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will delete all application data except user accounts. This action cannot be undone.
                          Are you sure you want to continue?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteAllData}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete All Data
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
