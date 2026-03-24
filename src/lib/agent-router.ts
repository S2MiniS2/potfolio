export type ChatIntent =
  | "skills"
  | "projects"
  | "experience"
  | "intro"
  | "recommend"
  | "summary"
  | "unknown";

export function detectIntent(message: string): ChatIntent {
  const text = message.toLowerCase();

  if (
    text.includes("추천") ||
    text.includes("보여줘") ||
    text.includes("어떤 프로젝트") ||
    text.includes("대표 프로젝트")
  ) {
    return "recommend";
  }

  if (
    text.includes("기술") ||
    text.includes("스택") ||
    text.includes("skill") ||
    text.includes("stack")
  ) {
    return "skills";
  }

  if (
    text.includes("프로젝트") ||
    text.includes("project")
  ) {
    return "projects";
  }

  if (
    text.includes("인턴") ||
    text.includes("경험") ||
    text.includes("협업")
  ) {
    return "experience";
  }

  if (
    text.includes("자기소개") ||
    text.includes("1분") ||
    text.includes("요약")
  ) {
    return "summary";
  }

  if (
    text.includes("소개") ||
    text.includes("누구") ||
    text.includes("about")
  ) {
    return "intro";
  }

  return "unknown";
}