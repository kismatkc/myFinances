
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import useNewAccount from "@/hooks/new-account-hook";
import {useQuery} from "@tanstack/react-query"


import { columns ,Account} from "./columns";
import { DataTable } from "@/components/data-table";
import API from "@/app/axios";

const getAccounts = async(): Promise<Account[]>=>{
  const response = await API.get("/account")
  const data = response.data;
  return data;

}

//fetch data 
const AccountsPage = () => {
  
  const { onOpen } = useNewAccount();
  const {data,error,isLoading} = useQuery({
    queryKey: ["accounts"],
    queryFn: getAccounts
   
  });

  



  return (
    <Card className="border-none drop-shadow-sm max-w-screen-2xl  mx-auto pb-10 -mt-24">
      <CardHeader className="gap-y-2 lg:flex-row lg:justify-between items-center ">
        <CardTitle className="text-xl line-clamp-1">Accounts page</CardTitle>
        <Button onClick={onOpen} size="sm">
          <Plus className="size-4 mr-2" />
          Add new
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data || [{name: "kismat"}]} />
      </CardContent>
    </Card>
  );
};

export default AccountsPage;


