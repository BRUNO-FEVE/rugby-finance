import { auth } from "@/auth";
import Navbar from "@/components/navbar";
import { MembersToChargeProvider } from "./members-to-charge-context";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (session?.user) {
    return (
      <main className="bg-background text-primary h-screen w-screen">
        <Navbar name={session.user.name} email={session.user.email} />
        <MembersToChargeProvider>{children}</MembersToChargeProvider>
      </main>
    );
  }
}
