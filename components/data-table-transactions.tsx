//@ts-nocheck
"use client";
import { Button } from "@/components/ui/button";
import * as React from "react";
import useConfirmation from "@/hooks/confirmationDialog";
import {useEffect} from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Trash , Import} from "lucide-react";
import { Transaction } from "@/app/(dashboard)/transactions/columns-transaction";
import SelectAsDialog from "./select-as-dialog";
import { CSVDataProps } from "./inputcsvfile-dialog";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filter: string;
  onRowsSelect: (rows: (string | undefined)[]) => void;
  disabled?: boolean;
  transactionType?: "csv" | "transaction";
              cancelImport?: (cancel: CSVDataProps[])=> void;

}

export function DataTable<TData extends Transaction, TValue>({
  columns,
  data,
  filter,
  onRowsSelect,
  disabled,
  transactionType,
              cancelImport

}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [ConfirmationModalUi, openConfirmationModal] = useConfirmation();
  
  


  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const [AccountSelectUi, openAccountSelectUi] = SelectAsDialog();

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder={`Filter ${filter}...`}
          value={(table.getColumn(filter)?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            return table.getColumn(filter)?.setFilterValue(event.target.value);
          }}
          className="max-w-sm"
        />
        {table.getFilteredSelectedRowModel().rows.length > 0 &&
          (transactionType === "transaction" ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={async () => {
                const yes = await openConfirmationModal();

                if (yes) {
                  const data = table
                    .getFilteredSelectedRowModel()
                    .rows.map((item) => item.original._id);

                  onRowsSelect(data);
                     table.resetRowSelection();
                }
              }}
              className="ml-auto font-normal text-xs"
            >
              <Trash className="size-4 mr-2" />
              Delete({table.getFilteredSelectedRowModel().rows.length})
            </Button>
          ) : (
            transactionType === "csv" && (
              <Button
                size="sm"
                onClick={() => {
                  // const yes = await openConfirmationModal();

                  // if (yes) {
                  //   const data = table
                  //     .getFilteredSelectedRowModel()
                  //     .rows.map((item) => item.original._id);

                  //   //submitting to backend hook
                  //   // table.resetRowSelection();
                  // }

                  openAccountSelectUi(true);
                    
                }}
                className="ml-auto font-normal bg-green-500 hover:bg-green-600 text-xs"
              >
                <Import className="size-4 mr-2" />
                Import({table.getFilteredSelectedRowModel().rows.length})
              </Button>
            )
          ))}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <ConfirmationModalUi
        title="Are you absolutely sure?"
        description={
          "This action cannot be undone. This will permanently delete your account and remove your data from our servers."
        }
      />
    
      <AccountSelectUi
      
        selectedTransaction={table
          .getFilteredSelectedRowModel()
          .rows.map((item) => item.original)}
        cancelImport={()=>{
              table.resetRowSelection();
        }}
      />
    </div>
  );
}
