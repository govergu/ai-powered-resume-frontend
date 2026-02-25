import { create } from 'zustand';
import { TailoredResume } from '@/lib/schemas/resumeSchema';

interface ResumeState {
  baseResume: TailoredResume | null;
  tailoredResumes: Record<string, TailoredResume>; // Keyed by Job ID
  setBaseResume: (resume: TailoredResume) => void;
  updateBaseResume: (updates: Partial<TailoredResume>) => void;
  addTailoredResume: (jobId: string, resume: TailoredResume) => void;
  clearStore: () => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  baseResume: null,
  tailoredResumes: {},
  setBaseResume: (resume) => set({ baseResume: resume }),
  updateBaseResume: (updates) => set((state) => ({
    baseResume: state.baseResume ? { ...state.baseResume, ...updates } : null
  })),
  addTailoredResume: (jobId, resume) => set((state) => ({
    tailoredResumes: { ...state.tailoredResumes, [jobId]: resume }
  })),
  clearStore: () => set({ baseResume: null, tailoredResumes: {} })
}));
