"use client"

import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import { usePathname } from 'next/navigation'

interface Props {
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

const MobileNavigation = ({ accountId, fullName, avatar, email }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <header className='mobile-header'>
      <Image 
        src='/assets/icons/logo-full-brand.svg'
        alt='logo'
        width={120}
        height={52}
        className='h-auto'
      />

      <Sheet 
        open={open}
        onOpenChange={() => setOpen(!open)}
      >
        <SheetTrigger>
          <Image 
            src='/assets/icons/menu.svg'
            alt='Search'
            width={30}
            height={30}
          />
        </SheetTrigger>

        <SheetContent className='shad-sheet h-screen px-3'>
          <SheetTitle>
            <div className='header-user'>
              <Image 
                src={avatar}
                alt='avatar'
                height={44}
                width={44}
                className='header-user-avatar'
              />

              <div className='sm:hidden lg:block'>
                <p className='subtitle-2 capitalize'>{fullName}</p>
                <p className='caption'>{email}</p>
              </div>
            </div>
          </SheetTitle>

          <SheetDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default MobileNavigation
