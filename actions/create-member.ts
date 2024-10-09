"use server";

import { prisma } from "@/lib/prisma";

interface createMemberProps {
  email: string;
  name: string;
  nickname: string;
  cpf: bigint;
  rg: bigint;
  educationInstituition: string;
  ra: number | null;
  course: string;
  yearOfGraduation: number;
  phoneNumber: bigint;
  dateOfBirth: string;
  yearOfJoinOnRugbyMaua: number;
  instagram: string;
  lawsLink: string;
  readyLink: string;
  team: string;
  uniformSize: string;
  uniformNumber: number | null;
}

export const createMember = async (member: createMemberProps) => {
  const CURRENT_YEAR = new Date().getFullYear();

  try {
    const response = await prisma.member.create({
      data: {
        email: member.email,
        name: member.name,
        nickname: member.nickname,
        cpf: BigInt(member.cpf),
        rg: member.rg,
        educationInstituition: member.educationInstituition,
        ra: member.ra,
        course: member.course,
        yearOfGraduation: member.yearOfGraduation,
        phoneNumber: BigInt(member.phoneNumber),
        dateOfBirth: member.dateOfBirth,
        yearOfJoinOnRugbyMaua: member.yearOfJoinOnRugbyMaua,
        instagram: member.instagram,
        lawsLink: member.lawsLink,
        readyLink: member.readyLink,
        team: member.team,
        uniformSize: member.uniformSize,
        uniformNumber: member.uniformNumber ?? null,
        isPaying: member.yearOfGraduation >= CURRENT_YEAR,
      },
    });

    if (!response) {
      throw new Error("Error creating Payment!");
    }

    return {
      success: true,
      member: response,
      message: "Membro criado com sucesso!",
    };
  } catch (error) {
    console.log("Error: " + error);
  }
};
