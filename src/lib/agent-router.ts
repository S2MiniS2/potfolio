export type ChatIntent =
  | "skills"
  | "projects"
  | "experience"
  | "intro"
  | "recommend"
  | "summary"
  | "unknown";

function includesAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

export function detectIntent(message: string): ChatIntent {
  const text = message.toLowerCase();

  if (
    includesAny(text, [
      "추천",
      "추천해",
      "보여줘",
      "어떤 프로젝트",
      "대표 프로젝트",
      "project recommendation",
    ])
  ) {
    return "recommend";
  }

  if (includesAny(text, ["기술", "기술 스택", "스택", "skill", "stack", "tech"])) {
    return "skills";
  }

  if (includesAny(text, ["프로젝트", "project"])) {
    return "projects";
  }

  if (includesAny(text, ["경험", "인턴", "실무", "회사", "experience"])) {
    return "experience";
  }

  if (includesAny(text, ["자기소개", "1분 자기소개", "요약", "summary"])) {
    return "summary";
  }

  if (includesAny(text, ["소개", "about", "누구", "어떤 개발자"])) {
    return "intro";
  }

  return "unknown";
}
