import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

function NavButton({route,label,isActive,variant,className}: {route: string ,label: string,isActive :boolean,variant: "link" | "default" | "outline" | "secondary" | "ghost" | "destructive" | null | undefined,className?: string}) {
  return (
  <Button asChild
  size="sm"
  variant={variant}
  className={cn("w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition",
    isActive && !className ? "bg-white/10 text-white" : "bg-transparent",
                className ? "text-black": "",
                isActive && className ? " bg-cyan-700 !text-black" : "bg-transparent hover:bg-white/20 hover:text-black", 
        
  )}
  >
    <Link href={route}>{label}</Link>
    </Button>
  )
}

export default NavButton