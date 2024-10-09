"use server";

import { prisma } from "@/lib/prisma";

interface deleteMemberProps {
  memberId: string;
}

export const deleteMember = async ({ memberId }: deleteMemberProps) => {
  try {
    const response = await prisma.member.delete({
      where: { id: memberId },
    });

    if (!response) {
      throw new Error("Error ao deletar Membro");
    }
  } catch (error) {
    console.log("Error: " + error);
  }
};
