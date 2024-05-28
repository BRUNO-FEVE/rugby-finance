import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatPhoneNumber } from "@/lib/utils";
import { Member } from "@prisma/client";
import { Info, ExternalLink } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface MemberInfoDialogProps {
  member: Member;
}

export default function MemberInfoDialog({ member }: MemberInfoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="text-muted-foreground hover:text-primary"
        >
          <Info className="w-4 h-4 " />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogClose />
        <DialogHeader>
          <DialogTitle>
            {member.name}{" "}
            <span className="text-muted-foreground">({member.nickname})</span>
          </DialogTitle>
          <DialogDescription className="hover:underline transition-transform duration-200">
            <a
              href={`https://www.instagram.com/${member.instagram}`}
              target="_blank"
            >
              @{member.instagram}
            </a>
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <Row>
          <Column title={"Email"} value={member.email} />
          <div className="pr-4">
            <DialogTitle className="text-sm">RG</DialogTitle>
            <DialogDescription>{member.rg.toString()}</DialogDescription>
          </div>
        </Row>
        <Row>
          <Column
            title={"Telefone"}
            value={formatPhoneNumber(member.phoneNumber)}
          />
          <Column title={"Data de Nascimento"} value={member.dateOfBirth} />
          <Column title={"CPF"} value={member.cpf.toString()} />
        </Row>
        <Separator />
        <Row>
          <div>
            <DialogTitle>{member.educationInstituition}</DialogTitle>
            <DialogDescription>{member.course}</DialogDescription>
          </div>
          <Column
            title={"Ano de Formação"}
            value={member.yearOfGraduation.toString()}
          />
        </Row>
        <Row>
          {member.ra ? (
            <Column title={"RA"} value={member.ra.toString()} />
          ) : null}
        </Row>
        <Separator />
        <Row>
          <Column title={"Time"} value={member.team} />
          <Column
            title={"Ano de Entrada no Rugby"}
            value={member.yearOfJoinOnRugbyMaua.toString()}
          />
          <div className="px-4 py-2 border border-muted rounded-md flex items-center gap-2">
            <DialogTitle className="text-sm">Uniforme:</DialogTitle>
            <DialogDescription>
              {member.uniformSize}
              {member.uniformNumber ? ": " + member.uniformNumber : ""}
            </DialogDescription>
          </div>
        </Row>
        <div className="w-full flex gap-2 pt-7">
          <Link href={member.readyLink} passHref legacyBehavior>
            <a
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full gap-2"
              target="_blank"
            >
              Rugby Ready
              <ExternalLink className="w-4 h-4" />
            </a>
          </Link>
          <Link href={member.lawsLink} passHref legacyBehavior>
            <a
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full gap-2"
              target="_blank"
            >
              Rugby Laws
              <ExternalLink className="w-4 h-4" />
            </a>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface RowProps {
  children: ReactNode;
}

const Row = ({ children }: RowProps) => {
  return <div className="flex flex-row justify-between px-2">{children}</div>;
};

interface ColumnProps {
  title: string;
  value: string;
}

const Column = ({ title, value }: ColumnProps) => {
  return (
    <div>
      <DialogTitle className="text-sm">{title}</DialogTitle>
      <DialogDescription>{value}</DialogDescription>
    </div>
  );
};
