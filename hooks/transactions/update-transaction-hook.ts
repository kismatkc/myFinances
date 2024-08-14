import API from "@/app/axios";

import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
type transactionDetailsProps = {
  date: string;
  accountId: { label: string; value: string };
  categoryId: { label: string; value: string };
  payee: string;
  amount: number;
  notes: string;
  _id: string;
};

const updateUser = async (transactionDetails: transactionDetailsProps) => {
  const response = await API.patch("/transaction/update", transactionDetails);

  return response.data;
};
import useAccountModal from "@/hooks/account-sheet-modal";

const useUpdateAccount = () => {
  const { onClose } = useAccountModal();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,

    onSuccess: () => {
      onClose()
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },

    onError: (err, deletedData, context) => {
      toast("Transaction not updated please try again");
    },
  });
};

export default useUpdateAccount;
