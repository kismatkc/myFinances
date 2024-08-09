"use client"


import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import {useState} from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export default function DatePicker({date,onChange}:{date: Date | null,onChange: (day: Date)=> void}) {
  
const [open, setOpen] = useState(false)
  return (
    <Popover modal={true} open={open}>
      <PopoverTrigger asChild>
        <Button
          onClick={()=>{
            setOpen(true)
          }}
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="size-4 mr-2" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        
        <Calendar
          mode="single"
          
          
          selected={date || new Date()}
          onSelect={(day)=>{
            
            if(day){
              
              onChange(day)
            }
            
            
           setOpen(false)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
