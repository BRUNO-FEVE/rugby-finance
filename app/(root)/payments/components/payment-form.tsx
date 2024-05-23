"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { Member } from "@prisma/client";
import { getAllMembers } from "@/actions/get-all-members";
import { CommandList } from "cmdk";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { createPayment } from "@/actions/create-payment";

const CreatePaymentFormSchema = z.object({
  memberId: z.string(),
  memberName: z.string(),
  value: z.number().positive(),
  type: z.enum(["pix", "cash"]),
  cause: z.string(),
});

export default function PaymentForm() {
  const [comboboxOpen, setComboboxOpen] = useState<boolean>(false);
  const [requesStatus, setRequestStatus] = useState<
    "sleeping" | "wating" | "complete"
  >("sleeping");
  const [members, setMembers] = useState<Member[]>([]);
  const form = useForm<z.infer<typeof CreatePaymentFormSchema>>({
    resolver: zodResolver(CreatePaymentFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof CreatePaymentFormSchema>) => {
    console.log(data);
    setRequestStatus("wating");

    await createPayment(data);

    setRequestStatus("complete");
  };

  const getMembers = async () => {
    const response = await getAllMembers();
    setMembers(response);
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <Card className="w-4/12 h-full">
      <CardHeader>
        <CardTitle>Adicionar Pagamento</CardTitle>
        <CardDescription>
          Registre o pagamento realizado por um membro.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="memberId"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col items-start w-full">
                    <FormLabel className="pl-2">Membro</FormLabel>
                    <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            role="combobox"
                            className={`w-full flex justify-between ${field.value ?? "text-muted-foreground"}`}
                          >
                            {field.value
                              ? members.find(
                                  (member) => member.id === field.value,
                                )?.name
                              : "Selecione Membro"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        side="bottom"
                        sideOffset={5}
                        className="w-[400px]"
                      >
                        <ScrollArea>
                          <Command className="w-full max-h-80 overflow-scroll">
                            <CommandInput placeholder="Selecione o membro..." />
                            <CommandList>
                              <CommandEmpty>No member found.</CommandEmpty>
                              <CommandGroup>
                                {members &&
                                  members.map((member) => (
                                    <Button
                                      key={member.name}
                                      variant={"ghost"}
                                      className="w-full flex items-center justify-start p-0"
                                      onClick={() => {
                                        form.setValue("memberId", member.id);
                                        form.setValue(
                                          "memberName",
                                          member.name,
                                        );
                                        setComboboxOpen(false);
                                      }}
                                    >
                                      <CommandItem
                                        value={member.name}
                                        key={member.name}
                                        className="w-full"
                                        onSelect={() => {
                                          form.setValue("memberId", member.id);
                                          setComboboxOpen(false);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            member.id === field.value
                                              ? "opacity-100"
                                              : "opacity-0",
                                          )}
                                        />
                                        {member.name} ({member.nickname})
                                      </CommandItem>
                                    </Button>
                                  ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </ScrollArea>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                );
              }}
            />
            <div className="flex flex-row gap-10">
              <FormField
                control={form.control}
                name={"value"}
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col items-start gap-1 w-1/2">
                      <FormLabel className="pl-2">Valor</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o valor"
                          onChange={(event) => {
                            form.setValue(
                              "value",
                              parseInt(event.target.value),
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name={"type"}
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col items-start gap-1 w-1/2">
                      <FormLabel className="pl-2">Tipo de Pagamento</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={"pix"}>PIX</SelectItem>
                          <SelectItem value={"cash"}>Dinheiro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <FormField
              control={form.control}
              name={"cause"}
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col items-start gap-1 w-full">
                    <FormLabel className="pl-2">Motivo do pagamento</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Mensalidade" {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <Button type="submit" disabled={requesStatus === "wating"}>
              Adicionar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
