"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dayBuilderOptions } from "@/lib/seed-data";
import { calculateImpact, getPhaseDetail } from "@/lib/behavioral-engine";
import { Car, Bus, Bike, Home, Beef, Salad, Leaf, Plug, Cpu, Sun, ArrowRight } from "lucide-react";

const icons: Record<string, React.ComponentType<{ size?: number }>> = {
  car: Car,
  bus: Bus,
  bike: Bike,
  home: Home,
  steak: Beef,
  salad: Salad,
  leaf: Leaf,
  plug: Plug,
  cpu: Cpu,
  sun: Sun,
};

type BuilderMode = "question" | "review";

export function InteractiveDayBuilder({ onComplete }: { onComplete: (choices: Record<string, string>) => void }) {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<BuilderMode>("question");
  const [choices, setChoices] = useState<Record<string, string>>({});

  const categories = Object.keys(dayBuilderOptions);
  const currentCategory = categories[step];
  const isLastStep = step === categories.length - 1;
  const currentChoiceId = choices[currentCategory];
  const phaseDetail = currentChoiceId ? getPhaseDetail(currentCategory, currentChoiceId) : null;
  const fullImpact = calculateImpact(choices);

  const handleSelect = (id: string) => {
    setChoices((prev) => ({ ...prev, [currentCategory]: id }));
    setMode("review");
  };

  const handleContinue = () => {
    if (isLastStep) {
      onComplete(choices);
      return;
    }
    setStep((prev) => prev + 1);
    setMode("question");
  };

  const getQuestion = (cat: string) => {
    switch (cat) {
      case "commute":
        return "08:00 AM. Time to move. How do you navigate the grid?";
      case "diet":
        return "13:00 PM. Fueling up. What's on the plate today?";
      case "energy":
        return "19:00 PM. Powering the night. What runs your sanctuary?";
      default:
        return "Make your choice.";
    }
  };

  if (mode === "review" && phaseDetail) {
    return (
      <section className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 py-20 px-4">
        <motion.div
          key={`review-${step}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full space-y-6"
        >
          <div className="space-y-2">
            <span className="text-green-400 font-mono tracking-widest text-sm uppercase">
              {phaseDetail.phase} — Complete
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 dark:text-white">
              {phaseDetail.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">{phaseDetail.subtitle}</p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 dark:bg-slate-900">
                <tr>
                  <th className="px-4 py-3 font-mono text-xs text-slate-500 uppercase">Field</th>
                  <th className="px-4 py-3 font-mono text-xs text-slate-500 uppercase">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200 dark:border-slate-800">
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Category</td>
                  <td className="px-4 py-3 text-slate-900 dark:text-white font-medium">{phaseDetail.category}</td>
                </tr>
                <tr className="border-t border-slate-200 dark:border-slate-800">
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Your Choice</td>
                  <td className="px-4 py-3 text-slate-900 dark:text-white font-medium">{phaseDetail.choice}</td>
                </tr>
                <tr className="border-t border-slate-200 dark:border-slate-800">
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Impact Level</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-mono ${
                        phaseDetail.impact === "Low"
                          ? "bg-green-500/20 text-green-400"
                          : phaseDetail.impact === "Moderate"
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {phaseDetail.impact}
                    </span>
                  </td>
                </tr>
                <tr className="border-t border-slate-200 dark:border-slate-800">
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{phaseDetail.metricLabel}</td>
                  <td className="px-4 py-3 text-slate-900 dark:text-white font-mono font-semibold">{phaseDetail.metric}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 border-l-2 border-green-500 pl-4">
            {phaseDetail.insight}
          </p>

          {isLastStep && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2 font-mono text-xs text-slate-500 uppercase">
                Full Habit Summary
              </div>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-t border-slate-200 dark:border-slate-800">
                    <th className="px-4 py-2 font-mono text-xs text-slate-500 uppercase">Category</th>
                    <th className="px-4 py-2 font-mono text-xs text-slate-500 uppercase">Choice</th>
                    <th className="px-4 py-2 font-mono text-xs text-slate-500 uppercase">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {fullImpact.habitRows.map((row) => (
                    <tr key={row.category} className="border-t border-slate-200 dark:border-slate-800">
                      <td className="px-4 py-2 text-slate-700 dark:text-slate-300">{row.category}</td>
                      <td className="px-4 py-2 text-slate-900 dark:text-white">{row.choice}</td>
                      <td className="px-4 py-2">
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

          <button
            onClick={handleContinue}
            className="flex items-center justify-center gap-2 w-full py-4 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl transition-colors"
          >
            {isLastStep ? "Unlock Scratch Pad" : `Continue to Phase 0${step + 2}`}
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 py-20 px-4">
      <div className="max-w-4xl w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col gap-8"
          >
            <div className="space-y-4">
              <span className="text-green-400 font-mono tracking-widest text-sm uppercase">
                Phase 0{step + 1}
              </span>
              <h2 className="text-3xl md:text-5xl font-light text-slate-900 dark:text-white">
                {getQuestion(currentCategory)}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(dayBuilderOptions as Record<string, { id: string; title: string; icon: string }[]>)[currentCategory].map((option) => {
                const Icon = icons[option.icon];
                const isSelected = choices[currentCategory] === option.id;

                return (
                  <motion.div
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(option.id)}
                    className={`
                    relative cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300
                    flex flex-col gap-4 overflow-hidden
                    ${
                      isSelected
                        ? "border-green-500 bg-green-500/10"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }
                  `}
                  >
                    <div className={`p-3 rounded-full w-fit ${isSelected ? "bg-green-500/20 text-green-400" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}>
                      <Icon size={24} />
                    </div>
                    <h3 className={`text-xl font-medium ${isSelected ? "text-green-300" : "text-slate-900 dark:text-white"}`}>
                      {option.title}
                    </h3>
                    <div className="absolute -bottom-6 -right-6 opacity-10 pointer-events-none">
                      <Icon size={120} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
