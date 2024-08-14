import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal } from "lucide-react";
import useAccountModal from "@/hooks/account-sheet-modal";

type defaultValues = {
  date: string;
  accountId: {label: string,value:string};
  categoryId: {label: string,value:string};
  
  payee: string;
  amount: number ;
  notes?: string ;
  _id: string
 
}


export default function Actions({formDefaultValues}: {formDefaultValues:defaultValues}) {
  const {setEditFormValues ,onOpen} = useAccountModal();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {
            
            setEditFormValues(formDefaultValues)
            onOpen("edit")
            
          }}
        >
          <Edit className="size-4 mr-2" />
          Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
