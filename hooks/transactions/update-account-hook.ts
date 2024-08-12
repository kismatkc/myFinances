import API from "@/app/axios";

import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const updateUser = async (data: { _id: string; name: string }) => {
  let dataWithModelName = { ...data, modelName: "Account" };
  const response = await API.patch("/name/update", dataWithModelName);

  return response.data;
};
import useAccountModal from "@/hooks/account-sheet-modal";

const useUpdateAccount = () => {
  const { onClose } = useAccountModal();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onMutate: (updatedAccount) => {
      console.log(updatedAccount, "update");
      toast("Account updated successfully");
      queryClient.cancelQueries({
        queryKey: ["accounts"],
      });

      const previousAccounts = queryClient.getQueryData(["accounts"]);

    

      queryClient.setQueryData(
        ["accounts"],
          (old: { id: string, name: string }[]) => {

        const newData = old.map((account) => {

          if (account.id === updatedAccount._id) {
            return { ...account, name: updatedAccount.name };
          }else{
          return account
          }
        }
        )

        return newData
      }
      );
      onClose();
      return { previousAccounts };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },

    onError: (err, deletedData, context) => {
      queryClient.setQueryData(["accounts"], context?.previousAccounts);
      toast("Account not updated please try again");
    },
  });
};

export default useUpdateAccount;
