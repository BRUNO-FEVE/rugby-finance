"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function Home() {
  useEffect(() => {
    window.location.replace("/rugby-payment");
  }, []);

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-3">
        <p>
          Bem Vindo Ao <strong>Rugby Finance</strong>
        </p>
        <Loader2 className="animate-spin" />
      </div>
    </main>
  );
}
