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
import NewTransactionForm from "./new-transaction-form";


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
            <SheetTitle>New transactions</SheetTitle>
            <SheetDescription>
              Add new transactions
            </SheetDescription>
          </SheetHeader>
          <NewTransactionForm/>
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
            <SheetTitle>Edit transactions</SheetTitle>
            <SheetDescription>Update transactions details</SheetDescription>
          </SheetHeader>

          <NewTransactionForm />
        </SheetContent>
      </Sheet>
    );
  }
};

export default NewAccountSheet;
