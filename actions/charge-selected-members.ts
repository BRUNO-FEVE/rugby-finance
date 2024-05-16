"use server";

import { RugbyPayment } from "@prisma/client";
import { resend } from "@/lib/resend";
import { getMemberById } from "./get-member-by-id";
import { EmailTemplate } from "@/components/email-template";
import { Dispatch, SetStateAction } from "react";

interface chargeMembersProps {
  members: RugbyPayment[];
}

export const chargeMembers = async ({ members }: chargeMembersProps) => {
  members.map(async (member) => {
    const memberInfo = await getMemberById(member.memberId);

    console.log(memberInfo);

    if (memberInfo) {
      const response = await resend.emails.send({
        from: "financeiro@rugbymaua.com.br",
        to: [memberInfo.email],
        subject: "Rugby Mauá Cobrança de Mensalidade",
        text: "teste",
        react: EmailTemplate({ name: memberInfo.name }),
      });

      console.log(response);
    }
  });
};
