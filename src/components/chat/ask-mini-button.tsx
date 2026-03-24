"use client"

import { Bot } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AskMiniButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={onClick}
        size="lg"
        className="rounded-full shadow-lg"
      >
        <Bot className="mr-2 h-4 w-4" />
        Ask Mini
      </Button>
    </div>
  )
}