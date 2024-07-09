import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"

const NewAccountSheet = () => {
  return (
   <Sheet open>
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