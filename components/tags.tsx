"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { string } from "zod";

interface TagProps {
  label: string | number;
  size?: "sm" | "md";
}

function Tag({ label, size }: TagProps) {
  const style = size === "sm" ? "text-xs " : "";

  if (typeof label === "string") {
    return (
      <p
        className={`w-fit h-fit border tracking-wide rounded-lg py-1 px-2 text-primary ${style}`}
      >
        {label}
      </p>
    );
  }

  // Hierarchy tag
  if (typeof label === "number") {
    return (
      <p
        className={`w-fit h-fit border tracking-wide rounded-lg py-1 px-2 text-primary ${style}`}
      >
        {label > new Date().getFullYear() - 1 ? "BIXO" : "VETERANO"}
      </p>
    );
  }
}

interface PaymentTagProps {
  payment: number;
}

function PaymentTag({ payment }: PaymentTagProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <p className="text-center">{payment > 0 ? "✅" : "🚫"}</p>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{"R$: " + payment}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { Tag, PaymentTag };
