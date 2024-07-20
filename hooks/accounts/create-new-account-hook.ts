

import API
 from "@/app/axios";
import { formData } from "@/components/new-account-form";
import { toast } from "sonner"
import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query"

const createUser = async (data: formData)=> {
   const response = await API.post("/account",data);
return response.data;
}
import useAddNewAccountModal  from "@/hooks/accounts/add-new-account-modal";

const useCreateNewAccount = ()=>{
  const { onClose } = useAddNewAccountModal();
const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess:()=>{
      toast("Account has been created")
      queryClient.invalidateQueries({
        queryKey: ['accounts']
      })
                                   onClose()
      
    },
    onError: ()=>{
      toast("Account not added please try again")
    }
  })
}

export default useCreateNewAccount;