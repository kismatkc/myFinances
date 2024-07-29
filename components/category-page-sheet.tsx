import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import EditAccountForm from "./category-edit-form";

import accountSheetModal from "@/hooks/account-sheet-modal";
import NewCategoryForm from "./new-category-form";

const NewCategorySheet = () => {
  const { isOpen, onOpen, onClose, actionType } = accountSheetModal(); //this hook is really handy

  if (actionType === "add") {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="overflow-y-auto">
          <DialogTitle>
            <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
          </DialogTitle>

          <SheetHeader>
            <SheetTitle>New accounts</SheetTitle>
            <SheetDescription>
              Create new category to track your transcations
            </SheetDescription>
          </SheetHeader>
          <NewCategoryForm />
        </SheetContent>
      </Sheet>
    );
  } else {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="overflow-y-auto">
          <DialogTitle>
            <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
          </DialogTitle>

          <SheetHeader>
            <SheetTitle>Edit accounts</SheetTitle>
            <SheetDescription>Update category details</SheetDescription>
          </SheetHeader>

          <EditAccountForm />
        </SheetContent>
      </Sheet>
    );
  }
};

export default NewCategorySheet;
