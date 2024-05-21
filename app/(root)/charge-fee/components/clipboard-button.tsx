import { Button } from "@/components/ui/button";
import { Clipboard, Check } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

interface ClipboardButtonProps {
  textToCopy: string;
}

export default function ClipboardButton({ textToCopy }: ClipboardButtonProps) {
  const [icon, setIcon] = useState<ReactNode>(
    <Clipboard className="w-3.5 h-3.5" />,
  );

  useEffect(() => {
    setTimeout(() => {
      setIcon(<Clipboard className="w-3.5 h-3.5" />);
    }, 2000); // 2 sec
  }, [icon]);

  return (
    <Button
      variant={"clipboard"}
      size={"icon"}
      onClick={() => {
        navigator.clipboard.writeText(textToCopy);
        setIcon(<Check className="w-3.5 h-3.5" />);
      }}
    >
      {icon}
    </Button>
  );
}
