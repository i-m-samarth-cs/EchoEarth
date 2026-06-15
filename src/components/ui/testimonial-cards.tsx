"use client";

import * as React from "react";
import { motion } from "framer-motion";

export interface PersonaCardProps {
  id: string;
  name: string;
  action: string;
  impact: string;
  imageUrl: string;
}

export interface TestimonialCardProps extends PersonaCardProps {
  handleShuffle: () => void;
  position: "front" | "middle" | "back" | string;
}

export function TestimonialCard({
  handleShuffle,
  action,
  impact,
  name,
  imageUrl,
  position,
}: TestimonialCardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? 2 : position === "middle" ? 1 : 0,
      }}
      animate={{
        rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
        x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%",
      }}
      drag={isFront ? "x" : false}
      dragElastic={0.35}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      onDragStart={(e) => {
        // Safe check for touch vs mouse event
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
        dragRef.current = clientX;
      }}
      onDragEnd={(e) => {
        const clientX = 'changedTouches' in e 
            ? (e as TouchEvent).changedTouches[0].clientX 
            : (e as MouseEvent).clientX;
        
        if (dragRef.current - clientX > 100) {
          handleShuffle();
        } else if (clientX - dragRef.current > 100) {
            handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 grid h-[450px] w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 border-green-900/50 bg-black/60 p-6 shadow-xl backdrop-blur-md ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <img
        src={imageUrl}
        alt={`Avatar of ${name}`}
        className="pointer-events-none mx-auto h-32 w-32 rounded-full border-2 border-green-500/30 bg-slate-800 object-cover"
      />
      <div className="space-y-2 text-center">
        <p className="text-xl italic text-slate-200">"{action}"</p>
        <p className="text-sm font-semibold text-green-400">{impact}</p>
      </div>
      <span className="text-center text-sm font-medium text-slate-400">
        — {name}
      </span>
    </motion.div>
  );
}

export function PersonaCardsDeck({ personas }: { personas: PersonaCardProps[] }) {
  const [positions, setPositions] = React.useState(["front", "middle", "back"]);

  const handleShuffle = () => {
    const newPositions = [...positions];
    const last = newPositions.pop();
    if (last) newPositions.unshift(last);
    setPositions(newPositions);
  };

  return (
    <div className="relative -ml-[50px] h-[450px] w-[350px] md:ml-0">
      {personas.slice(0, 3).map((persona, index) => (
        <TestimonialCard
          key={persona.id}
          {...persona}
          handleShuffle={handleShuffle}
          position={positions[index]}
        />
      ))}
    </div>
  );
}
