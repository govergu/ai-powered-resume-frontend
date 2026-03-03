/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TailoredResumeSchema,
  TailoredResume,
} from "@/lib/schemas/resumeSchema";
import { useResumeStore } from "@/store/useResumeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Save } from "lucide-react";

const steps = [
  { id: "basics", title: "Personal Details" },
  { id: "summary", title: "Professional Summary" },
  { id: "experience", title: "Work Experience" },
  { id: "education", title: "Education" },
  { id: "skills", title: "Skills & Projects" },
];

export function ResumeForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const { baseResume, setBaseResume } = useResumeStore();

  const form = useForm<TailoredResume>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(TailoredResumeSchema) as any,
    defaultValues: baseResume || {
      basics: {
        name: "",
        email: "",
        phone: "",
        url: "",
        location: { city: "", countryCode: "" },
      },
      summary: "",
      experience: [],
      education: [],
      skills: [],
      projects: [],
    },
  });

  // Hydrate store on mount to ensure LivePreview sees defaults
  useEffect(() => {
    if (!baseResume) {
      setBaseResume(form.getValues() as TailoredResume);
    }
  }, [baseResume, form, setBaseResume]);

  const onSubmit = (data: TailoredResume) => {
    setBaseResume(data);
    // Real app: await saveToBackend(resumeId, data);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const syncToStore = () => {
    setBaseResume(form.getValues() as TailoredResume);
  };

  return (
    <div className="flex flex-col h-full w-full min-h-100">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
        <div className="flex gap-2 mt-4">
          {steps.map((step, i) => (
            <div
              key={step.id}
              className={`h-1.5 flex-1 rounded-full ${i <= currentStep ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
      </div>

      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <form
        onSubmit={form.handleSubmit(onSubmit as any)}
        className="flex flex-col grow relative"
      >
        <div className="grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      {...form.register("basics.name")}
                      onBlur={syncToStore}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        {...form.register("basics.email")}
                        onBlur={syncToStore}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        {...form.register("basics.phone")}
                        onBlur={syncToStore}
                        placeholder="+1 234 567 890"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input
                        {...form.register("basics.location.city")}
                        onBlur={syncToStore}
                        placeholder="San Francisco"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Country Code</Label>
                      <Input
                        {...form.register("basics.location.countryCode")}
                        onBlur={syncToStore}
                        placeholder="US"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Website / URL</Label>
                      <Input
                        {...form.register("basics.url")}
                        onBlur={syncToStore}
                        placeholder="github.com/johndoe"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Summary</Label>
                    <Textarea
                      {...form.register("summary")}
                      className="min-h-[200px]"
                      placeholder="Write a compelling professional summary..."
                      onBlur={syncToStore}
                    />
                  </div>
                </div>
              )}

              {/* Placeholders for array inputs to keep brevity but functional */}
              {currentStep > 1 && (
                <div className="p-8 text-center text-muted-foreground border-2 border-dashed border-muted-foreground/30 bg-muted/10 rounded-xl">
                  <p>
                    In a full implementation, this step for{" "}
                    <strong>{steps[currentStep].title}</strong> would use{" "}
                    <code className="text-primary px-1 rounded-sm bg-primary/10">
                      useFieldArray
                    </code>{" "}
                    to dynamically add/edit items.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mt-12 pt-6 border-t border-border sticky bottom-0 bg-background/80 backdrop-blur pb-2">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={nextStep}>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> Save
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
