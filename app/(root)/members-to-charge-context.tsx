"use client";

import { getMembersByPaymentRecord } from "@/actions/get-members-by-payment-record";
import { Member, RugbyPayment } from "@prisma/client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface DefaultMembersToChargeProps {
  membersInfo: Member[];
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
  membersInfo: [],
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
  const [membersInfo, setMembersInfo] = useState<Member[]>([]);

  const loadMembersInfos = async () => {
    setMembersInfo(
      await getMembersByPaymentRecord({ paymentRecords: membersToCharge }),
    );
  };

  useEffect(() => {
    loadMembersInfos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [membersToCharge]);

  return (
    <MembersToChargeContext.Provider
      value={{ membersInfo, membersToCharge, setMembersToCharge }}
    >
      {children}
    </MembersToChargeContext.Provider>
  );
}
