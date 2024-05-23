"use server";

import { prisma } from "@/lib/prisma";
import { Payment } from "@prisma/client";

export const getAllPayments = async () => {
  try {
    const response: Payment[] = await prisma.payment.findMany();

    if (!response) {
      throw new Error("Error on get all payments!");
    }

    return response;
  } catch (error) {
    console.log("Error: " + error);
    throw error;
  }
};
