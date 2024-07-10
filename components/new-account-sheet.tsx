import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import { useNewAccount } from "@/hooks/new-account-hook"

const NewAccountSheet = () => {
  const {isOpen,onOpen,onClose} = useNewAccount();
  return (
   <Sheet open={isOpen} onOpenChange={onClose} >
   <SheetContent>
     <SheetHeader>
     <SheetTitle>
     New account
     </SheetTitle>
       <SheetDescription>
         Create new account to track your transcations
       </SheetDescription>
     </SheetHeader>
     
     
   </SheetContent>
   </Sheet>
  );
}

export default NewAccountSheet