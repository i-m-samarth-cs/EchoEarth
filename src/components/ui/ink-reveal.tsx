"use client";

import React, { useRef, useEffect, useCallback } from "react";

export interface InkRevealProps {
  /** Size of the brush (stamp radius) */
  brushSize?: number;
  /** Max random variance added to radius */
  rVary?: number;
  /** Optional URL of an image to use as the surface layer */
  imageUrl?: string;
  /** Base mask color (if no image) as [R, G, B] */
  maskColor?: [number, number, number];
  /** Gradient inner-radius factor */
  gradientInnerRadius?: number;
  /** Gradient opacity stops */
  gradientStops?: [number, number, number];
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  /** Callback fired once on the first mouse down or touch start */
  onScratchStart?: () => void;
  /** Dummy props to ignore for backwards compatibility */
  lifetime?: number;
  wobble?: number[];
}

export default function InkReveal({
  brushSize = 100,
  rVary = 0.2,
  imageUrl,
  maskColor = [15, 23, 42],
  gradientInnerRadius = 0.2,
  gradientStops = [0.95, 0.88, 0],
  className,
  style,
  disabled = false,
  onScratchStart,
}: InkRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const hasFiredStartRef = useRef(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const drawBase = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const rect = parent.getBoundingClientRect();
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const w = rect.width;
    const h = rect.height;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.globalCompositeOperation = "source-over";
    
    if (imgRef.current) {
      const img = imgRef.current;
      const scale = Math.max(w / img.width, h / img.height);
      const x = (w / 2) - (img.width / 2) * scale;
      const y = (h / 2) - (img.height / 2) * scale;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    } else {
      ctx.fillStyle = `rgb(${maskColor[0]},${maskColor[1]},${maskColor[2]})`;
      ctx.fillRect(0, 0, w, h);
    }
  }, [maskColor]);

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;
      img.onload = () => {
        imgRef.current = img;
        drawBase();
      };
    } else {
      drawBase();
    }

    const handleResize = () => drawBase();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imageUrl, drawBase]);

  const scratch = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const r = brushSize * (1 + (Math.random() - 0.5) * rVary);

      ctx.globalCompositeOperation = "destination-out";
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, `rgba(0, 0, 0, ${gradientStops[0]})`);
      grad.addColorStop(gradientInnerRadius, `rgba(0, 0, 0, ${gradientStops[1]})`);
      grad.addColorStop(1, `rgba(0, 0, 0, ${gradientStops[2]})`);

      ctx.beginPath();
      ctx.fillStyle = grad;
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fill();
    },
    [brushSize, rVary, gradientInnerRadius, gradientStops]
  );

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        cursor: disabled ? "not-allowed" : "crosshair",
        touchAction: disabled ? "auto" : "none",
        pointerEvents: disabled ? "none" : "auto",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (disabled || e.buttons === 0) return;
        isDrawingRef.current = true;
      }}
      onMouseMove={(e) => {
        if (disabled) return;
        if (isDrawingRef.current || e.buttons > 0) {
          scratch(e.clientX, e.clientY);
        } else {
          scratch(e.clientX, e.clientY);
        }
      }}
      onMouseLeave={() => {
        isDrawingRef.current = false;
      }}
      onMouseDown={(e) => {
        if (disabled) return;
        if (!hasFiredStartRef.current && onScratchStart) {
          hasFiredStartRef.current = true;
          onScratchStart();
        }
        isDrawingRef.current = true;
        scratch(e.clientX, e.clientY);
      }}
      onMouseUp={() => {
        isDrawingRef.current = false;
      }}
      onTouchStart={(e) => {
        if (disabled) return;
        if (!hasFiredStartRef.current && onScratchStart) {
          hasFiredStartRef.current = true;
          onScratchStart();
        }
        isDrawingRef.current = true;
        const touch = e.touches[0];
        scratch(touch.clientX, touch.clientY);
      }}
      onTouchMove={(e) => {
        if (disabled || !isDrawingRef.current) return;
        const touch = e.touches[0];
        scratch(touch.clientX, touch.clientY);
      }}
      onTouchEnd={() => {
        isDrawingRef.current = false;
      }}
    />
  );
}
