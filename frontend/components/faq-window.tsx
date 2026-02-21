"use client"

import { WindowFrame } from "./window-frame"
import { useState } from "react"
import { ChevronUp, HelpCircle } from "lucide-react"

interface FAQWindowProps {
  onClose: () => void
  zIndex: number
}

const faqs = [
  {
    question: "What software do you use?",
    answer: "Clip Studio Paint",
  },
  {
    question: "Do you take commissions?",
    answer: "Commissions info will be on my Carrd!",
  },
  {
    question: "Where do I get my inspiration?",
    answer: "grunge, greens, a lot of artists i take inspo from!",
  },
  {
    question: "Creative process",
    answer: "very randoming... idk girl",
  },
  {
    question: "When did I start my work?",
    answer: "professionally, 2019!",
  },
]

export function FAQWindow({ onClose }: FAQWindowProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <WindowFrame
      title="frequently asked questions"
      onClose={onClose}
      className="w-[300px] md:w-[400px]"
    >
      <div className="p-4 space-y-2 overflow-y-auto max-h-[65vh]">
        {faqs.map((faq, index) => (
          <div key={index}>
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left"
              style={{
                borderColor: "var(--border)",
                background: "var(--btn-yellow)",
                color: "var(--foreground)",
              }}
            >
              <HelpCircle
                className="w-5 h-5 shrink-0"
                style={{ color: "var(--tropius-brown)" }}
              />
              <span className="font-semibold text-sm flex-1">{faq.question}</span>
              <ChevronUp
                className="w-4 h-4 shrink-0 transition-transform duration-200"
                style={{
                  color: "var(--muted-foreground)",
                  transform: openIndex === index ? "rotate(0deg)" : "rotate(180deg)",
                }}
              />
            </button>

            {/* Answer panel */}
            <div
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: openIndex === index ? "200px" : "0px",
                opacity: openIndex === index ? 1 : 0,
              }}
            >
              <p
                className="px-4 py-3 text-sm leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
              >
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </WindowFrame>
  )
}
