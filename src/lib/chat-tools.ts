import { portfolio } from "@/data/portfolio";

type PortfolioProject = (typeof portfolio.projects)[number];
type PortfolioExperience = (typeof portfolio.experience)[number];

const CONTACT = {
  email: "sohe0409@gmail.com",
  github: "https://github.com/S2MniS2",
  linkedin: "https://www.linkedin.com/in/%EB%AF%BC%ED%9D%AC-%EB%B0%95-586a3639a/",
};

function normalizeText(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function includesAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(normalizeText(keyword)));
}

function formatList(items: string[]) {
  return items.join(", ");
}

export function getUniqueTechs() {
  return [...new Set(portfolio.projects.flatMap((project) => project.tech))];
}

export function getContactSummary() {
  return [
    `연락은 이메일 ${CONTACT.email}로 가장 빠르게 닿습니다.`,
    `추가로 GitHub(${CONTACT.github})와 LinkedIn(${CONTACT.linkedin})에서도 활동 내용을 확인할 수 있습니다.`,
    "포트폴리오 하단 Contact 섹션에서도 바로 연결됩니다.",
  ].join(" ");
}

export function getSkillSummary() {
  const projectTechs = getUniqueTechs();
  const experienceTechs = [
    ...new Set(portfolio.experience.flatMap((item) => item.tech ?? [])),
  ];

  return [
    `${portfolio.profile.name}님의 주요 기술 스택은 ${formatList(projectTechs)}입니다.`,
    `실무와 인턴 경험에서는 ${formatList(experienceTechs)}를 활용했습니다.`,
    "특히 React와 Next.js 기반 UI 구현, 관리자 화면 설계, 사용자 흐름을 고려한 프론트엔드 작업을 강점으로 보여줍니다.",
  ].join(" ");
}

export function getProjectOverview() {
  return [
    portfolio.projects
      .map(
        (project) =>
          `${project.name}는 ${project.description} 이 프로젝트에서 ${project.role} 역할을 맡았고, ${formatList(project.tech)}를 사용했습니다.`,
      )
      .join(" "),
    "원하시면 특정 기술이나 역할 기준으로 더 잘 맞는 프로젝트도 골라드릴 수 있습니다.",
  ].join(" ");
}

export function getExperienceSummary() {
  return [
    portfolio.experience
      .map(
        (item) =>
          `${item.company}에서 ${item.role}로 일하며 ${item.summary}`,
      )
      .join(" "),
    "각 경험 모두 단순 구현보다 실제 서비스 흐름과 관리자 UX 개선에 가까운 작업이 많다는 점이 특징입니다.",
  ].join(" ");
}

export function getIntroSummary() {
  return [
    `${portfolio.profile.name}는 ${portfolio.profile.role}이며, ${portfolio.profile.intro}`,
    "포트폴리오 전반에서는 사용자 중심 인터페이스, 협업을 고려한 화면 설계, 그리고 서비스 맥락을 이해한 프론트엔드 구현 역량이 잘 드러납니다.",
  ].join(" ");
}

export function getSelfIntroSummary() {
  return [
    `${portfolio.profile.name}는 ${portfolio.profile.role}이며, ${portfolio.profile.intro}`,
    "특히 React와 Next.js 기반 UI 구현, 사용자 중심 인터페이스 설계, 그리고 서비스 맥락을 이해한 프론트엔드 개발 경험을 강점으로 보여줄 수 있습니다.",
    "프로젝트 전체 흐름을 함께 보면서 화면을 구현하는 개발자라는 점이 1분 자기소개에서 잘 드러납니다.",
  ].join(" ");
}

export function getCollaborationSummary() {
  return [
    portfolio.experience
      .map((item) => `${item.company}에서는 ${item.collaboration}`)
      .join(" "),
    "즉, 혼자 구현만 하는 스타일보다 리뷰와 작업 흐름 안에서 안정적으로 협업하는 타입에 가깝다고 볼 수 있습니다.",
  ].join(" ");
}

export function getStrengthSummary() {
  return [
    "강점은 사용자 흐름을 고려한 UI 설계, 프로젝트 맥락을 이해한 화면 구현, 그리고 협업 과정에서 필요한 구조 정리에 있습니다.",
    "포트폴리오 전반에서 프론트엔드 구현뿐 아니라 기획, UI/UX 설계, 관리자 기능 개선까지 폭넓게 참여한 경험이 드러납니다.",
    "그래서 단순히 화면을 만드는 역할보다 서비스 관점까지 함께 보는 프론트엔드 개발자로 소개하기 좋습니다.",
  ].join(" ");
}

