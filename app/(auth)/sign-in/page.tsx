"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchemma } from "@/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/actions/login";
import { useTransition } from "react";

export default function SignIn() {
  const [isPeding, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchemma>>({
    resolver: zodResolver(LoginSchemma),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchemma>) => {
    startTransition(() => {
      login(values);
    });
  };

  return (
    <div className="w-full md:w-1/2 h-screen flex items-center justify-center">
      <div className="w-4/6 flex flex-col gap-3">
        <h2 className="scroll-m-20 pb-2 text-4xl font-semibold tracking-tight first:mt-0 text-primary">
          <span className="font-extrabold">Bem Vindo!</span> <br /> Financeiro
          do Rugby
        </h2>
        <p className="text-muted-foreground">
          Plataforma criada pela comissão do Rugby Mauá para o gerenciamento de
          pagamentos de seus membros, incluindo eventuais cobranças.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="pt-20 flex flex-col gap-10"
          >
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPeding}
                        placeholder="exemplo@email.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">Senha</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPeding}
                        placeholder="*******"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isPeding} type="submit" variant={"default"}>
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
