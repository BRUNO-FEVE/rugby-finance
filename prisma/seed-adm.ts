import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      name: "Bruno Augusto Lopes Fevereiro",
      email: "br.fevereiro@terra.com.br",
      emailVerified: new Date(),
      image: "https://example.com/profile_pic.jpg",
      password: "senha123",
      accounts: {
        create: {
          type: "Type",
          provider: "Provider",
          providerAccountId: "ProviderAccountId",
          refresh_token: "RefreshToken",
          access_token: "AccessToken",
          expires_at: 1234567890,
          token_type: "TokenType",
          scope: "Scope",
          id_token: "IdToken",
          session_state: "SessionState",
        },
      },
    },
  });
}

main()
  .then(async () => {
    console.log("Mock user created successfully");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error creating mock user:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
