import { PrismaClient } from "@prisma/client";
import { adms } from "./seed-json/adm";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  adms.map(async (adm) => {
    await prisma.user.create({
      data: {
        name: adm.name,
        email: adm.email,
        emailVerified: new Date(),
        image: adm.image,
        password: adm.password,
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
