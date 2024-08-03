import API from "@/app/axios";

import { Category, columns } from "@/app/(dashboard)/categories/columns";
import { useQuery } from "@tanstack/react-query";


const fetchAccounts = async (): Promise<Category[]> => {
  const params = {
    modelName: "Category"
  }
  const response = await API.get("/name", { params });

  return response.data;
};


const  useGetAllAccounts = ()=>{
  const getAllAccounts = useQuery({
    queryKey: ["categories"],
    queryFn: fetchAccounts,
    initialData: [{ _id: "1", name: "default1" }]
  });


return getAllAccounts;
}


export default useGetAllAccounts;