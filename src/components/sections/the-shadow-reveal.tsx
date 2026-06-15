"use client";

import { motion } from "framer-motion";
import InkReveal from "@/components/ui/ink-reveal";
import { calculateImpact } from "@/lib/behavioral-engine";
import { Lock } from "lucide-react";

export function TheShadowReveal({
  choices,
  enabled,
}: {
  choices: Record<string, string>;
  enabled: boolean;
}) {
  const impact = calculateImpact(choices);

  const surfaceImage =
    impact.totalScore <= 10
      ? "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200"
      : "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=1200";

  const hiddenImage =
    impact.totalScore <= 10
      ? "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200"
      : "https://images.unsplash.com/photo-1611270418597-a6cbfbe4355b?auto=format&fit=crop&q=80&w=1200";

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 py-20 px-4 overflow-hidden">
      <div className="max-w-5xl w-full flex flex-col gap-8 z-10 relative pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <span className="text-green-500 font-mono tracking-widest text-sm uppercase">
            {enabled ? impact.phase : "Locked"}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white">
            {enabled ? "Your Carbon Shadow" : "Scratch the Surface"}
          </h2>
          <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto text-lg">
            {enabled
              ? "Scratch away the surface to reveal the hidden supply chains beneath your habits."
              : "Complete all three habit phases above to unlock the scratch pad."}
          </p>
        </motion.div>
      </div>

      <div className="relative mt-12 w-full max-w-5xl aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-black">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('${hiddenImage}')`,
            filter: enabled
              ? impact.totalScore <= 10
                ? "contrast(1.1) brightness(0.7)"
                : "contrast(1.2) brightness(0.5)"
              : "contrast(1) brightness(0.3) grayscale(0.5)",
          }}
        />

        {enabled && (
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-4 p-6 pointer-events-none">
            <div className="col-span-1 row-span-1 bg-red-950/80 border border-red-500/50 backdrop-blur-sm p-4 rounded-xl flex flex-col justify-center">
              <span className="text-red-400 font-mono text-xs uppercase tracking-wider">Water Depletion</span>
              <span className="text-3xl font-bold text-slate-900 dark:text-white">{impact.waterDepletion}</span>
              <span className="text-red-300 text-xs mt-1">Per week based on diet</span>
            </div>

            <div className="col-span-1 row-start-3 bg-orange-950/80 border border-orange-500/50 backdrop-blur-sm p-4 rounded-xl flex flex-col justify-center">
              <span className="text-orange-400 font-mono text-xs uppercase tracking-wider">Deforestation</span>
              <span className="text-3xl font-bold text-slate-900 dark:text-white">{impact.deforestation}</span>
              <span className="text-orange-300 text-xs mt-1">Supply chain footprint</span>
            </div>

            <div className="col-span-1 col-start-3 row-start-2 bg-yellow-950/80 border border-yellow-500/50 backdrop-blur-sm p-4 rounded-xl flex flex-col justify-center">
              <span className="text-yellow-400 font-mono text-xs uppercase tracking-wider">Carbon Emitted</span>
              <span className="text-3xl font-bold text-slate-900 dark:text-white">{impact.carbonEmitted}</span>
              <span className="text-yellow-300 text-xs mt-1">Transport & Energy</span>
            </div>

            <div className="col-span-3 row-span-3 absolute inset-0 flex items-center justify-center mix-blend-screen opacity-50">
              <div
                className={`w-64 h-64 border-[1px] rounded-full flex items-center justify-center animate-pulse ${
                  impact.totalScore <= 10
                    ? "border-green-500"
                    : impact.totalScore <= 22
                    ? "border-yellow-500"
                    : "border-red-500"
                }`}
              >
                <div
                  className={`w-32 h-32 border-[1px] border-dashed rounded-full ${
                    impact.totalScore <= 10
                      ? "border-green-400"
                      : impact.totalScore <= 22
                      ? "border-yellow-400"
                      : "border-red-400"
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        <InkReveal
          key={enabled ? `result-${impact.totalScore}` : "locked"}
          className="rounded-2xl"
          brushSize={250}
          rVary={0.4}
          lifetime={9999999}
          imageUrl={surfaceImage}
          disabled={!enabled}
        />

        {!enabled && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
            <Lock size={48} className="text-slate-400 mb-4" />
            <p className="text-white font-semibold text-lg">Scratch Pad Locked</p>
            <p className="text-slate-400 text-sm mt-2 text-center max-w-xs px-4">
              Finish Phase 01, 02, and 03 in the Day Builder to unlock.
            </p>
          </div>
        )}

        <div className="absolute inset-0 pointer-events-none bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
      </div>
    </section>
  );
}
