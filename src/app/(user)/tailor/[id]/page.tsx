"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, ArrowRight } from "lucide-react";

export default function TailorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [jd, setJd] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      setScore(Math.floor(Math.random() * 40) + 40); // Random initial score
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleTailor = () => {
    // In a real app, hit tailoring API, then redirect
    router.push(`/compare/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 h-full">
      <div className="mb-2">
        <h1 className="text-3xl font-bold tracking-tight">Tailor Resume</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Paste the target job description below. We will analyze your base resume&apos;s compatibility and automatically tailor the contents to maximize your application&apos;s success rate.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
        <div className="lg:col-span-2 flex flex-col gap-4 h-full">
          <Card className="flex flex-col flex-grow bg-background/50 backdrop-blur shadow-sm border-border">
            <CardHeader>
              <CardTitle>Target Job Description</CardTitle>
              <CardDescription>Paste the full job description here.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <Textarea 
                className="flex-grow min-h-[300px] lg:min-h-0 font-mono text-sm leading-relaxed p-4 resize-none" 
                placeholder="We are looking for a Senior Software Engineer..."
                value={jd}
                onChange={(e) => setJd(e.target.value)}
              />
              <div className="flex justify-end mt-6">
                <Button onClick={handleAnalyze} disabled={!jd || isAnalyzing} size="lg">
                  {isAnalyzing ? "Analyzing Match..." : "Analyze Match Score"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-4">
          <Card className="bg-background/50 backdrop-blur shadow-sm sticky top-24">
            <CardHeader className="text-center pb-2">
              <CardTitle>Match Score</CardTitle>
              <CardDescription>Initial AI compatibility check</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[250px] p-6">
              {score !== null ? (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  className="flex flex-col items-center gap-8 w-full"
                >
                  <div className="relative flex items-center justify-center w-36 h-36 rounded-full bg-primary/5">
                    <span className="text-5xl font-bold text-primary">{score}<span className="text-2xl">%</span></span>
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle cx="72" cy="72" r="68" className="stroke-primary/20 fill-none stroke-[6]" />
                      <circle 
                        cx="72" cy="72" r="68" 
                        className="stroke-primary fill-none stroke-[6] transition-all duration-1000 ease-out" 
                        strokeDasharray="427" 
                        strokeDashoffset={427 - (427 * score) / 100} 
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <Button onClick={handleTailor} size="lg" className="w-full font-semibold group h-12 text-md">
                    <Wand2 className="mr-2 h-5 w-5" /> Tailor Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              ) : (
                <div className="text-center text-muted-foreground flex flex-col items-center gap-4">
                  <div className="w-24 h-24 rounded-full border-4 border-dashed border-muted flex items-center justify-center bg-muted/20">
                    <span className="text-muted-foreground/50 font-bold text-xl">--%</span>
                  </div>
                  <p className="text-sm px-4">Paste the job description and click Analyze to see your baseline score.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
