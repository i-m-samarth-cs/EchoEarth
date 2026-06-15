"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calculateFutures, FutureState } from "@/lib/behavioral-engine";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { ArrowRight, Thermometer, Wind, CheckCircle2 } from "lucide-react";

export function ParallelFuturesEngine({ choices }: { choices: Record<string, string> }) {
  const futures = calculateFutures(choices);
  const [activeFuture, setActiveFuture] = useState<number>(1); // Default to pragmatist
  const [isCommitted, setIsCommitted] = useState<boolean>(false);

  const current = futures[activeFuture];

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 py-20 px-4">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Parallel Realities: 2050
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Based on your day, the algorithm has extrapolated three distinct futures. Which timeline will you manifest?
          </p>
        </div>

        {/* The Timeline Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {futures.map((future, idx) => (
            <button
              key={future.path}
              onClick={() => {
                setActiveFuture(idx);
                setIsCommitted(false);
              }}
              className={`
                px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border-2
                ${
                  activeFuture === idx
                    ? "bg-white text-slate-900 border-white"
                    : "bg-transparent text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700 hover:border-slate-500"
                }
              `}
            >
              {future.title}
            </button>
          ))}
        </div>

        {/* The 3D Scroll Viewer */}
        <div className="w-full h-full">
          <ContainerScroll
            titleComponent={
               <AnimatePresence mode="wait">
                 <motion.div
                   key={current.path}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="flex flex-col items-center justify-center"
                 >
                   <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{current.title}</h3>
                   <p className="text-slate-600 dark:text-slate-400 max-w-md text-center">{current.description}</p>
                 </motion.div>
               </AnimatePresence>
            }
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.path}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className={`relative w-full h-full flex flex-col justify-between p-8 border ${current.visualTheme} transition-colors duration-700`}
                style={{
                   backgroundImage: `url(${
                     current.path === 'default' 
                     ? 'https://images.unsplash.com/photo-1473862215021-030113f993f3?auto=format&fit=crop&q=80&w=1200' 
                     : current.path === 'pragmatist'
                     ? 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1200'
                     : 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1200'
                   })`,
                   backgroundSize: 'cover',
                   backgroundPosition: 'center',
                   backgroundBlendMode: 'overlay',
                }}
              >
                 <div className="flex justify-between items-start z-10 relative">
                    <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 flex items-center gap-2">
                       <Thermometer size={18} className="text-red-400" />
                       <span className="font-mono text-white">{current.temperatureDelta}</span>
                    </div>
                    <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 flex items-center gap-2">
                       <Wind size={18} className="text-blue-400" />
                       <span className="font-mono text-white">{current.airQuality}</span>
                    </div>
                 </div>

                 {/* The committed overlay state */}
                 <AnimatePresence>
                   {isCommitted && (
                     <motion.div 
                       initial={{ opacity: 0 }} 
                       animate={{ opacity: 1 }}
                       exit={{ opacity: 0 }}
                       className="absolute inset-0 bg-green-900/40 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-white"
                     >
                       <div className="bg-black/50 p-6 rounded-2xl flex flex-col items-center border border-green-500/50">
                         <CheckCircle2 size={48} className="text-green-400 mb-4" />
                         <h3 className="text-2xl font-bold mb-2">Timeline Locked</h3>
                         <p className="text-center text-slate-300 max-w-sm">
                           You have committed to {current.title}. Your daily missions have been recalibrated.
                         </p>
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>

                 <div className="self-end mt-auto z-10 relative">
                    <button 
                      onClick={() => setIsCommitted(true)}
                      className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-slate-200 transition-colors"
                    >
                       Commit to Path <ArrowRight size={18} />
                    </button>
                 </div>
              </motion.div>
            </AnimatePresence>
          </ContainerScroll>
        </div>
      </div>
    </section>
  );
}
