"use client"

import React from 'react'

import NavButton from './navButton'
import { usePathname } from 'next/navigation'
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
  return (
    <nav className='hidden lg:flex gap-x-2'>
        {
        navBarLinks.map((item)=><NavButton route={item.route} label={item.label} isActive = {item.route === pathname}/>)
        }
    </nav>
  )
}

export default Navigation