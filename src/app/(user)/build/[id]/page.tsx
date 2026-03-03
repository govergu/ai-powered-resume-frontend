"use client";

import { use } from "react";
import { ResumeForm } from "@/components/Resume/ResumeForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LivePreview } from "@/components/Resume/LivePreview";

export default function BuildPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] gap-6 overflow-hidden">
      {/* Left: Form */}
      <div className="w-full lg:w-1/2 flex flex-col h-full bg-background/50 backdrop-blur-md border border-border rounded-xl shadow-sm">
        <ScrollArea className="flex-grow p-6 h-full">
          <ResumeForm />
        </ScrollArea>
      </div>

      {/* Right: Live Preview */}
      <div className="w-full lg:w-[50%] xl:w-[45%] h-full bg-muted/20 border border-border rounded-xl shadow-inner flex items-center justify-center overflow-hidden relative">
        <div className="absolute top-4 right-4 z-10">
           {/* Placeholder for PDF Download Button */}
        </div>
        <ScrollArea className="w-full h-full p-4 lg:p-8 bg-zinc-900/10 dark:bg-black/20">
          <LivePreview />
        </ScrollArea>
      </div>
    </div>
  );
}
