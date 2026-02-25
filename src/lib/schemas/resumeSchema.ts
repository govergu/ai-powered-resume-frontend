import { z } from "zod";

export const TailoredResumeSchema = z.object({
  basics: z.object({
    name: z.string().default(""),
    email: z.string().default(""),
    phone: z.string().default(""),
    url: z.string().default(""),
    location: z.object({
      city: z.string().default(""),
      countryCode: z.string().default(""),
    }).default({ city: "", countryCode: "" }),
  }).default({ name: "", email: "", phone: "", url: "", location: { city: "", countryCode: "" } }),

  summary: z.string().default(""),
  
  skills: z.array(z.string()).default([]),

  experience: z.array(
    z.object({
      company: z.string().default(""),
      role: z.string().default(""),
      duration: z.string().default(""),
      description: z.string().default(""),
    })
  ).default([]),

  education: z.array(
    z.object({
      institution: z.string().default(""),
      degree: z.string().default(""),
      year: z.string().default(""),
    })
  ).default([]),

  projects: z.array(
    z.object({
      name: z.string().default(""),
      description: z.string().default(""),
      techStack: z.array(z.string()).default([]),
    })
  ).default([]),
});

export type TailoredResume = z.infer<typeof TailoredResumeSchema>;
