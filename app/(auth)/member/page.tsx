"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import AddMemberForm from "./components/add-member-form";

export default function MemberPage() {
  return (
    <div className="flex justify-center items-start w-full h-fit py-32">
      <Card className="w-5/6 lg:w-1/2 md:w-2/3">
        <CardHeader>
          <CardTitle>Formulário de Adesão</CardTitle>
          <CardDescription>
            Este formulário é destinado aos novos membros do Rugby Mauá. As
            informações fornecidas são essenciais para inscrições em
            campeonatos, gestão de mensalidades e participação em eventos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddMemberForm />
        </CardContent>
      </Card>
    </div>
  );
}
