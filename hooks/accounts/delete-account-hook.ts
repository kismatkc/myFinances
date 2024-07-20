import API from "@/app/axios";
import { useQueryClient,useQuery,useMutation, QueryClient } from "@tanstack/react-query";
import { Account } from "@/app/(dashboard)/accounts/columns";
import { toast } from "sonner";

const deleteAccount = async (deletedAccounts: Account[])=>{
    
const response = await API.post("/account/delete",
    deletedAccounts
  
)
    return response.data
}

export default function useDeleteAccount(){
    const queryClient = useQueryClient();
return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
        console.log("Invalidating accounts query");
        queryClient.invalidateQueries({ queryKey: ['accounts'] });
        toast("Account deleted successfully");
    },

    onError: (error) => {
        console.error("Error deleting account:", error);
        toast("Failed to delete account");
    },
})
}


