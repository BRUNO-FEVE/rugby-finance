"use server";

import { prisma } from "@/lib/prisma";

interface createPaymentProps {
  memberId: string;
  memberName: string;
  value: number;
  type: "pix" | "cash";
  cause: string;
}

export const createPayment = async ({
  memberId,
  memberName,
  value,
  type,
  cause,
}: createPaymentProps) => {
  await prisma.payment.create({
    data: {
      memberId: memberId,
      memberName: memberName,
      value: value,
      type: type,
      cause: cause,
    },
  });
};
