"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Sparkles,
  X,
} from "lucide-react";

import { portfolio } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PostitCard } from "@/components/ui/postit-card";
import { TechBadge } from "@/components/ui/tech-badge";
import { cn } from "@/lib/utils";

type ExperienceItem = (typeof portfolio.experience)[number];

const postitStyles = [
  { rotate: "rotate-[-1.8deg]", tone: "yellow" as const },
  { rotate: "rotate-[1.6deg]", tone: "blue" as const },
  { rotate: "rotate-[-1.2deg]", tone: "pink" as const },
];

function ExperienceImageViewer({
  images,
  open,
  initialIndex,
  onClose,
}: {
  images: string[];
  open: boolean;
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (!open) return;
    setCurrentIndex(initialIndex);
  }, [initialIndex, open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") {
        setCurrentIndex((index) => (index + 1) % images.length);
      }
      if (event.key === "ArrowLeft") {
        setCurrentIndex((index) => (index - 1 + images.length) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, onClose, open]);

  if (!open || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4 py-6"
      onClick={onClose}
      aria-hidden="true"
    >
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setCurrentIndex((index) => (index - 1 + images.length) % images.length);
        }}
        className="absolute left-4 top-1/2 z-[61] -translate-y-1/2 rounded-full bg-white/12 p-3 text-white backdrop-blur transition hover:bg-white/20"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <div
        className="relative flex max-h-full w-full max-w-6xl items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`Experience gallery ${currentIndex + 1}`}
          className="max-h-[88vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
        />

        <div className="absolute top-4 right-4 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setCurrentIndex((index) => (index + 1) % images.length);
        }}
        className="absolute right-4 top-1/2 z-[61] -translate-y-1/2 rounded-full bg-white/12 p-3 text-white backdrop-blur transition hover:bg-white/20"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-[61] rounded-full bg-white/12 p-3 text-white backdrop-blur transition hover:bg-white/20"
        aria-label="Close image viewer"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}

