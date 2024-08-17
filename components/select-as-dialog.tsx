import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetAllAccounts from '@/hooks/accounts/get-all-accounts-hook';
import useGetAllcategories from "@/hooks/categories/get-all-categories-hook";
import useConfirmation from "@/hooks/confirmationDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from 'lucide-react';
import { Button } from './ui/button';
import useCreateNewTransaction from "@/hooks/transactions/create-new-transaction-hook";
import useInputCsv, { CSVDataProps } from './inputcsvfile-dialog';

type selectedTransactionProps ={
    amount: string | number,
    categoryId: string,
    date: string,
    notes: string,
    payee: string
}

type SelectAsDialogProps = [
  SelectUi: ({
    selectedTransaction,
    cancelImport
  }: {
    selectedTransaction: selectedTransactionProps[],
              cancelImport?: (cancel: CSVDataProps[])=> void;
    
  }) => React.JSX.Element,
  setOpen: (open: boolean) => void,
  account: string,
  account: string
];



const SelectAsDialog = (): SelectAsDialogProps => {

    const { data: accounts, isLoading: accountsIsLoading } =
      useGetAllAccounts();
       const { data: categories, isLoading: categoriesIsLoading } =
         useGetAllcategories();
    const accountOptions = accounts.map((account) => ({
      label: account.name,
      value: account._id,
    }));
      const categoryOptions = categories.map((category) => ({
        label: category.name,
        value: category._id,
      }));
  const [open, setOpen] = useState<boolean>(false);
  const [ConfirmationModalUi, openConfirmationModal] = useConfirmation();
  const [account, setAccount] = useState("");
  const [category, setCategory] = useState("");

const mutation = useCreateNewTransaction();
  const SelectUi = ({
    selectedTransaction,
    cancelImport
  }: {
    selectedTransaction: selectedTransactionProps[],
                  cancelImport?: (cancel: CSVDataProps[])=> void;

  }) => (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose the associated account and category</DialogTitle>
          <DialogDescription>
            Please select from existing accounts and categories
          </DialogDescription>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X
              className="h-4 w-4"
              onClick={() => {
                setOpen(false);
              }}
            />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogFooter>
            <Select
              value={account}
              onValueChange={(value) => {
               
                setAccount(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Accounts" />
              </SelectTrigger>
              <SelectContent>
                {accountOptions.map((account) => (
                  <SelectItem value={account.value} key={account.value}>
                    {account.label}
                  </SelectItem>
                ))}
              </SelectContent>
         
            </Select>
            <Select
              value={category}
              onValueChange={(value) => {
                
                setCategory(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((category) => (
                  <SelectItem value={category.value} key={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
              <Button
                onClick={async () => {
                  const yes = await openConfirmationModal();
                  if (yes) {
                   const accountObject = accountOptions.find((accountFromApi)=> accountFromApi.value === account )
                   const categoryObject = categoryOptions.find((categoryFromApi)=> categoryFromApi.value === category )
                   if(accountObject && categoryObject){
                   selectedTransaction.map((transactionFromCsv)=>{
 mutation.mutate({...transactionFromCsv,accountId: accountObject,categoryId: categoryObject})
                   })

                }
                // @ts-ignore
cancelImport()
                    setOpen(false);
                    
       
                  }
                }}
                variant="positive"
                size="lg"
                className="ml-4"
                disabled={!(account && category) ? true: false}
              >
                Yes
              </Button>
            </Select>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
      <ConfirmationModalUi
        title="Are you absolutely sure?"
        description={
          "This action cannot be undone. This will permanently add the transaction to our servers."
        }
      />
    </Dialog>
  );

  return [SelectUi, setOpen,account,category];
};

export default SelectAsDialog