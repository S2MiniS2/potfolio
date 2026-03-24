"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Bot, Github, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PostitCard } from "@/components/ui/postit-card";
import { TechBadge } from "@/components/ui/tech-badge";

const BADGE_KEYWORDS = [
  "# 실제 서비스 코드를 경험한",
  "# AI를 똑똑하게 활용하는",
  "# 솔직하고 빠르게 소통하는",
  "# 사용자 협업을 경청하는",
];

const HEADING_LINES = ["안녕하세요.", "프론트엔드 개발자", "박민희입니다."];
const DESCRIPTION_LINES = [
  "실제 서비스 코드베이스에서 기능 개선을 경험한",
  "프론트엔드 개발자입니다.",
];
const BADGE_ROW_HEIGHT = 28;

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stackCardRef = useRef<HTMLDivElement | null>(null);
  const [gradientOpacity, setGradientOpacity] = useState(1);
  const [typedHeading, setTypedHeading] = useState("");
  const [typedDescription, setTypedDescription] = useState("");
  const [badgeIndex, setBadgeIndex] = useState(0);
  const [stackAnimationCycle, setStackAnimationCycle] = useState(0);
  const [showKeywordBadge, setShowKeywordBadge] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const updateGradientOpacity = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const fadeDistance = Math.max(sectionRef.current.offsetHeight * 0.75, 1);
      const nextOpacity = Math.max(0, Math.min(1, rect.bottom / fadeDistance));

      setGradientOpacity((current) =>
        Math.abs(current - nextOpacity) > 0.01 ? nextOpacity : current,
      );
      frameId = 0;
    };

    const requestUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateGradientOpacity);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  useEffect(() => {
    const headingText = HEADING_LINES.join("\n");
    const descriptionText = DESCRIPTION_LINES.join("\n");
    let headingIndex = 0;
    let descriptionIndex = 0;
    let descriptionTimer: number | null = null;
    let badgeTimer: number | null = null;

    const headingTimer = window.setInterval(() => {
      headingIndex += 1;
      setTypedHeading(headingText.slice(0, headingIndex));

      if (headingIndex >= headingText.length) {
        window.clearInterval(headingTimer);

        descriptionTimer = window.setInterval(() => {
          descriptionIndex += 1;
          setTypedDescription(descriptionText.slice(0, descriptionIndex));

          if (descriptionIndex >= descriptionText.length && descriptionTimer) {
            window.clearInterval(descriptionTimer);
            badgeTimer = window.setTimeout(() => {
              setShowKeywordBadge(true);
            }, 180);
          }
        }, 18);
      }
    }, 24);

    return () => {
      window.clearInterval(headingTimer);

      if (descriptionTimer) {
        window.clearInterval(descriptionTimer);
      }

      if (badgeTimer) {
        window.clearTimeout(badgeTimer);
      }
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setBadgeIndex((current) => (current + 1) % BADGE_KEYWORDS.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!stackCardRef.current) return;

    let hasExited = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (hasExited) {
            setStackAnimationCycle((current) => current + 1);
          }
          return;
        }

        hasExited = true;
      },
      { threshold: 0.35 },
    );

    observer.observe(stackCardRef.current);

    return () => observer.disconnect();
  }, []);

  const headingLines = typedHeading.split("\n");
  const descriptionLines = typedDescription.split("\n");

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 md:py-13"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: gradientOpacity,
          backgroundColor: "#fcfaf4",
          backgroundImage:
            "radial-gradient(circle at top right, rgba(255,255,255,0.72), transparent 28%), linear-gradient(to bottom, rgba(252,250,244,0.98), rgba(255,255,255,0.95)), repeating-linear-gradient(to bottom, transparent 0, transparent 33px, rgba(148,163,184,0.12) 33px, rgba(148,163,184,0.12) 34px), linear-gradient(to right, transparent 0, transparent 76px, rgba(248,113,113,0.2) 76px, rgba(248,113,113,0.2) 78px, transparent 78px)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-18 hidden h-64 transition-opacity duration-300 md:block"
        style={{ opacity: gradientOpacity * 0.45 }}
      >
        <div className="ml-28 h-2 w-72 rounded-full bg-slate-400/10" />
        <div className="mt-4 ml-28 h-2 w-96 rounded-full bg-slate-400/10" />
        <div className="mt-4 ml-28 h-2 w-80 rounded-full bg-slate-400/10" />
        <div className="mt-10 ml-[55%] h-2 w-56 rounded-full bg-slate-400/10" />
        <div className="mt-4 ml-[55%] h-2 w-72 rounded-full bg-slate-400/10" />
        <div className="mt-4 ml-[55%] h-2 w-48 rounded-full bg-slate-400/10" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className="space-y-8">
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className={`h-10 min-w-[16rem] max-w-[20rem] overflow-hidden px-3 text-[11px] transition-all duration-500 md:min-w-[18rem] md:max-w-[22rem] md:px-4 md:text-sm ${
                showKeywordBadge
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-2 opacity-0"
              }`}
            >
              <span
                className="relative block w-full overflow-hidden"
                style={{ height: `${BADGE_ROW_HEIGHT}px` }}
              >
                <span
                  className="absolute inset-x-0 top-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    transform: `translateY(-${badgeIndex * BADGE_ROW_HEIGHT}px)`,
                  }}
                >
                  {BADGE_KEYWORDS.map((keyword) => (
                    <span
                      key={keyword}
                      className="flex items-center whitespace-nowrap leading-none tracking-tight"
                      style={{ height: `${BADGE_ROW_HEIGHT}px` }}
                    >
                      {keyword}
                    </span>
                  ))}
                </span>
              </span>
            </Badge>

            <h1 className="text-4xl leading-snug font-bold tracking-tight md:text-6xl">
              {headingLines[0] ?? ""}
              <br />
              <span className="text-red-600">
                {headingLines[1] ?? ""}
                <br />
                {headingLines[2] ?? ""}
              </span>
            </h1>

            <p className="max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
              {descriptionLines[0] ?? ""}
              <br />
              {descriptionLines[1] ?? ""}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#projects">
                프로젝트 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>

            <Button asChild size="lg" variant="ghost">
              <Link
                href="https://github.com/S2MiniS2"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
                <Github className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" type="button">
              Ask Mini
              <Bot className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div ref={stackCardRef} className="relative">
          <PostitCard
            tone="yellow"
            className="animate__animated animate__jackInTheBox curl-bottom-right rotate-[-1deg] border-none shadow-[0_18px_45px_rgba(120,113,108,0.18)]"
          >
            <CardHeader className="space-y-3 px-0 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                Skills
              </div>
              <CardTitle className="text-2xl">주요 스택</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 px-0 pb-0">
              <div className="space-y-3">
                <div className="rounded-xl border border-black/5 bg-white/90 p-4">
                  <p className="text-sm font-medium">Core</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <TechBadge tech="React" className="skill-tag" />
                    <TechBadge tech="Next.js" className="skill-tag" />
                    <TechBadge tech="TypeScript" className="skill-tag" />
                    <TechBadge tech="JavaScript" className="skill-tag" />
                  </div>
                </div>

                <div className="rounded-xl border border-black/5 bg-white/90 p-4">
                  <p className="text-sm font-medium">Styling</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <TechBadge tech="Tailwind CSS" className="skill-tag" />
                    <TechBadge tech="Styled-Components" className="skill-tag" />
                    <TechBadge tech="CSS" className="skill-tag" />
                    <TechBadge tech="SCSS" className="skill-tag" />
                  </div>
                </div>

                <div className="rounded-xl border border-black/5 bg-white/90 p-4">
                  <p className="text-sm font-medium">State & Data</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <TechBadge tech="React Query" className="skill-tag" />
                  </div>
                </div>

                <div className="rounded-xl border border-black/5 bg-white/90 p-4">
                  <p className="text-sm font-medium">Tools</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <TechBadge tech="Figma" className="skill-tag" />
                    <TechBadge tech="Photoshop" className="skill-tag" />
                    <TechBadge tech="Illustrator" className="skill-tag" />
                    <TechBadge tech="Premiere Pro" className="skill-tag" />
                  </div>
                </div>
              </div>
            </CardContent>
          </PostitCard>
        </div>
      </div>
    </section>
  );
}
