import { useContext, useState } from "react";
import { MembersToChargeContext } from "../../members-to-charge-context";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { formatPhoneNumber, getBaseText, getMonthsToPay } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ClipboardButton from "./clipboard-button";
import { CircleNumber } from "./progress-circle";

interface WhatsappStepProps {
  nextStage: () => void;
}

export default function WhatsappStep({ nextStage }: WhatsappStepProps) {
  const { membersInfo, membersToCharge } = useContext(MembersToChargeContext);
  const [memberCount, setMemberCount] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const PERCENTAGE_OF_ONE_MEMBER = 100 / membersToCharge.length;

  const CURRENT_MEMBER = membersInfo[memberCount];
  const CURRENT_RUGBY_RECORD = membersToCharge.find(
    (member) => member.memberId === CURRENT_MEMBER.id,
  );

  let BASE_TEXT = "";
  let MOUNTHS = "";

  if (CURRENT_RUGBY_RECORD) {
    MOUNTHS = getMonthsToPay(CURRENT_RUGBY_RECORD.monthsPayment);

    BASE_TEXT = getBaseText({
      nickname: CURRENT_MEMBER.nickName,
      monthsToPay: getMonthsToPay(CURRENT_RUGBY_RECORD.monthsPayment),
    });
  }

  const setNextMemberProgress = () => {
    setProgress((prev) => prev + PERCENTAGE_OF_ONE_MEMBER);
    setMemberCount((prev) => prev + 1);
  };

  return (
    <div className="w-7/12 h-fit pb-32 flex flex-col gap-20">
      <div>
        <h1 className="font-bold text-2xl">
          <span className="text-muted-foreground">Etapa 2:</span> Enviar
          Whatsapp
        </h1>
        <p>
          Nesta etapa, o sistema exibirá o número dos membros e a mensagem a ser
          enviada, contendo os meses devidos por cada membro e as instruções
          detalhadas sobre como realizar o pagamento.
        </p>
      </div>
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Progress value={progress} />
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={5} className="text-sm">
              Progresso: {memberCount}/{membersToCharge.length}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div>
        <p className="text-lg font-semibold">
          Membro:{" "}
          <span className="font-normal bg-muted rounded-md p-1">
            {CURRENT_MEMBER.name} ({CURRENT_MEMBER.nickName})
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <CircleNumber number={1} />
            <p className="font-semibold">Número do membro</p>
          </div>
          <div className="flex gap-4 pl-3">
            <div className="bg-muted h-full w-0.5 rounded-lg" />
            <div className="w-full p-4 my-7 bg-foreground text-secondary text-sm rounded-md font-mono flex flex-row justify-between items-center">
              <div>
                <span className="text-muted-foreground">Telefone:</span>{" "}
                {formatPhoneNumber(CURRENT_MEMBER.phoneNumber)}
              </div>
              <ClipboardButton
                textToCopy={CURRENT_MEMBER.phoneNumber.toString()}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <CircleNumber number={2} />
            <p className="font-semibold">Mensagem do membro</p>
          </div>
          <div className="flex gap-4 pl-3">
            <div className="bg-muted h-full w-0.5 rounded-lg" />
            <div className="relative w-full p-4 pb-6 my-10 bg-foreground text-secondary text-sm rounded-md font-mono flex flex-row justify-between items-center">
              <div className="absolute top-3 right-3">
                <ClipboardButton textToCopy={BASE_TEXT} />
              </div>
              <p className="w-3/4">
                <span className="text-muted-foreground">Mensagem:</span>
                <br />
                <br />
                Olá {CURRENT_MEMBER.nickName}, <br /> <br /> Espero que você
                esteja bem! Gostaria de lembrar sobre a contribuição mensal para
                o nosso time de rugby da faculdade, o Rugby Mauá. Sua
                participação é essencial para o sucesso do time e para
                fortalecermos nossa comunidade esportiva. <br />
                <br /> Notamos que os pagamentos dos seguintes meses estão
                pendentes: <strong>{MOUNTHS}</strong> <br />
                <br /> Para facilitar sua contribuição, oferecemos diferentes
                planos de mensalidade: <br />
                <br /> - Mensal: R$ 25,00 <br /> - Semestral: R$ 130,00 <br /> -
                Anual: R$ 250,00 <br />
                <br /> Entendemos que você pode estar enfrentando dificuldades
                financeiras e estamos dispostos a encontrar soluções, se
                necessário. <br />
                <br /> Agradecemos muito pelo seu apoio contínuo e pedimos que,
                por favor, efetue o pagamento o mais breve possível. <br />
                <br /> Pix do Canadá: 11996019114. <br />
                <br /> Após o pagamento, por gentileza, envie o comprovante para
                um dos membros da comissão para atualizarmos nosso sistema.
                Contamos com você! 😊🏉
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <CircleNumber number={3} />
            {memberCount === membersToCharge.length - 1 ? (
              <Button onClick={nextStage}>Fim</Button>
            ) : (
              <Button onClick={setNextMemberProgress}>Próximo Membro</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
