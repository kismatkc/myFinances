"use client"
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
import React from 'react'
import useNewAccount from "@/hooks/new-account-hook";
const AccountsPage = () => {
  const {onOpen} = useNewAccount();
  return (
    <Card className="border-none drop-shadow-sm max-w-2xl max-w-screen-2xl">
     <CardHeader className="gap-y-2 lg:flex-row lg:justify-between items-center ">
      <CardTitle className="text-xl line-clamp-1">Accounts page</CardTitle>
<Button onClick={onOpen} size="sm">
  <Plus className="size-4 mr-2"/>
  Add new 
</Button>
     </CardHeader>
    </Card>
  );
}

export default AccountsPage