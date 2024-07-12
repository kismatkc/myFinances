import {useMutation,useQueryClient} from "@tanstack/react-query"


const createUser = async (data: FormData)=> {
   const response = await API.post("/account",data);
return response.data;
}

const useCreateNewAccount = ()=>{

  return useMutation(createUser)
}

export default useCreateNewAccount;