"use client";

import { Bot, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AskMiniButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative rotate-[-2deg]">
        <div className="absolute -top-2 left-6 h-5 w-16 rotate-6 rounded-sm bg-pink-200/80 shadow-sm" />
        <Button
          onClick={onClick}
          size="lg"
          className="h-auto rounded-[1.4rem] border border-amber-900/10 bg-[#fff4a8] px-4 py-3 text-stone-800 shadow-[0_14px_30px_rgba(120,90,20,0.16)] transition hover:-translate-y-0.5 hover:bg-[#ffef8a]"
        >
          <Bot className="mr-2 h-4 w-4" />
          <span className="font-semibold">Ask Mini</span>
          <Sparkles className="ml-2 h-3.5 w-3.5 opacity-70" />
        </Button>
      </div>
    </div>
  );
}
