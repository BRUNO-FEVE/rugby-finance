"use server";

import { prisma } from "@/lib/prisma";
import { Member } from "@prisma/client";

interface GetAllMembersProps {
  onHold: boolean;
}

export const getAllMembers = async ({ onHold }: GetAllMembersProps) => {
  try {
    const response: Member[] = await prisma.member.findMany({
      where: {
        onHold: onHold,
      },
    });

    if (!response) {
      throw new Error("Error on get all members!");
    }

    return response;
  } catch (error) {
    console.log("Error: " + error);
    throw error;
  }
};
