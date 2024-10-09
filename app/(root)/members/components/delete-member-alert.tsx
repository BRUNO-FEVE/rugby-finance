import { deleteMember } from "@/actions/delete-member";
import {
  AlertDialog,
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
import { Member } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeletePaymentAlertProps {
  member: Member;
}

export default function DeletePaymentAlert({
  member,
}: DeletePaymentAlertProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const handleDeletePayment = async () => {
    await deleteMember({ memberId: member.id });

    setOpen(false);

    toast({
      title: "Membro Removido com Sucesso!",
      description: "O membro foi excluído da base de dados.",
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
            Você tem certeza de que deseja apagar este membro?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ao deletar, você apagará permanentemente o {member.name} dos nossos
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
