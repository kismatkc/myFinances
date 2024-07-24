
import {Button} from "@/components/ui/button"
import {useState} from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog"

type useConfirmationReturnType = [
  ConfirmationModalUi: React.FC,
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

  
  const ConfirmationModalUi = ()=>(
      <Dialog open={promise !== null}>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end ">     
            <Button onClick={handleConfirm} variant="destructive"  size="lg" className="mr-2"  > Yes </Button>
          
          <Button variant="positive"  size="lg" onClick={handleCancel
    
            }> No </Button>
        </div>
          
          
          
          
         
      
      </DialogContent>
    </Dialog>)

    

                                   
 return[ConfirmationModalUi,openConfirmationModal];
}

      