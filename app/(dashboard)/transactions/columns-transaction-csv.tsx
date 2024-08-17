//@ts-nocheck
"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Actions from "./actions"
import { formatDate } from "date-fns";
import { cn, convertFromMiliamounts, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  date: string;
  payee: string;
  amount: number | string ;
  notes?: string ;
  _id?: string;
};

export const columnsCsv: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span>
          {formatDate(row.original.date, "MMMM dd, yyyy")}
        </span>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const formattedDateForFilterning = row.original.date.replace(/\s+/g,"").replace(/\,/g,"").toLowerCase();
      const formattedFilterValueForFilterning = filterValue.replace(/\s+/g,"").replace(/,/g,"").toLowerCase();
      console.log(`${formattedFilterValueForFilterning} is in  ${formattedDateForFilterning}`,formattedDateForFilterning.includes(formattedFilterValueForFilterning));
      
      return formattedDateForFilterning.includes(formattedFilterValueForFilterning.toLowerCase())
    } 
  },

  {
    accessorKey: "Payee",

    cell: ({ row }) => <span>{row.original.payee}</span>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Badge
          variant={
            (row.original.amount as number) > 0 ? "secondary" : "destructive"
          }
          className={cn(
            "p-2.5 text-red-200",
            (row.original.amount as number) > 0 && "bg-green-500 text-green-200"
          )}
        >
          {" "}
          <span>{formatCurrency(row.original.amount as number)}</span>
        </Badge>
      );
    },
    sortingFn: (rowA, rowB) => {
      // Convert the amount strings to numbers
      const amountA = rowA.original.amount;
      const amountB = rowB.original.amount;

      // Compare the amounts
      return amountA - amountB;
    },
  },
  {
    accessorKey: "Notes",

    cell: ({ row }) => <span>{row.original.notes}</span>,
  },
  
  {
    accessorKey: "actions",
    cell: ({ row }) => {
      
    return   <Actions formDefaultValues={row.original} />
        }
    
    
  },
];
