"use client";

import { getMemberById } from "@/actions/get-member-by-id";
import { Button } from "@/components/ui/button";
import { ClipboardEditIcon, Coins } from "lucide-react";
import { useEffect, useState } from "react";
import { Member, RugbyPayment } from "@prisma/client";
import { formatPhoneNumber, getMonths, getNameInitials } from "@/lib/utils";
import { Tag } from "@/components/tags";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
import AddPaymentForm from "./add-payment-form";

interface AddPaymentDrawerProps {
  rugbyPaymentRecord: RugbyPayment;
  memberId: string;
}

export default function AddPaymentDrawer({
  memberId,
  rugbyPaymentRecord,
}: AddPaymentDrawerProps) {
  const [member, setMember] = useState<Member>();

  const getMember = async () => {
    setMember(await getMemberById(memberId));
  };

  useEffect(() => {
    getMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (member) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant={"ghost"}
            className="text-muted-foreground hover:text-primary"
          >
            <ClipboardEditIcon className="w-4 h-4 " />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-5/6">
          <div className="mx-auto w-full flex flex-row gap-6 p-16 justify-between items-center">
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
                          ({member.nickName})
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
                <CardContent className="text-sm text-muted-foreground gap-3">
                  <p>
                    Anual:{" "}
                    <span className="font-medium text-primary">R$ 250</span>
                  </p>
                  <p>
                    Semestre:{" "}
                    <span className="font-medium text-primary">R$ 130</span>
                  </p>
                  <p>
                    Mensal:{" "}
                    <span className="font-medium text-primary">R$ 30</span>
                  </p>
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
            <div className="w-full h-full flex flex-col justify-start">
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
              <AddPaymentForm
                member={member}
                rugbyPaymentRecord={rugbyPaymentRecord}
              />
            </div>
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
