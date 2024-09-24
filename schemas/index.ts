import * as z from "zod";

export const LoginSchemma = z.object({
  email: z.string().email({
    message: "Email Invalido!",
  }),
  password: z.string().min(1, {
    message: "Senha Invalida!",
  }),
});

const monthsValidation = z.string().optional().default("0");

export const AddPaymentFormSchema = z.object({
  jan: monthsValidation,
  fev: monthsValidation,
  mar: monthsValidation,
  abr: monthsValidation,
  mai: monthsValidation,
  jun: monthsValidation,
  jul: monthsValidation,
  ago: monthsValidation,
  set: monthsValidation,
  out: monthsValidation,
  nov: monthsValidation,
  dez: monthsValidation,
});

export const AddNewMemberFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório."),
  nickname: z.string().min(1, "Apelido é obrigatório."),
  cpf: z
    .string()
    .min(1, "CPF é obrigatório.")
    .regex(/^\d+$/, "CPF deve conter apenas números."),
  rg: z
    .string()
    .min(1, "RG é obrigatório.")
    .regex(/^\d+$/, "CPF deve conter apenas números."),
  ra: z.string().regex(/^\d+$/, "RA deve conter apenas números.").optional(),
  educationInstitution: z
    .string()
    .min(1, "Instituição de ensino é obrigatória."),
  course: z.string().min(1, "Curso é obrigatório."),
  yearOfGraduation: z
    .string()
    .length(4, "Ano de formatura deve ter 4 dígitos.")
    .regex(/^\d{4}$/, "Ano de formatura deve conter apenas números."),
  yearOfJoiningRugby: z
    .string()
    .length(4, "Ano de ingresso no rugby deve ter 4 dígitos.")
    .regex(/^\d{4}$/, "Ano de ingresso no rugby deve conter apenas números."),
  phoneNumber: z
    .string()
    .min(10, "Número de telefone deve ter pelo menos 10 dígitos.")
    .regex(/^\d+$/, "Número de telefone deve conter apenas números."),
  email: z.string().email("Email inválido."),
  yearOfBirth: z
    .string()
    .length(8, "Data de nascimento deve ter 8 dígitos.")
    .regex(/^\d+$/, "Ano de nascimento deve conter apenas números."),
  instagram: z
    .string()
    .optional()
    .refine((val) => !val?.includes("@"), {
      message: "Instagram não deve conter o '@'",
    }),
  readyLink: z.string().url("URL inválida."),
  lawsLink: z.string().url("URL inválida."),
  team: z.enum(["Masculino", "Feminino"], { message: "Time é Obrigatório." }),
  uniformSize: z.enum(["PP", "P", "M", "G", "GG"], {
    message: "Tamanho do Uniforme é Obrigatório.",
  }),
  uniformNumber: z
    .string()
    .min(1, "Número de uniforme é obrigatório.")
    .regex(/^\d+$/, "Número de uniforme deve conter apenas números.")
    .optional(),
});
