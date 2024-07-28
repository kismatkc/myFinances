

import API
  from "@/app/axios";
import { formData } from "@/components/new-account-form";
import { toast } from "sonner"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

const createUser = async (data: formData) => {
  const response = await API.post("/category", data);
  return response.data;
}
import useAddNewAccountModal from "@/hooks/account-sheet-modal";

const useCreateNewAccount = () => {
  const { onClose } = useAddNewAccountModal();
  const queryClient = useQueryClient();
  return useMutation({

    mutationFn: createUser,
    onMutate: (newAccount) => {
      toast("Account added successfully")
      queryClient.cancelQueries(
        {
          queryKey: ['categories']
        }
      );

      const previousAccounts = queryClient.getQueryData(['categories']);

      queryClient.setQueryData(['categories'], (old: { id: string, name: string }[]) => [...old, newAccount]
      );
      onClose()

      return { previousAccounts }
    },

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ['categories']
      })





    },
    onError: (context: { previousAccounts: { id: string, name: string }[] }) => {
      queryClient.setQueryData(['categories'], context?.previousAccounts)
      toast("Account not added please try again")
    }
  })
}

export default useCreateNewAccount;