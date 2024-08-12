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
  date: Date;
  accountId: {
      value: string;
      label: string;
  };
  categoryId: {
      value: string;
      label: string;
  };
  payee: string;
  amount: string;
  notes?: string | undefined;
}


export default function Actions(formDefaultValues: defaultValues) {
  const { onOpen, setId, setNewName } = useAccountModal();
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
            onOpen("edit");
            setId(id);
            setNewName(currentFieldValue);
          }}
        >
          <Edit className="size-4 mr-2" />
          Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
