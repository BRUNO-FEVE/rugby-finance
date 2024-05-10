"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TagProps {
  label: string;
}

function Tag({ label }: TagProps) {
  return (
    <p className="w-fit border tracking-wide rounded-lg py-1 px-2 text-primary">
      {label}
    </p>
  );
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
