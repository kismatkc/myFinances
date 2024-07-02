"use client"

import React from 'react'

import NavButton from './nav-button'
import { usePathname } from 'next/navigation'
import { useMedia } from 'react-use'

import {
    Sheet,
    SheetContent,


  
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

                <SheetTrigger>
                    <Button size="sm" variant="outline" className='font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none  focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition' >
                        <Menu className='size-4' />
                    </Button>
                    
                </SheetTrigger>
                <SheetContent side="left" className='px-2'>

<nav className='flex flex-col gap-y-2 pt-6'>
                        {
                            navBarLinks.map((item) => <Button  key={item.label} variant={pathname === item.route ? "secondary": "ghost" }>
                                {item.label}
                                  </Button>)
                        }
</nav>
                </SheetContent>
                
            </Sheet>
        )

      
    }
  return (
    <nav className='hidden lg:flex gap-x-2'>
        {
        navBarLinks.map((item)=><NavButton route={item.route} key={item.label} label={item.label} isActive = {item.route === pathname}/>)
        }
    </nav>
  )
}

export default Navigation