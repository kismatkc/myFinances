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

const AccountsPage = () => {
  return (
    <Card className="border-none drop-shadow-sm">
     <CardHeader className="gap-y-2 lg:flex-row lg:justify-between items-center ">
      <CardTitle className="text-xl line-clamp-1">Accounts page</CardTitle>
<Button>
  <Plus/>
  Add new
</Button>
     </CardHeader>
    </Card>
  );
}

export default AccountsPage