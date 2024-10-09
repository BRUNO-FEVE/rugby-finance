"use client";

import { AddNewMemberFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { AtSign, InfoIcon } from "lucide-react";
import { uploadFileOnDrive } from "@/actions/upload-file-on-drive";
import { createMember } from "@/actions/create-member";
import { toast } from "@/components/ui/use-toast";

export default function AddMemberForm() {
  const [readyFile, setReadyFile] = useState<File | null>(null);
  const [lawsFile, setLawsFile] = useState<File | null>(null);
  const [otherEducationInstitution, setOtherEducationInstitution] =
    useState<string>("");
  const [formStatus, setFormStatus] = useState<
    | "WAITING"
    | "UPLOADING_READY"
    | "UPLOADING_LAWS"
    | "CREATING_MEMBER"
    | "SUCCESS"
    | "ERROR"
  >("WAITING");

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
      team: "Masculino",
      uniformSize: "M",
    },
  });

  async function onSubmit(data: z.infer<typeof AddNewMemberFormSchema>) {
    console.log(data);

    // Upload Rugby Ready

    if (readyFile) {
      setFormStatus("UPLOADING_READY");
      const response = await uploadFileOnDrive({
        name: "Ready" + data.name.split(" ")[0] + data.nickname,
        type: readyFile.type,
        data: new Uint8Array(await readyFile.arrayBuffer()),
      });

      if (response.success && response.webViewLink) {
        form.setValue("readyLink", response.webViewLink);
      }
    }

    // Upload Rugby Laws
    if (lawsFile) {
      setFormStatus("UPLOADING_LAWS");
      const response = await uploadFileOnDrive({
        name: "Laws" + data.name.split(" ")[0] + data.nickname,
        type: lawsFile.type,
        data: new Uint8Array(await lawsFile.arrayBuffer()),
      });

      if (response.success && response.webViewLink) {
        form.setValue("lawsLink", response.webViewLink);
      }
    }

    const finalData = form.getValues();

    setFormStatus("CREATING_MEMBER");

    const response = await createMember({
      email: finalData.email,
      name: finalData.name,
      nickname: finalData.nickname,
      cpf: BigInt(finalData.cpf),
      rg: BigInt(finalData.rg),
      educationInstituition: finalData.educationInstitution,
      ra: finalData.ra ? parseInt(finalData.ra, 10) : null,
      course: finalData.course,
      yearOfGraduation: parseInt(finalData.yearOfGraduation, 10),
      phoneNumber: BigInt(finalData.phoneNumber),
      dateOfBirth: finalData.yearOfBirth,
      yearOfJoinOnRugbyMaua: parseInt(finalData.yearOfJoiningRugby, 10),
      instagram: finalData.instagram ?? "",
      lawsLink: finalData.lawsLink,
      readyLink: finalData.readyLink,
      team: finalData.team,
      uniformSize: finalData.uniformSize,
      uniformNumber: finalData.uniformNumber
        ? parseInt(finalData.uniformNumber, 10)
        : null,
    });

    if (response?.success) {
      setFormStatus("SUCCESS");
      toast({
        title: "Membro criado com sucesso!",
        description: "O membro foi criado com sucesso.",
      });

      window.location.href = "/members";
    } else {
      setFormStatus("ERROR");
      toast({
        title: "Erro ao criar membro!",
        description:
          "Ocorreu um erro ao criar o membro, verifique os dados e tente novamente.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.log("Form validation errors:", errors);
        })}
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
                <div className="flex flex-row items-center gap-2">
                  <FormLabel>Rugby Ready</FormLabel>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() =>
                      window.open(
                        "https://passport.world.rugby/injury-prevention-and-risk-management/rugby-ready/",
                        "_blank",
                      )
                    }
                  >
                    <InfoIcon className="w-4 h-4 text-primary" />
                  </Button>
                </div>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => {
                      console.log(e?.target?.files?.[0]);
                      if (e.target.files && e.target.files[0] !== null) {
                        form.setValue("readyLink", e.target.files[0].name);
                        setReadyFile(e.target.files[0]);
                      }
                    }}
                    placeholder="Faça upload to rugby ready..."
                    // {...field}
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
                <div className="flex flex-row items-center gap-2">
                  <FormLabel>Rugby Laws</FormLabel>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() =>
                      window.open(
                        "https://passport.world.rugby/laws-of-the-game/laws-of-the-game-exam/",
                        "_blank",
                      )
                    }
                  >
                    <InfoIcon className="w-4 h-4" />
                  </Button>
                </div>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => {
                      console.log(e?.target?.files?.[0]);
                      if (e.target.files && e.target.files[0] !== null) {
                        form.setValue("lawsLink", e.target.files[0].name);
                        setLawsFile(e.target.files[0]);
                      }
                    }}
                    placeholder="Faça upload to rugby laws..."
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
        <Button
          disabled={formStatus !== "WAITING"}
          type="submit"
          className={`w-full mt-10 ${
            formStatus === "WAITING"
              ? "bg-primary text-white"
              : formStatus === "UPLOADING_READY"
                ? "bg-blue-500 text-white"
                : formStatus === "UPLOADING_LAWS"
                  ? "bg-blue-500 text-white"
                  : formStatus === "CREATING_MEMBER"
                    ? "bg-blue-500 text-white"
                    : formStatus === "SUCCESS"
                      ? "bg-green-500 text-white"
                      : formStatus === "ERROR"
                        ? "bg-red-500 text-white"
                        : null
          }`}
        >
          {formStatus === "WAITING"
            ? "Salvar"
            : formStatus === "UPLOADING_READY"
              ? "Enviando Rugby Ready..."
              : formStatus === "UPLOADING_LAWS"
                ? "Enviando Rugby Laws..."
                : formStatus === "CREATING_MEMBER"
                  ? "Criando membro..."
                  : formStatus === "SUCCESS"
                    ? "Membro criado com sucesso!"
                    : "Erro ao criar membro!"}
        </Button>
      </form>
    </Form>
  );
}
