import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { HandCoins } from "lucide-react";

interface RugbyPaymentTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function RugbyPaymentTableToolbar<TData>({
  table,
}: RugbyPaymentTableToolbarProps<TData>) {
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
        <Button variant={"default"} className="flex items-center gap-2">
          Cobrar
          <HandCoins className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
