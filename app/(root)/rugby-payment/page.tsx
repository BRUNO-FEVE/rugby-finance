"use server";

import { getAllRugbyPaymentsRecord } from "@/actions/get-all-rugby-payments";
import RugbyPaymentDataTable from "./components/date-table";
import { rugbyPaymentColumns } from "./components/columns";

export default async function Home() {
  let response = await getAllRugbyPaymentsRecord();

  if (response) {
    return (
      <div className="w-full h-full flex flex-col items-center gap-10">
        <div className="max-w-screen-2xl">
          <div className="h-1/5 w-full flex flex-col items-start justify-center pl-20">
            <h1 className="font-bold text-4xl">Mensalidades</h1>
            <p className="text-muted-foreground font-light">
              Aqui estão as mensalidades dos membros ativos do Rugby Mauá!
            </p>
          </div>
          <RugbyPaymentDataTable
            columns={rugbyPaymentColumns}
            data={response}
          />
        </div>
      </div>
    );
  }
}
