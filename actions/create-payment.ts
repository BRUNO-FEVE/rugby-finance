"use server";

import { prisma } from "@/lib/prisma";
import { Member } from "@prisma/client";

interface createPaymentProps {
  memberId: string;
  memberName: string;
  value: number;
  type?: "pix" | "cash";
  cause: string;
  member?: Member;
}

export const createPayment = async ({
  memberId,
  memberName,
  value,
  type = "pix",
  cause,
}: createPaymentProps) => {
  try {
    const response = await prisma.payment.create({
      data: {
        memberId,
        memberName,
        value,
        type,
        cause,
      },
    });

    if (!response) {
      throw new Error("Error creating Payment!");
    }
  } catch (error) {
    console.log("Error: " + error);
  }
};
