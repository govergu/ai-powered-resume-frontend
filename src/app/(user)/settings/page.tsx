"use client";

import { User, Shield, Bell, CreditCard, Zap, Smartphone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and subscription.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-4">
        {/* Sidebar Nav */}
        <div className="flex flex-col gap-1">
          {[
            { label: "General", icon: User, active: true },
            { label: "Security", icon: Shield },
            { label: "Notifications", icon: Bell },
            { label: "Billing", icon: CreditCard },
            { label: "API Keys", icon: Zap },
          ].map((item, i) => (
            <Button key={i} variant={item.active ? "secondary" : "ghost"} className="justify-start gap-3 h-10 px-4 rounded-xl">
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 space-y-6">
          <Card className="bg-background/40 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details for your resumes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <Button className="mt-2 shadow-lg shadow-primary/20">Save Changes</Button>
            </CardContent>
          </Card>

          <Card className="bg-background/40 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
                </div>
                <Switch checked={true} />
              </div>
              <Separator className="bg-border/50" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive weekly reports on your match scores.</p>
                </div>
                <Switch checked={true} />
              </div>
              <Separator className="bg-border/50" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">2FA Authentication</p>
                  <p className="text-sm text-muted-foreground">Secure your account with second factor.</p>
                </div>
                <Switch checked={false} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Simple Switch component placeholder if not available
function Switch({ checked }: { checked: boolean }) {
  return (
    <div className={`w-11 h-6 rounded-full p-1 transition-colors ${checked ? 'bg-primary' : 'bg-muted'}`}>
      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </div>
  );
}
