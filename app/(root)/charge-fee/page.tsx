"use client";

import { ReactNode, useEffect, useState } from "react";
import { Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EmailStep from "./components/email-step";
import WhatsappStep from "./components/whatsapp-step";

export default function ChargeFee() {
  const [stage, setStage] = useState<"first" | "second" | "end">("first");
  const [stageContent, setStageContent] = useState<ReactNode>();

  const moveToSecondStep = () => {
    setStageContent(<WhatsappStep />);
    setStage("second");
  };

  useEffect(() => {
    setStageContent(<EmailStep nextStage={moveToSecondStep} />);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center gap-10 p-10">
      <div className="w-full h-20 flex flex-row justify-evenly items-center relative">
        <div className="absolute w-1/2 flex z-10">
          <div className="bg-muted w-1/2 h-0.5" />
          <div className="bg-muted w-1/2 h-0.5" />
        </div>
        <StepCircle
          selected={stage === "first"}
          stepStage={1}
          tooptipText={"Etapa 1: Enviar Email"}
        />
        <StepCircle
          selected={stage === "second"}
          stepStage={2}
          tooptipText={"Etapa 1: Enviar Whatsapp"}
        />
        <StepCircle selected={stage === "end"} tooptipText={"Fim"} />
      </div>
      {stageContent}
    </div>
  );
}

interface StepCircleProps {
  stepStage?: number;
  tooptipText: string;
  selected?: boolean;
}

function StepCircle({
  stepStage,
  tooptipText,
  selected = false,
}: StepCircleProps) {
  let triggerContent: string | ReactNode = <Check className="h-4 w-4" />;

  if (stepStage) {
    triggerContent = stepStage;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`h-7 w-7 bg-background ${selected ? "bg-primary text-primary-foreground" : "text-muted-foreground border-muted-foreground"} rounded-full flex items-center justify-center text-sm border z-10 cursor-pointer`}
          >
            {triggerContent}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={5}>
          <p className="text-sm">{tooptipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
