"use client"

import SidePicture from "@/components/side-picture";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react"
import { useTheme } from 'next-themes'

export default function AuthLayout({children}: Readonly<{children: React.ReactNode}>) {
  const {theme, setTheme} = useTheme()

  const handleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <main className="flex flex-row w-screen bg-primary">
        <Button
          className="absolute top-3 right-3"
          onClick={handleTheme}
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </Button>
        <SidePicture />
        {children}
    </main>
  )
}
