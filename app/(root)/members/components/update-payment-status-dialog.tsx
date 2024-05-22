"use client";

import { updatePaymentStatus } from "@/actions/update-payment-status";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Member } from "@prisma/client";
import { SquarePen } from "lucide-react";
import { useState } from "react";

interface UpdatePaymentStatusDialogProps {
  member: Member;
}

export function UpdatePaymentStatusDialog({
  member,
}: UpdatePaymentStatusDialogProps) {
  const [updateStatus, setUpdateStatus] = useState<
    "waiting" | "updating" | "complete"
  >("waiting");
  const [selectedValue, setSelectedValue] = useState<string>(
    member.isPaying ? "paying" : "not-paying",
  );

  const handleUpdate = async () => {
    setUpdateStatus("updating");
    const isPayingStatus = member.isPaying ? "paying" : "not-paying";

    if (selectedValue !== isPayingStatus) {
      const response = await updatePaymentStatus({
        memberId: member.id,
        paymentStatus: selectedValue === "paying",
      });

      if (response) setUpdateStatus("complete");
    } else {
      setTimeout(() => {
        setUpdateStatus("complete");
      }, 1000); // 1 sec
    }

    window.location.reload();
  };

  const DESCRIPTION_TEXT = member.isPaying
    ? "Ao tornar o membro NÃO PAGANTE, ele deixará de participar das cobranças de mensalidade."
    : "Ao tornar o membro PAGANTE, ele começará a participar das cobranças, tanto por e-mail quanto por WhatsApp.";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={member.isPaying ? "outline" : "destructive"}
          className="w-fit flex flex-row items-center justify-center gap-2"
        >
          {member.isPaying ? "PAGANTE" : "NÃO PAGANTE"}
          <SquarePen className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-10">
        <DialogHeader>
          <DialogTitle>Editar Status de Pagameto</DialogTitle>
          <DialogDescription>{DESCRIPTION_TEXT}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-row justify-start items-center gap-4">
          <Label>Status de Pagamento</Label>
          <Select
            value={selectedValue}
            onValueChange={(value) => setSelectedValue(value)}
          >
            <SelectTrigger className="w-2/5">
              <SelectValue
                placeholder={member.isPaying ? "PAGANTE" : "NÃO PAGANTE"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paying">PAGANTE</SelectItem>
              <SelectItem value="not-paying">NÃO PAGANTE</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleUpdate} disabled={updateStatus === "updating"}>
          {updateStatus === "updating" ? "Salvando..." : "Salvar"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