function ExperienceDetailModal({
  experience,
  open,
  onClose,
  toneIndex,
}: {
  experience: ExperienceItem | null;
  open: boolean;
  onClose: () => void;
  toneIndex: number;
}) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const tone = postitStyles[toneIndex % postitStyles.length];

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !viewerOpen) onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open, viewerOpen]);

  const tocSections = useMemo(() => {
    if (!experience) return [];

    return [
      experience.period ? { id: "overview", label: "개요" } : null,
      experience.summary || experience.description
        ? { id: "summary", label: "요약" }
        : null,
      "collaboration" in experience && experience.collaboration
        ? { id: "collaboration", label: "협업" }
        : null,
      experience.highlights?.length ? { id: "highlights", label: "주요 업무" } : null,
      "details" in experience && experience.details?.length
        ? { id: "details", label: "상세 기여" }
        : null,
      "learnings" in experience && experience.learnings?.length
        ? { id: "learnings", label: "배운 점" }
        : null,
      "github" in experience && experience.github
        ? { id: "github", label: "GitHub" }
        : null,
      "galleryGroups" in experience && experience.galleryGroups?.length
        ? { id: "gallery", label: "이미지" }
        : null,
    ].filter(Boolean) as { id: string; label: string }[];
  }, [experience]);

  const scrollToSection = (sectionId: string) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const target = container.querySelector<HTMLElement>(
      `[data-section="${sectionId}"]`,
    );
    if (!target) return;

    container.scrollTo({
      top: target.offsetTop - container.offsetTop,
      behavior: "smooth",
    });
  };

  if (!open || !experience) return null;

  const galleryGroups =
    "galleryGroups" in experience && experience.galleryGroups
      ? experience.galleryGroups
      : [];
  const gallery = galleryGroups.flatMap((group) => group.images);
  const github = "github" in experience ? experience.github : undefined;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-8"
        onClick={onClose}
        aria-hidden="true"
      >
      <PostitCard
        tone={tone.tone}
        className="my-6 w-full max-w-3xl rounded-3xl p-0 shadow-2xl"
        contentClassName=""
      >
          <div
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-detail-title"
            className="relative"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-5 right-18 text-lg text-red-400/85"
            >
              *
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-20 right-10 text-xs font-semibold tracking-[0.3em] text-sky-500/60"
            >
              memo
            </span>

            <div className="flex items-start justify-between border-b border-red-300/40 px-6 py-5">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground">
                  Experience Detail
                </p>
                <h3 id="experience-detail-title" className="text-2xl font-bold">
                  {experience.role}
                </h3>
                <p className="text-sm font-semibold text-muted-foreground">
                  {experience.company}
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={onClose}
                aria-label="Close experience detail modal"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="border-b border-red-300/30 px-6 py-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                {tocSections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className="toc-marker rounded-full px-3 py-1.5 text-center text-xs font-bold text-foreground transition hover:-translate-y-0.5"
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>

            <div
              ref={scrollContainerRef}
              className="no-scrollbar max-h-[72vh] space-y-5 overflow-y-auto px-6 pt-8 pb-12"
              style={{
                boxShadow: "inset 0 -26px 22px -28px rgba(15, 23, 42, 0.16)",
              }}
            >
              {(experience.period || experience.tech?.length) && (
                <section data-section="overview" className="grid gap-6 md:grid-cols-2">
                  {experience.period ? (
                    <div className="memo-panel space-y-3">
                      <p className="marker-highlight inline-block text-sm font-bold">
                        기간
                      </p>
                      <Badge variant="outline" className="w-fit">
                        {experience.period}
                      </Badge>
                      <div className="space-y-1 pt-1">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                          역할
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {experience.role}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div />
                  )}

                  {experience.tech?.length ? (
                    <div className="memo-panel space-y-3">
                      <p className="marker-highlight inline-block text-sm font-bold">
                        기술 스택
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {experience.tech.map((tech) => (
                          <TechBadge key={tech} tech={tech} />
                        ))}
                      </div>
                    </div>
                  ) : null}
                </section>
              )}

              {(experience.summary || experience.description) && (
                <section data-section="summary" className="memo-panel space-y-3">
                  <p className="marker-highlight inline-block text-sm font-bold">
                    요약
                  </p>
                  <p className="text-sm leading-7 font-medium text-muted-foreground">
                    {experience.summary ?? experience.description}
                  </p>
                </section>
              )}

              {"collaboration" in experience && experience.collaboration ? (
                <section data-section="collaboration" className="memo-panel space-y-3">
                  <p className="marker-highlight inline-block text-sm font-bold">
                    협업 방식
                  </p>
                  <p className="text-sm leading-7 font-medium text-muted-foreground">
                    {experience.collaboration}
                  </p>
                </section>
              ) : null}

              {experience.highlights?.length ? (
                <section data-section="highlights" className="memo-panel space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-red-400" />
                    <p className="marker-highlight inline-block text-sm font-bold">
                      주요 업무
                    </p>
                  </div>
                  <ul className="space-y-2 text-sm leading-7 font-medium text-muted-foreground">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-foreground/70" />
                        <span className="scribble-underline">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {"details" in experience && experience.details?.length ? (
                <section
                  data-section="details"
                  className="memo-panel bg-white/82 space-y-4"
                >
                  <p className="marker-highlight inline-block text-sm font-bold">
                    상세 기여
                  </p>
                  <div className="space-y-4">
                    {experience.details.map((detail, index) => (
                      <div
                        key={detail.title}
                        className={cn(
                          "detail-note-card rounded-2xl border border-black/5 bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-md",
                          index % 2 === 0 ? "rotate-[-0.4deg]" : "rotate-[0.35deg]",
                        )}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-red-400">*</span>
                            <h4 className="text-sm font-bold">{detail.title}</h4>
                          </div>

                          <div className="space-y-1">
                            <p className="marker-blue inline-block text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                              Problem
                            </p>
                            <p className="text-sm leading-6 font-medium text-muted-foreground">
                              {detail.problem}
                            </p>
                          </div>

                          <div className="space-y-1">
                            <p className="marker-blue inline-block text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                              Action
                            </p>
                            <ul className="space-y-2 text-sm leading-6 font-medium text-muted-foreground">
                              {detail.actions.map((action) => (
                                <li key={action} className="flex gap-2">
                                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-foreground/70" />
                                  <span>{action}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-1">
                            <p className="marker-blue inline-block text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                              Result
                            </p>
                            <p className="text-sm leading-6 font-medium text-muted-foreground">
                              {detail.outcome}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              {"learnings" in experience && experience.learnings?.length ? (
                <section data-section="learnings" className="memo-panel space-y-3">
                  <p className="marker-highlight inline-block text-sm font-bold">
                    인턴 경험을 통해 배운 점
                  </p>
                  <ul className="space-y-2 text-sm leading-7 font-medium text-muted-foreground">
                    {experience.learnings.map((learning) => (
                      <li key={learning} className="flex gap-2">
                        <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-foreground/70" />
                        <span className="scribble-underline">{learning}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {github ? (
                <section data-section="github" className="memo-panel">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="marker-highlight inline-block text-sm font-bold">
                      GitHub
                    </p>
                    <Button asChild size="sm" variant="outline">
                      <Link href={github} target="_blank" rel="noopener noreferrer">
                        저장소 보기
                        <Github className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </section>
              ) : null}

              {galleryGroups.length > 0 ? (
                <section data-section="gallery" className="memo-panel space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-sky-500" />
                    <p className="marker-highlight inline-block text-sm font-bold">
                      이미지 모음
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {galleryGroups.map((group) => {
                      const groupStartIndex = gallery.findIndex(
                        (image) => image === group.images[0],
                      );

                      return (
                        <div key={group.title} className="space-y-3 rounded-2xl bg-white/60 p-3">
                          <p className="marker-blue inline-block text-sm font-bold text-slate-500">
                            {group.title}
                          </p>
                          <div className="relative h-56 overflow-hidden rounded-2xl">
                            {group.images.slice(0, 5).map((image, index) => (
                              <button
                                key={image}
                                type="button"
                                onClick={() => {
                                  setViewerIndex(groupStartIndex + index);
                                  setViewerOpen(true);
                                }}
                                className="absolute left-1/2 top-1/2 w-32 rounded-2xl bg-white p-2 text-left shadow-md transition duration-300 hover:z-20 hover:-translate-y-1 hover:shadow-xl md:w-36"
                                style={{
                                  transform: `translate(-50%, -50%) rotate(${index * 5 - 10}deg) translateX(${index * 10 - 20}px) translateY(${index % 2 === 0 ? 0 : 6}px)`,
                                }}
                              >
                                <img
                                  src="/pin.PNG"
                                  alt=""
                                  className="pointer-events-none absolute left-1/2 top-1 h-3.5 w-3.5 -translate-x-1/2 object-contain"
                                />
                                <img
                                  src={image}
                                  alt={`${group.title} preview ${index + 1}`}
                                  className="h-36 w-full rounded-xl object-cover md:h-40"
                                />
                              </button>
                            ))}

                            {group.images.length > 5 ? (
                              <button
                                type="button"
                                onClick={() => {
                                  setViewerIndex(groupStartIndex);
                                  setViewerOpen(true);
                                }}
                                className="absolute right-2 bottom-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold shadow"
                              >
                                +{group.images.length - 5} more
                              </button>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </PostitCard>
      </div>

      <ExperienceImageViewer
        images={gallery}
        open={viewerOpen}
        initialIndex={viewerIndex}
        onClose={() => setViewerOpen(false)}
      />
    </>
  );
}

function ExperiencePostitCard({
  item,
  toneIndex,
  onClick,
}: {
  item: ExperienceItem;
  toneIndex: number;
  onClick: () => void;
}) {
  const tone = postitStyles[toneIndex % postitStyles.length];

  return (
    <button type="button" onClick={onClick} className="w-full text-left">
      <PostitCard
        tone={tone.tone}
        className={cn(
          "bob-hover transition duration-300 hover:shadow-[0_24px_48px_rgba(120,113,108,0.2)]",
          tone.rotate,
        )}
        contentClassName="space-y-4"
      >
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {item.company}
          </p>
          <h3 className="text-2xl font-semibold">{item.role}</h3>
          {item.period && (
            <Badge variant="outline" className="w-fit">
              {item.period}
            </Badge>
          )}
        </div>

        {item.description && (
          <p className="line-clamp-3 text-sm leading-6 font-medium text-muted-foreground">
            {item.description}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {item.tech?.slice(0, 4).map((tech) => (
            <TechBadge key={`${item.company}-${item.role}-${tech}`} tech={tech} />
          ))}
        </div>
      </PostitCard>
    </button>
  );
}

export default function Experience() {
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceItem | null>(null);
  const [selectedToneIndex, setSelectedToneIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  const [markerVisible, setMarkerVisible] = useState(false);
  const [markerDirection, setMarkerDirection] = useState<"from-left" | "from-right">(
    "from-left",
  );
  const [markerAnimationClass, setMarkerAnimationClass] = useState<
    "animate-left" | "animate-right" | ""
  >("");
  const lastScrollYRef = useRef(0);
  const wasInViewRef = useRef(false);

  const laneA = portfolio.experience.filter((_, index) => index % 2 === 0);
  const laneBSource = portfolio.experience.filter((_, index) => index % 2 === 1);
  const laneB = laneBSource.length > 0 ? laneBSource : [...portfolio.experience];

  useEffect(() => {
    const updateBackgroundOpacity = () => {
      const section = sectionRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const visibleProgress = 1 - Math.min(Math.max(rect.top / viewportHeight, 0), 1);
      const fadeOutProgress = Math.min(Math.max(rect.bottom / viewportHeight, 0), 1);
      const nextOpacity = Math.max(0, Math.min(1, visibleProgress * fadeOutProgress));
      const currentScrollY = window.scrollY;
      const scrollDirection =
        currentScrollY >= lastScrollYRef.current ? "from-left" : "from-right";
      const isInView =
        rect.top < viewportHeight * 0.72 && rect.bottom > viewportHeight * 0.2;

      setMarkerDirection(scrollDirection);
      lastScrollYRef.current = currentScrollY;
      setMarkerVisible(isInView);
      if (isInView && !wasInViewRef.current) {
        setMarkerAnimationClass(
          scrollDirection === "from-left" ? "animate-left" : "animate-right",
        );
      }
      if (!isInView && wasInViewRef.current) {
        setMarkerAnimationClass("");
      }
      wasInViewRef.current = isInView;
      setBackgroundOpacity(nextOpacity);
    };

    updateBackgroundOpacity();
    window.addEventListener("scroll", updateBackgroundOpacity, { passive: true });
    window.addEventListener("resize", updateBackgroundOpacity);

    return () => {
      window.removeEventListener("scroll", updateBackgroundOpacity);
      window.removeEventListener("resize", updateBackgroundOpacity);
    };
  }, []);

  return (
    <>
      <section
        id="experience"
        ref={sectionRef}
        className="relative overflow-hidden px-6 py-12 md:py-32"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: backgroundOpacity,
            backgroundImage:
              "linear-gradient(to right, transparent 0, transparent 72px, rgba(248,113,113,0.14) 72px, rgba(248,113,113,0.14) 74px, transparent 74px), repeating-linear-gradient(to bottom, transparent 0, transparent 31px, rgba(248,113,113,0.08) 31px, rgba(248,113,113,0.08) 32px)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl space-y-12">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Experience</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              <span
                className={cn(
                  "marker-pink-sweep",
                  markerDirection,
                  markerAnimationClass,
                  markerVisible && "is-visible",
                )}
              >
                경험
              </span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              {laneA.map((item, index) => (
                <ExperiencePostitCard
                  key={`${item.company}-${item.role}`}
                  item={item}
                  toneIndex={index}
                  onClick={() => {
                    setSelectedExperience(item);
                    setSelectedToneIndex(index);
                  }}
                />
              ))}
            </div>

            <div className="space-y-6">
              {laneB.map((item, index) => (
                <ExperiencePostitCard
                  key={`${item.company}-${item.role}-secondary`}
                  item={item}
                  toneIndex={index + 1}
                  onClick={() => {
                    setSelectedExperience(item);
                    setSelectedToneIndex(index + 1);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <ExperienceDetailModal
        experience={selectedExperience}
        open={selectedExperience !== null}
        onClose={() => setSelectedExperience(null)}
        toneIndex={selectedToneIndex}
      />
    </>
  );
}

