"use client";

import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

const postitToneMap = {
  yellow: {
    surface: "border-[#eadcb1] bg-[#fff8cf]",
    pin: "bg-red-500 shadow-[0_2px_0_rgba(127,29,29,0.45),0_4px_10px_rgba(239,68,68,0.45)]",
  },
  blue: {
    surface: "border-[#cfe1ef] bg-[#eef7ff]",
    pin: "bg-red-500 shadow-[0_2px_0_rgba(127,29,29,0.45),0_4px_10px_rgba(239,68,68,0.45)]",
  },
  pink: {
    surface: "border-[#eed3da] bg-[#fff1f4]",
    pin: "bg-red-500 shadow-[0_2px_0_rgba(127,29,29,0.45),0_4px_10px_rgba(239,68,68,0.45)]",
  },
} as const;

type PostitTone = keyof typeof postitToneMap;

export function PostitCard({
  children,
  tone = "yellow",
  className,
  contentClassName,
  showPin = true,
}: {
  children: ReactNode;
  tone?: PostitTone;
  className?: string;
  contentClassName?: string;
  showPin?: boolean;
}) {
  const currentTone = postitToneMap[tone];

  return (
    <div
      className={cn(
        "experience-postit-surface rounded-[2rem] border p-6 shadow-[0_16px_36px_rgba(120,113,108,0.14)]",
        currentTone.surface,
        className,
      )}
    >
      {showPin ? (
        <span
          aria-hidden="true"
          className={cn(
            "absolute left-1/2 top-3 z-20 h-4 w-4 -translate-x-1/2 rounded-full",
            currentTone.pin,
          )}
        />
      ) : null}
      <div className={cn("relative z-10", contentClassName)}>{children}</div>
    </div>
  );
}
