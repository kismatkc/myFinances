

import API
  from "@/app/axios";
import { toast } from "sonner"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

type CreateTransactionProps = {
  date: string | Date;
  accountId: string;
  categoryId: string;
  payee: string;
  amount: number | string;
  notes?: string | undefined;
}

const createTransaction = async (transactionDetails: CreateTransactionProps) => {

 try {

   const response = await API.post("/transaction/create", transactionDetails);
   return response.data;
 } catch (error) {
  console.log(error,"from isnide the createtrascation")
 }
}
import useAddNewAccountModal from "@/hooks/account-sheet-modal";

const useCreateNewTransaction = () => {
  const { onClose } = useAddNewAccountModal();
  const queryClient = useQueryClient();
  return useMutation({

    mutationFn: createTransaction,
    onMutate: (newTransaction) => {
     
      
      toast("Transaction added successfully")
      queryClient.cancelQueries(
        {
          queryKey: ['transactions']
        }
      );

      const previousAccounts = queryClient.getQueryData(['transactions']);


      queryClient.setQueryData(['transactions'], (old: { name: string }[]) => [...old, newTransaction]
      
      );
   
      
      onClose()

      return { previousAccounts }
    },

    onSuccess: (data) => {
console.log(data);

      queryClient.invalidateQueries({
        queryKey: ['accounts']
      })





    },
    onError: (context: { previousAccounts: { id: string, name: string }[] }) => {
      queryClient.setQueryData(['accounts'], context?.previousAccounts)
      toast("Account not added please try again")
    }
  })
}

export default useCreateNewTransaction;