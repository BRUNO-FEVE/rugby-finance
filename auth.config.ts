import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchemma } from "./schemas";
import { prisma } from "./lib/prisma";
import { User } from "@prisma/client";

export default {
  providers: [
    Credentials({
      async authorize(
        credentials: Partial<Record<string, unknown>>,
      ): Promise<User | null> {
        const validatedFields = LoginSchemma.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (!user || !user.password) return null;

          const passwordsMatch = password === user.password;
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
