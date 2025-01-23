import React from 'react'
import { Toggle } from "@/components/ui/toggle"
import { Moon, Sun } from 'lucide-react';

type ThemeType = "light" | "dark";

interface ThemeToggleProps {
  onClick: () => void;
  renderImageType: ThemeType;
}

export const ThemeToggle = ({ onClick, renderImageType }: ThemeToggleProps) => {
  return (
  <Toggle 
    variant='outline'
    onClick={onClick}
  >
    {
      renderImageType === 'dark' ? (
        <Moon className='h-4 w-4 fill-brand' />
      ) : (
        <Sun className='h-4 w-4 fill-brand' />
      )
    }
  </Toggle>
  )
}