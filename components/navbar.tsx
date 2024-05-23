"use client";

import { ItensProps } from "./ui/combobox";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { deleteCookie } from "@/actions/delete-cookie";
import { useTheme } from "next-themes";
import { Landmark, Laptop2Icon, Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";

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
import Link from "next/link";

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
  const pathName = usePathname();

  const handleLogOut = async () => {
    //PROD
    await deleteCookie("__Host-authjs.csrf-token");
    await deleteCookie("__Secure-authjs.callback-url");
    await deleteCookie("__Secure-authjs.session-token");

    // DEV
    // await deleteCookie("authjs.callback-url");
    // await deleteCookie("authjs.csrf-token");
    // await deleteCookie("authjs.session-token");

    window.location.href = "/sign-in";
  };

  return (
    <div className="w-full py-3 px-5 border-b border-muted flex flex-row justify-between items-center">
      <div className="flex items-center gap-8">
        {/* <Combobox data={teams} /> */}
        <h1 className="pr-10 flex items-center gap-3">
          <Landmark strokeWidth={2} className="text-primary w-5" />
          Rugby Finance
        </h1>
        <Link
          href={"/rugby-payment"}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground
            ${pathName === "/rugby-payment" ? undefined : "text-muted-foreground"}`}
        >
          Mensalidades
        </Link>
        <Link
          href={"/members"}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground
            ${pathName === "/members" ? undefined : "text-muted-foreground"}`}
        >
          Membros
        </Link>
        <Link
          href={"/payments"}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground
            ${pathName === "/payments" ? undefined : "text-muted-foreground"}`}
        >
          Pagamentos
        </Link>
      </div>
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
