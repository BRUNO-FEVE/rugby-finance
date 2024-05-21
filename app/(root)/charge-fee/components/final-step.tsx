import Link from "next/link";

export default function FinalStep() {
  return (
    <div className="w-7/12 h-fit pb-32 flex flex-col items-end gap-8">
      <div className="h-fit flex flex-col gap-4">
        <h1 className="font-bold text-2xl">Etapa Final</h1>
        <p>
          Você concluiu o processo de cobrança dos membros do Rugby Mauá. Avise
          os membros do financeiro sobre a cobrança e fique atento para receber
          possíveis pagamentos.
        </p>
      </div>
      <Link
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-fit px-10 py-2 gap-2"
        href={"/rugby-payment"}
      >
        Voltar
      </Link>
    </div>
  );
}
