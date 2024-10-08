

import API
  from "@/app/axios";
import { formData } from "@/components/new-account-form";
import { toast } from "sonner"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

const createUser = async (data: {name: string}) => {
  let dataWithModelName = {...data,modelName: "Account"}

  const response = await API.post("/name/create", dataWithModelName);
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
          queryKey: ['accounts']
        }
      );

      const previousAccounts = queryClient.getQueryData(['accounts']);


      queryClient.setQueryData(['accounts'], (old: { name: string }[]) => [...old, newAccount]
      
      );
   
      
      onClose()

      return  previousAccounts 
    },

    onSuccess: (data) => {
console.log(data);

      queryClient.invalidateQueries({
        queryKey: ['accounts']
      })





    },
    onError: (error,vari,context) => {
      
      
      queryClient.setQueryData(['accounts'], context)
      toast("Account not added please try again")
    }
  })
}

export default useCreateNewAccount;