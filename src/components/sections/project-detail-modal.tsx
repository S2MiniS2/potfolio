"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink, Github, X } from "lucide-react";

import type { ProjectItem } from "@/components/sections/project-types";
import { Button } from "@/components/ui/button";
import { PostitCard } from "@/components/ui/postit-card";
import { TechBadge } from "@/components/ui/tech-badge";

type ProjectDetailModalProps = {
  project: ProjectItem | null;
  open: boolean;
  onClose: () => void;
};

function ProjectImageViewer({
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
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 px-4 py-6"
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        className="relative flex max-h-full w-full max-w-6xl items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`Project gallery ${currentIndex + 1}`}
          className="max-h-[88vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
        />

        <div className="absolute top-4 right-4 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-[71] rounded-full bg-white/12 p-3 text-white backdrop-blur transition hover:bg-white/20"
        aria-label="Close image viewer"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}

export default function ProjectDetailModal({
  project,
  open,
  onClose,
}: ProjectDetailModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

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
    if (!project) return [];

    return [
      { id: "overview", label: "개요" },
      { id: "summary", label: "소개" },
      { id: "features", label: "기능" },
      { id: "problem", label: "문제 정의" },
      { id: "approach", label: "해결 접근" },
      { id: "collaboration", label: "협업" },
      { id: "learnings", label: "회고" },
      { id: "gallery", label: "이미지" },
      { id: "links", label: "링크" },
    ];
  }, [project]);

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

  if (!open || !project) return null;

  const galleryImages = project.galleryImages ?? [];

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-8"
        onClick={onClose}
        aria-hidden="true"
      >
        <PostitCard
          tone="yellow"
          className="my-6 w-full max-w-3xl rounded-3xl p-0 shadow-2xl"
          contentClassName=""
        >
          <div
            className="relative"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
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
                  Project Detail
                </p>
                <h3 id="project-detail-title" className="text-2xl font-bold">
                  {project.name}
                </h3>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={onClose}
                aria-label="Close project detail modal"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="border-b border-red-300/30 px-6 py-4">
              <div className="flex flex-wrap gap-3">
                {tocSections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    className="toc-marker rounded-full px-3 py-1.5 text-center text-xs font-bold text-foreground transition hover:-translate-y-0.5"
                    onClick={() => scrollToSection(section.id)}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>

            <div
              ref={scrollContainerRef}
              className="no-scrollbar max-h-[78vh] space-y-6 overflow-y-auto px-6 pt-8 pb-12"
            >
              <div data-section="overview" className="grid gap-4 md:grid-cols-2">
                <div className="memo-panel space-y-3">
                  <p className="marker-highlight inline-block text-sm font-bold">
                    기간
                  </p>
                  <p className="text-sm font-medium">{project.period}</p>
                  <p className="marker-highlight inline-block text-sm font-bold">
                    역할
                  </p>
                  <p className="text-sm font-medium">{project.role}</p>
                </div>

                <div className="memo-panel space-y-3">
                  <p className="marker-highlight inline-block text-sm font-bold">
                    기여도
                  </p>
                  <p className="text-sm font-medium">{project.contribution}</p>
                </div>
              </div>

              <div data-section="summary" className="memo-panel space-y-3">
                <p className="marker-highlight inline-block text-sm font-bold">
                  프로젝트 소개
                </p>
                <p className="text-sm leading-7 font-medium text-foreground/80">
                  {project.summary}
                </p>
              </div>

              <div className="memo-panel space-y-3">
                <p className="marker-highlight inline-block text-sm font-bold">
                  사용 기술
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <TechBadge key={tech} tech={tech} className="skill-tag" />
                  ))}
                </div>
              </div>

              <div data-section="features" className="memo-panel space-y-4">
                <p className="marker-highlight inline-block text-sm font-bold">
                  담당 기능
                </p>
                <div className="space-y-4">
                  {project.features.map((feature) => (
                    <div key={feature.title} className="detail-note-card space-y-3">
                      <p className="marker-blue inline-block text-sm font-bold text-slate-500">
                        {feature.title}
                      </p>
                      <ul className="space-y-2 text-sm text-foreground/80">
                        {feature.items.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-red-300" />
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div data-section="problem" className="memo-panel space-y-3">
                <p className="marker-highlight inline-block text-sm font-bold">
                  문제 정의
                </p>
                <p className="text-sm leading-7 font-medium text-foreground/80">
                  {project.problem}
                </p>
              </div>

              <div data-section="approach" className="memo-panel space-y-3">
                <p className="marker-highlight inline-block text-sm font-bold">
                  해결 접근
                </p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  {project.approach.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-red-300" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div data-section="collaboration" className="memo-panel space-y-3">
                <p className="marker-highlight inline-block text-sm font-bold">
                  협업 및 의사결정
                </p>
                <p className="text-sm leading-7 font-medium text-foreground/80">
                  {project.collaboration}
                </p>
              </div>

              <div data-section="learnings" className="memo-panel space-y-3">
                <p className="marker-highlight inline-block text-sm font-bold">
                  회고
                </p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  {project.learnings.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-red-300" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div data-section="gallery" className="memo-panel space-y-4">
                <p className="marker-highlight inline-block text-sm font-bold">
                  {project.galleryTitle ?? "이미지 모음"}
                </p>
                {galleryImages.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {galleryImages.map((image, index) => (
                      <button
                        key={image}
                        type="button"
                        onClick={() => {
                          setViewerIndex(index);
                          setViewerOpen(true);
                        }}
                        className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white/70 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                      >
                        <img
                          src={image}
                          alt={`${project.name} gallery ${index + 1}`}
                          className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                        />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-red-200 bg-white/75 px-4 py-8 text-center text-sm font-medium text-muted-foreground">
                    이미지 파일을 추가하면 이곳에 갤러리로 보여드릴 수 있어요.
                  </div>
                )}
              </div>

              <div data-section="links" className="memo-panel flex flex-wrap items-center gap-4">
                <p className="marker-highlight inline-block text-sm font-bold">
                  프로젝트 링크
                </p>
                {project.github ? (
                  <Button asChild variant="outline" size="sm">
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                      <Github className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : null}
                {project.notion ? (
                  <Button asChild variant="outline" size="sm">
                    <Link
                      href={project.notion}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Notion 문서
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : null}
                {!project.github && galleryImages.length > 0 ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setViewerIndex(0);
                      setViewerOpen(true);
                    }}
                  >
                    이미지 보기
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </PostitCard>
      </div>

      <ProjectImageViewer
        images={galleryImages}
        open={viewerOpen}
        initialIndex={viewerIndex}
        onClose={() => setViewerOpen(false)}
      />
    </>
  );
}
