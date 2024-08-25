// import { prisma } from "@/lib/prisma";
// import { admData } from "./seed-data/adm-data";

// async function main() {
//   await prisma.user.deleteMany();

//   admData.map(async (adm) => {
//     await prisma.user.create({
//       data: {
//         name: adm.name,
//         email: adm.email,
//         password: adm.password,
//         emailVerified: adm.emailVerified,
//         image: adm.image,
//       },
//     });
//   });
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
