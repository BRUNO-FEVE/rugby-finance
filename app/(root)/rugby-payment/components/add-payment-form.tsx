"use client";

import { Member } from "@prisma/client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { AddPaymentFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { updatePaymentRecord } from "@/actions/update-payment-records";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createPayment } from "@/actions/create-payment";
import { getNumberArray, getTotal } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export interface monthsProps {
  type:
    | "jan"
    | "fev"
    | "mar"
    | "abr"
    | "mai"
    | "jun"
    | "jul"
    | "ago"
    | "set"
    | "out"
    | "nov"
    | "dez";
  name: string;
}

const months: monthsProps[] = [
  {
    type: "jan",
    name: "Janeiro",
  },
  {
    type: "fev",
    name: "Fevereiro",
  },
  {
    type: "mar",
    name: "Março",
  },
  {
    type: "abr",
    name: "Abril",
  },
  {
    type: "mai",
    name: "Maio",
  },
  {
    type: "jun",
    name: "Junho",
  },
  {
    type: "jul",
    name: "Julho",
  },
  {
    type: "ago",
    name: "Agosto",
  },
  {
    type: "set",
    name: "Setembro",
  },
  {
    type: "out",
    name: "Outubro",
  },
  {
    type: "nov",
    name: "Novembro",
  },
  {
    type: "dez",
    name: "Dezembro",
  },
];

interface AddPaymentFormProps {
  member: Member;
  closeDrawer: () => void;
}

export default function AddPaymentForm({
  member,
  closeDrawer,
}: AddPaymentFormProps) {
  const [isPeding, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof AddPaymentFormSchema>>({
    resolver: zodResolver(AddPaymentFormSchema),
    defaultValues: {
      jan: member.paymentRecord[0].toString(),
      fev: member.paymentRecord[1].toString(),
      mar: member.paymentRecord[2].toString(),
      abr: member.paymentRecord[3].toString(),
      mai: member.paymentRecord[4].toString(),
      jun: member.paymentRecord[5].toString(),
      jul: member.paymentRecord[6].toString(),
      ago: member.paymentRecord[7].toString(),
      set: member.paymentRecord[8].toString(),
      out: member.paymentRecord[9].toString(),
      nov: member.paymentRecord[10].toString(),
      dez: member.paymentRecord[11].toString(),
    },
  });

  function onSubmit(values: z.infer<typeof AddPaymentFormSchema>) {
    startTransition(async () => {
      const oldTotalPaymentRecord = getTotal(member.paymentRecord);

      await updatePaymentRecord({ memberId: member.id, values });

      const IS_ADDING =
        oldTotalPaymentRecord < getTotal(getNumberArray(values));

      if (IS_ADDING) {
        await createPayment({
          memberId: member.id,
          memberName: member.name,
          cause: "Mensalidade",
          value: getTotal(getNumberArray(values)),
        });
      }

      closeDrawer();

      toast({
        title: "Mensalidade Atualizada com Sucesso!",
        description: IS_ADDING
          ? "O pagamento foi registrado e vinculado a esta alteração."
          : "A alteração foi registrada.",
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2 sec
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-end h-full justify-between"
      >
        <div className="grid grid-cols-6 py-10 px-7 gap-10 h-full">
          {months.map((month, index) => {
            return (
              <FormField
                key={index + "" + month}
                name={month.type}
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{month.name}</FormLabel>
                      <FormControl>
                        <Input className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            );
          })}
        </div>
        <Button disabled={isPeding} type="submit" className="w-32">
          Salvar
        </Button>
      </form>
    </Form>
  );
}
