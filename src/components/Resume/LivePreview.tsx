"use client";

import { useResumeStore } from "@/store/useResumeStore";

export function LivePreview() {
  const { baseResume } = useResumeStore();

  if (!baseResume) {
    return (
      <div className="w-full h-[297mm] flex items-center justify-center text-muted-foreground shadow-2xl bg-white dark:bg-zinc-950/80 aspect-[1/1.414]">
        <p className="animate-pulse">Loading preview...</p>
      </div>
    );
  }

  const { basics, summary } = baseResume;

  return (
    <div className="w-full max-w-[210mm] min-h-[297mm] bg-white text-zinc-900 shadow-xl ring-1 ring-zinc-200/50 mx-auto overflow-hidden text-[10.5pt] font-sans flex flex-col p-[20mm] rounded-sm transition-all">
      {/* Header */}
      <div className="border-b-[1.5px] border-zinc-300 pb-5 mb-5 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">{(basics?.name || "Your Name").toUpperCase()}</h1>
        <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1 text-[9.5pt] text-zinc-600 font-medium">
          {basics?.email && <span>{basics.email}</span>}
          {basics?.phone && <><span className="text-zinc-300">•</span><span>{basics.phone}</span></>}
          {basics?.location?.city && <><span className="text-zinc-300">•</span><span>{basics.location.city}{basics?.location?.countryCode ? `, ${basics.location.countryCode}` : ''}</span></>}
          {basics?.url && <><span className="text-zinc-300">•</span><span>{basics.url.replace(/^https?:\/\//, '')}</span></>}
        </div>
      </div>

      {/* Summary */}
      {(summary || !basics?.name) && (
        <div className="mb-6">
          <h2 className="text-[11pt] font-bold text-zinc-900 uppercase tracking-wider mb-2">Professional Summary</h2>
          <p className="text-zinc-700 leading-[1.6] text-[10pt] whitespace-pre-wrap">
            {summary || "Experienced professional with a track record of delivering high-quality results. Seeking to leverage my background in software engineering to contribute effectively to your organization."}
          </p>
        </div>
      )}

      {/* Experience Placeholder in Preview */}
      <div className="mb-6">
        <h2 className="text-[11pt] font-bold text-zinc-900 uppercase tracking-wider mb-2">Experience</h2>
        <div className="grid gap-4 mt-2">
          <div>
             <div className="flex justify-between font-semibold text-zinc-800 text-[10.5pt]">
               <span>Senior Software Engineer at Acme Corp</span>
               <span className="text-zinc-500 font-normal">2020 - Present</span>
             </div>
             <p className="mt-1 text-zinc-700 leading-relaxed text-[10pt]">
               Led a team of 5 engineers to revamp the core billing architecture, reducing latency by 40% and saving $10k/month in server costs.
             </p>
          </div>
        </div>
      </div>

       {/* Skills Placeholder in Preview */}
       <div className="mb-6">
        <h2 className="text-[11pt] font-bold text-zinc-900 uppercase tracking-wider mb-2">Skills</h2>
        <div className="text-zinc-700 leading-[1.6] text-[10pt]">
          <span className="font-semibold text-zinc-800">Languages:</span> TypeScript, Python, Go, Rust<br/>
          <span className="font-semibold text-zinc-800">Frameworks:</span> React, Next.js, Node.js, Express<br/>
          <span className="font-semibold text-zinc-800">Tools:</span> Docker, AWS, GitHub Actions, Vercel
        </div>
      </div>
    </div>
  );
}
