"use client";

import SidePicture from "@/components/side-picture";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { theme, setTheme } = useTheme();
  const [themeIcon, setThemeIcon] = useState<ReactNode>();
  const [windowLocation, setWindowLocation] = useState<string>("");

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setThemeIcon(theme === "dark" ? <Sun /> : <Moon />);
  }, [theme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowLocation(window.location.pathname);
    }
  }, []);

  return (
    <main className="relative h-screen w-screen flex justify-end bg-background">
      <Button
        variant={"ghost"}
        className="absolute top-3 right-3"
        onClick={handleTheme}
      >
        {themeIcon}
      </Button>
      <SidePicture />
      <div
        className={`${windowLocation === "/member" ? "md:w-2/3" : "md:w-1/2"} h-screen`}
      >
        {children}
      </div>
    </main>
  );
}
