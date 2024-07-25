
import {Button} from "@/components/ui/button"
import {useState} from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
  
} from "@/components/ui/dialog"
import { X } from "lucide-react"

type ConfirmationModalUiProps= {title: string,description: string}

type useConfirmationReturnType = [
  ConfirmationModalUi: React.FC<ConfirmationModalUiProps>,
  openConfirmationModal: ()=> Promise<boolean>
]
// Define the type for the promise state
interface PromiseState {
  resolve: (value: boolean) => void;
}

export default function useConfirmation(): useConfirmationReturnType {
  
  const [promise, setPromise] = useState<PromiseState | null>(null);

  const openConfirmationModal = () => new Promise<boolean>((resolve) => {
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

  
  const ConfirmationModalUi = ({title,description}: ConfirmationModalUiProps)=>(
      <Dialog open={promise !== null}>

      <DialogContent closeDialog={setPromise} >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div  className="flex justify-end ">
<Button onClick={handleConfirm} variant="destructive"  size="lg" className="mr-2"  > Yes </Button>

            <Button variant="positive"  size="lg" onClick={handleCancel

              }> No </Button>
          </div>

           
        </DialogFooter>
    
          
          
          
         
      
      </DialogContent>
    </Dialog>)

    

                                   
 return[ConfirmationModalUi,openConfirmationModal];
}

      