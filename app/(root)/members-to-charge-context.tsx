"use client";

import { RugbyPayment } from "@prisma/client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

interface DefaultMembersToChargeProps {
  membersToCharge: RugbyPayment[];
  setMembersToCharge: Dispatch<
    SetStateAction<
      {
        id: string;
        memberId: string;
        memberName: string;
        memberNickName: string;
        monthsPayment: number[];
      }[]
    >
  >;
}

const DefaultMembersToCharge: DefaultMembersToChargeProps = {
  membersToCharge: [],
  setMembersToCharge: () => {},
};

export const MembersToChargeContext = createContext(DefaultMembersToCharge);

export function MembersToChargeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [membersToCharge, setMembersToCharge] = useState<RugbyPayment[]>([]);

  return (
    <MembersToChargeContext.Provider
      value={{ membersToCharge, setMembersToCharge }}
    >
      {children}
    </MembersToChargeContext.Provider>
  );
}
