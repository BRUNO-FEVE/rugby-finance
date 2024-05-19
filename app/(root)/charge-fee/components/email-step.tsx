"use client";

import { useContext } from "react";
import { MembersToChargeContext } from "../../members-to-charge-context";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface EmailStepProps {}

export default function EmailStep() {
  const { membersInfo } = useContext(MembersToChargeContext);

  return (
    <div className="w-7/12 h-fit pb-32 flex flex-col gap-2">
      <h1 className="font-bold text-2xl">
        <span className="text-muted-foreground">Etapa 1:</span> Enviar Email
      </h1>
      <p>
        Nesta etapa, todos os membros selecionados receberão um e-mail com os
        meses em atraso e instruções sobre como efetuar o pagamento.
      </p>
      <div className="pt-10 flex flex-col gap-10 ">
        <p className="font-semibold text-xl">Membros Selecionados</p>
        <div className="w-full border border-muted rounded-md flex flex-col gap-2">
          {membersInfo.map((member) => {
            return (
              <div
                key={member.id}
                className="h-10 w-full flex items-center justify-between gap-10 text-sm border-b border-muted px-5"
              >
                <p>{member.name}</p>
                <p>{member.email}</p>
                <p>{false ? "✅" : "🚫"}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Button
        variant={"default"}
        size={"lg"}
        className="fixed bottom-10 right-32 text-md gap-2"
      >
        Enviar
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
