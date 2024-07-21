

import API
    from "@/app/axios";

import { toast } from "sonner"
import {  useMutation, useQueryClient } from "@tanstack/react-query"

const deleteUser = async (data: {data: string[]}) => {
    const response = await API.post("/account/delete", data);
    return response.data;
}
import useAddNewAccountModal from "@/hooks/accounts/add-new-account-modal";

const useDeleteAccount = () => {
    const { onClose } = useAddNewAccountModal();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
           console.log("refetching")
            toast("Account has been deleted")
            queryClient.invalidateQueries({
                queryKey: ['accounts']
            })
            queryClient.refetchQueries({
                queryKey: ["accounts"]
            })
            onClose()

        },
        onError: (err) => {
            console.log(err)
            toast("Account not deleted please try again")
        }
    })
}

export default useDeleteAccount;
