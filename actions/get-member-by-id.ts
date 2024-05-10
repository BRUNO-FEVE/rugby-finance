"use server";

import { prisma } from "@/lib/prisma";

export const getMemberById = async (memberId: string) => {
  try {
    const response = await prisma.member.findUnique({
      where: {
        id: memberId,
      },
    });

    if (!response) {
      throw new Error("Error getting member by id.");
    }

    return response;
  } catch (error) {
    console.log("Error: " + error);
  }
};
