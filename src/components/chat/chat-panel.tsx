"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircleMore, Send, Sparkles, StickyNote } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

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
  "어떤 프로젝트를 먼저 보면 좋을까?",
  "인턴 경험 요약해줘",
  "1분 자기소개처럼 말해줘",
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
  const [isTyping, setIsTyping] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "안녕하세요. 이 포트폴리오를 읽고 답변하는 Mini예요. 프로젝트, 기술 스택, 인턴 경험, 협업 방식처럼 궁금한 내용을 편하게 물어보세요.",
    },
  ]);

  const clearTypingTimeout = () => {
    if (typingTimeoutRef.current !== null) {
      window.clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    const container = scrollContainerRef.current;

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior,
    });
  };

  const typeAssistantReply = (message: Message) =>
    new Promise<void>((resolve) => {
      clearTypingTimeout();
      setIsTyping(true);

      setMessages((prev) => [
        ...prev,
        {
          ...message,
          content: "",
          type: "text",
          projects: [],
        },
      ]);

      const fullText = message.content;
      let visibleLength = 0;

      const step = () => {
        const remaining = fullText.length - visibleLength;
        const nextChunkSize = remaining > 48 ? 4 : remaining > 24 ? 3 : 2;
        visibleLength = Math.min(fullText.length, visibleLength + nextChunkSize);

        setMessages((prev) => {
          const nextMessages = [...prev];
          const lastMessage = nextMessages[nextMessages.length - 1];

          if (!lastMessage || lastMessage.role !== "assistant") {
            return prev;
          }

          nextMessages[nextMessages.length - 1] = {
            ...lastMessage,
            content: fullText.slice(0, visibleLength),
          };

          return nextMessages;
        });

        window.requestAnimationFrame(() => scrollToBottom("auto"));

        if (visibleLength < fullText.length) {
          typingTimeoutRef.current = window.setTimeout(
            step,
            28 + Math.floor(Math.random() * 24),
          );
          return;
        }

        setMessages((prev) => {
          const nextMessages = [...prev];
          const lastMessage = nextMessages[nextMessages.length - 1];

          if (!lastMessage || lastMessage.role !== "assistant") {
            return prev;
          }

          nextMessages[nextMessages.length - 1] = message;
          return nextMessages;
        });

        setIsTyping(false);
        window.requestAnimationFrame(() => scrollToBottom("smooth"));
        clearTypingTimeout();
        resolve();
      };

      window.requestAnimationFrame(() => scrollToBottom("smooth"));
      typingTimeoutRef.current = window.setTimeout(step, 120);
    });

  const sendMessage = async (text?: string) => {
    const messageToSend = (text ?? input).trim();
    if (!messageToSend || loading || isTyping) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: messageToSend,
      },
    ]);
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
      setLoading(false);

      await typeAssistantReply({
        role: "assistant",
        content: data.reply ?? "답변을 불러오지 못했습니다.",
        type: data.type ?? "text",
        projects: data.projects ?? [],
      });
    } catch (error) {
      console.error(error);
      setLoading(false);

      await typeAssistantReply({
        role: "assistant",
        content: "오류가 발생했습니다. 잠시 후 다시 질문해 주세요.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;

    const container = scrollContainerRef.current;

    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    if (distanceFromBottom > 120 && !loading && !isTyping) return;

    window.requestAnimationFrame(() =>
      scrollToBottom(isTyping ? "auto" : "smooth"),
    );
  }, [messages, loading, isTyping, open]);

  useEffect(() => {
    return () => {
      clearTypingTimeout();
    };
  }, []);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full border-l-0 bg-transparent p-0 shadow-none sm:max-w-md"
      >
        <div className="relative flex h-full flex-col overflow-hidden border-l border-stone-300/60 bg-[linear-gradient(180deg,#fff8c8_0%,#fff4d8_42%,#fffaf0_100%)] text-stone-800 shadow-[-18px_0_40px_rgba(120,90,20,0.12)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.9),transparent_28%),repeating-linear-gradient(180deg,transparent_0,transparent_27px,rgba(120,90,20,0.06)_28px)]" />
          <div className="pointer-events-none absolute left-6 top-0 h-full w-px bg-red-300/50" />

          <SheetHeader className="relative gap-3 border-b border-stone-300/50 px-6 pb-4 pt-7">
            <div className="absolute left-8 top-2 h-5 w-[4.5rem] rotate-[-5deg] rounded-sm bg-pink-200/75 shadow-sm" />
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">
              <StickyNote className="h-3.5 w-3.5" />
              Portfolio Memo Bot
            </div>
            <SheetTitle className="flex items-center gap-2 text-xl font-semibold text-stone-800">
              Ask Mini
              <Sparkles className="h-4 w-4 text-amber-500" />
            </SheetTitle>
            <SheetDescription className="text-sm leading-6 text-stone-600">
              포트폴리오 내용을 바탕으로 답변하는 작은 메모 도우미입니다.
            </SheetDescription>
          </SheetHeader>

          <div className="relative flex h-[calc(100%-1rem)] min-h-0 flex-col px-4 pb-4">
            <div className="mx-2 mt-4 rounded-[1.5rem] border border-stone-300/50 bg-white/60 p-4 shadow-[0_8px_20px_rgba(120,90,20,0.08)]">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-stone-600">
                <MessageCircleMore className="h-4 w-4 text-rose-400" />
                이렇게 물어보면 더 잘 답해요
              </div>

              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => sendMessage(suggestion)}
                    className="rounded-full border border-stone-300/60 bg-[#fffdf6] px-3 py-1.5 text-xs text-stone-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-[#fff6d8]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <div
              ref={scrollContainerRef}
              className="mt-4 min-h-0 flex-1 overflow-y-auto px-2 pr-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="space-y-4 pb-4">
                {messages.map((message, index) => (
                  <div key={`${message.role}-${index}`} className="space-y-2">
                    <div
                      className={`max-w-[88%] rounded-[1.5rem] border px-4 py-3 text-sm leading-6 shadow-sm ${
                        message.role === "user"
                          ? "ml-auto rotate-[1deg] border-amber-200 bg-[#ffe99a] text-stone-800"
                          : "rotate-[-1deg] border-stone-300/60 bg-[#fffdf8] text-stone-700"
                      }`}
                    >
                      {message.content}
                      {isTyping &&
                        message.role === "assistant" &&
                        index === messages.length - 1 && (
                          <span className="ml-1 inline-block h-4 w-0.5 animate-pulse rounded-full bg-stone-500 align-[-2px]" />
                        )}
                    </div>

                    {message.role === "assistant" &&
                      message.type === "projects" &&
                      message.projects &&
                      message.projects.length > 0 && (
                        <div className="space-y-3">
                          {message.projects.map((project, projectIndex) => (
                            <div
                              key={project.name}
                              className={`max-w-[88%] rounded-[1.5rem] border border-stone-300/60 bg-[#fffef9] p-4 text-sm shadow-[0_10px_20px_rgba(120,90,20,0.08)] ${
                                projectIndex % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]"
                              }`}
                            >
                              <p className="text-base font-semibold text-stone-800">
                                {project.name}
                              </p>
                              <p className="mt-1 leading-6 text-stone-600">
                                {project.description}
                              </p>
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {project.tech.map((tech) => (
                                  <span
                                    key={tech}
                                    className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-stone-600"
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
                  <div className="max-w-[88%] rotate-[-1deg] rounded-[1.5rem] border border-stone-300/60 bg-[#fffdf8] px-4 py-3 text-sm text-stone-500 shadow-sm">
                    포트폴리오 메모를 뒤적이는 중이에요...
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="relative mt-3 rounded-[1.75rem] border border-stone-300/60 bg-white/70 p-3 shadow-[0_10px_20px_rgba(120,90,20,0.08)]">
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void sendMessage();
                    }
                  }}
                  rows={1}
                  placeholder="예: 어떤 프로젝트가 React 역량을 잘 보여줘?"
                  className="max-h-32 min-h-[48px] flex-1 resize-none border-0 bg-transparent px-2 py-2 text-sm leading-6 text-stone-700 outline-none placeholder:text-stone-400"
                />

                <Button
                  onClick={() => void sendMessage()}
                  disabled={loading || isTyping}
                  className="rounded-full bg-stone-800 text-amber-50 shadow-sm hover:bg-stone-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
