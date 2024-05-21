"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";
import { Member } from "@prisma/client";

interface DefaultMembersToChargeProps {
  membersToCharge: Member[];
  setMembersToCharge: Dispatch<SetStateAction<Member[]>>;
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
  const [membersToCharge, setMembersToCharge] = useState<Member[]>([]);

  return (
    <MembersToChargeContext.Provider
      value={{ membersToCharge, setMembersToCharge }}
    >
      {children}
    </MembersToChargeContext.Provider>
  );
}
