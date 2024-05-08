"use client";

import { Combobox, ItensProps } from "./ui/combobox";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { deleteCookie } from "@/actions/delete-cookie";
import { useTheme } from "next-themes";
import { Laptop2Icon, Moon, Sun } from "lucide-react";
import { auth } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const teams: ItensProps[] = [
  {
    label: "Time Masculino",
    value: "masc",
  },
  {
    label: "Time Feminino",
    value: "fem",
  },
  {
    label: "Todos",
    value: "all",
  },
];

interface NavbarProps {
  name?: string | null;
  email?: string | null;
}

export default function Navbar({ name, email }: NavbarProps) {
  const { setTheme } = useTheme();

  const handleLogOut = async () => {
    await deleteCookie("authjs.callback-url");
    await deleteCookie("authjs.csrf-token");
    await deleteCookie("authjs.session-token");

    window.location.href = "/sign-in";
  };

  return (
    <div className="w-full py-3 px-5 border-b border-muted flex flex-row justify-between items-center">
      <Combobox data={teams} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage></AvatarImage>
            <AvatarFallback>BF</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            {name} <br />{" "}
            <span className="text-muted-foreground text-xs">{email}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Perfil</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Tema</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => {
                    setTheme("dark");
                  }}
                >
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setTheme("light");
                  }}
                >
                  <Sun className="mr-2 h-4 w-4" />
                  <span>White</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    setTheme("system");
                  }}
                >
                  <Laptop2Icon className="mr-2 h-4 w-4" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem onClick={handleLogOut}>Log Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
