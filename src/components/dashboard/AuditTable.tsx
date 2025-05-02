
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Audit } from "@/data/mockData";

interface AuditTableProps {
  audits: Audit[];
}

const AuditTable: React.FC<AuditTableProps> = ({ audits }) => {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case "create":
        return <Badge className="bg-green-500">Create</Badge>;
      case "update":
        return <Badge className="bg-blue-500">Update</Badge>;
      case "delete":
        return <Badge className="bg-red-500">Delete</Badge>;
      case "relate":
        return <Badge className="bg-purple-500">Relate</Badge>;
      default:
        return <Badge>{action}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>CI Name</TableHead>
            <TableHead>User</TableHead>
            <TableHead className="hidden md:table-cell">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {audits.map((audit) => (
            <TableRow key={audit.id}>
              <TableCell className="whitespace-nowrap">
                {formatDate(audit.timestamp)}
              </TableCell>
              <TableCell>{getActionBadge(audit.action)}</TableCell>
              <TableCell>{audit.ciName}</TableCell>
              <TableCell className="whitespace-nowrap">{audit.user}</TableCell>
              <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                {audit.details}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AuditTable;
