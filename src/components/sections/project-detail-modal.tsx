"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ExternalLink, Github, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ProjectDetailModalProps = {
  project: {
    name: string;
    description: string;
    role: string;
    tech: string[];
    highlights: string[];
    github?: string;
    demo?: string;
  } | null;
  open: boolean;
  onClose: () => void;
};

export default function ProjectDetailModal({
  project,
  open,
  onClose,
}: ProjectDetailModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open || !project) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8"
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-border bg-background shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
      >
        <div className="flex items-start justify-between border-b border-border/60 px-6 py-5">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Project Detail
            </p>
            <h3 id="project-detail-title" className="text-2xl font-semibold">
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

        <div className="max-h-[75vh] space-y-6 overflow-y-auto px-6 py-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold">프로젝트 설명</p>
            <p className="text-sm leading-6 text-muted-foreground">
              {project.description}
            </p>
          </div>


          <div className="space-y-3">
            <p className="text-sm font-semibold">기술 스택</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
           <div className="space-y-3">
            <p className="text-sm font-semibold">주요 기능</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-foreground/70" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">결과</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

         
        </div>

        <div className="flex gap-3 border-t border-border/60 px-6 py-5">
          {project.demo && (
            <Button asChild size="sm">
              <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                데모 보기
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}

          {project.github && (
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
          )}
        </div>
      </div>
    </div>
  );
}
