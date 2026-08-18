"use client";

import { ReactNode } from "react";
import { useInView } from "../hooks/useInView";

type Animation =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade-in"
  | "scale-in";

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  className?: string;
  threshold?: number;
}

export default function AnimateOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  className = "",
  threshold = 0.15,
}: AnimateOnScrollProps) {
  const { ref, isInView } = useInView(threshold);

  const delayClass = delay > 0 ? `delay-${delay}` : "";

  return (
    <div
      ref={ref}
      className={`${isInView ? `animate-${animation} ${delayClass}` : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}
