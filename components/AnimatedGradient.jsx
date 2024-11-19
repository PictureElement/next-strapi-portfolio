"use client";

import { useEffect } from "react";
import { Gradient } from "@/lib/gradient";

export default function AnimatedGradient() {
  console.log("Hello from AnimatedGradient");
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, []);

  return (
    <canvas
      id="gradient-canvas"
      data-transition-in
      className="absolute inset-0 w-full h-full"
      style={{
        "--gradient-color-1": "#f0f8ff",
        "--gradient-color-2": "#e0f0fe",
        "--gradient-color-3": "#bae1fd",
        "--gradient-color-4": "#7cc9fd",
      }}
    />
  );
}