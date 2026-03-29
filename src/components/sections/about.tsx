export default function About() {
  return (
    <section
      id="about"
      className="about-checkerboard relative overflow-hidden px-6 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.75),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,228,230,0.55),transparent_32%)]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="crayon-note mx-auto max-w-4xl p-8 md:p-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xl text-pink-500">*</span>
              <p className="text-sm font-medium text-muted-foreground">About</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                <span className="inline-block rounded-full bg-gradient-to-r from-pink-200/90 to-pink-400/40 px-1">
                  AI를 똑똑하게 활용하는
                </span>
                <br />
                <span className="inline-block border-b-[3px] border-pink-300/80 pb-1">
                  프론트엔드 개발자입니다.
                </span>
              </h2>

              <p className="max-w-3xl text-base leading-8 text-foreground/80">
                React와 Next.js 기반으로 사용자 중심 인터페이스를 만드는
                프론트엔드 개발자입니다. <br />
                최근에는 AI 도구를 개발 생산성에 자연스럽게 녹이고, 서비스
                안에서 AI 기능이 어색하지 않게 연결되는 방식을 고민하고
                있습니다.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="memo-panel space-y-3">
                <p className="marker-highlight inline-block text-sm font-bold">
                  제가 중요하게 보는 것
                </p>
                <p className="text-sm leading-7 font-medium text-foreground/80">
                  단순히 기능을 구현하는 데서 끝나지 않고, 비즈니스 로직과
                  사용자 경험을 함께 고려하는 개발을 지향합니다.
                </p>
                <span className="inline-block border-b-[3px] border-sky-300/80 pb-1 text-sm font-semibold text-sky-700">
                  보기 좋은 것보다 이해하기 쉬운 흐름을 만듭니다.
                </span>
              </div>

              <div className="memo-panel space-y-3">
                <p className="marker-highlight inline-block text-sm font-bold">
                  함께 일할 때의 태도
                </p>
                <p className="text-sm leading-7 font-medium text-foreground/80">
                  솔직하고 빠르게 소통하면서도, 실제로 도움이 되는 방향으로
                  문제를 정리하고 해결하는 방식을 좋아합니다.
                </p>
                <span className="inline-block border-b-[3px] border-sky-300/80 pb-1 text-sm font-semibold text-sky-700">
                  아직 많이 부족하지만 배우는 속도가 빠르고, 새로운 도구와
                  기술을 적극적으로 활용하는 편입니다.
                </span>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-red-100 bg-white/60 px-5 py-4">
              <p className="text-sm font-semibold tracking-[0.22em] text-red-400/80">
                CRAYON NOTE
              </p>
              <p className="mt-2 text-sm leading-7 text-foreground/75">
                사용자관점에서 AI를 활용하는 방법을 고민하는 프론트엔드
                개발자입니다. <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
