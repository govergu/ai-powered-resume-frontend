"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, PlusCircle, LayoutDashboard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Upload Resume",
    icon: PlusCircle,
    href: "/upload",
  },
  {
    label: "My Resumes",
    icon: FileText,
    href: "/resumes",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col h-full w-64 bg-background/50 backdrop-blur-xl border-r border-border p-4 shrink-0">
      <div className="flex items-center gap-3 mb-8 px-2 mt-2">
        <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
          <FileText className="text-primary-foreground h-5 w-5" />
        </div>
        <h1 className="font-bold text-lg tracking-tight">
          Resume<span className="text-primary opacity-80">AI</span>
        </h1>
      </div>

      <div className="flex flex-col gap-2 flex-grow">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium",
              pathname === route.href
                ? "bg-primary/10 text-primary shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <route.icon
              className={cn(
                "h-4 w-4",
                pathname === route.href
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            />
            {route.label}
          </Link>
        ))}
      </div>

      <div className="mt-auto px-2 pb-4">
        <div className="p-4 rounded-xl bg-muted/50 border border-border/50 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">Pro Plan Active</p>
          <p>Unlimited AI tailoring.</p>
        </div>
      </div>
    </div>
  );
}
