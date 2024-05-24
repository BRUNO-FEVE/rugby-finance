"use client";

import { ReactNode, useContext, useEffect, useState } from "react";
import { MembersToChargeContext } from "../../members-to-charge-context";
import { Button } from "@/components/ui/button";
import { CheckCircle, Send } from "lucide-react";
import { chargeWithEmail } from "@/actions/charge-with-email";
import { useToast } from "@/components/ui/use-toast";

interface EmailStepProps {
  nextStage: () => void;
}

export default function EmailStep({ nextStage }: EmailStepProps) {
  const { membersToCharge } = useContext(MembersToChargeContext);
  const [button, setButton] = useState<ReactNode>();
  const [sedingStage, setSendingStage] = useState<
    "wating" | "sending" | "completed"
  >("wating");
  const { toast } = useToast();

  const sendEmails = async () => {
    setSendingStage("sending");

    // await chargeWithEmail({
    //   members: membersToCharge,
    // });

    setSendingStage("completed");

    toast({
      title: "Cobrança por Email Concluída!",
      description:
        "Os emails foram enviados aos respectivos membros com sucesso.",
    });
  };

  useEffect(() => {
    setButton(
      <SendEmailButton
        sedingStage={sedingStage}
        sendEmailsFunction={sendEmails}
      />,
    );
    if (sedingStage === "completed") {
      setTimeout(() => {
        setButton(
          <Button
            variant={"default"}
            size={"lg"}
            className="text-md gap-3"
            onClick={nextStage}
          >
            Proxima Etapa
          </Button>,
        );
      }, 3000); // 3 sec
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sedingStage]);

  useEffect(() => {
    setButton(
      <SendEmailButton
        sedingStage={sedingStage}
        sendEmailsFunction={sendEmails}
      />,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-7/12 h-fit pb-32 flex flex-col gap-5">
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
          {membersToCharge.map((member) => {
            return (
              <div
                key={member.id}
                className="h-10 w-full flex items-center justify-between gap-10 text-sm border-b border-muted px-5"
              >
                <p>{member.name}</p>
                <p>{member.email}</p>
                <p>{sedingStage === "completed" ? "✅" : "🚫"}</p>
              </div>
            );
          })}
        </div>
      </div>
      {button}
    </div>
  );
}

interface SendEmailButtonProps {
  sedingStage: string;
  sendEmailsFunction: () => void;
}

const SendEmailButton = ({
  sedingStage,
  sendEmailsFunction,
}: SendEmailButtonProps) => {
  const handleChargeButtonText = (chargeStage: string) => {
    switch (chargeStage) {
      case "wating":
        return "Cobrar";
      case "sending":
        return "Cobrando...";
      case "completed":
        return "Cobrados";
      default:
        return "Cobrar";
    }
  };

  const handleButtonIcon = (chargeStage: string) => {
    switch (chargeStage) {
      case "wating":
        return <Send className="h-4 w-4" />;
      case "sending":
        return null;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Send className="h-4 w-4" />;
    }
  };

  return (
    <Button
      variant={"default"}
      size={"lg"}
      className={`text-md gap-3 ${sedingStage === "completed" ? "bg-green-400 hover:bg-green-400" : null}`}
      onClick={sendEmailsFunction}
    >
      {handleChargeButtonText(sedingStage)}
      {handleButtonIcon(sedingStage)}
    </Button>
  );
};
