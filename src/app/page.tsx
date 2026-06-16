"use client";

import { useState } from "react";
import { HeroTimeline } from "@/components/sections/hero-timeline";
import { InteractiveDayBuilder } from "@/components/sections/interactive-day-builder";
import { TheShadowReveal } from "@/components/sections/the-shadow-reveal";
import { ParallelFuturesEngine } from "@/components/sections/parallel-futures-engine";
import { ActionEcosystem } from "@/components/sections/action-ecosystem";
import { CommunityGrid } from "@/components/sections/community-grid";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { calculateImpact } from "@/lib/behavioral-engine";

function isChoicesComplete(choices: Record<string, string> | null): choices is Record<string, string> {
  return Boolean(choices?.commute && choices?.diet && choices?.energy);
}

export default function Home() {
  const [choices, setChoices] = useState<Record<string, string> | null>(null);

  const phasesComplete = isChoicesComplete(choices);

  const handleCompleteBuilder = (finalChoices: Record<string, string>) => {
    setChoices(finalChoices);

    const impact = calculateImpact(finalChoices);
    if (typeof window !== "undefined" && window.pendo) {
      window.pendo.track("day_builder_completed", {
        commute_choice: finalChoices.commute,
        diet_choice: finalChoices.diet,
        energy_choice: finalChoices.energy,
        commute_score: impact.commuteScore,
        diet_score: impact.dietScore,
        energy_score: impact.energyScore,
        total_score: impact.totalScore,
        sustainability_pct: Math.round(((37 - impact.totalScore) / 37) * 100),
        phase_title: impact.phaseTitle,
      });
    }

    setTimeout(() => {
      document.getElementById("shadow-reveal")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-green-500/30 selection:text-green-200">
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-slate-950 to-transparent pointer-events-none">
        <div className="font-bold text-xl tracking-widest text-slate-900 dark:text-white pointer-events-auto">
          Echo<span className="text-green-500">Earth</span>
        </div>
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
      </nav>

      <div id="hero-timeline">
        <HeroTimeline choices={choices} />
      </div>

      <div id="day-builder">
        <InteractiveDayBuilder onComplete={handleCompleteBuilder} />
      </div>

      <div id="shadow-reveal">
        <TheShadowReveal
          choices={choices ?? {}}
          enabled={phasesComplete}
        />
      </div>

      {phasesComplete && (
        <div id="futures-engine">
          <ParallelFuturesEngine choices={choices} />
        </div>
      )}

      <div id="action-ecosystem">
        <ActionEcosystem enabled={phasesComplete} />
      </div>

      {phasesComplete && (
        <div id="community-grid">
          <CommunityGrid />
        </div>
      )}

      <footer className="bg-white dark:bg-black py-20 px-4 text-center border-t border-slate-200 dark:border-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-green-900/10" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold">The Future is Malleable.</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Join 124,000+ others who are actively redesigning their trajectory.
          </p>
          <button
            onClick={() => document.getElementById("day-builder")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 bg-green-500 hover:bg-green-400 text-black font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(34,197,94,0.3)] active:scale-95"
          >
            Begin Your 7-Day Protocol
          </button>
        </div>
      </footer>
    </main>
  );
}
