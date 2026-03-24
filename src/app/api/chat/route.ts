import { NextResponse } from "next/server";

import { detectIntent } from "@/lib/agent-router";
import {
  getExperienceSummary,
  getIntroSummary,
  getUniqueTechs,
  recommendProjects,
} from "@/lib/chat-tools";
import { portfolio } from "@/data/portfolio";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { reply: "질문이 비어 있습니다." },
        { status: 400 }
      );
    }

    const intent = detectIntent(message);

    if (intent === "skills") {
      return NextResponse.json({
        type: "text",
        reply: `주요 기술 스택은 ${getUniqueTechs().join(", ")} 입니다.`,
      });
    }

    if (intent === "projects") {
      return NextResponse.json({
        type: "text",
        reply: `대표 프로젝트로는 ${portfolio.projects
          .map((project) => project.name)
          .join(", ")}가 있습니다.`,
      });
    }

    if (intent === "experience") {
      return NextResponse.json({
        type: "text",
        reply: getExperienceSummary(),
      });
    }

    if (intent === "intro" || intent === "summary") {
      return NextResponse.json({
        type: "text",
        reply: getIntroSummary(),
      });
    }

    if (intent === "recommend") {
      const projects = recommendProjects(message);

      return NextResponse.json({
        type: "projects",
        reply: "질문과 가장 관련 있는 프로젝트입니다.",
        projects,
      });
    }

    return NextResponse.json({
      type: "text",
      reply:
        "포트폴리오 기반으로 기술 스택, 프로젝트 추천, 인턴 경험, 자기소개를 도와줄 수 있습니다.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { type: "text", reply: "응답 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}