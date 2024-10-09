"use server";

import { prisma } from "@/lib/prisma";

interface approveOnHoldMemberProps {
  memberId: string;
}

export const approveOnHoldMember = async ({
  memberId,
}: approveOnHoldMemberProps) => {
  try {
    const response = await prisma.member.update({
      where: { id: memberId },
      data: {
        onHold: false,
      },
    });

    if (!response) {
      throw new Error("Error ao aprovar Membro");
    }
  } catch (error) {
    console.log("Error: " + error);
  }
};
