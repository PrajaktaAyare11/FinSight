"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class" // uses 'class' on <html>
      defaultTheme="system" // can be 'light', 'dark', or 'system'
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
