import { useContext, useState } from "react";
import { MembersToChargeContext } from "../../members-to-charge-context";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function WhatsappStep() {
  const { membersInfo, membersToCharge } = useContext(MembersToChargeContext);
  const [progress, setProgress] = useState<number>(0);

  const setNextMemberProgress = () => {
    const PERCENTAGE_OF_ONE_MEMBER = 100 / membersToCharge.length;
    setProgress((prev) => prev + PERCENTAGE_OF_ONE_MEMBER);
  };

  return (
    <div className="w-7/12 h-fit pb-32 flex flex-col gap-10">
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
              Progresso: {(progress * membersToCharge.length) / 100}/
              {membersToCharge.length}
            </TooltipContent>
            t
          </Tooltip>
        </TooltipProvider>
      </div>
      <div>
        <p>Membro: Bruno Augusto Lopes Fevereiro (Fevs)</p>
        <p>Telefone: (11) 95770-5558</p>
        <p>
          Olá [Nome do Membro], Esperamos que você esteja bem. Gostaríamos de
          lembrá-lo que sua mensalidade referente aos meses de [Lista de Meses]
          ainda está pendente. O valor total devido é de [Valor]. Para evitar
          quaisquer interrupções em nossos serviços, pedimos que efetue o
          pagamento até [Data Limite]. Instruções para o Pagamento: Via
          Transferência Bancária: Banco: [Nome do Banco] Agência: [Número da
          Agência] Conta Corrente: [Número da Conta] Beneficiário: [Nome do
          Beneficiário] CNPJ: [Número do CNPJ] Via Pix: Chave Pix: [Chave Pix]
          Nome do Beneficiário: [Nome do Beneficiário] Após realizar o
          pagamento, por favor, envie o comprovante para [E-mail/WhatsApp] para
          que possamos atualizar o seu status de pagamento. Se você já efetuou o
          pagamento, desconsidere esta mensagem. Agradecemos a sua atenção e
          colaboração. Atenciosamente, [Seu Nome] [Seu Cargo] [Nome da
          Empresa/Organização] [Telefone de Contato] [E-mail de Contato]
        </p>
      </div>
      <Button onClick={setNextMemberProgress}>Next</Button>
    </div>
  );
}
