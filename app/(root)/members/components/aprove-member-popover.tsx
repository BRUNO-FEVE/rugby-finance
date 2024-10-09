import { getAllMembers } from "@/actions/get-all-members";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Member } from "@prisma/client";
import { Check, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import MemberInfoDialog from "./member-info-dialog";
import { deleteMember } from "@/actions/delete-member";
import { approveOnHoldMember } from "@/actions/aprove-on-hold-member";
import { toast } from "@/components/ui/use-toast";
import { deleteFileOnDrive } from "@/actions/delete-file-on-drive";

export default function AproveMemberPopover() {
  const [open, setOpen] = useState(false);
  const [membersOnHold, setMembersOnHold] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const members = await getAllMembers({ onHold: true });
        setMembersOnHold(members ?? []);
      } catch (error) {
        console.error("Failed to fetch members:", error);
        setMembersOnHold([]);
      }
    };
    fetchMembers();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} className="flex items-center gap-2 relative">
          <Users className="w-5 h-5" />
          <div
            className={`size-4 bg-red-500 rounded-full absolute top-[3px] right-[7px] flex items-center justify-center text-white text-xs ${membersOnHold.length === 0 ? "hidden" : ""}`}
          >
            {membersOnHold.length}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex flex-col gap-4 w-fit"
        side="bottom"
        align="end"
      >
        {membersOnHold.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[200px]">
            <p className="text-lg font-semibold text-gray-500 text-center">
              Não há membros aguardando <br /> aprovação no momento!
            </p>
          </div>
        ) : (
          <ScrollArea
            className={`${
              membersOnHold.length > 5 ? "h-[500px]" : "h-fit"
            } w-full`}
          >
            <h1 className="text-lg font-bold">Membros Aguardando Aprovação!</h1>
            <p className="text-sm text-gray-500">
              Cadastrados recentemente, precisam ser revisados antes da inclusão
              oficial no time.
            </p>
            <Separator orientation="horizontal" className="my-4" />
            <div className="flex flex-col gap-2">
              {membersOnHold.map((member) => (
                <MemberRow key={member.id} member={member} />
              ))}
            </div>
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  );
}

const MemberRow = ({ member }: { member: Member }) => {
  async function handleApproveMember() {
    await approveOnHoldMember({ memberId: member.id });

    toast({
      title: "Membro Aprovado com Sucesso!",
      description: "O membro foi aprovado e está disponível para uso.",
    });

    setTimeout(() => {
      window.location.reload();
    }, 2000); // 2 sec
  }

  async function handleRejectMember() {
    await deleteFileOnDrive(member.lawsLink);
    await deleteFileOnDrive(member.readyLink);
    await deleteMember({ memberId: member.id });

    toast({
      title: "Membro Removido com Sucesso!",
      description: "O membro foi removido da base de dados.",
    });

    setTimeout(() => {
      window.location.reload();
    }, 2000); // 2 sec
  }

  return (
    <div className="flex flex-row justify-between gap-7 items-center border-b border-gray-200 dark:border-gray-700 py-2 hover:bg-gray-100 dark:hover:bg-zinc-900 px-2 rounded-md min-h-[100px]">
      <MemberInfoDialog member={member} />
      <div className="flex flex-col gap-2 w-3/5">
        <p className="text-sm font-bold">
          {member.name}{" "}
          <span className="text-gray-500">({member.nickname})</span>
        </p>
        <p className="text-sm text-gray-500">{member.email}</p>
      </div>
      <div className="flex flex-row gap-2">
        <Button
          size={"icon"}
          variant={"ghost"}
          className="hover:bg-red-500 hover:text-white"
          onClick={handleRejectMember}
        >
          <X className="w-5 h-5" />
        </Button>
        <Button
          size={"icon"}
          variant={"default"}
          className="bg-green-500 hover:bg-green-600"
          onClick={handleApproveMember}
        >
          <Check className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
