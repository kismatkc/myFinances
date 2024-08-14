

import {ChangeEvent, useState} from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react"
import { Input } from "./ui/input";


const handleFile = (event: ChangeEvent<HTMLInputElement>)=>{
const file = event.target.files;
console.log(file);


}


type useInputCSVReturnType = [
    InputCSVModalUi: React.FC,
    openInputCSVModal: ()=> Promise<boolean>
]
// Define the type for the promise state
interface PromiseState {
  resolve: (value: boolean) => void;
}

export default function useInputCsv(): useInputCSVReturnType {
  
  const [promise, setPromise] = useState<PromiseState | null>(null);

  const openInputCSVModal = () => new Promise<boolean>((resolve) => {
    setPromise({ resolve });
  })

  const handleClose = () => {
    
    
    
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    
    
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  
  const InputCSVModalUi = ()=>(
      <Dialog open={promise !== null}>

      <DialogContent >
        <DialogHeader>
          <DialogTitle>Upload transactions through files</DialogTitle>
          
          <DialogDescription>
           Choose your csv file below
          </DialogDescription>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" onClick={
          ()=>{
            setPromise(null)
          }
        }/>
        <span className="sr-only">Close</span>

          </DialogClose>
        </DialogHeader>
        <DialogFooter>
         <Input type="file" accept=".csv" onChange={handleFile}/>

           
        </DialogFooter>
    
          
          
          
         
      
      </DialogContent>
    </Dialog>)

    

                                   
 return[InputCSVModalUi,openInputCSVModal];
}

      