import { NextResponse } from "next/server";

import { detectIntent } from "@/lib/agent-router";
import {
  getAnswerByMessage,
  getExperienceAnswer,
  getExperienceSummary,
  getFallbackAnswer,
  getIntroSummary,
  getProjectOverview,
  getRecommendationAnswer,
  getSelfIntroSummary,
  getSkillSummary,
} from "@/lib/chat-tools";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { type: "text", reply: "질문이 비어 있습니다. 기술 스택, 프로젝트, 프로필, 연락 방법처럼 편하게 물어봐 주세요." },
        { status: 400 },
      );
    }

    const intent = detectIntent(message);

    if (intent === "skills") {
      return NextResponse.json({
        type: "text",
        reply: getSkillSummary(),
      });
    }

    if (intent === "projects") {
      return NextResponse.json({
        type: "text",
        reply: getProjectOverview(),
      });
    }

    if (intent === "experience") {
      return NextResponse.json({
        type: "text",
        reply: getExperienceAnswer(message) || getExperienceSummary(),
      });
    }

    if (intent === "summary") {
      return NextResponse.json({
        type: "text",
        reply: getSelfIntroSummary(),
      });
    }

    if (intent === "intro") {
      return NextResponse.json({
        type: "text",
        reply: getIntroSummary(),
      });
    }

    if (intent === "recommend") {
      const result = getRecommendationAnswer(message);

      return NextResponse.json({
        type: "projects",
        reply: result.reply,
        projects: result.projects,
      });
    }

    const fallback = getAnswerByMessage(message);

    return NextResponse.json({
      type: fallback.type,
      reply: fallback.reply ?? getFallbackAnswer(),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        type: "text",
        reply:
          "답변을 준비하는 중 문제가 생겼습니다. 잠시 후 다시 질문해 주세요. 필요하면 프로필, 프로젝트, 연락 방법부터 다시 안내해드릴게요.",
      },
      { status: 500 },
    );
  }
}
