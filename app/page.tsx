import { prisma } from "@/lib/prisma";
import { Adm } from "@prisma/client";

async function admData() {
  const res: Adm[] = await prisma.adm.findMany();

  if (!res) {
    throw new Error("missing adm");
  }

  return res;
}

export default async function Home() {
  const adm = await admData();

  return (
    <main>
      <p>{JSON.stringify(adm)}</p>
    </main>
  );
}
