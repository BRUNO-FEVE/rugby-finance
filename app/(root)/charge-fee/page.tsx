"use client";

import { ReactNode, useContext, useEffect, useState } from "react";
import { MembersToChargeContext } from "../members-to-charge-context";
import { Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EmailStep from "./components/email-step";

export default function ChargeFee() {
  const [stageContent, setStageContent] = useState<ReactNode>(<EmailStep />);

  return (
    <div className="w-full h-full flex flex-col items-center gap-10 p-10">
      <div className="w-full h-20 flex flex-row justify-evenly items-center relative">
        <div className="absolute w-1/2 flex z-10">
          <div className="bg-muted w-1/2 h-0.5" />
          <div className="bg-muted w-1/2 h-0.5" />
        </div>
        <StepCircle stepStage={1} tooptipText={"Etapa 1: Enviar Email"} />
        <StepCircle stepStage={2} tooptipText={"Etapa 1: Enviar Whatsapp"} />
        <StepCircle tooptipText={"Fim"} />
      </div>
      {stageContent}
    </div>
  );
}

interface StepCircleProps {
  stepStage?: number;
  tooptipText: string;
}

function StepCircle({ stepStage, tooptipText }: StepCircleProps) {
  let triggerContent: string | ReactNode = <Check className="h-4 w-4" />;

  if (stepStage) {
    triggerContent = stepStage;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="h-7 w-7 bg-background text-muted-foreground rounded-full flex items-center justify-center text-sm border border-muted-foreground z-10 cursor-pointer">
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
