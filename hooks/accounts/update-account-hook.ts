

import API
 from "@/app/axios";

import { toast } from "sonner"
import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query"

const updateUser = async (data: {id: string})=> {
   const response = await API.patch("/account/update",data);
  console.log(response.data);
return response.data;
}
import useAddNewAccountModal  from "@/hooks/accounts/account-sheet-modal";

const useUpdateAccount = ()=>{
  const { onClose } = useAddNewAccountModal();
const queryClient = useQueryClient();
  return useMutation({

    mutationFn: updateUser,
    onMutate: (updateAccount)=>{
      toast("Account updated successfully")
      queryClient.cancelQueries(
         ['accounts']
      );

      const previousAccounts = queryClient.getQueryData(['accounts'] );

      queryClient.setQueryData(   ['accounts'],(old)=> [...old,updateAccount]
      );
      onClose()
    },

    onSuccess:()=>{

      queryClient.invalidateQueries({
        queryKey: ['accounts']
      })





    },
    onError: ()=>{
      toast("Account not updated please try again")
    }
  })
}

export default useUpdateAccount;