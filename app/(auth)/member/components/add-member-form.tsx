"use client";

import { AddNewMemberFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormEvent, useState } from "react";
import { AtSign } from "lucide-react";

export default function AddMemberForm() {
  const [otherEducationInstitution, setOtherEducationInstitution] =
    useState<string>("");

  const form = useForm<z.infer<typeof AddNewMemberFormSchema>>({
    resolver: zodResolver(AddNewMemberFormSchema),
    defaultValues: {
      name: "",
      nickname: "",
      email: "",
      cpf: "",
      rg: "",
      ra: "",
      educationInstitution: "Instituto Mauá de Tecnologia",
      course: "",
      yearOfGraduation: "",
      yearOfJoiningRugby: "",
      phoneNumber: "",
      yearOfBirth: "",
      instagram: "",
      readyLink: "",
      lawsLink: "",
      team: "Masculino",
      uniformSize: "M",
      uniformNumber: "",
    },
  });

  function onSubmit() {
    console.log(form.getValues());
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="nickname"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Apelido</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o Apelido..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="cpf"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o CPF..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="rg"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>RG</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o RG..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="educationInstitution"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Instituição de Ensino</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      if (value === "Outro") {
                        setOtherEducationInstitution("");
                      } else {
                        setOtherEducationInstitution(value);
                      }
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="flex flex-col gap-4 pl-2 py-2"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Instituto Mauá de Tecnologia" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Instituto Mauá de Tecnologia
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Outro" />
                      </FormControl>
                      <FormLabel className="font-normal">Outro</FormLabel>
                    </FormItem>
                    {field.value === "Outro" && (
                      <Input
                        placeholder="Digite outra instituição de ensino..."
                        value={otherEducationInstitution}
                        onChange={(e) =>
                          setOtherEducationInstitution(e.target.value)
                        }
                      />
                    )}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {form.getValues().educationInstitution ===
        "Instituto Mauá de Tecnologia" ? (
          <FormField
            name="ra"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>RA</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o RA..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        ) : null}
        <FormField
          name="course"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Curso</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o curso..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="yearOfGraduation"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Ano de Formatura</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o ano de formatura..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="yearOfJoiningRugby"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Ano de Entrada do Rugby Mauá</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o ano de entrada no Rugby Mauá..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="phoneNumber"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o telefone..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o email..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="yearOfBirth"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Ano de Nascimento</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o ano de nascimento..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="instagram"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <div className="flex flex-row items-center gap-2">
                  <AtSign className="w-5 h-5" />
                  <FormControl>
                    <Input
                      placeholder="Digite o @ do instagram..."
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="readyLink"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Rugby Ready</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Faça upload to rugby ready..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="lawsLink"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Rugby Laws</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Faça upload to rugby laws..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="team"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-4 pl-2 py-2"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Masculino" />
                      </FormControl>
                      <FormLabel className="font-normal">Masculino</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Feminino" />
                      </FormControl>
                      <FormLabel className="font-normal">Feminino</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="uniformSize"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Tamanho Uniforme</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-4 pl-2 py-2"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="PPP" />
                      </FormControl>
                      <FormLabel className="font-normal">PPP</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="PP" />
                      </FormControl>
                      <FormLabel className="font-normal">PP</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="P" />
                      </FormControl>
                      <FormLabel className="font-normal">P</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="M" />
                      </FormControl>
                      <FormLabel className="font-normal">M</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="G" />
                      </FormControl>
                      <FormLabel className="font-normal">G</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="GG" />
                      </FormControl>
                      <FormLabel className="font-normal">GG</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="GGG" />
                      </FormControl>
                      <FormLabel className="font-normal">GGG</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {form.getValues().team === "Feminino" ? (
          <FormField
            name="uniformNumber"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Número do Uniforme</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o número do uniforme..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        ) : null}
        <Button type="submit" onClick={onSubmit} className="w-full mt-10">
          Salvar
        </Button>
      </form>
    </Form>
  );
}
