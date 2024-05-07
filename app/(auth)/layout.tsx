"use client";

import SidePicture from "@/components/side-picture";
import { Button } from "@/components/ui/button";
import { LucideProps, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { theme, setTheme } = useTheme();
  const [themeIcon, setThemeIcon] = useState<ReactNode>();

  const handleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useEffect(() => {
    if (theme === "dark") {
      setThemeIcon(<Sun />);
    } else {
      setThemeIcon(<Moon />);
    }
  }, [theme]);

  return (
    <main className="flex flex-row w-screen bg-primary">
      <Button className="absolute top-3 right-3" onClick={handleTheme}>
        {/* Change to {nextTheme} */}
        {themeIcon}
      </Button>
      <SidePicture />
      {children}
    </main>
  );
}
