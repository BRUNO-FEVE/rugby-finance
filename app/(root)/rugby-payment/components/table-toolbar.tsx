"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Member } from "@prisma/client";
import { Table } from "@tanstack/react-table";
import { HandCoins, CircleCheck } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { MembersToChargeContext } from "../../members-to-charge-context";
import { chargeWithEmail } from "@/actions/charge-with-email";

interface RugbyPaymentTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function RugbyPaymentTableToolbar<TData>({
  table,
}: RugbyPaymentTableToolbarProps<Member>) {
  const [sedingStage, setSedingStage] = useState<
    "sleeping" | "sending" | "sended"
  >("sleeping");

  const { setMembersToCharge } = useContext(MembersToChargeContext);

  return (
    <div className="flex justify-between">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Search member..."
          value={
            (table.getColumn("memberName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) => {
            table.getColumn("memberName")?.setFilterValue(event.target.value);
          }}
          className="max-w-sm h-9"
        />
      </div>
      <div>
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2"
          href={"/charge-fee"}
          onClick={() => {
            const membersToCharge = table
              .getSelectedRowModel()
              .rows.map((row) => row.original);

            setMembersToCharge(membersToCharge);
          }}
        >
          Cobrar
          <HandCoins className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
