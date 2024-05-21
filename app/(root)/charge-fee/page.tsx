"use client";

import { ReactNode, useEffect, useState } from "react";
import EmailStep from "./components/email-step";
import WhatsappStep from "./components/whatsapp-step";
import { StepCircle } from "./components/progress-circle";
import FinalStep from "./components/final-step";

export default function ChargeFee() {
  const [stage, setStage] = useState<"first" | "second" | "end">("first");
  const [stageContent, setStageContent] = useState<ReactNode>();

  const moveToFinalStep = () => {
    setStageContent(<FinalStep />);
    setStage("end");
  };

  const moveToSecondStep = () => {
    setStageContent(<WhatsappStep nextStage={moveToFinalStep} />);
    setStage("second");
  };

  useEffect(() => {
    setStageContent(<EmailStep nextStage={moveToSecondStep} />);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
