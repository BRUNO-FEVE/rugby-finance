"use server";

import { prisma } from "@/lib/prisma";
import { Member } from "@prisma/client";

export const getAllMembers = async () => {
  try {
    const response: Member[] = await prisma.member.findMany();

    if (!response || response.length === 0) {
      throw new Error("Error on get all members!");
    }

    return response;
  } catch (error) {
    console.log("Error: " + error);
    throw error;
  }
};
