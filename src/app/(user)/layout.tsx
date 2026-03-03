// src/app/(dashboard)/layout.tsx
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
