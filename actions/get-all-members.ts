"use server";

import { prisma } from "@/lib/prisma";
import { Member } from "@prisma/client";

export const getAllMembers = async () => {
  try {
    const members: Member[] = await prisma.member.findMany();

    if (!members || members.length === 0) {
      throw new Error("Error on get all members!");
    }

    return members;
  } catch (error) {
    console.log("Error: " + error);
  }
};
