

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
  
const updateUser = async (transactionDetails: transactionDetailsProps) => {
  
  const response = await API.patch("/transaction/update",transactionDetails );

  return response.data;
}
import useAccountModal from "@/hooks/account-sheet-modal";

const useUpdateAccount = () => {

  const { onClose } = useAccountModal();
  const queryClient = useQueryClient();
  return useMutation({

    mutationFn: updateUser,
    onMutate: (updatedAccount) => {
      console.log(updatedAccount,"update");
      toast("Account updated successfully")
      queryClient.cancelQueries(
        {
          queryKey: ['accounts']
        }

      );

      const previousAccounts = queryClient.getQueryData(['accounts']);



      queryClient.setQueryData(['accounts'], (old: { id: string, name: string }[]) => {

        const newData = old.map((account) => {

          if (account.id === updatedAccount._id) {
            return { ...account, name: updatedAccount.name };
          }
          return account

        }
        )

        return newData
      })
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

export default useUpdateAccount;



