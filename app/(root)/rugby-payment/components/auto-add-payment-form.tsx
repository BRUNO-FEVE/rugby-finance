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
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Member } from "@prisma/client";
import { getAbbreviatedMonth } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AutoAddPaymentFormProps {
  member: Member;
}

const autoAddPaymentFormSchema = z.object({
  total: z.number().positive(),
  monthsPaid: z.number().positive().min(1).max(12),
});

export default function AutoAddPaymentForm({
  member,
}: AutoAddPaymentFormProps) {
  const form = useForm<z.infer<typeof autoAddPaymentFormSchema>>({
    resolver: zodResolver(autoAddPaymentFormSchema),
    defaultValues: {
      total: 0,
      monthsPaid: 0,
    },
  });

  function onSubmit(values: z.infer<typeof autoAddPaymentFormSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full h-full flex flex-col gap-7">
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle className="text-base">Histórico de Pagamento</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-6 gap-3">
          {member.paymentRecord.map((month, index) => {
            return (
              <Badge
                key={month + index}
                variant={"double"}
                title={getAbbreviatedMonth(index)}
                content={`R$ ${month}`}
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
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name={"monthsPaid"}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Meses</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Insira o meses desse pagamento"
                      {...field}
                    />
                  </FormControl>
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
