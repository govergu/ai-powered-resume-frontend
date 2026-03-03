"use client";

import { use } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Download, FileText, CheckCheck } from "lucide-react";
import Link from "next/link";

export default function ComparePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between bg-background/50 backdrop-blur-sm p-4 rounded-xl border border-border">
         <div className="flex items-center gap-4">
           <Button variant="ghost" size="icon" asChild className="rounded-full bg-muted/50 hover:bg-muted">
             <Link href={`/tailor/${id}`}>
               <ArrowLeft className="h-4 w-4" />
             </Link>
           </Button>
           <div>
             <h1 className="text-xl font-bold tracking-tight">Review Tailored Changes</h1>
             <p className="text-muted-foreground text-xs mt-0.5">Review, accept, or reject modifications made by the AI.</p>
           </div>
         </div>
         <div className="flex items-center gap-3">
           <Button variant="outline" className="hidden sm:flex">
             <Download className="mr-2 h-4 w-4" /> Export Draft PDF
           </Button>
           <Button className="bg-green-600 hover:bg-green-700 text-white">
             <CheckCheck className="mr-2 h-4 w-4" /> Finalize Resume
           </Button>
         </div>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
        {/* Original */}
        <Card className="flex flex-col h-full overflow-hidden bg-background/50 border-border shadow-sm">
          <div className="bg-muted/40 p-4 border-b border-border flex items-center justify-between">
            <span className="font-semibold text-sm flex items-center gap-2 text-muted-foreground">
              <FileText className="h-4 w-4"/> Original Resume
            </span>
          </div>
          <ScrollArea className="flex-grow p-8 text-sm leading-relaxed">
            <div className="mb-8 opacity-70">
              <h3 className="font-bold text-lg mb-3 text-foreground border-b border-border pb-1">Summary</h3>
              <p>Experienced software engineer with expertise in front-end technologies. Working in fast paced environments.</p>
            </div>
            
            <div className="mb-8 opacity-70">
              <h3 className="font-bold text-lg mb-3 text-foreground border-b border-border pb-1">Experience</h3>
              <div className="mb-4">
                <div className="flex justify-between font-semibold">
                  <span>Frontend Dev, Tech Corp</span>
                  <span>2021 - 2023</span>
                </div>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Built responsive websites using React.</li>
                  <li>Collaborated with design team.</li>
                </ul>
              </div>
            </div>
          </ScrollArea>
        </Card>

        {/* Tailored */}
        <Card className="flex flex-col h-full overflow-hidden bg-primary/[0.02] border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.05)] ring-1 ring-primary/10">
          <div className="bg-primary/10 p-4 border-b border-primary/20 flex items-center justify-between">
             <span className="font-semibold text-sm flex items-center gap-2 text-primary drop-shadow-sm">
              <FileText className="h-4 w-4"/> AI Tailored Resume
            </span>
            <span className="text-xs bg-primary text-primary-foreground px-2.5 py-1 rounded-full font-medium shadow-sm">
              Match Optimized
            </span>
          </div>
          <ScrollArea className="flex-grow p-8 text-sm leading-relaxed">
            <div className="mb-8">
               <h3 className="font-bold text-lg mb-3 text-foreground border-b border-primary/20 pb-1">Summary</h3>
               <p className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                 Experienced <span className="bg-green-500/20 text-green-500 font-medium px-1.5 py-0.5 rounded-sm line-through opacity-70 mx-1">software engineer</span><span className="bg-primary/20 text-primary font-bold px-1.5 py-0.5 rounded-sm mx-1">Senior Next.js Developer</span> with expertise in <span className="bg-primary/20 text-primary font-bold px-1.5 py-0.5 rounded-sm mx-1">scalable</span> front-end technologies <span className="bg-primary/20 text-primary font-bold px-1.5 py-0.5 rounded-sm mx-1">and React Server Components.</span>
               </p>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-lg mb-3 text-foreground border-b border-primary/20 pb-1">Experience</h3>
              <div className="mb-4 bg-primary/5 p-3 rounded-lg border border-primary/10">
                <div className="flex justify-between font-semibold">
                  <span>Frontend Dev, Tech Corp</span>
                  <span>2021 - 2023</span>
                </div>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>Built responsive websites using React<span className="bg-primary/20 text-primary font-bold px-1.5 rounded-sm ml-1">and Next.js App Router</span>.</li>
                  <li>Collaborated with design team <span className="bg-primary/20 text-primary font-bold px-1.5 rounded-sm mx-1">to implement Shadcn UI design systems</span>.</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 border-l-4 border-green-500/50 pl-4 py-2 bg-green-500/5 rounded-r-lg">
              <p className="text-xs text-muted-foreground italic"><strong className="text-green-500 dark:text-green-400 font-semibold">AI Note:</strong> Emphasized Next.js, Server Components, and UI systems based on the Job Description to improve relevance for the target role.</p>
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
