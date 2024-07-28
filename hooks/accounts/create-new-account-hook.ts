

import API
 from "@/app/axios";
import { formData } from "@/components/new-account-form";
import { toast } from "sonner"
import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query"

const createUser = async (data: formData)=> {
   const response = await API.post("/account",data);
return response.data;
}
import useAddNewAccountModal  from "@/hooks/accounts/account-sheet-modal";

const useCreateNewAccount = ()=>{
  const { onClose } = useAddNewAccountModal();
const queryClient = useQueryClient();
  return useMutation({
    
    mutationFn: createUser,
    onMutate: (newAccount)=>{
      toast("Account added successfully")
      queryClient.cancelQueries(
        {
          queryKey:    ['accounts']
        }
      );
      
      const previousAccounts = queryClient.getQueryData(['accounts'] );
      
      queryClient.setQueryData(   ['accounts'],(old: {id:string,name:string}[])=> [...old,newAccount]
      );
      onClose()
    },
    
    onSuccess:()=>{
      
      queryClient.invalidateQueries({
        queryKey: ['accounts']
      })
     
      
      
                                   
      
    },
    onError: ()=>{
      toast("Account not added please try again")
    }
  })
}

export default useCreateNewAccount;