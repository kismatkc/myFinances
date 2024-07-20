// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardHeader,
//   CardFooter,
// } from "@/components/ui/card";
// import { Plus } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import useAddNewAccountModal from "@/hooks/accounts/add-new-account-modal";
// import useDeleteAccount from "@/hooks/accounts/delete-account-hook";
// import {RefetchOptions, useQuery} from "@tanstack/react-query"

// import { columns ,Account} from "./columns";
// import { DataTable } from "@/components/data-table";
// import API from "@/app/axios";

// const getAccounts = async(): Promise<Account[]>=>{
//   const response = await API.get("/account")
//   const data = response.data;
//   return data;

// }

// //fetch data
// const AccountsPage = () => {

//   const { onOpen } = useAddNewAccountModal();
//   const [flag, setRefreshFlag] = useState(false);
//   const {data,error,isLoading} = useQuery({
//     queryKey: ["accounts"],
//     queryFn: getAccounts

//   });
//     const mutation = useDeleteAccount();

//     const deleteAccounts = (deletedAccouts: Account[])=>{
//       console.log(deleteAccounts)
//       mutation.mutate(deletedAccouts);
//     }

//   return (
//     <Card className="border-none drop-shadow-sm max-w-screen-2xl  mx-auto pb-10 -mt-24">
//       <CardHeader className="gap-y-2 lg:flex-row lg:justify-between items-center ">
//         <CardTitle className="text-xl line-clamp-1">Accounts page</CardTitle>
//         <Button onClick={onOpen} size="sm">
//           <Plus className="size-4 mr-2" />
//           Add new
//         </Button>
//       </CardHeader>
//       <CardContent>
//         <DataTable
//           columns={columns}
//           data={data || [{ name: "kismat" }]}
//      onDelete = {deleteAccounts}

//         />
//       </CardContent>
//     </Card>
//   );
// };

// export default AccountsPage;

"use client";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";
import useAddNewAccountModal from "@/hooks/accounts/add-new-account-modal";
import useDeleteAccount from "@/hooks/accounts/delete-account-hook";
import { useQuery } from "@tanstack/react-query";
import { columns, Account } from "./columns";
import { DataTable } from "@/components/data-table";
import API from "@/app/axios";

const getAccounts = async (): Promise<Account[]> => {
  const response = await API.get("/account");
  const data = response.data;
  return data;
};

const AccountsPage = () => {
  const { onOpen } = useAddNewAccountModal();
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["accounts"],
    queryFn: getAccounts,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const mutation = useDeleteAccount();

  const deleteAccounts = (deletedAccounts: Account[]) => {
    mutation.mutate(deletedAccounts, {
      onSuccess: () => {
        refetch(); // Refetch the data after a successful mutation to ensure consistency
      },
    });
  };

  return (
    <Card className="border-none drop-shadow-sm max-w-screen-2xl mx-auto pb-10 -mt-24">
      <CardHeader className="gap-y-2 lg:flex-row lg:justify-between items-center ">
        <CardTitle className="text-xl line-clamp-1">Accounts page</CardTitle>
        <Button onClick={onOpen} size="sm">
          <Plus className="size-4 mr-2" />
          Add new
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={data || []}
          onDelete={deleteAccounts}
        />
      </CardContent>
    </Card>
  );
};

export default AccountsPage;
