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

export function getMonth(monthNumber: number): string {
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

export function getMonthsToPay(paymentRecord: number[]): string {
  let months = "";

  for (let i = 0; i < paymentRecord.length; i++) {
    if (paymentRecord[i] === 0) {
      if (i !== paymentRecord.length - 1) {
        months += getMonth(i) + ", ";
      } else {
        months += getMonth(i);
      }
    }
  }
  return months;
}

interface getBaseTextProps {
  nickname: string;
  monthsToPay: string;
}

export function getBaseText({ nickname, monthsToPay }: getBaseTextProps) {
  return `
Olá ${nickname},

Espero que você esteja bem! Gostaria de lembrar sobre a contribuição mensal para o nosso time de rugby da faculdade, o Rugby Mauá. Sua participação é essencial para o sucesso do time e para fortalecermos nossa comunidade esportiva.

Notamos que os pagamentos dos seguintes meses estão pendentes: ${monthsToPay}.

Para facilitar sua contribuição, oferecemos diferentes planos de mensalidade:

- Mensal: R$ 25,00
- Semestral: R$ 130,00
- Anual: R$ 250,00

Entendemos que você pode estar enfrentando dificuldades financeiras e estamos dispostos a encontrar soluções, se necessário. Agradecemos muito pelo seu apoio contínuo e pedimos que, por favor, efetue o pagamento o mais breve possível.

Pix do Canadá: 11996019114.

Após o pagamento, por gentileza, envie o comprovante para um dos membros da comissão para atualizarmos nosso sistema.

Contamos com você! 😊🏉
`;
}

export function formatDate(date: Date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear().toString().slice(-2);

  const dayString = day < 10 ? "0" + day : day;
  const monthString = month < 10 ? "0" + month : month;

  return `${dayString}/${monthString}/${year}`;
}

export function getAbbreviatedMonth(monthNumber: number): string {
  switch (monthNumber) {
    case 0:
      return "Jan";
    case 1:
      return "Fev";
    case 2:
      return "Mar";
    case 3:
      return "Abr";
    case 4:
      return "Mai";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Ago";
    case 8:
      return "Set";
    case 9:
      return "Out";
    case 10:
      return "Nov";
    case 11:
      return "Dez";
    default:
      return "Mês inválido";
  }
}
