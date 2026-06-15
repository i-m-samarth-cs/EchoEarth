"use client";

import { PersonaCardsDeck } from "@/components/ui/testimonial-cards";
import { localPersonas } from "@/lib/seed-data";

export function CommunityGrid() {
  return (
    <section className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center bg-white dark:bg-slate-900 py-20 px-4 md:px-20 gap-12 overflow-hidden">
      
      <div className="w-full md:w-1/2 space-y-6 z-10">
        <span className="text-green-500 font-mono tracking-widest text-sm uppercase">
          Local Changemakers
        </span>
        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white">
          The Network Effect
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md">
          You are not doing this alone. See how others in your city are altering their trajectories and building a resilient grid. Swipe through the changemakers.
        </p>
      </div>

      <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center h-[500px]">
        <PersonaCardsDeck personas={localPersonas} />
      </div>

    </section>
  );
}
