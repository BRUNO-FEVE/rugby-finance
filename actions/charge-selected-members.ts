"use server";

import { RugbyPayment } from "@prisma/client";
import { resend } from "@/lib/resend";
import { getMemberById } from "./get-member-by-id";
import { EmailTemplate } from "@/components/email-template";
import { Dispatch, SetStateAction } from "react";
import { getMonthsToPay } from "@/lib/utils";

interface chargeMembersProps {
  members: RugbyPayment[];
}

export const chargeMembers = async ({ members }: chargeMembersProps) => {
  try {
    members.map(async (member) => {
      const memberInfo = await getMemberById(member.memberId);

      if (memberInfo) {
        const response = await resend.emails.send({
          from: "financeiro@rugbymaua.com.br",
          to: [memberInfo.email],
          subject: "Rugby Mauá Cobrança de Mensalidade",
          text: "teste",
          react: EmailTemplate({
            name: memberInfo.name,
            meses: getMonthsToPay(member.monthsPayment),
          }),
        });
      }
    });
  } catch (error) {
    console.log("Error: " + error);
  }
};
