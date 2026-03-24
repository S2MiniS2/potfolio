import { portfolio } from "@/data/portfolio";

export function getUniqueTechs() {
  return [...new Set(portfolio.projects.flatMap((project) => project.tech))];
}

export function recommendProjects(message: string) {
  const text = message.toLowerCase();

  const matched = portfolio.projects.filter((project) =>
    project.tech.some((tech) => text.includes(tech.toLowerCase())) ||
    text.includes(project.name.toLowerCase())
  );

  return matched.length > 0 ? matched : [portfolio.projects[0]];
}

export function getExperienceSummary() {
  return portfolio.experience
    .map(
      (item) =>
        `${item.company}에서 ${item.role}로 일하며 ${item.description}`
    )
    .join(" ");
}

export function getIntroSummary() {
  return `안녕하세요. ${portfolio.profile.name}는 ${portfolio.profile.role}이며, ${portfolio.profile.intro}`;
}