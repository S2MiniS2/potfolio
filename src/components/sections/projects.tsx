"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Github, X } from "lucide-react";

import ProjectDetailModal from "@/components/sections/project-detail-modal";
import type { ProjectItem } from "@/components/sections/project-types";
import { Button } from "@/components/ui/button";
import { PostitCard } from "@/components/ui/postit-card";
import { TechBadge } from "@/components/ui/tech-badge";
import { cn } from "@/lib/utils";

const postitStyles = [
  { rotate: "rotate-[-1.8deg]", tone: "yellow" as const },
  { rotate: "rotate-[1.5deg]", tone: "blue" as const },
  { rotate: "rotate-[-1.2deg]", tone: "pink" as const },
];

function ProjectQuickImageViewer({
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

const projects: ProjectItem[] = [
  {
    name: "로컬톡 (LocalTalk)",
    description:
      "위치 기반으로 주변 오프라인 이벤트를 탐색하고 저장할 수 있도록 설계한 모바일 지역 행사 플랫폼입니다.",
    summary:
      "LocalTalk은 지역 행사 정보를 한곳에 모아 사용자가 위치 기반으로 주변 오프라인 이벤트를 탐색할 수 있도록 돕는 모바일 플랫폼입니다. 기존에는 SNS, 지자체 홈페이지, 커뮤니티 등 여러 플랫폼에 행사 정보가 분산되어 있어 탐색 시간이 많이 들었고, 이를 줄이기 위해 행사 탐색부터 저장, 관리까지 이어지는 사용자 흐름 중심의 모바일 UI를 설계했습니다.",
    period: "2025.09 - 2025.11",
    role: "프론트엔드 개발",
    contribution: "마이페이지 · 북마크 · 설정 페이지 UI 구현",
    tech: [
      "React Native (Expo)",
      "TypeScript",
      "Emotion",
      "Storybook",
      "Husky + Lint-Staged",
    ],
    github: "https://github.com/local-talk/local-talk-fe",
    primaryActionLabel: "GitHub",
    galleryTitle: "로컬톡 이미지",
    galleryImages: [
      "/projects/local-talk/local1.png",
      "/projects/local-talk/local2.png",
    ],
    highlights: [
      "마이페이지 UI 설계 및 개발",
      "북마크 기능 UI 구현",
      "공용 UI 컴포넌트 시스템 구축",
      "설정(Policy) 페이지 구현",
    ],
    features: [
      {
        title: "마이페이지 UI 설계 및 개발",
        items: [
          "프로필 이미지, 닉네임, 활동 지역이 보이는 개인 관리 화면 구현",
          "북마크 행사 목록, 방문 내역, 설정 페이지 이동 메뉴 구성",
          "사용자 주요 기능 접근을 마이페이지 중심으로 단일화",
        ],
      },
      {
        title: "북마크 기능 UI 구현",
        items: [
          "행사 상세 페이지 북마크 버튼 컴포넌트 구현",
          "북마크 목록 페이지 UI 설계",
          "북마크된 행사 리스트 UI 구성",
          "반복적인 행사 검색을 줄이는 북마크 기반 개인 행사 관리 구조 설계",
        ],
      },
      {
        title: "공용 UI 컴포넌트 시스템 구축",
        items: [
          "Typography 시스템, Color Token, 버튼과 아이콘 스타일 정리",
          "공통 컴포넌트 분리 및 Storybook 기반 문서화",
          "UI 일관성 유지와 재사용성 향상",
        ],
      },
      {
        title: "설정(Policy) 페이지 구현",
        items: [
          "이용약관 페이지 구현",
          "개인정보 처리방침 페이지 구현",
          "모바일 환경에 맞는 스크롤 구조 적용",
        ],
      },
    ],
    problem:
      "지역 행사 정보는 SNS, 지자체 홈페이지, 커뮤니티 등 여러 채널에 분산되어 있어 사용자가 참여 가능한 행사를 찾기 어렵다는 문제가 있었습니다. 사용자 인터뷰에서도 행사를 찾는 과정이 번거롭다는 의견이 반복적으로 나타났습니다.",
    approach: [
      "위치 기반 행사 탐색",
      "북마크 기반 행사 관리",
      "마이페이지 중심 사용자 활동 관리",
      "행사 탐색 → 행사 상세 → 북마크 저장 → 마이페이지 관리 흐름으로 MVP 정의",
    ],
    collaboration:
      "초기 프로젝트는 기획, 디자인, 백엔드, 프론트엔드 팀으로 진행되었습니다. 하지만 행사 데이터를 자동으로 수집하기 위한 크롤링 시스템 구현 과정에서 비용과 기술적 난관이 발생했고 일부 팀원이 이탈하면서 프로젝트 방향을 재정의해야 했습니다. 자동 데이터 수집 대신 수동 등록 구조로 전환하고 서비스 지속 가능성을 고려한 기능 우선순위를 설정했습니다.",
    learnings: [
      "React Native 기반 모바일 UI 설계 경험",
      "Storybook을 활용한 UI 컴포넌트 관리 경험",
      "Husky 적용을 통한 프론트엔드 개발 프로세스 개선",
      "데이터 수급과 기술 비용이 제품 구조에 미치는 영향 이해",
      "기능 개발 이전에 데이터 구조와 수집 가능성을 먼저 검증하는 방식으로 접근하게 됨",
    ],
  },
  {
    name: "잡초년생 (Job 초년생 매칭 플랫폼)",
    description:
      "사회 초년생과 강소기업을 연결하는 직무 기반 일자리 매칭 플랫폼입니다.",
    summary:
      "잡초년생(Job + 초년생)은 사회 초년생과 강소기업을 연결하는 일자리 매칭 플랫폼입니다. 기존 공공 채용 플랫폼은 정보가 많지만 구조가 복잡해 구직자가 원하는 정보를 찾기까지 탐색 과정이 길었고, 이를 해결하기 위해 직무 기반 추천과 챗봇 기반 정보 탐색 구조를 중심으로 서비스를 설계했습니다.",
    period: "2024.05 - 2024.07",
    role: "웹사이트 기획 총괄 · UI/UX 디자인 · 프론트엔드 개발",
    contribution: "회원가입 · 인증 · 채용 탐색 · 마이페이지 · 챗봇 정보 탐색 UI 구현",
    tech: [
      "React",
      "JavaScript",
      "Figma",
      "Chatbase",
      "OCR API + OpenAI API",
    ],
    primaryActionLabel: "이미지 보기",
    notion: "https://www.notion.so/ed4b31f930c74a82b7d63d4d1d406aba",
    galleryTitle: "잡초년생 이미지",
    galleryImages: [
      "/projects/job/job1.png",
      "/projects/job/job2.png",
      "/projects/job/job3.png",
      "/projects/job/job4.png",
      "/projects/job/job5.png",
      "/projects/job/job6.png",
      "/projects/job/job7.png",
    ],
    highlights: [
      "회원가입 및 인증 기능",
      "채용 정보 탐색 UI",
      "회원 유형별 마이페이지 기능",
      "챗봇 기반 정보 탐색",
    ],
    features: [
      {
        title: "회원가입 및 인증 기능",
        items: [
          "일반회원과 기업회원 가입 구조 설계",
          "회원 유형별 입력 정보 분리",
          "이메일 인증 코드 발송 기능 반영",
          "명함 OCR 인증을 통한 기업 정보 검증 구조 설계",
        ],
      },
      {
        title: "채용 정보 탐색 UI",
        items: [
          "직무별 채용 리스트 UI 구현",
          "지역 기반 필터링 구조 구현",
          "기업 상세 페이지 구성",
          "채용 직무, 기업 소개, 복지 정보, 고용지원금 지원 여부 제공",
        ],
      },
      {
        title: "마이페이지 기능",
        items: [
          "일반회원용 지원 기업 리스트, 자기소개서 관리, 즐겨찾기 기업 기능 제공",
          "기업회원용 지원자 리스트 확인, 지원자 메시지 전송, 기업 정보 수정 기능 제공",
          "회원 유형에 따라 다른 화면과 동선 설계",
        ],
      },
      {
        title: "챗봇 기반 정보 탐색",
        items: [
          "Chatbase 기반 질문형 정보 탐색 UI 구현",
          "직무 전망, 취업 준비, 자기계발 정보 제공 구조 설계",
          "복잡한 메뉴 탐색 없이 질문 한 번으로 필요한 정보에 접근하도록 UX 구성",
        ],
      },
    ],
    problem:
      "기존 채용 플랫폼은 정보량이 많지만 구조가 복잡해 사용자가 원하는 정보를 찾기까지 탐색 단계가 길다는 문제가 있었습니다. 특히 공공 플랫폼에서는 메뉴 구조가 복잡하고 정보 접근성이 낮으며 개인화 추천이 부족한 UX 문제가 존재했습니다.",
    approach: [
      "챗봇 기반 정보 탐색",
      "직무 기반 맞춤 추천",
      "단순한 UI 구조",
      "회원가입 → 관심 직무 설정 → 추천 기업 리스트 제공 → 기업 상세 확인 → 지원 흐름 설계",
    ],
    collaboration:
      "프로젝트 초기에는 커뮤니티 기능도 포함되어 있었지만 초기 데이터 확보가 어렵다는 문제를 발견했고, 이를 해결하기 위해 커뮤니티 기능을 제거하고 핵심 기능 중심의 MVP로 방향을 조정했습니다. 이 과정에서 기능 우선순위 설정, 서비스 지속 가능성 고려, 데이터 기반 기능 설계의 중요성을 경험했습니다.",
    learnings: [
      "React 기반 웹 서비스 UI 구현 경험",
      "챗봇 기반 정보 탐색 UX 설계 경험",
      "OCR + AI API를 활용한 인증 기능 기획 경험",
      "MVP 중심 서비스 설계 경험",
      "초기 서비스에서는 데이터 확보와 운영 비용을 고려한 기능 설계가 중요하다는 점을 학습",
    ],
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [quickGalleryProject, setQuickGalleryProject] = useState<ProjectItem | null>(
    null,
  );
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.18);
  const [markerVisible, setMarkerVisible] = useState(false);
  const [markerDirection, setMarkerDirection] = useState<"from-left" | "from-right">(
    "from-left",
  );
  const [markerAnimationClass, setMarkerAnimationClass] = useState<
    "animate-left" | "animate-right" | ""
  >("");
  const sectionRef = useRef<HTMLElement | null>(null);
  const lastScrollYRef = useRef(0);
  const wasInViewRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const visibleRatio = Math.min(
        1,
        Math.max(0, (viewportHeight - rect.top) / (viewportHeight * 0.9)),
      );
      const fadeOutRatio = Math.min(
        1,
        Math.max(0, rect.bottom / (viewportHeight * 0.95)),
      );
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
      setBackgroundOpacity(visibleRatio * fadeOutRatio * 0.8);
    };

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="relative flex min-h-screen items-center overflow-hidden px-6 py-8 md:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: backgroundOpacity,
            backgroundImage: [
              "linear-gradient(to right, transparent 0, transparent 76px, rgba(248,113,113,0.14) 76px, rgba(248,113,113,0.14) 78px, transparent 78px)",
              "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, rgba(248,113,113,0.08) 31px, rgba(248,113,113,0.08) 32px)",
            ].join(", "),
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl space-y-16">
          <div className="space-y-4">
            <p className="text-sm font-medium text-muted-foreground">Projects</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              <span
                className={cn(
                  "marker-pink-sweep",
                  markerDirection,
                  markerAnimationClass,
                  markerVisible && "is-visible",
                )}
              >
                주요 프로젝트
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((project, index) => {
              const style = postitStyles[index % postitStyles.length];

              return (
                <PostitCard
                  key={project.name}
                  tone={style.tone}
                  className={cn(
                    "bob-hover h-full rounded-[2rem] p-0 transition-transform duration-300",
                    style.rotate,
                  )}
                  contentClassName="h-full"
                >
                  <div className="flex h-full flex-col gap-6 p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">
                          PROJECT {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold">{project.name}</h3>
                        <p className="text-sm leading-6 text-muted-foreground">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <TechBadge key={tech} tech={tech} className="skill-tag" />
                        ))}
                      </div>
                    </div>

                    <div className="memo-panel space-y-5 py-5">
                      <div className="space-y-2">
                        <p className="marker-highlight inline-block text-sm font-bold">
                          주요 기능
                        </p>
                        <ul className="space-y-2 text-sm text-foreground/75">
                          {project.highlights.map((highlight) => (
                            <li key={highlight} className="flex gap-2">
                              <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-red-300" />
                              <span className="font-medium">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-auto flex flex-wrap gap-3">
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => setSelectedProject(project)}
                      >
                        자세히 보기
                      </Button>

                      {project.github ? (
                        <Button asChild variant="outline" size="sm">
                          <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {project.primaryActionLabel ?? "GitHub"}
                            <Github className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setQuickGalleryProject(project)}
                        >
                          {project.primaryActionLabel ?? "이미지 보기"}
                        </Button>
                      )}
                    </div>
                  </div>
                </PostitCard>
              );
            })}
          </div>
        </div>
      </section>

      <ProjectDetailModal
        project={selectedProject}
        open={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
      <ProjectQuickImageViewer
        images={quickGalleryProject?.galleryImages ?? []}
        open={quickGalleryProject !== null}
        initialIndex={0}
        onClose={() => setQuickGalleryProject(null)}
      />
    </>
  );
}
