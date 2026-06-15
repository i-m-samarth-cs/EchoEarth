"use client";

import React from "react";
import { TreePine, Home, Utensils, Bike, Zap, Droplets } from "lucide-react";

interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
  onClick?: () => void;
}

interface DockIcon {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const GlassEffect: React.FC<GlassEffectProps> = ({
  children,
  className = "",
  style = {},
  href,
  target = "_blank",
  onClick,
}) => {
  const glassStyle = {
    boxShadow: "0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)",
    transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
    ...style,
  };

  const content = (
    <div
      className={`relative flex font-semibold overflow-hidden text-white cursor-pointer transition-all duration-700 ${className}`}
      style={glassStyle}
      onClick={onClick}
    >
      <div
        className="absolute inset-0 z-0 overflow-hidden rounded-inherit rounded-3xl"
        style={{
          backdropFilter: "blur(8px)",
          filter: "url(#glass-distortion)",
          isolation: "isolate",
        }}
      />
      <div
        className="absolute inset-0 z-10 rounded-inherit"
        style={{ background: "rgba(255, 255, 255, 0.1)" }}
      />
      <div
        className="absolute inset-0 z-20 rounded-inherit rounded-3xl overflow-hidden"
        style={{
          boxShadow:
            "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.3), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.1)",
        }}
      />
      <div className="relative z-30">{children}</div>
    </div>
  );

  return href ? (
    <a href={href} target={target} rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    content
  );
};

export const GlassDock: React.FC<{ icons: DockIcon[]; href?: string }> = ({
  icons,
  href,
}) => (
  <GlassEffect
    href={href}
    className="rounded-3xl p-3 hover:p-4 hover:rounded-4xl"
  >
    <div className="flex items-center justify-center gap-2 rounded-3xl p-3 py-0 px-0.5 overflow-hidden">
      {icons.map((icon) => (
        <div
          key={icon.id}
          className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center transition-all duration-700 hover:scale-110 cursor-pointer bg-white/10 rounded-2xl hover:bg-white/20 text-green-300 hover:text-green-100"
          style={{
            transformOrigin: "center center",
            transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
          }}
          title={icon.label}
          onClick={icon.onClick}
        >
          {icon.icon}
        </div>
      ))}
    </div>
  </GlassEffect>
);

export const GlassFilter: React.FC = () => (
  <svg style={{ display: "none" }}>
    <filter
      id="glass-distortion"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.001 0.005"
        numOctaves="1"
        seed="17"
        result="turbulence"
      />
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>
      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
      <feSpecularLighting
        in="softMap"
        surfaceScale="5"
        specularConstant="1"
        specularExponent="100"
        lightingColor="white"
        result="specLight"
      >
        <fePointLight x="-200" y="-200" z="300" />
      </feSpecularLighting>
      <feComposite
        in="specLight"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="litImage"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="200"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);

export const AICompanionDock = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const dockIcons: DockIcon[] = [
    { id: "nature", icon: <TreePine size={28} />, label: "Hero Timeline", onClick: () => scrollTo("hero-timeline") },
    { id: "home", icon: <Home size={28} />, label: "Day Builder", onClick: () => scrollTo("day-builder") },
    { id: "food", icon: <Utensils size={28} />, label: "Shadow Reveal", onClick: () => scrollTo("shadow-reveal") },
    { id: "mobility", icon: <Bike size={28} />, label: "Futures Engine", onClick: () => scrollTo("futures-engine") },
    { id: "energy", icon: <Zap size={28} />, label: "Action Ecosystem", onClick: () => scrollTo("action-ecosystem") },
    { id: "water", icon: <Droplets size={28} />, label: "Community Grid", onClick: () => scrollTo("community-grid") },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <GlassFilter />
      <GlassDock icons={dockIcons} />
    </div>
  );
};
