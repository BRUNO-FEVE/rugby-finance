import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";

export default function AutoPaymentInfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="absolute -right-14">
          <Info className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modos de Registro</DialogTitle>
          <DialogDescription>
            Escolha o modo que melhor se adapta às suas necessidades
          </DialogDescription>
        </DialogHeader>
        <div className="py-5 flex flex-col gap-6">
          <div>
            <DialogTitle className="text-base">Modo Manual</DialogTitle>
            <DialogDescription>
              No Modo Manual, o administrador insere os valores mês a mês. Este
              modo é ideal quando o{" "}
              <strong>membro não pode seguir os valores predefinidos</strong>. É
              uma solução flexível que permite adaptações personalizadas.
            </DialogDescription>
          </div>
          <div>
            <DialogTitle className="text-base">Modo Automático</DialogTitle>
            <DialogDescription>
              O Modo Automático permite que o sistema distribua os valores
              automaticamente, sendo altamente recomendado para{" "}
              <strong>membros que seguem a tabela de preços predefinida</strong>
              . Este modo simplifica o processo e garante a precisão.
            </DialogDescription>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
