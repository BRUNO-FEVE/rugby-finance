import { InputHTMLAttributes } from "react";
import { Input } from "./ui/input";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function TextField({ label, ...props }: TextFieldProps) {
  const LABEL = label.toLowerCase();
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-muted-foreground">{label}</p>
      <Input
        className="bg-primary text-primary-foreground"
        type={LABEL === "senha" ? "password" : LABEL}
        placeholder={`Digite seu ${LABEL}...`}
        {...props}
      />
    </div>
  );
}
