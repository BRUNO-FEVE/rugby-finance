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
