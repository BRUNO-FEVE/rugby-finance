import { Check } from "lucide-react";
import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

interface CircleNumberProps {
  number: number;
}

function CircleNumber({ number }: CircleNumberProps) {
  return (
    <p className="h-7 w-7 bg-muted rounded-full flex items-center justify-center">
      {number}
    </p>
  );
}

export { StepCircle, CircleNumber };
