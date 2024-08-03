
import API from "@/app/axios";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteUser = async (data: { data: string[]}) => {

  let dataWithModelName = {...data,modelName: "Account"}
  
  try {
    const response = await API.post("/name/delete", dataWithModelName);
    
      
  return response.data;
} catch (error) {
  console.log(error);
  
}

};

import useAddNewAccountModal from "@/hooks/account-sheet-modal";

const useDeleteAccount = () => {
  const { onClose } = useAddNewAccountModal();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onMutate: async (deletedData) => {
      await queryClient.cancelQueries({ queryKey: ['accounts'] });
      const previousAccounts = queryClient.getQueryData(['accounts']);

      queryClient.setQueryData(['accounts'], (old: string[]) => {

        let newData = old.filter((account: any) => !deletedData.data.includes(account.id));
        
        return newData


      });

      return { previousAccounts };
    },
    onError: (err, deletedData, context) => {
      queryClient.setQueryData(['accounts'], context?.previousAccounts);
      toast("Account not deleted, please try again");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      onClose();
    },
    onSuccess: () => {
      toast("Account has been deleted");
    }
  });
};

export default useDeleteAccount;