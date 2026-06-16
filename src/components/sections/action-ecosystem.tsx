"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Lock, ArrowRight } from "lucide-react";

interface Mission {
  id: string;
  title: string;
  desc: string;
  carbon: number;
  carbonLabel: string;
  outcome: string;
}

const MISSIONS: Mission[] = [
  {
    id: "transit",
    title: "Sync Transit Card",
    desc: "Automate tracking of public transport.",
    carbon: 40,
    carbonLabel: "-40kg/mo",
    outcome: "Transit card linked. Weekly commute emissions will be tracked and offset suggestions sent every Monday.",
  },
  {
    id: "meatless",
    title: "Meatless Mondays",
    desc: "Swap beef for plant-based alternatives 1 day a week.",
    carbon: 25,
    carbonLabel: "-25kg/mo",
    outcome: "Meatless Monday protocol activated. You'll receive a plant-based meal plan each Sunday evening.",
  },
  {
    id: "peak-shift",
    title: "Smart Peak Shift",
    desc: "Run heavy appliances outside of 4PM-9PM.",
    carbon: 15,
    carbonLabel: "-15kg/mo",
    outcome: "Peak-shift reminders enabled. Heavy loads will be nudged to off-peak hours automatically.",
  },
];

// Module-level dedup: ensure all_missions_completed fires only once per session
let allMissionsTracked = false;

export function ActionEcosystem({ enabled }: { enabled: boolean }) {
  const [committed, setCommitted] = useState<Set<string>>(new Set());
  const [lastCommitted, setLastCommitted] = useState<Mission | null>(null);

  const totalSaved = MISSIONS.filter((m) => committed.has(m.id)).reduce((sum, m) => sum + m.carbon, 0);

  const handleCommit = (mission: Mission) => {
    if (!enabled || committed.has(mission.id)) return;
    const newCommitted = new Set([...committed, mission.id]);
    setCommitted(newCommitted);
    setLastCommitted(mission);

    const newTotalSaved = MISSIONS.filter((m) => newCommitted.has(m.id)).reduce((sum, m) => sum + m.carbon, 0);

    if (typeof window !== "undefined" && window.pendo) {
      window.pendo.track("mission_committed", {
        mission_id: mission.id,
        mission_title: mission.title,
        carbon_savings_kg: mission.carbon,
        carbon_label: mission.carbonLabel,
        total_missions_active: newCommitted.size,
        total_monthly_savings_kg: newTotalSaved,
      });

      if (newCommitted.size === MISSIONS.length && !allMissionsTracked) {
        allMissionsTracked = true;
        window.pendo.track("all_missions_completed", {
          total_monthly_savings_kg: newTotalSaved,
          mission_count: MISSIONS.length,
          missions_committed: MISSIONS.map((m) => m.id).join(","),
        });
      }
    }
  };

  if (!enabled) {
    return (
      <section className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 py-20 px-4">
        <div className="max-w-md text-center space-y-4">
          <Lock size={48} className="mx-auto text-slate-500" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Action Ecosystem Locked</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Complete all habit phases and explore your carbon shadow to unlock micro-missions.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 py-20 px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <span className="text-green-500 font-mono tracking-widest text-sm uppercase">
            Micro-Missions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-4">
            The Action Ecosystem
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">
            Small, verified actions that integrate into your existing life. No extreme sacrifices.
          </p>
        </div>

        <AnimatePresence>
          {lastCommitted && (
            <motion.div
              key={lastCommitted.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-start gap-3"
            >
              <CheckCircle2 size={20} className="text-green-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-green-400 font-semibold text-sm">
                  {lastCommitted.title} — Committed
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{lastCommitted.outcome}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {committed.size > 0 && (
          <div className="mb-8 p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400 text-sm font-mono uppercase">Total Monthly Savings</span>
              <span className="text-2xl font-bold text-green-400">-{totalSaved}kg CO2e</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {committed.size} of {MISSIONS.length} missions active
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MISSIONS.map((mission, idx) => {
            const isCommitted = committed.has(mission.id);
            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`rounded-2xl p-6 flex flex-col transition-colors border ${
                  isCommitted
                    ? "bg-green-500/5 border-green-500/40"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-green-500/50"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCommitted ? "bg-green-500/30 text-green-300" : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-sm font-mono text-green-300 bg-green-900/30 px-2 py-1 rounded">
                    {mission.carbonLabel}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{mission.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm flex-1">{mission.desc}</p>

                {isCommitted ? (
                  <div className="mt-6 py-2 px-4 bg-green-500/20 text-green-400 text-sm rounded-lg w-full border border-green-500/30 text-center font-medium">
                    Active — Saving {mission.carbon}kg/mo
                  </div>
                ) : (
                  <button
                    onClick={() => handleCommit(mission)}
                    className="mt-6 py-2 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-green-500/20 hover:text-green-400 hover:border-green-500/50 text-slate-900 dark:text-white text-sm rounded-lg transition-colors w-full border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-2"
                  >
                    Commit <ArrowRight size={14} />
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
