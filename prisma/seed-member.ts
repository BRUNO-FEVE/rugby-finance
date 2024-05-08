import { members } from "./seed-json/members";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.member.deleteMany();

  members.map(async (member) => {
    await prisma.member.create({
      data: {
        email: member.email,
        name: member.name,
        nickName: member.nickName,
        cpf: member.cpf,
        rg: member.rg,
        educationInstituition: member.educationInstituition,
        ra: member.ra,
        course: member.course,
        yearOfGraduation: member.yearOfGraduation,
        phoneNumber: member.phoneNumber,
        yearOfBirth: member.yearOfBirth,
        yearOfJoinOnRugbyMaua: member.yearOfJoinOnRugbyMaua,
        instagram: member.instagram,
        lawsLink: member.lawsLink,
        readyLink: member.readyLink,
        team: member.team,
        uniformSize: member.uniformSize,
        uniformNumber: member.uniformNumber,
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
