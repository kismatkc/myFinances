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

export default function Actions({
  _id,
  currentFieldValue,
}: {
  _id: string;
  currentFieldValue: string;
}) {
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
            setId(_id);
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
