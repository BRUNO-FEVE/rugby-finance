import { deletePayment } from "@/actions/delete-payment";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeletePaymentAlertProps {
  paymentId: string;
}

export default function DeletePaymentAlert({
  paymentId,
}: DeletePaymentAlertProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const handleDeletePayment = async () => {
    await deletePayment({ paymentId });

    setOpen(false);

    toast({
      title: "Pagamento Removido com Sucesso!",
      description: "O pagamento foi excluído da base de dados.",
    });

    setTimeout(() => {
      window.location.reload();
    }, 2000); // 2 sec
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="text-muted-foreground hover:text-red-500"
        >
          <Trash2 className="w-4 h-4 " />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você tem certeza de que deseja apagar este pagamento?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ao deletar, você apagará permanentemente o pagamento dos nossos
            servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button variant={"destructive"} onClick={handleDeletePayment}>
            Apagar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
