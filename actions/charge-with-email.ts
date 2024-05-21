"use server";

import { Member } from "@prisma/client";
import { resend } from "@/lib/resend";
import { EmailTemplate } from "@/components/email-template";
import { getMonthsToPay } from "@/lib/utils";

interface chargeMembersProps {
  members: Member[];
}

export const chargeWithEmail = async ({ members }: chargeMembersProps) => {
  try {
    members.map(async (member) => {
      await resend.emails.send({
        from: "financeiro@rugbymaua.com.br",
        to: [member.email],
        subject: "Rugby Mauá Cobrança de Mensalidade",
        text: "teste",
        react: EmailTemplate({
          name: member.name,
          meses: getMonthsToPay(member.paymentRecord),
        }),
      });
    });
  } catch (error) {
    console.log("Error: " + error);
  }
};
