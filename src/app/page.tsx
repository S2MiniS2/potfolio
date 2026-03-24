"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Experience from "@/components/sections/experience";
import Contact from "@/components/sections/contact";
import AskMiniButton from "@/components/chat/ask-mini-button";
import ChatPanel from "@/components/chat/chat-panel";
import About from "@/components/sections/about";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [nextSectionIndex, setNextSectionIndex] = useState(1);

  useEffect(() => {
    const getSections = () =>
      Array.from(document.querySelectorAll("main > section")) as HTMLElement[];

    const updateNextSection = () => {
      const sections = getSections();

      if (sections.length === 0) return;

      const viewportMiddle = window.scrollY + window.innerHeight * 0.35;
      const currentIndex = sections.findLastIndex((section) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        return viewportMiddle >= top && viewportMiddle < bottom;
      });

      const safeIndex = currentIndex >= 0 ? currentIndex : 0;
      setNextSectionIndex(Math.min(safeIndex + 1, sections.length - 1));
    };

    updateNextSection();
    window.addEventListener("scroll", updateNextSection, { passive: true });
    window.addEventListener("resize", updateNextSection);

    return () => {
      window.removeEventListener("scroll", updateNextSection);
      window.removeEventListener("resize", updateNextSection);
    };
  }, []);

  const handleScrollNext = () => {
    const sections = Array.from(
      document.querySelectorAll("main > section"),
    ) as HTMLElement[];
    const nextSection = sections[nextSectionIndex];

    if (!nextSection) return;

    const nextTop = nextSection.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: nextTop,
      behavior: "smooth",
    });
  };

  return (
    <>
      <main>
        <Hero />
        <Experience />
        <Projects />
        <About />
        <Contact />
      </main>

      <button
        type="button"
        aria-label="다음 섹션으로 이동"
        onClick={handleScrollNext}
        className="fixed bottom-6 left-1/2 z-40 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-border/60 bg-background/85 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-background"
      >
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </button>

      <AskMiniButton onClick={() => setOpen(true)} />
      <ChatPanel open={open} onOpenChange={setOpen} />
    </>
  );
}
