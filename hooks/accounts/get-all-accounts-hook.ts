import API from "@/app/axios";

import { Account, columns } from "@/app/(dashboard)/accounts/columns";
import { useQuery } from "@tanstack/react-query";


const fetchAccounts = async (): Promise<Account[]> => {
  const params = {
    modelName: "Account"
  }
  const response = await API.get("/name", { params });

  return response.data;
};


const  useGetAllAccounts = ()=>{
  const getAllAccounts = useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
    initialData: []
   
  });


return getAllAccounts;
}


export default useGetAllAccounts;