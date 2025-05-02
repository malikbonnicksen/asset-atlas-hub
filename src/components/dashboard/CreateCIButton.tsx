
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const CreateCIButton: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="whitespace-nowrap">
          <Plus className="mr-2 h-4 w-4" />
          Create CI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Configuration Item</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Create CI functionality will be implemented in future versions.
            This dialog is a placeholder for the create operation.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCIButton;
