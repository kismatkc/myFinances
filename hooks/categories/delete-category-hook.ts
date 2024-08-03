

import API from "@/app/axios";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteUser = async (data: { data: string[] }) => {
    let dataWithModelName = {...data,modelName: "Category"}
  const response = await API.post("/name/delete", dataWithModelName);
  return response.data;
};

import useAddNewAccountModal from "@/hooks/account-sheet-modal";

const useDeleteAccount = () => {
  const { onClose } = useAddNewAccountModal();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onMutate: async (deletedData) => {
      await queryClient.cancelQueries({ queryKey: ['categories'] });
      const previousAccounts = queryClient.getQueryData(['categories']);

      queryClient.setQueryData(['categories'], (old: string[]) => {

        let newData = old.filter((account: any) => !deletedData.data.includes(account.id));
        console.log(newData)
        return newData


      });

      return { previousAccounts };
    },
    onError: (err, deletedData, context) => {
      queryClient.setQueryData(['categories'], context?.previousAccounts);
      toast("category not deleted, please try again");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      onClose();
    },
    onSuccess: () => {
      toast("category has been deleted");
    }
  });
};

export default useDeleteAccount;