"use server";

import React from "react";
import { getAllMembers } from "@/actions/get-all-members";
import { columns } from "./components/columns";
import MembersDataTable from "@/app/(root)/members/components/data-table";

export default async function MembersPage() {
  const response = await getAllMembers();
  // const response: Member[] = [
  //   {
  //     id: "1",
  //     email: "john@example.com",
  //     name: "John Doe",
  //     nickName: "JD",
  //     cpf: BigInt(12345678900),
  //     rg: 1234567,
  //     educationInstituition: "Example University",
  //     ra: 98765,
  //     course: "Computer Science",
  //     yearOfGraduation: 2023,
  //     phoneNumber: BigInt(98765432100),
  //     yearOfBirth: "1995",
  //     yearOfJoinOnRugbyMaua: 2020,
  //     instagram: "@johndoe",
  //     lawsLink: "https://example.com/laws",
  //     readyLink: "https://example.com/ready",
  //     team: "Masculino",
  //     uniformSize: "L",
  //     uniformNumber: 10,
  //   },
  // ];

  if (response) {
    return (
      <div className="w-full h-full flex flex-col gap-10 p-10">
        <div className="h-1/5 flex flex-col justify-center pl-20">
          <h1 className="font-bold text-4xl">Membros</h1>
          <p className="text-muted-foreground font-light">
            Aqui estão todos membros ativos do Rugby Mauá!
          </p>
        </div>
        <MembersDataTable columns={columns} data={response} />
      </div>
    );
  }
}
