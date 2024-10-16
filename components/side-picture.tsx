import { Trophy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SidePicture() {
  const [windowLocation, setWindowLocation] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowLocation(window.location.pathname);
    }
  }, []);

  return (
    <div
      className={`fixed left-0 top-0 ${windowLocation === "/member" ? "w-1/3" : "w-1/2"} hidden md:block h-screen bg-[url(../app/assets/auth-layout-bg.jpg)] bg-center rounded-e-3xl`}
    >
      <Link
        href={"/"}
        className="flex flex-row gap-2 p-5 items-center w-fit text-primary hover:underline underline-offset-4 decoration-white"
      >
        <Trophy strokeWidth={2} className="text-white" />
        <h1 className="text-white">Rugby Mauá</h1>
      </Link>
    </div>
  );
}
