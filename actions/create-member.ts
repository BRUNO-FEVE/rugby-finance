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

interface MemberData {
  email: string;
  name: string;
  nickname: string;
  cpf: bigint;
  rg: bigint;
  educationInstituition: string;
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
  ra?: number;
  uniformNumber?: number;
  isPaying: boolean;
}

const parseMemberObject = (member: createMemberProps): MemberData => {
  const CURRENT_YEAR = new Date().getFullYear();

  const data: MemberData = {
    email: member.email,
    name: member.name,
    nickname: member.nickname,
    cpf: member.cpf,
    rg: member.rg,
    educationInstituition: member.educationInstituition,
    course: member.course,
    yearOfGraduation: member.yearOfGraduation,
    phoneNumber: member.phoneNumber,
    dateOfBirth: member.dateOfBirth,
    yearOfJoinOnRugbyMaua: member.yearOfJoinOnRugbyMaua,
    instagram: member.instagram,
    lawsLink: member.lawsLink,
    readyLink: member.readyLink,
    team: member.team,
    uniformSize: member.uniformSize,
    isPaying: member.yearOfGraduation >= CURRENT_YEAR,
  };

  if (member.ra !== null) {
    data.ra = member.ra;
  }

  if (member.uniformNumber !== null) {
    data.uniformNumber = member.uniformNumber;
  }

  return data;
};

export const createMember = async (member: createMemberProps) => {
  const memberData = parseMemberObject(member);

  console.log(memberData);

  try {
    const response = await prisma.member.create({
      data: memberData,
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
