"use server";

import RugbyPaymentDataTable from "./components/date-table";
import { rugbyPaymentColumns } from "./components/columns";
import { getActivePaymentMembers } from "@/actions/get-active-payment-members";

export default async function Home() {
  let response = await getActivePaymentMembers();

  if (response) {
    return (
      <div className="w-full h-full flex flex-col gap-10 p-10">
        <div className="h-1/5 w-full flex flex-col items-start justify-center pl-20">
          <h1 className="font-bold text-4xl">Mensalidades</h1>
          <p className="text-muted-foreground font-light">
            Aqui estão as mensalidades dos membros ativos do Rugby Mauá!
          </p>
        </div>
        <RugbyPaymentDataTable columns={rugbyPaymentColumns} data={response} />
      </div>
    );
  }
}
