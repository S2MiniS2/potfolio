import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-4xl space-y-10 text-center">
        <div className="space-y-4">
          <p className="text-sm font-medium text-muted-foreground">Contact</p>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            함께 만들 다음 작업을 기다리고 있습니다
          </h2>

          <p className="mx-auto max-w-xl text-muted-foreground">
            프론트엔드 개발, 협업이 필요한 프로젝트, AI를 활용한 제품 경험
            개선까지 편하게 이야기 나눠주세요. 아래 링크로 연락 주시면 빠르게
            답장드리겠습니다.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="mailto:sohe0409@gmail.com">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link
              href="https://github.com/S2MiniS2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link
              href="https://www.linkedin.com/in/%EB%AF%BC%ED%9D%AC-%EB%B0%95-586a3639a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
