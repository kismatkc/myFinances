import {Button} from './ui/button';
import { cn } from "@/lib/utils";
import CurrencyInput from "react-currency-input-field"
import {Info,MinusCircle,PlusCircle} from 'lucide-react'
import {Tooltip,TooltipTrigger,TooltipContent,TooltipProvider} from "@/components/ui/tooltip"

type InputAmountProps ={
  value: string;
  onInput: (value: string | undefined) => void;
  disabled: boolean;
  placeHolder: string;
  
  
}

const InputCurrency = ({value,onInput,disabled,placeHolder}: InputAmountProps) => {

  const parsedCurrency = parseFloat(value);
  
  const isIncome = parsedCurrency > 0;
  const isExpense = parsedCurrency < 0;

  const reverseCurrency = (value: number)=> {
    if(!value) return;
    

    const reversedCurrency = value * -1;
    
    onInput(reversedCurrency.toString())

  }

  return (
    <div className= "relative">
    
<TooltipProvider>
<Tooltip delayDuration={100}>
<TooltipTrigger asChild>
  <button onClick={(e)=>{
    e.preventDefault()
    reverseCurrency(parsedCurrency)
  }} className= {cn('bg-slate-400 hover:bg-slate-500 absolute top-1.5 left-1.5 rounded-md p-2 flex items-center justify-center transition',
    isIncome && "bg-emerald-500 hover:bg-emerald-600",
    isExpense && "bg-rose-500 hover:bg-rose-600"
  )}>
    {!parsedCurrency && <Info className='size-3 text-white'/>}
    {isIncome && <PlusCircle className='size-3 text-white'/>}
    {isExpense && <MinusCircle className='size-3 text-white'/>}
  </button>
</TooltipTrigger>
  <TooltipContent>
use [+] for income and [-] for expense
  </TooltipContent>
</Tooltip>
</TooltipProvider>
      <CurrencyInput prefix='$' className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      placeholder={placeHolder} disabled={disabled} decimalsLimit={2} decimalScale={2} value={value} onValueChange={(item)=>onInput(item)



      }/>
 <p className='text-xs text-muted-foreground mt-2'>

{ isIncome &&   "This will count as income"}
{  isExpense &&  "This will count as Expense"}

 </p>
    </div>
   
  )
}

export default InputCurrency