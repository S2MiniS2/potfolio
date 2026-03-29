"use client";

import { useEffect, useRef, useState } from "react";
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
  const scrollAnimationRef = useRef<number | null>(null);
  const [isLastSection, setIsLastSection] = useState(false);

  useEffect(() => {
    const getSections = () =>
      Array.from(document.querySelectorAll("main > section")) as HTMLElement[];

    const updateNextSection = () => {
      const sections = getSections();

      if (sections.length === 0) return;

      const lastSection = sections[sections.length - 1];
      const lastSectionTop = lastSection.getBoundingClientRect().top;
      const isNearPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 24;

      const viewportMiddle = window.scrollY + window.innerHeight * 0.35;
      const currentIndex = sections.findLastIndex((section) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        return viewportMiddle >= top && viewportMiddle < bottom;
      });

      const safeIndex = currentIndex >= 0 ? currentIndex : 0;
      setIsLastSection(
        lastSectionTop <= window.innerHeight * 0.45 || isNearPageBottom,
      );
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

  useEffect(() => {
    return () => {
      if (scrollAnimationRef.current !== null) {
        window.cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, []);

  const handleScrollNext = () => {
    const sections = Array.from(
      document.querySelectorAll("main > section"),
    ) as HTMLElement[];

    const startTop = window.scrollY;
    const targetTop = isLastSection
      ? 0
      : sections[nextSectionIndex]?.getBoundingClientRect().top + startTop;

    if (targetTop === undefined) return;

    const distance = targetTop - startTop;

    if (Math.abs(distance) < 4) return;

    if (scrollAnimationRef.current !== null) {
      window.cancelAnimationFrame(scrollAnimationRef.current);
    }

    const duration = 850;
    const easeInOutCubic = (progress: number) =>
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    let animationStart: number | null = null;

    const animateScroll = (timestamp: number) => {
      if (animationStart === null) {
        animationStart = timestamp;
      }

      const elapsed = timestamp - animationStart;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo({
        top: startTop + distance * easedProgress,
        behavior: "auto",
      });

      if (progress < 1) {
        scrollAnimationRef.current = window.requestAnimationFrame(animateScroll);
        return;
      }

      scrollAnimationRef.current = null;
    };

    scrollAnimationRef.current = window.requestAnimationFrame(animateScroll);
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
        aria-label={isLastSection ? "맨 위로 이동" : "다음 섹션으로 이동"}
        onClick={handleScrollNext}
        className="fixed bottom-6 left-1/2 z-40 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-border/60 bg-background/85 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-background"
      >
        <ChevronDown
          className={`h-5 w-5 transition-transform ${
            isLastSection ? "rotate-180 animate-none" : "animate-bounce"
          }`}
        />
      </button>

      <AskMiniButton onClick={() => setOpen(true)} />
      <ChatPanel open={open} onOpenChange={setOpen} />
    </>
  );
}
