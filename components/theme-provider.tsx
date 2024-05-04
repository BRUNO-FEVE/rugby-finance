"use client"

import React from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'

export default function ThemeProvider({children, ...props}: ThemeProviderProps) {
  return (
    <NextThemeProvider {...props}>{children}</NextThemeProvider>
  )
}
