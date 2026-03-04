"use client";

import { Bell, Search, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

export function AppHeader() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      // 1. Call the backend to clear cookies and DB tokens
      await apiFetch("/auth/logout", {
        method: "POST",
      });

      // 2. Optional: Clear any local storage/state if you use it
      // localStorage.removeItem("user-settings");

      // 3. Redirect to login and refresh the server-side state
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if the API fails (e.g., network error),
      // you usually want to force the user to login anyway
      window.location.href = "/login";
    }
  };
  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" className="md:hidden shrink-0">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resumes or job roles..."
            className="w-full bg-muted/30 border-none pl-9 focus-visible:ring-1 transition-all rounded-full h-9"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden text-muted-foreground"
        >
          <Search className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground rounded-full"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full bg-muted overflow-hidden border border-border/50"
            >
              <User className="h-5 w-5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-2">
            <div className="flex items-center gap-2 p-2 px-3 border-b mb-1">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium">Designer Mode</p>
                <p className="text-xs text-muted-foreground">Guest User</p>
              </div>
            </div>
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Billing & Subscription</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <button onClick={handleLogout}>Log Out</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
