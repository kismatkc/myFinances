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
import { Loader2, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import useAddNewAccountModal from "@/hooks/account-sheet-modal";

import { columns } from "./columns";

import { DataTable } from "@/components/data-table-transactions";
import { Skeleton } from "@/components/ui/skeleton";
import useDeleteAccount from "@/hooks/accounts/delete-account-hook";
import TransactionSheetProvider from "@/components/providers/transaction-page-sheet-provider";
import useGetAllAccounts from "@/hooks/transactions/get-all-transactions-hook";

//fetch data
const TransactionPage = () => {
  const { isPending, data } = useGetAllAccounts();
 

  const { onOpen, actionType } = useAddNewAccountModal();
  const deleteAccounts = useDeleteAccount();

  if (isPending) {
    return (
      <Card className="border-none drop-shadow-sm max-w-screen-2xl  mx-auto pb-10 -mt-24">
        <CardHeader className="gap-y-2 lg:flex-row lg:justify-between items-center  ">
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full flex items-center justify-center">
            <Loader2 className="size-10 text-slate-200 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-none drop-shadow-sm max-w-screen-2xl  mx-auto pb-10 -mt-24">
        <CardHeader className="gap-y-2 lg:flex-row lg:justify-between items-center ">
          <CardTitle className="text-xl line-clamp-1">Accounts page</CardTitle>
          <Button
            onClick={() => {
              onOpen("add");
            }}
            size="sm"
          >
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            onDelete={(data) => {
              deleteAccounts.mutate({ data });
            }}
            columns={columns}
            data={data}
            filter="date"
          />
        </CardContent>
      </Card>
      <TransactionSheetProvider />
    </>
  );
};

export default TransactionPage;
