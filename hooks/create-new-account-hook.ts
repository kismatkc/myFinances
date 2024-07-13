import {useMutation,useQueryClient} from "@tanstack/react-query"

import API
 from "@/app/axios";
import { formData } from "@/components/new-account-form";
import { toast } from "sonner"

const createUser = async (data: formData)=> {
   const response = await API.post("/account",data);
return response.data;
}

const useCreateNewAccount = ()=>{

  return useMutation({
    mutationFn: createUser,
    onSuccess:()=>{
      toast("Account has been created")
    },
    onError: ()=>{
      toast("Account not added please try again")
    }
  })
}

export default useCreateNewAccount;