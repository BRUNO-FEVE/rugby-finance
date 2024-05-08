"use server";

import * as z from "zod";

import { signIn } from "@/auth";
import { LoginSchemma } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchemma>) => {
  const validateFields = LoginSchemma.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validateFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    // if (error instanceof AuthError) {
    //   switch (error.type) {
    //     case "CredentialsSignin":
    //       return { error: "Invalid credentials!" };
    //     default:
    //       return { error: "Something went wrong!" };
    //   }
    console.log("error " + error);
  }

  // throw error;
};
