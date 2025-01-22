"use client"

import { ThemeContext } from '@/context/ThemeContext'
import React, { useContext } from 'react'

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if(!context) {
    throw new Error("useTheme must be used within a Theme-Provider");
  }

  return context;
}