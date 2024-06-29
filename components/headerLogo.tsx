import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HeaderLogo = () => {
    return (
        <Link href="/">
            <div className='hidden lg:flex items-center'>
                <Image src="/logo.svg" width={28} height={28} alt='myFInances logo'>
                </Image>


                <p className='font-semibold text-white text-xl ml-1 '>
                    MyFinances
                </p>

            </div>
        </Link >
    )
}

export default HeaderLogo