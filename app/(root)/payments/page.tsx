"use server";

import { getAllPayments } from "@/actions/get-all-payments";
import PaymentsDataTable from "./components/data-table";
import { paymentsColumns } from "./components/columns";
import { Payment } from "@prisma/client";
import PaymentForm from "./components/payment-form";

export default async function PaymentsPage() {
  const payments = await getAllPayments();

  // const payments: Payment[] = [
  //   {
  //     id: "1",
  //     memberId: "1234414141",
  //     value: 100,
  //     date: new Date(),
  //     type: "pix",
  //     cause: "mensalidade",
  //   },
  // ];

  if (payments) {
    return (
      <div className="w-full h-full flex flex-col gap-10 p-10">
        <div className="h-1/5 flex flex-col justify-center pl-20">
          <h1 className="font-bold text-4xl">Pagamentos</h1>
          <p className="text-muted-foreground font-light">
            Aqui estão todos pagamentos registrados pelos membros do Rugby Mauá!
          </p>
        </div>
        <div className="flex flex-row gap-10">
          <PaymentsDataTable columns={paymentsColumns} data={payments} />
          <PaymentForm />
        </div>
      </div>
    );
  }
}
