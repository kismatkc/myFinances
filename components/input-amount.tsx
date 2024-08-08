import Button from './ui/button';
import { cn } from "@/lib/utils";
import CurrencyInput from "react-currency-input-field"
import {Info,MinusCircle,PlusCircle} from 'lucide-react'
import {Tooltip,TooltipTrigger,TooltipContent,TooltipProvider} from "@/components/ui/tooltip"

type InputAmountProps ={
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  placeholder: string;
  
  
}


const InputCurrency = ({value,onChange,disabled,placeholder}: InputAmountProps) => {
  return (
    <div className= "relative">
    
<TooltipProvider>
<Tooltip>
<TooltipTrigger asChild>
  <Button>
    <Info className="w-5 h-5 text-white"/>
  </Button>
</TooltipTrigger>
  <TooltipContent>
  </TooltipContent>
</Tooltip>
</TooltipProvider>
      <CurrencyInput />
    </div>
   
  )
}

export default InputCurrency