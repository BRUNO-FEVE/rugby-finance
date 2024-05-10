"use server";

import { prisma } from "@/lib/prisma";
import { RugbyPayment } from "@prisma/client";

export const getAllRugbyPaymentsRecord = async () => {
  try {
    const response: RugbyPayment[] = await prisma.rugbyPayment.findMany();

    if (!response || response.length === 0) {
      throw new Error("Error getting rugby payments record.");
    }

    return response;
  } catch (error) {
    console.log("Error: " + error);
  }
};
