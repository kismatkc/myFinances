
import API from "@/app/axios";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteTransaction = async ( data: string[]) => {

  
  
  try {
    const response = await API.post("/transaction/delete", data);
    
      
  return response.data;
} catch (error) {
  console.log(error);
  
}

};

import useAddNewAccountModal from "@/hooks/account-sheet-modal";

const useDeleteTransaction = () => {
  const { onClose } = useAddNewAccountModal();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onMutate: async (deletedData) => {
      await queryClient.cancelQueries({ queryKey: ['transactions'] });
      const previousAccounts = queryClient.getQueryData(['transactions']);

      queryClient.setQueryData(['transactions'], (old: string[]) => {

        let newData = old.filter((transaction: any) => !deletedData.includes(transaction.id));
        
        return newData


      });

      return { previousAccounts };
    },
    onError: (err, deletedData, context) => {
      queryClient.setQueryData(['transactions'], context?.previousAccounts);
      toast("Transaction not deleted, please try again");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      onClose();
    },
    onSuccess: () => {
      toast("Transaction has been deleted");
    }
  });
};

export default useDeleteTransaction;