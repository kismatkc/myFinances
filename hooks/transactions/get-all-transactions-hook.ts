import API from "@/app/axios";

import { Transaction } from "@/app/(dashboard)/transactions/columns";
import { useQuery } from "@tanstack/react-query";


const fetchAccounts = async (): Promise<Transaction[]> => {

  const response = await API.get("/transactions");

  return response.data;
};


const  useGetAllTransactions = ()=>{
  const getAllAccounts = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchAccounts,
    initialData: []
  
  });


return getAllAccounts;
}


export default useGetAllTransactions;