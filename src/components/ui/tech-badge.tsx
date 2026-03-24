"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const techBadgeClassMap: Record<string, string> = {
  React: "bg-cyan-100 text-cyan-700",
  "Next.js": "bg-gray-200 text-gray-800",
  "React Native (Expo)": "bg-green-100 text-green-700",
  Chatbase: "bg-blue-100 text-blue-700",
  MongoDB: "bg-green-100 text-green-700",
  Emotion: "bg-pink-100 text-pink-700",
  Storybook: "bg-yellow-100 text-yellow-700",
  TypeScript: "bg-blue-100 text-blue-700",
  JavaScript: "bg-yellow-100 text-yellow-700",
  "Tailwind CSS": "bg-sky-100 text-sky-700",
  "Styled-Components": "bg-pink-100 text-pink-700",
  CSS: "bg-blue-100 text-blue-700",
  SCSS: "bg-pink-100 text-pink-700",
  "React Query": "bg-red-100 text-red-700",
  Figma: "bg-sky-100 text-sky-700",
  Photoshop: "bg-violet-100 text-violet-700",
  Illustrator: "bg-pink-100 text-pink-700",
  "Premiere Pro": "bg-red-100 text-red-700",
  Git: "bg-slate-200 text-slate-700",
  Jira: "bg-blue-100 text-blue-700",
};

export function getTechBadgeClass(tech: string) {
  return techBadgeClassMap[tech] ?? "bg-slate-100 text-slate-700";
}

export function TechBadge({
  tech,
  className,
}: {
  tech: string;
  className?: string;
}) {
  return <Badge className={cn(getTechBadgeClass(tech), className)}>{tech}</Badge>;
}
