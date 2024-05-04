import { Landmark } from "lucide-react";

export default function SidePicture() {
  return (
    <div
      className={`hidden md:block w-1/2 h-screen bg-[url(../app/assets/auth-layout-bg.jpg)] bg-center rounded-e-3xl`}
    >
      <div className="flex flex-row gap-2 p-5 items-center w-full text-primary">
        <Landmark strokeWidth={2} className="text-" />
        <h1 className="font-bold">Rugby Mauá Finance</h1>
      </div>
    </div>
  );
}
