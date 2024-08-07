import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import EditAccountForm from "./account-edit-form";

import accountSheetModal from "@/hooks/account-sheet-modal";
import NewAccountForm from "./new-account-form";

const NewAccountSheet = () => {
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
              Create new account to track your transcations
            </SheetDescription>
          </SheetHeader>
          <NewAccountForm />
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
            <SheetDescription>Update account details</SheetDescription>
          </SheetHeader>

          <EditAccountForm />
        </SheetContent>
      </Sheet>
    );
  }
};

export default NewAccountSheet;
