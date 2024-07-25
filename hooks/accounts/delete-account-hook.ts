




// import API from "@/app/axios";
// import { toast } from "sonner";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// const deleteUser = async (data: { data: string[] }) => {
//   const response = await API.post("/account/delete", data);
//   return response.data;
// };

// import useAddNewAccountModal from "@/hooks/accounts/add-new-account-modal";

// const useDeleteAccount = () => {
//   const { onClose } = useAddNewAccountModal();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: deleteUser,
//     onMutate: async (deletedData) => {
//       await queryClient.cancelQueries({ queryKey: ['accounts'] });
//       const previousAccounts = queryClient.getQueryData(['accounts']);

//       queryClient.setQueryData(['accounts'], (old: any) => {
//         return old.filter((account: any) => !deletedData.data.includes(account.id));
//       });

//       return { previousAccounts };
//     },
//     onError: (err, deletedData, context) => {
//       queryClient.setQueryData(['accounts'], context?.previousAccounts);
//       toast("Account not deleted, please try again");
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ['accounts'] });
//       onClose();
//     },
//     onSuccess: () => {
//       toast("Account has been deleted");
//     }
//   });
// };

// export default useDeleteAccount;






import API from "@/app/axios";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteUser = async (data: { data: string[] }) => {
  const response = await API.post("/account/delete", data);
  return response.data;
};

import useAddNewAccountModal from "@/hooks/accounts/add-new-account-modal";

const useDeleteAccount = () => {
  const { onClose } = useAddNewAccountModal();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onMutate: async (deletedData) => {
      await queryClient.cancelQueries({ queryKey: ['accounts'] });
      const previousAccounts = queryClient.getQueryData(['accounts']);

      queryClient.setQueryData(['accounts'], (old: any) => {
        return old.filter((account: any) => !deletedData.data.includes(account.id));
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