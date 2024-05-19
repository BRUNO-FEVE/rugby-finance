"use client";

import { chargeMembers } from "@/actions/charge-selected-members";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RugbyPayment } from "@prisma/client";
import { Table } from "@tanstack/react-table";
import { HandCoins, CircleCheck } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { MembersToChargeContext } from "../../members-to-charge-context";

interface RugbyPaymentTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function RugbyPaymentTableToolbar<TData>({
  table,
}: RugbyPaymentTableToolbarProps<RugbyPayment>) {
  const [sedingStage, setSedingStage] = useState<
    "sleeping" | "sending" | "sended"
  >("sleeping");

  const { setMembersToCharge } = useContext(MembersToChargeContext);

  const handleChargeMembers = async () => {
    const rugbyPaymentsSelected = table.getSelectedRowModel();
    console.log(rugbyPaymentsSelected);

    const RugbyPayments: RugbyPayment[] = [];

    rugbyPaymentsSelected.rows.map((row) => {
      RugbyPayments.push(row.original);
    });

    setSedingStage("sending");

    await chargeMembers({
      members: RugbyPayments,
    });
    setSedingStage("sended");
  };

  const handleChargeButtonText = (chargeStage: string) => {
    switch (chargeStage) {
      case "sleeping":
        return "Cobrar";
      case "sending":
        return "Cobrando...";
      case "sended":
        return "Cobrados";
      default:
        return "Cobrar";
    }
  };

  useEffect(() => {
    if (sedingStage === "sended") {
      setTimeout(() => {
        setSedingStage("sleeping");
      }, 3000); // 3 sec
    }
  }, [sedingStage]);

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
              .rows.map((row) => ({
                id: row.original.id,
                memberId: row.original.memberId,
                memberName: row.original.memberName,
                memberNickName: row.original.memberNickName,
                monthsPayment: row.original.monthsPayment,
              }));
            setMembersToCharge(membersToCharge);
          }}
        >
          Cobrar
          <HandCoins className="w-4 h-4" />
        </Link>
        {/* <Button
          variant={"default"}
          className={`flex items-center gap-2 h-9 font-normal ${sedingStage === "sended" ? "bg-green-400" : null}`}
          onClick={handleChargeMembers}
        >
          {handleChargeButtonText(sedingStage)}
          {sedingStage === "sended" ? (
            <CircleCheck className="w-4 h-4" />
          ) : (
            <HandCoins className="w-4 h-4" />
          )}
        </Button> */}
      </div>
    </div>
  );
}
