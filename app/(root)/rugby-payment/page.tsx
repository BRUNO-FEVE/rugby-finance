"use server";

import { getAllRugbyPaymentsRecord } from "@/actions/get-all-rugby-payments";
import React from "react";
import RugbyPaymentDataTable from "./components/date-table";

export default async function Home() {
  const response = await getAllRugbyPaymentsRecord();

  return (
    <div className="w-full h-full flex flex-col gap-10 p-10">
      <div className="h-1/5 flex flex-col justify-center pl-20">
        <h1 className="font-bold text-4xl">Mensalidades</h1>
        <p className="text-muted-foreground font-light">
          Aqui estão todos membros ativos do Rugby Mauá!
        </p>
      </div>
      <RugbyPaymentDataTable columns={[]} data={[]} />
    </div>
  );
}
