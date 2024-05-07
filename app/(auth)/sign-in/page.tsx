"use client";

import TextField from "@/components/text-field";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";

export default function SignIn() {
  return (
    <div className="w-full md:w-1/2 h-screen flex items-center justify-center">
      <div className="w-4/6 flex flex-col gap-3">
        <h2 className="scroll-m-20 pb-2 text-4xl font-semibold tracking-tight first:mt-0 text-primary-foreground">
          <span className="font-extrabold">Bem Vindo!</span> <br /> Financeiro
          do Rugby
        </h2>
        <p className="text-muted-foreground">
          Plataforma criada pela comissão do Rugby Mauá para o gerenciamento de
          pagamentos de seus membros, incluindo eventuais cobranças.
        </p>
        <form action="" className="pt-20 flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <TextField name="email" label={"Email"} />
            <TextField name="password" label={"Senha"} />
          </div>
          <Button variant={"secondary"}>Login</Button>
        </form>
      </div>
    </div>
  );
}
