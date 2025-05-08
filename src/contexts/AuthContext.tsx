import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "admin" | "user";

export type User = {
  email: string;
  role: UserRole;
};

type AuthContextType = {
  isLoggedIn: boolean;
  userEmail: string | null;
  currentUser: User | null;
  users: User[];
  login: (email: string) => void;
  logout: () => void;
  register: (email: string, role: UserRole) => void;
  addUser: (email: string, role: UserRole) => void;
  removeUser: (email: string) => void;
  hasRole: (role: UserRole) => boolean;
  deleteAllData: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedEmail = localStorage.getItem("userEmail");
    const storedUsers = localStorage.getItem("users");
    
    if (storedIsLoggedIn && storedEmail) {
      setIsLoggedIn(true);
      setUserEmail(storedEmail);
      
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers) as User[];
        setUsers(parsedUsers);
        
        // Find and set current user
        const currentUserData = parsedUsers.find(user => user.email === storedEmail);
        if (currentUserData) {
          setCurrentUser(currentUserData);
        }
      }
    }
  }, []);

  const login = (email: string) => {
    const storedUsers = localStorage.getItem("users");
    let usersList: User[] = [];
    
    if (storedUsers) {
      usersList = JSON.parse(storedUsers);
    }
    
    // Find user in the list
    const user = usersList.find(u => u.email === email);
    
    if (!user) {
      console.error("User not found");
      return;
    }
    
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    setIsLoggedIn(true);
    setUserEmail(email);
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserEmail(null);
    setCurrentUser(null);
  };
  
  const register = (email: string, role: UserRole) => {
    // Create first user account
    const newUser: User = { email, role };
    const updatedUsers = [newUser];
    
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };
  
  const addUser = (email: string, role: UserRole) => {
    const storedUsers = localStorage.getItem("users");
    let usersList: User[] = [];
    
    if (storedUsers) {
      usersList = JSON.parse(storedUsers);
    }
    
    // Check if user already exists
    if (usersList.some(user => user.email === email)) {
      return false;
    }
    
    const newUser: User = { email, role };
    const updatedUsers = [...usersList, newUser];
    
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    return true;
  };
  
  const removeUser = (email: string) => {
    const storedUsers = localStorage.getItem("users");
    let usersList: User[] = [];
    
    if (storedUsers) {
      usersList = JSON.parse(storedUsers);
      const updatedUsers = usersList.filter(user => user.email !== email);
      
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    }
  };
  
  const hasRole = (role: UserRole) => {
    return currentUser?.role === role;
  };
  
  const deleteAllData = () => {
    // Keep users and login state
    const usersToKeep = localStorage.getItem("users");
    const isLoggedInValue = localStorage.getItem("isLoggedIn");
    const userEmailValue = localStorage.getItem("userEmail");
    
    // Clear all localStorage
    localStorage.clear();
    
    // Restore users and login state
    if (usersToKeep) localStorage.setItem("users", usersToKeep);
    if (isLoggedInValue) localStorage.setItem("isLoggedIn", isLoggedInValue);
    if (userEmailValue) localStorage.setItem("userEmail", userEmailValue);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isLoggedIn, 
        userEmail, 
        currentUser,
        users,
        login, 
        logout,
        register,
        addUser,
        removeUser,
        hasRole,
        deleteAllData 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
