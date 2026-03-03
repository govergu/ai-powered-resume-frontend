"use client";

import { useState } from "react";
import { UploadCloud, FileText, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] max-w-4xl mx-auto w-full px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Upload your Resume
        </h1>
        <p className="text-lg text-muted-foreground">
          We&apos;ll extract your details and help you tailor it for any job.
        </p>
      </div>

      {!isSuccess ? (
        <Card
          className="w-full border-2 border-dashed border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer p-12 flex flex-col items-center justify-center group"
          onClick={handleUpload}
        >
          <div
            className={`h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${isUploading ? "animate-pulse" : ""}`}
          >
            <UploadCloud className="h-10 w-10 text-primary" />
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">
              {isUploading
                ? "Uploading & Analyzing..."
                : "Click or drag your resume here"}
            </h3>
            <p className="text-muted-foreground">
              Supports PDF, DOCX (Max 2MB)
            </p>
          </div>

          <div className="mt-8 flex gap-4">
            <Badge variant="outline" className="px-3 py-1 gap-1.5 font-normal">
              <FileText className="h-3.5 w-3.5" /> PDF
            </Badge>
            <Badge variant="outline" className="px-3 py-1 gap-1.5 font-normal">
              <FileText className="h-3.5 w-3.5" /> DOCX
            </Badge>
          </div>
        </Card>
      ) : (
        <Card className="w-full border-primary/20 bg-green-500/5 p-12 flex flex-col items-center justify-center text-center">
          <div className="h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6 animate-in zoom-in duration-500">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Upload Successful!</h3>
          <p className="text-muted-foreground mb-8 max-w-sm">
            We&apos;ve successfully extracted your profile. You can now start
            tailoring it or edit the details manually.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button
              className="flex-1 h-12 text-base shadow-lg shadow-primary/20"
              asChild
            >
              <Link href="/tailor/1">Start Tailoring</Link>
            </Button>
            <Button variant="outline" className="flex-1 h-12 text-base" asChild>
              <Link href="/build/1">Edit Details</Link>
            </Button>
          </div>
        </Card>
      )}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {[
          {
            title: "Smart Extraction",
            desc: "Auto-populates your profile using AI.",
            icon: CheckCircle,
          },
          {
            title: "ATS Optimized",
            desc: "Formats that pass recruiter filters.",
            icon: CheckCircle,
          },
          {
            title: "100% Private",
            desc: "Your data is encrypted and secure.",
            icon: CheckCircle,
          },
        ].map((feat, i) => (
          <div
            key={i}
            className="flex gap-3 items-start p-4 rounded-xl bg-muted/30 border border-border/50"
          >
            <div className="mt-1">
              <feat.icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">{feat.title}</p>
              <p className="text-xs text-muted-foreground">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
