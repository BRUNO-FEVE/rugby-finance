import * as z from "zod";

export const LoginSchemma = z.object({
  email: z.string().email({
    message: "Email Invalido!",
  }),
  password: z.string().min(1, {
    message: "Senha Invalida!",
  }),
});
