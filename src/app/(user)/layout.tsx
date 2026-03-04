// src/app/(dashboard)/layout.tsx
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const res = await fetch("http://localhost:5000/api/auth/me", {
    headers: {
      Cookie: cookieHeader,
    },
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    redirect("/login");
  }
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background max-w-[100vw]">
      <AppSidebar />
      <div className="flex flex-col flex-grow w-full max-w-full overflow-hidden">
        <AppHeader />
        <main className="flex-grow overflow-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
