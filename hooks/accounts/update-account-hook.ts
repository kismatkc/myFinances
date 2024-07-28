

import API
 from "@/app/axios";

import { toast } from "sonner"
import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query"

const updateUser = async (data: { id: string, name: string} = {id: "8" ,name: "jack"})=> {
  const response = await API.patch("/account/update", data);

return response.data;
}
import useAccountModal  from "@/hooks/accounts/account-sheet-modal";

const useUpdateAccount = ()=>{
  const { onClose } = useAccountModal();
const queryClient = useQueryClient();
  return useMutation({

    mutationFn: updateUser,
    onMutate: (updateAccount:{ id: string, name: string })=>{
      console.log(updateAccount)
      toast("Account updated successfully")
      queryClient.cancelQueries(
      {
          queryKey: ['accounts']
      }
        
      );

      const previousAccounts = queryClient.getQueryData(['accounts'] );
      
      console.log(previousAccounts,"previous accounts")

      queryClient.setQueryData(['accounts'], (old: { id: string, name: string }[])=> {
       
     const newData=   old.map((account) => {
console.log(old,"oldData")
       if (account.id === updateAccount.id) {
         return { ...account, name: updateAccount.name };
       }
          return account

        }
      )
        console.log(newData,"newData")
      return newData
      })
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

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import API from "@/app/axios";
// import { toast } from "sonner";
// import useAccountModal from "@/hooks/accounts/account-sheet-modal";

// const updateUser = async (data) => {
//   const response = await API.patch("/account/update", data);
//   return response.data;
// };

// const useUpdateAccount = () => {
//   const { onClose } = useAccountModal();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: updateUser,
//     onMutate: async (updateAccount) => {
//       console.log(updateAccount);

//       // Cancel any outgoing refetches
//       await queryClient.cancelQueries({ queryKey: ['accounts'] });

//       // Snapshot the previous value
//       const previousAccounts = queryClient.getQueryData(['accounts']);
//       console.log(previousAccounts, "previous accounts");

//       // Optimistically update to the new value
//       queryClient.setQueryData(['accounts'], (old) => {
//         const newData = old.map((account) => {
//           console.log(old, "oldData");
//           if (account.id === updateAccount.id) {
//             return { ...account, name: updateAccount.name };
//           }
       
//           return account;
//         });
//         console.log(newData, "newData");
//         return newData;
//       });



      

//       toast("Account updated successfully");
//       onClose();

//       // Return the context for potential rollback
//       return { previousAccounts };
//     },
//     onError: (err, updateAccount, context) => {
//       toast("Account not updated, please try again");
//       if (context?.previousAccounts) {
//         queryClient.setQueryData(['accounts'], context.previousAccounts);
//       }
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ['accounts'] });
//     },
//   });
// };

// export default useUpdateAccount;
