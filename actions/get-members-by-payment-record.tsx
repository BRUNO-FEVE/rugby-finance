"use server";

import { prisma } from "@/lib/prisma";
import { Member, RugbyPayment } from "@prisma/client";

interface getMembersByPaymentRecordProps {
  paymentRecords: RugbyPayment[];
}

export const getMembersByPaymentRecord = async ({
  paymentRecords,
}: getMembersByPaymentRecordProps): Promise<Member[]> => {
  try {
    const membersIds: string[] = [];

    paymentRecords.map((payment) => {
      membersIds.push(payment.memberId);
    });

    const response = await prisma.member.findMany({
      where: {
        id: { in: membersIds },
      },
    });

    return response;
  } catch (error) {
    console.log("Error: " + error);
    return [];
  }
};
