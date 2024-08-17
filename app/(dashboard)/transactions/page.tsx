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
import { Import, Loader2, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import useAddNewAccountModal from "@/hooks/account-sheet-modal";

import { columns } from "./columns-transaction";

import { DataTable } from "@/components/data-table-transactions";
import { Skeleton } from "@/components/ui/skeleton";
import useDeleteTransaction from "@/hooks/transactions/delete-transaction-hook";
import TransactionSheetProvider from "@/components/providers/transaction-page-sheet-provider";
import useGetAllAccounts from "@/hooks/transactions/get-all-transactions-hook";
import useInputCsv from "@/components/inputcsvfile-dialog";





//fetch data
const TransactionPage = () => {
  const { isLoading, data: transactionsFromApi } = useGetAllAccounts();

  const [InputCSVModalUi, openInputCSVModal,transactionsFromCsv] = useInputCsv();

  

  const { onOpen, actionType } = useAddNewAccountModal();
  const deleteAccounts = useDeleteTransaction();

  if (isLoading) {
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
          <CardTitle className="text-xl line-clamp-1">
            { transactionsFromCsv.length > 0  ? "Csv data": "Transaction history" }
          </CardTitle>
          <div className="flex gap-2">
   {    transactionsFromCsv.length > 0 || <Button
            onClick={() => {
              onOpen("add");
            }}
            size="sm"
            className="bg-green-500 hover:bg-green-600"
          >
            <Plus className="size-4 mr-2" />
            Add new
          </Button>}
          <Button onClick={() => {
      openInputCSVModal()
          }} size="sm" className="bg-green-500 hover:bg-green-600">
            <Import className="size-4 mr-2" />
            Import CSV
          </Button>
          </div>
          
        </CardHeader>
        <CardContent>
          {
         transactionsFromCsv.length > 0  ? (<DataTable
            onRowsSelect={(data) => {
              deleteAccounts.mutate(data);
            }}
            columns={columns}
            data={transactionsFromCsv || []}
            filter="date"
                        transactionType   = "csv"                   
          />)

          :
//csv table ui
        (  <DataTable
            onRowsSelect={(data) => {
              deleteAccounts.mutate(data);
            }}
            columns={columns}
            data={transactionsFromApi || []}
            filter="date"
             transactionType= "transaction"    
          />)
          }
        </CardContent>
      </Card>
<InputCSVModalUi/>
      <TransactionSheetProvider />
    </>
  );
};

export default TransactionPage;
