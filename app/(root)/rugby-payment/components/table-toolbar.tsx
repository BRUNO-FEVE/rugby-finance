"use client";

import { chargeMembers } from "@/actions/charge-selected-members";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RugbyPayment } from "@prisma/client";
import { Table } from "@tanstack/react-table";
import { HandCoins } from "lucide-react";

interface RugbyPaymentTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function RugbyPaymentTableToolbar<TData>({
  table,
}: RugbyPaymentTableToolbarProps<RugbyPayment>) {
  const handleChargeMembers = async () => {
    const rugbyPaymentsSelected = table.getSelectedRowModel();
    console.log(rugbyPaymentsSelected);

    const RugbyPayments: RugbyPayment[] = [];

    rugbyPaymentsSelected.rows.map((row) => {
      RugbyPayments.push(row.original);
    });

    await chargeMembers(RugbyPayments);
  };

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
        <Button
          variant={"default"}
          className="flex items-center gap-2 h-9 font-normal"
          onClick={handleChargeMembers}
        >
          Cobrar
          <HandCoins className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
