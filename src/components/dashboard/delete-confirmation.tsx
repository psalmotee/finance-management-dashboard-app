"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmationProps {
  onConfirm: () => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  open?: boolean; 
  onOpenChange?: (open: boolean) => void; 
}

export default function DeleteConfirmation({
  onConfirm,
  trigger,
  title = "Delete Invoice",
  description = "Are you sure you want to delete this invoice? This action cannot be undone.",
  open,
  onOpenChange,
}: DeleteConfirmationProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);

  const isControlled = open !== undefined && onOpenChange;

  const handleOpenChange = (value: boolean) => {
    if (isControlled) {
      onOpenChange!(value);
    } else {
      setInternalOpen(value);
    }
  };

  return (
    <Dialog
      open={isControlled ? open : internalOpen}
      onOpenChange={handleOpenChange}
      
    >
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-md bg-(--gray-5) border-(--gray-2) text-(text-color-1)">
        <DialogHeader>
          <DialogTitle >{title}</DialogTitle>
        </DialogHeader>
        <p className="my-4 text-sm text-gray-600">{description}</p>
        <div className="flex justify-end gap-3">
          <Button
          className="px-4 py-4 bg-(--unpaid-bg) text-(--text-color-1) hover:bg-(--unpaid-bg)/80"
            onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="px-4 py-4 bg-(--unpaid-bg) text-(--unpaid-text) hover:bg-(--unpaid-bg)/80"
            onClick={() => {
              onConfirm();
              handleOpenChange(false);
            }}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
