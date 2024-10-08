

import API
  from "@/app/axios";

import { toast } from "sonner"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
type transactionDetailsProps ={
  date: string,
      accountId: {label: string,value: string},
      categoryId: {label: string,value: string},
      payee: string,
      amount: number,
      notes: string
                               }
  
const updateTransaction= async (transactionDetails: transactionDetailsProps) => {
  
  const response = await API.patch("/transaction/update",transactionDetails );

  return response.data;
}
import useAccountModal from "@/hooks/account-sheet-modal";

const useUpdateTransaction = () => {

  const { onClose } = useAccountModal();
  const queryClient = useQueryClient();
  return useMutation({

    mutationFn: updateTransaction,
    onMutate: (updatedTransaction) => {
      console.log(updatedTransaction,"update");
      toast("transaction updated successfully")
      queryClient.cancelQueries(
        {
          queryKey: ['transactions']
        }

      );

      const previousAccounts = queryClient.getQueryData(["transactions"]);



      queryClient.setQueryData(['transactions'], (old: { id: string, name: string }[]) => ({...})

        
      onClose()
      return { previousAccounts }
    },

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ['accounts']
      })





    },

    onError: (err, deletedData, context) => {
      queryClient.setQueryData(['accounts'], context?.previousAccounts)
      toast("Account not updated please try again")
    }
  })
}

export default useUpdateTransaction;



