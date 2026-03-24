export default function About() {
  return (
    <section id="about" className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-4xl space-y-6">
        <p className="text-sm font-medium text-muted-foreground">About</p>

        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          프론트엔드 개발자 소개
        </h2>

        <p className="leading-7 text-muted-foreground">
          React와 Next.js 기반으로 사용자 중심의 인터페이스를 만드는
          프론트엔드 개발자입니다. 최근에는 AI 도구를 활용해 개발 생산성을
          높이고, 서비스에 AI 기능을 자연스럽게 연결하는 방식에 관심이 있습니다.
        </p>

        <p className="leading-7 text-muted-foreground">
          단순히 기능을 구현하는 데서 끝나지 않고, 비즈니스 로직과 사용자 경험을
          함께 고려하는 개발을 지향합니다.
        </p>
      </div>
    </section>
  );
}
