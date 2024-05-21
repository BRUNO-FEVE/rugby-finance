"use server";

import { prisma } from "@/lib/prisma";
import { Member } from "@prisma/client";

export const getActivePaymentMembers = async () => {
  try {
    const response: Member[] = await prisma.member.findMany({
      where: { isPaying: true },
    });

    if (!response || response.length === 0) {
      throw new Error("Error getting rugby payments record.");
    }

    return response;
  } catch (error) {
    console.log("Error: " + error);
  }
};
