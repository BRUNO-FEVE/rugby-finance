"use server";

import { prisma } from "@/lib/prisma";

interface deletePaymentProps {
  paymentId: string;
}

export const deletePayment = async ({ paymentId }: deletePaymentProps) => {
  try {
    const response = await prisma.payment.delete({
      where: { id: paymentId },
    });

    if (!response) {
      throw new Error("Error ao deletar Pagamento");
    }
  } catch (error) {
    console.log("Error: " + error);
  }
};
