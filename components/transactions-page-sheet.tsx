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
import useGetAllAccounts from "@/hooks/accounts/get-all-accounts-hook";
import useGetAllCategories from "@/hooks/categories/get-all-categories-hook";
import useCreateNewAccount from "@/hooks/accounts/create-new-account-hook";
import useCreateNewCategory from "@/hooks/categories/create-new-category-hook";
import { Loader2 } from "lucide-react";



const NewAccountSheet = () => {
  const { isOpen, onOpen, onClose, actionType } = accountSheetModal(); //this hook is really handy
  //options realted logic for react select
  const {data: accounts,isLoading: accountsIsLoading}= useGetAllAccounts();
  const accountOptions = accounts.map((account)=>({label: account.name,value: account._id}))
  const createNewAccountOption = useCreateNewAccount();

   const { data: categories, isLoading: categoriesIsLoading } =
     useGetAllCategories();
  const categoryOptions = accounts.map((category) => ({
    label: category.name,
    value: category._id,
  }));
   const createNewCategoryOption = useCreateNewCategory();

   const showLoader = accountsIsLoading || categoriesIsLoading
const disabled = createNewAccountOption.isPending || createNewCategoryOption.isPending



  if (actionType === "add") {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="overflow-y-auto">
          <DialogTitle>
            <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
          </DialogTitle>
          <SheetHeader>
            <SheetTitle>New transactions</SheetTitle>
            <SheetDescription>Add new transactions</SheetDescription>
          </SheetHeader>
      {    showLoader ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin" />
          </div>
          ): (
          <NewTransactionForm  disabled={disabled}
  categoryOptions={categoryOptions}
  onCreateCategory = {createNewCategoryOption.mutate}
  accountOptions= {accountOptions}
  onCreateAccount={createNewAccountOption.mutate} />)}
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

          {showLoader ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin" />
            </div>
          ) : (
            // <NewTransactionForm />
            <div>
              
            </div>
          )}
        </SheetContent>
      </Sheet>
    );
  }
};

export default NewAccountSheet;
