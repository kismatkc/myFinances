import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  
  SheetTitle
} from "@/components/ui/sheet"
import {
  DialogContent
  ,
  DialogTitle,

} from "@/components/ui/dialog"
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import  useNewAccount  from "@/hooks/new-account-hook"
import NewAccountForm from "./new-account-form";

const NewAccountSheet = () => {
  const {isOpen,onOpen,onClose} = useNewAccount(); //this hook is really handy 
  return (
  
   <Sheet open={isOpen} onOpenChange={onClose} >

   <SheetContent className="overflow-y-auto">
     <DialogTitle>
       <VisuallyHidden.Root>
         Menu
       </VisuallyHidden.Root>
     </DialogTitle>
     
     <SheetHeader>
     
     <SheetTitle>
     New accounts
     </SheetTitle>
       <SheetDescription>
         Create new account to track your transcations
       </SheetDescription>
     </SheetHeader>
     <NewAccountForm/>
     
     
   </SheetContent>
   </Sheet>
    
  );
}

export default NewAccountSheet