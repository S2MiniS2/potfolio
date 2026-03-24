"use client";

import { useState } from "react";
import Link from "next/link";
import { Github } from "lucide-react";

import { portfolio } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProjectDetailModal from "@/components/sections/project-detail-modal";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof portfolio.projects)[number] | null
  >(null);

  return (
    <>
      <section id="projects" className="px-6 py-28 md:py-20">
        <div className="mx-auto max-w-6xl space-y-16">
          <div className="space-y-4">
            <p className="text-sm font-medium text-muted-foreground">Projects</p>

            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              주요 프로젝트
            </h2>

            <p className="max-w-2xl text-muted-foreground">
              최신순으로 정리한 프로젝트입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {portfolio.projects.map((project, index) => (
              <Card
                key={project.name}
                className="group flex h-full flex-col justify-between border-border/60 transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      PROJECT {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <CardTitle className="text-2xl">{project.name}</CardTitle>

                    <p className="text-sm leading-6 text-muted-foreground">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">역할</p>

                    <p className="text-sm text-muted-foreground">
                      {project.role}
                    </p>
                  </div>

                  <div className="space-y-2">
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
                </CardContent>

                <CardFooter className="flex gap-3">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setSelectedProject(project)}
                  >
                    자세히 보기
                  </Button>

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
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ProjectDetailModal
        project={selectedProject}
        open={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