export function recommendProjects(message: string) {
  const normalizedMessage = normalizeText(message);

  const scored = portfolio.projects
    .map((project) => {
      let score = 0;

      if (normalizedMessage.includes(normalizeText(project.name))) {
        score += 5;
      }

      if (normalizedMessage.includes(normalizeText(project.role))) {
        score += 3;
      }

      if (normalizedMessage.includes(normalizeText(project.description))) {
        score += 2;
      }

      for (const tech of project.tech) {
        if (normalizedMessage.includes(normalizeText(tech))) {
          score += 3;
        }
      }

      for (const highlight of project.highlights ?? []) {
        if (includesAny(normalizedMessage, highlight.split(/[,.·]/))) {
          score += 1;
        }
      }

      return { project, score };
    })
    .sort((a, b) => b.score - a.score);

  const matched = scored
    .filter(({ score }) => score > 0)
    .map(({ project }) => project);

  return matched.length > 0 ? matched.slice(0, 2) : portfolio.projects.slice(0, 2);
}

export function findRelevantExperience(message: string): PortfolioExperience[] {
  const normalizedMessage = normalizeText(message);

  const matches = portfolio.experience.filter((item) => {
    const haystack = normalizeText(
      [
        item.company,
        item.role,
        item.summary,
        item.description,
        item.collaboration,
        ...(item.highlights ?? []),
        ...(item.tech ?? []),
      ].join(" "),
    );

    return normalizedMessage
      .split(" ")
      .some((keyword) => keyword.length > 1 && haystack.includes(keyword));
  });

  return matches.length > 0 ? matches : portfolio.experience;
}

export function getExperienceAnswer(message: string) {
  const items = findRelevantExperience(message).slice(0, 2);

  return [
    items
      .map(
        (item) =>
          `${item.company}에서 ${item.role}로 근무하며 ${item.summary} 주요 작업으로는 ${item.highlights.slice(0, 3).join(", ")} 등이 있습니다.`,
      )
      .join(" "),
    "원하시면 이 경험을 바탕으로 자기소개용 답변이나 면접용 요약 문장으로도 정리해드릴 수 있습니다.",
  ].join(" ");
}

export function getRecommendationAnswer(message: string) {
  const projects = recommendProjects(message);
  const lead = projects[0];

  return {
    reply: [
      `${lead.name}부터 살펴보시면 좋습니다.`,
      "질문과 가장 가까운 프로젝트를 아래에 함께 정리해두었습니다.",
      "원하시면 이 중에서 React 역량, 협업 경험, 기획 참여처럼 특정 관점으로 다시 추려드릴 수도 있습니다.",
    ].join(" "),
    projects,
  };
}

export function getFallbackAnswer() {
  return [
    "이 포트폴리오를 기준으로 답변드릴게요.",
    `${portfolio.profile.name}는 ${portfolio.profile.role}로, ${portfolio.profile.intro}`,
    "기술 스택, 프로젝트 추천, 인턴 경험, 협업 방식, 자기소개 요약, 연락 방법처럼 물어보시면 더 구체적으로 안내할 수 있습니다.",
  ].join(" ");
}

export function getAnswerByMessage(message: string) {
  const normalizedMessage = normalizeText(message);

  if (
    includesAny(normalizedMessage, [
      "연락",
      "contact",
      "이메일",
      "메일",
      "github",
      "linkedin",
      "깃허브",
      "링크드인",
    ])
  ) {
    return { type: "text" as const, reply: getContactSummary() };
  }

  if (
    includesAny(normalizedMessage, [
      "프로필",
      "profile",
      "누구",
      "어떤 개발자",
      "소개",
    ])
  ) {
    return { type: "text" as const, reply: getIntroSummary() };
  }

  if (includesAny(normalizedMessage, ["협업", "코드리뷰", "mr", "jira", "소통"])) {
    return { type: "text" as const, reply: getCollaborationSummary() };
  }

  if (includesAny(normalizedMessage, ["강점", "장점", "차별점", "잘하는"])) {
    return { type: "text" as const, reply: getStrengthSummary() };
  }

  return { type: "text" as const, reply: getFallbackAnswer() };
}

export function getProjectCardDescription(project: PortfolioProject) {
  const highlight = project.highlights?.[0];

  return highlight
    ? `${project.description} ${highlight}`
    : project.description;
}
