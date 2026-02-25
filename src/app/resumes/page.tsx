"use client";

import Link from "next/link";
import { FileText, PlusCircle, Search, Filter, MoreVertical, ExternalLink, Download, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Dummy data for tailored resumes
const tailoredResumes = [
  {
    id: "t1",
    jobTitle: "Senior Frontend Engineer",
    company: "Google",
    date: "Feb 22, 2024",
    matchScore: 95,
    status: "Finalized",
  },
  {
    id: "t2",
    jobTitle: "React Developer",
    company: "Meta",
    date: "Feb 20, 2024",
    matchScore: 88,
    status: "Draft",
  },
  {
    id: "t3",
    jobTitle: "Fullstack Developer",
    company: "Amazon",
    date: "Feb 15, 2024",
    matchScore: 92,
    status: "Finalized",
  }
];

export default function MyResumesPage() {
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">My Tailored Resumes</h1>
          <p className="text-muted-foreground">Manage and view all your resumes tailored for specific job descriptions.</p>
        </div>
        <Button className="shrink-0 gap-2 shadow-lg shadow-primary/20">
          <PlusCircle className="h-4 w-4" />
          Create New Tailored
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-muted/30 p-4 rounded-2xl border border-border/50">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search resumes..." 
            className="pl-10 bg-background/50 border-border/50"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm" className="gap-2 bg-background/50">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Badge variant="secondary" className="px-3 py-1 text-xs">
            {tailoredResumes.length} Total
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tailoredResumes.map((resume) => (
          <Card key={resume.id} className="group relative overflow-hidden bg-background/40 backdrop-blur-sm border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="gap-2">
                      <ExternalLink className="h-4 w-4" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-primary">
                      <Download className="h-4 w-4" /> Download PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-destructive">
                      <Trash2 className="h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-4">
                <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                  {resume.jobTitle}
                </CardTitle>
                <CardDescription className="text-base font-medium mt-1">
                  at {resume.company}
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Match Score</span>
                  <span className="font-bold text-green-500">{resume.matchScore}%</span>
                </div>
                <div className="w-full bg-muted/50 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-green-500 h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${resume.matchScore}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{resume.date}</span>
                  <Badge variant={resume.status === "Draft" ? "secondary" : "default"} className="text-[10px] uppercase tracking-wider px-2 py-0">
                    {resume.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-4 border-t border-border/50 bg-muted/5 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 gap-2" asChild>
                <Link href={`/tailor/${resume.id}`}>
                  Edit
                </Link>
              </Button>
              <Button size="sm" className="flex-1 gap-2">
                Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
