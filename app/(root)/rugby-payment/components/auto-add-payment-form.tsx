import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Member } from "@prisma/client";
import {
  getAbbreviatedMonth,
  getIndexMonthsToPay,
  getMonthsToPay,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import "../../../globals.css";
import { updatePaymentRecord } from "@/actions/update-payment-records";
import { toast } from "@/components/ui/use-toast";
import { createPayment } from "@/actions/create-payment";

interface AutoAddPaymentFormProps {
  member: Member;
  closeDrawer: () => void;
}

const autoAddPaymentFormSchema = z.object({
  total: z.string(),
  monthsPaid: z.string(),
});

export default function AutoAddPaymentForm({
  member,
  closeDrawer,
}: AutoAddPaymentFormProps) {
  const [isFixedNumbersMode, setIsFixedNumbersMode] = useState<boolean>(true);
  const [futureMonthsToPay, setFutureMonthsToPay] = useState<number[]>([]);
  const [monthsToPayInOrder, setMonthsToPayInOrder] = useState<number[]>([]);
  const [recordUpdated, setRecordUpdated] = useState<number[]>(
    member.paymentRecord,
  );
  const MONTHS_TO_PAY = getMonthsToPay(member.paymentRecord).split(" ");

  const form = useForm<z.infer<typeof autoAddPaymentFormSchema>>({
    resolver: zodResolver(autoAddPaymentFormSchema),
    defaultValues: {
      total: "0",
      monthsPaid: "",
    },
  });

  const paymentRecordUpdated: number[] = useMemo(() => {
    const paymentRecordUpdatedResponse: number[] = [...member.paymentRecord];

    const paymentPerMonth = Number(
      (
        parseFloat(form.getValues().total) /
        parseInt(form.getValues().monthsPaid)
      ).toFixed(2),
    );

    for (let i = 0; i < parseInt(form.getValues().monthsPaid); i++) {
      paymentRecordUpdatedResponse[monthsToPayInOrder[i]] = paymentPerMonth;
    }

    setRecordUpdated(paymentRecordUpdatedResponse);
    return paymentRecordUpdatedResponse;
  }, [form.getValues().total, form.getValues().monthsPaid]);

  useEffect(() => {
    setMonthsToPayInOrder(getIndexMonthsToPay(member.paymentRecord));
  }, []);

  async function onSubmit(values: z.infer<typeof autoAddPaymentFormSchema>) {
    const stringArray = paymentRecordUpdated.map((number) => number.toString());

    await updatePaymentRecord({
      memberId: member.id,
      values: {
        jan: stringArray[0],
        fev: stringArray[1],
        mar: stringArray[2],
        abr: stringArray[3],
        mai: stringArray[4],
        jun: stringArray[5],
        jul: stringArray[6],
        ago: stringArray[7],
        set: stringArray[8],
        out: stringArray[9],
        nov: stringArray[10],
        dez: stringArray[11],
      },
    });

    await createPayment({
      memberId: member.id,
      memberName: member.name,
      cause: "Mensalidade",
      value: parseFloat(values.total),
    });

    closeDrawer();

    toast({
      title: "Mensalidade Atualizada com Sucesso!",
      description: "O pagamento foi registrado e vinculado a esta alteração.",
    });

    setTimeout(() => {
      window.location.reload();
    }, 2000); // 2 sec
  }

  return (
    <div className="w-full h-full flex flex-col gap-7">
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle className="text-base">Histórico de Pagamento</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-6 gap-3">
          {paymentRecordUpdated.map((month, index) => {
            return (
              <Badge
                key={month + index}
                variant={"double"}
                title={getAbbreviatedMonth(index)}
                content={`R$ ${month}`}
                className={`duration-300 delay-150 transition-transform ${month > 0 ? "bg-green-500 hover:bg-green-600" : null} ${futureMonthsToPay.includes(index) ? "bg-blue-700 hover:bg-blue-800 animate-impact" : null}`}
              />
            );
          })}
        </CardContent>
      </Card>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-row justify-evenly items-end gap-6"
        >
          {isFixedNumbersMode ? (
            <FormField
              control={form.control}
              name={"total"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Total</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Insira o total"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    {/* <ArrowLeftRight className="absolute -right-10 top-0 w-4 h-4 hover:bg-muted" /> */}
                  </FormItem>
                );
              }}
            />
          ) : (
            <FormField
              control={form.control}
              name={"total"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Total</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Insira o total"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          )}
          <FormField
            control={form.control}
            name={"monthsPaid"}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Meses</FormLabel>
                  <Select
                    onValueChange={(event) => {
                      field.onChange(event);
                      setFutureMonthsToPay(
                        monthsToPayInOrder.slice(
                          0,
                          parseInt(form.getValues().monthsPaid),
                        ),
                      );
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione os meses..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MONTHS_TO_PAY.map((month, index) => {
                        const monthQuantite = index + 1;
                        return (
                          <SelectItem
                            key={month + index}
                            value={monthQuantite.toString()}
                          >
                            {monthQuantite}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="w-full flex justify-end">
            <Button type="submit" className="w-32">
              Salvar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
