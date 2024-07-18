"use client"

import React from 'react'

import NavButton from './nav-button'
import { usePathname } from 'next/navigation'
import { useMedia } from 'react-use'
import {

  DialogTitle,

} from "@/components/ui/dialog"
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import {
    Sheet,
    SheetContent,
    SheetDescription,


  
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from './ui/button'
import { Menu } from 'lucide-react'

const navBarLinks = [
    {
        route: "/",
        label: "Overview"
    },
    {
        route: "/transactions",
        label: "Transactions"
    },
    {
        route: "/accounts",
        label: "Accounts"
    }, 
    {
        route: "/categories",
        label: "Categories"
    },
     {
        route: "/settings",
        label: "Settings"
    },
]

const Navigation = () => {
    

         
         
    const pathname = usePathname();
    const isMobile = useMedia("(max-width: 1024px)",false);

    if(isMobile){
        return (
            <Sheet>

                
                <SheetTrigger className="font-normal border border-input  hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 hover:bg-white/20 hover:text-white border-none outline-none text-white  transition">
                    
                        <Menu className='size-4' />
                
                    
                </SheetTrigger>
                <SheetContent side="left" className='px-2 overflow-y-auto'>
                    <DialogTitle>
                       <VisuallyHidden.Root>
                         Menu
                       </VisuallyHidden.Root>
                     </DialogTitle>
<VisuallyHidden.Root>
                      <SheetDescription >
                        This menu allows you to navigate through different sections of the application.
                      </SheetDescription>
    </VisuallyHidden.Root>

<nav className='flex flex-col gap-y-2 pt-6'>
                        {
                            navBarLinks.map((item) => <NavButton  key={item.label} route={item.route} variant={pathname === item.route ? "secondary": "ghost" } label= {item.label} isActive = {item.route === pathname} className= "text-black" />
                                
                                )
                        }
</nav>
                </SheetContent>
                
            </Sheet>
        )

      
    }
  return (
    <nav className='hidden lg:flex gap-x-2'>
        {
        navBarLinks.map((item)=><NavButton route={item.route} variant = "outline" key={item.label} label={item.label} isActive = {item.route === pathname}/>)
        }
    </nav>
  )
}

export default Navigation