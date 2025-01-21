'use client'

import React, { useState } from 'react'
import { Dialog } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import { Models } from 'node-appwrite'
import { actionsDropdownItems } from '@/constants'

export const ActionsDropdown = ({ file }: { file: Models.Document }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
    >
      <DropdownMenu
        open={isDropdownOpen}
        onOpenChange={setIsDropdownOpen}
      >
        <DropdownMenuTrigger className='shad-no-focus'>
          <Image 
            src='/assets/icons/dots.svg'
            alt='dots'
            width={34}
            height={34}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel className='max-w-[200px] truncate'>
            {file.name}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {
            actionsDropdownItems.map((actionItem) => (
              <DropdownMenuItem 
                key={actionItem.value}
                className='shad-dropdown-item'
              >
                  {actionItem.label}
              </DropdownMenuItem>
            ))
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  )
}
