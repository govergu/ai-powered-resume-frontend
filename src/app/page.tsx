import Link from "next/link";
import { PlusCircle, FileText, UploadCloud, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Dummy data for presentation of layout
const dummyResumes = [
  {
    id: "1",
    title: "Software Engineer Lead",
    updatedAt: "2 hours ago",
    status: "processed" as const,
    matchedScore: 92,
  },
  {
    id: "2",
    title: "Original Upload - Jan 2024",
    updatedAt: "3 days ago",
    status: "uploaded" as const,
  },
  {
    id: "3",
    title: "Frontend Developer Tailored",
    updatedAt: "1 week ago",
    status: "processed" as const,
    matchedScore: 85,
  }
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Resumes</h1>
          <p className="text-muted-foreground w-full">View, edit, and tailor your uploaded resumes for new jobs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {/* Upload Card */}
        <Link href="/upload" className="w-full">
          <Card className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed bg-muted/20 hover:bg-muted/40 hover:border-primary/50 transition-all cursor-pointer group min-h-[240px]">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform mb-4">
              <PlusCircle className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-lg">Upload Resume</CardTitle>
            <CardDescription className="text-center mt-2">
              Start by uploading a PDF or DOCX file to extract metadata for tailoring.
            </CardDescription>
          </Card>
        </Link>

        {/* Existing Resumes */}
        {dummyResumes.map((resume) => (
          <Card key={resume.id} className="flex flex-col h-full bg-background/50 backdrop-blur-sm border-border hover:border-primary/30 transition-colors group min-h-[240px]">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="p-2 rounded-lg bg-primary/10 w-fit">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <Badge 
                  variant={resume.status === "processed" ? "default" : "secondary"}
                  className="capitalize"
                >
                  {resume.status === "processed" ? (
                    <span className="flex items-center gap-1.5"><CheckCircle className="h-3 w-3"/> processed</span>
                  ) : (
                    <span className="flex items-center gap-1.5"><UploadCloud className="h-3 w-3"/> uploaded</span>
                  )}
                </Badge>
              </div>
              <CardTitle className="text-xl mt-4 line-clamp-1">{resume.title}</CardTitle>
              <CardDescription className="flex items-center gap-1.5 mt-1">
                <Clock className="h-3.5 w-3.5"/>
                Updated {resume.updatedAt}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {resume.status === "processed" && resume.matchedScore && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="text-sm font-medium text-muted-foreground">Previous Match Score:</div>
                  <div className="flex items-center font-bold text-green-500">
                    {resume.matchedScore}%
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-2 border-t border-border/50 bg-muted/10 p-4 flex gap-3 mt-auto">
              <Button variant="outline" className="w-30 bg-background/50" asChild>
                <Link href={`/tailor/${resume.id}`}>Tailor</Link>
              </Button>
              <Button variant="default" className="w-30" asChild>
                <Link href={`/build/${resume.id}`}>Edit</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
