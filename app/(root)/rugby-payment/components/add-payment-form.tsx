"use client";

import { Member, RugbyPayment } from "@prisma/client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { AddPaymentFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { updatedRugbyPayment } from "@/actions/update-rugby-payments";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
  rugbyPaymentRecord: RugbyPayment;
  closeDrawer: () => void;
}

export default function AddPaymentForm({
  member,
  rugbyPaymentRecord,
  closeDrawer,
}: AddPaymentFormProps) {
  const [isPeding, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof AddPaymentFormSchema>>({
    resolver: zodResolver(AddPaymentFormSchema),
    defaultValues: {
      jan: rugbyPaymentRecord.monthsPayment[0].toString(),
      fev: rugbyPaymentRecord.monthsPayment[1].toString(),
      mar: rugbyPaymentRecord.monthsPayment[2].toString(),
      abr: rugbyPaymentRecord.monthsPayment[3].toString(),
      mai: rugbyPaymentRecord.monthsPayment[4].toString(),
      jun: rugbyPaymentRecord.monthsPayment[5].toString(),
      jul: rugbyPaymentRecord.monthsPayment[6].toString(),
      ago: rugbyPaymentRecord.monthsPayment[7].toString(),
      set: rugbyPaymentRecord.monthsPayment[8].toString(),
      out: rugbyPaymentRecord.monthsPayment[9].toString(),
      nov: rugbyPaymentRecord.monthsPayment[10].toString(),
      dez: rugbyPaymentRecord.monthsPayment[11].toString(),
    },
  });

  function onSubmit(values: z.infer<typeof AddPaymentFormSchema>) {
    startTransition(async () => {
      await updatedRugbyPayment({ memberId: member.id, values });
      closeDrawer();
      window.location.reload();
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
