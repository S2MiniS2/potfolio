"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

type Project = {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
};

type Message = {
  role: "user" | "assistant";
  content: string;
  type?: "text" | "projects";
  projects?: Project[];
};

const suggestions = [
  "기술 스택 알려줘",
  "React 프로젝트 추천해줘",
  "인턴 경험 요약해줘",
  "1분 자기소개 만들어줘",
];

export default function ChatPanel({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "안녕하세요. 미니의 포트폴리오를 기반으로 답변합니다. 기술 스택, 프로젝트, 인턴 경험 등을 물어보세요.",
    },
  ]);

  const sendMessage = async (text?: string) => {
    const messageToSend = (text ?? input).trim();
    if (!messageToSend || loading) return;

    const userMessage: Message = {
      role: "user",
      content: messageToSend,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageToSend,
        }),
      });
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply ?? "응답을 불러오지 못했습니다.",
          type: data.type ?? "text",
          projects: data.projects ?? [],
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Ask Mini</SheetTitle>
        </SheetHeader>

        <div className="mt-4 flex h-[calc(100%-2rem)] flex-col">
          <div className="mb-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              포트폴리오 기반으로 답변합니다.
            </p>

            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => sendMessage(suggestion)}
                  className="rounded-full border px-3 py-1 text-xs text-muted-foreground transition hover:bg-muted"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <ScrollArea className="flex-1 pr-2">
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className="space-y-2">
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "ml-auto bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {message.content}
                  </div>

                  {message.role === "assistant" &&
                    message.type === "projects" &&
                    message.projects &&
                    message.projects.length > 0 && (
                      <div className="space-y-2">
                        {message.projects.map((project) => (
                          <div
                            key={project.name}
                            className="max-w-[85%] rounded-2xl border bg-background p-3 text-sm"
                          >
                            <p className="font-semibold">{project.name}</p>
                            <p className="mt-1 text-muted-foreground">
                              {project.description}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {project.tech.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              ))}

              {loading && (
                <div className="max-w-[85%] rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
                  답변 작성 중...
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="mt-4 flex items-center gap-2 border-t pt-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="질문을 입력해 주세요..."
              className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none"
            />

            <Button onClick={() => sendMessage()} disabled={loading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
