"use client";

import { Button } from "@/components/ui/button";
import { ClipboardEditIcon, Coins } from "lucide-react";
import { useState } from "react";
import { Member } from "@prisma/client";
import { getNameInitials } from "@/lib/utils";
import { Tag } from "@/components/tags";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ManualAddPaymentForm from "./manual-add-payment-form";
import AutoAddPaymentForm from "./auto-add-payment-form";

interface AddPaymentDrawerProps {
  member: Member;
}

export default function AddPaymentDrawer({ member }: AddPaymentDrawerProps) {
  const [isOpen, setOpen] = useState<boolean>(false);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  if (member) {
    return (
      <Drawer open={isOpen} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant={"ghost"}
            className="text-muted-foreground hover:text-primary"
            onClick={openDrawer}
          >
            <ClipboardEditIcon className="w-4 h-4 " />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="mx-auto h-fit w-full flex flex-row gap-6 p-16 justify-between items-start">
          <div className="w-2/5 flex flex-col gap-8">
            <Card>
              <CardHeader className=" flex flex-col gap-6">
                <div className="flex flex-row items-center gap-3">
                  <Avatar className="w-20 h-20">
                    <AvatarImage></AvatarImage>
                    <AvatarFallback className="text-xs">
                      {getNameInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <CardTitle>
                      {member.name}{" "}
                      <span className="text-muted-foreground">
                        ({member.nickname})
                      </span>
                    </CardTitle>
                    <div className="flex flex-row gap-2">
                      <Tag size="sm" label={member.team} />
                      <Tag size="sm" label={member.yearOfJoinOnRugbyMaua} />
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Valores das mensalidades</CardTitle>
                <CardDescription>
                  Lembre-se de que esses valores podem variar, dependendo de
                  promoções e atualizações ao longo dos anos.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-row text-sm text-muted-foreground gap-7">
                <div className="flex flex-col items-start">
                  <p>Anual</p>
                  <span className="font-bold text-4xl text-primary">$250</span>
                </div>
                <div className="flex flex-col items-start">
                  <p>Semestre</p>
                  <span className="font-bold text-4xl text-primary">$130</span>
                </div>
                <div className="flex flex-col items-start">
                  <p>Mensal</p>
                  <span className="font-bold text-4xl text-primary">$30</span>
                </div>
              </CardContent>
              <CardFooter className="pb-5 px-5">
                <div className="flex flex-row items-center rounded-md border p-3 gap-3">
                  <Coins className="h-10 w-10 text-muted-foreground" />
                  <CardDescription>
                    Valores atualizados pela ultima vez no dia 12/05/24
                  </CardDescription>
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="w-full h-full flex flex-col items-start justify-start gap-4">
            <DrawerHeader>
              <DrawerTitle className="pb-0 h-fit">
                Adicionar Pagamento de Mesalidade
              </DrawerTitle>
              <DrawerDescription>
                Esta é a seção onde você pode adicionar um novo pagamento de
                mensalidade. Preencha os campos necessários com as informações
                corretas e clique em <strong>Salvar</strong> para confirmar o
                pagamento.
              </DrawerDescription>
            </DrawerHeader>
            <Separator />
            <Tabs defaultValue={"auto"} className="h-full w-full py-6 px-8">
              <TabsList className="relative">
                <TabsTrigger value="auto">Automatico</TabsTrigger>
                <TabsTrigger value="manual">Manual</TabsTrigger>
                <Button variant={"ghost"} className="absolute -right-14">
                  <Info className="w-4 h-4" />
                </Button>
              </TabsList>
              <TabsContent value="auto" className="h-full">
                <AutoAddPaymentForm member={member} />
              </TabsContent>
              <TabsContent value="manual" className="h-full">
                <ManualAddPaymentForm
                  member={member}
                  closeDrawer={closeDrawer}
                />
              </TabsContent>
            </Tabs>
          </div>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Button
        variant={"ghost"}
        className="text-muted-foreground hover:text-primary"
      >
        <ClipboardEditIcon className="w-4 h-4 " />
      </Button>
    );
  }
}
