"use client";

import { motion } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { ArrowDown } from "lucide-react";
import { calculateImpact } from "@/lib/behavioral-engine";

interface HeroTimelineProps {
  choices?: Record<string, string> | null;
}

export function HeroTimeline({ choices }: HeroTimelineProps) {
  const impact = calculateImpact(choices ?? {});
  const isComplete = Boolean(choices?.commute && choices?.diet && choices?.energy);
  const maxScore = 37;
  const commutePct = Math.round((1 - impact.commuteScore / 10) * 100);
  const dietPct = Math.round((1 - impact.dietScore / 15) * 100);
  const energyPct = Math.round((1 - impact.energyScore / 12) * 100);
  const overallPct = Math.round((1 - impact.totalScore / maxScore) * 100);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="w-full h-full object-cover"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            filter: "brightness(0.3) saturate(1.2)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
      </div>

      <div className="relative z-10 w-full">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center mb-10">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 mb-6"
              >
                The Temporal Mirror
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-2xl text-center"
              >
                Your daily habits echo into the future. Discover your carbon shadow, and simulate tomorrow.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-12 flex flex-col items-center gap-2 text-green-400 animate-pulse"
              >
                <span className="text-sm uppercase tracking-widest">Scroll to Begin</span>
                <ArrowDown size={24} />
              </motion.div>
            </div>
          }
        >
          <div className="w-full h-full relative overflow-hidden bg-white dark:bg-slate-900 flex flex-col">
            <div className="h-12 w-full border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2 bg-slate-50 dark:bg-slate-950">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="ml-4 text-xs text-slate-500 font-mono">
                {isComplete ? "System.EchoEarth.RunSimulation()" : "System.EchoEarth.Initialize()"}
              </div>
            </div>
            <div className="flex-1 p-4 md:p-6 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 overflow-hidden">
              <div className="col-span-2 md:col-span-2 row-span-2 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-300 dark:border-slate-700/50 flex flex-col p-4 md:p-6 relative overflow-hidden min-h-0">
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-24 h-32 flex items-end justify-between px-4 opacity-50 pointer-events-none">
                  <div className="w-1/6 bg-green-500 rounded-t-sm h-[40%] animate-pulse" />
                  <div className="w-1/6 bg-green-500 rounded-t-sm h-[60%] animate-pulse delay-75" />
                  <div className="w-1/6 bg-green-500 rounded-t-sm h-[30%] animate-pulse delay-150" />
                  <div className="w-1/6 bg-green-500 rounded-t-sm h-[80%] animate-pulse delay-300" />
                  <div className="w-1/6 bg-green-500 rounded-t-sm h-[50%] animate-pulse delay-500" />
                </div>

                <span className="text-green-500 font-mono text-xs uppercase tracking-widest relative z-10 mb-2">
                  {impact.phase}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white relative z-10">
                  {impact.phaseTitle}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 relative z-10 text-sm mt-1 mb-4">
                  {impact.phaseSubtitle}
                </p>

                {isComplete && (
                  <div className="relative z-10 flex-1 min-h-0 overflow-auto">
                    <table className="w-full text-left text-xs md:text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-slate-300 dark:border-slate-600">
                          <th className="py-2 pr-3 font-mono text-slate-500 uppercase tracking-wider">Category</th>
                          <th className="py-2 pr-3 font-mono text-slate-500 uppercase tracking-wider">Habit</th>
                          <th className="py-2 font-mono text-slate-500 uppercase tracking-wider">Impact</th>
                        </tr>
                      </thead>
                      <tbody>
                        {impact.habitRows.map((row) => (
                          <tr key={row.category} className="border-b border-slate-200 dark:border-slate-700/50">
                            <td className="py-2 pr-3 text-slate-700 dark:text-slate-300">{row.category}</td>
                            <td className="py-2 pr-3 text-slate-900 dark:text-white font-medium">{row.choice}</td>
                            <td className="py-2">
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-mono ${
                                  row.impact === "Low"
                                    ? "bg-green-500/20 text-green-400"
                                    : row.impact === "Moderate"
                                    ? "bg-orange-500/20 text-orange-400"
                                    : "bg-red-500/20 text-red-400"
                                }`}
                              >
                                {row.impact}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-300 dark:border-slate-700/50 p-4 flex flex-col items-center justify-center gap-2">
                {isComplete ? (
                  <>
                    <div className="text-3xl font-bold text-green-400">{overallPct}%</div>
                    <span className="text-xs text-slate-500 font-mono uppercase">Sustainability</span>
                  </>
                ) : (
                  <div className="w-16 h-16 rounded-full border-4 border-slate-300 dark:border-slate-700 border-t-green-500 animate-spin" />
                )}
              </div>

              <div className="bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-300 dark:border-slate-700/50 p-4 flex flex-col gap-2 justify-center">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>Commute</span>
                    <span>{commutePct}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all duration-700" style={{ width: `${commutePct}%` }} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>Diet</span>
                    <span>{dietPct}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 transition-all duration-700" style={{ width: `${dietPct}%` }} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>Energy</span>
                    <span>{energyPct}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 transition-all duration-700" style={{ width: `${energyPct}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
}
