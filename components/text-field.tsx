import { Input } from "./ui/input";

interface TextFieldProps {
  label: string;
}

export default function TextField({ label }: TextFieldProps) {
  const LABEL = label.toLowerCase();
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-muted-foreground">{label}</p>
      <Input
        className="bg-primary text-primary-foreground"
        type={LABEL === "senha" ? "password" : LABEL}
        placeholder={`Digite seu ${LABEL}...`}
      />
    </div>
  );
}
