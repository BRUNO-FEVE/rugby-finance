import { AddPaymentFormSchema } from "@/schemas";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNameInitials(name: string): string {
  const nameSplited = name.split(" ");

  return (
    nameSplited[0].charAt(0) + nameSplited[nameSplited.length - 1].charAt(0)
  );
}

export function formatPhoneNumber(phoneNumber: BigInt): string {
  let memberString = phoneNumber.toString();

  return (
    "(" +
    memberString.slice(0, 2) +
    ") " +
    memberString.slice(2, 7) +
    "-" +
    memberString.slice(7)
  );
}

function getMonth(monthNumber: number): string {
  switch (monthNumber) {
    case 0:
      return "Janeiro";
    case 1:
      return "Fevereiro";
    case 2:
      return "Março";
    case 3:
      return "Abril";
    case 4:
      return "Maio";
    case 5:
      return "Junho";
    case 6:
      return "Julho";
    case 7:
      return "Agosto";
    case 8:
      return "Setembro";
    case 9:
      return "Outubro";
    case 10:
      return "Novembro";
    case 11:
      return "Dezembro";
    default:
      return "Mês inválido";
  }
}

export function getMonths(
  paymentArray: number[],
  type: "to-pay" | "paid",
): string[] {
  const months = [];

  for (let i = 0; i < paymentArray.length; i++) {
    if (paymentArray[i] <= 0 && type === "to-pay") {
      months.push(getMonth(paymentArray[i]));
    }
    if (paymentArray[i] > 0 && type === "paid") {
      months.push(getMonth(paymentArray[i]));
    }
  }

  return months;
}

export function getTotal(paymentsArray: number[]): number {
  let total = paymentsArray[0];

  for (let i = 1; i < paymentsArray.length; i++) {
    total += paymentsArray[i];
  }

  return total;
}

export function getNumberArray(values: z.infer<typeof AddPaymentFormSchema>) {
  const { jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez } = values;

  return [
    parseInt(jan),
    parseInt(fev),
    parseInt(mar),
    parseInt(abr),
    parseInt(mai),
    parseInt(jun),
    parseInt(jul),
    parseInt(ago),
    parseInt(set),
    parseInt(out),
    parseInt(nov),
    parseInt(dez),
  ];
}
