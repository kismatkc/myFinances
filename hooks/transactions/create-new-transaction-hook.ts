

import API
  from "@/app/axios";
import { toast } from "sonner"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

type CreateTransactionProps = {
  date?: string | Date | null;
  accountId: {
    value: string;
    label: string;
  };
  categoryId: {
    value: string;
    label: string;
  };
  payee: string;
  amount: number | string;
  notes?: string | undefined;
}

const createTransaction = async (transactionDetails: CreateTransactionProps) => {

 try {
  //for backend
   // const transactionDetailsWithValue = { ...transactionDetails, accountId: transactionDetails.accountId.value, categoryId: transactionDetails.categoryId.value }
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
    onMutate: (transactionDetails) => {
      //for optimistic update
      const transactionDetailsWithLabel = { ...transactionDetails, accountId: transactionDetails.accountId.label, categoryId: transactionDetails.categoryId.label }

      
      toast("Transaction added successfully")
      queryClient.cancelQueries(
        {
          queryKey: ['transactions']
        }
      );

      const previousAccounts = queryClient.getQueryData(['transactions']);


      queryClient.setQueryData(['transactions'], (old: { name: string }[]) => [...old, transactionDetailsWithLabel]
      
      );
   
      
      onClose()

      return { previousAccounts }
    },

    onSuccess: (data) => {


      queryClient.invalidateQueries({
        queryKey: ['transactions']
      })





    },
    onError: (_1, _2, context) => {

      queryClient.setQueryData(['transactions'], context)
      toast("transactions not added please try again")
    }
  })
}

export default useCreateNewTransaction;