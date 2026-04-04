"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paperclip, ArrowUp } from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const FALLBACK_DELAY = 9000; // ms before showing offline message

const QA_PAIRS = [
  {
    question: "What services do you offer?",
    answer:
      "AIconic produces AI-powered cinematic videos, premium image campaigns, and strategic visual positioning systems — built specifically for real estate developers who want to elevate perceived value and accelerate sales decisions.",
  },
  {
    question: "How does AI video production work?",
    answer:
      "We combine AI generation tools with cinematic direction to produce developer-grade visual content — architectural reveals, lifestyle narratives, and brand films — in a fraction of traditional production time and cost.",
  },
  {
    question: "What projects have you worked on?",
    answer:
      "Our work includes campaigns for premium residential developments in Georgia, including Tempo District in Batumi and Lisi Trio in Tbilisi — projects where visual perception directly influenced buyer decisions.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Pricing is project-based and depends on scope. Most developer campaigns start from $1,000. Contact us at contact@aiconic.ge for a tailored proposal.",
  },
  {
    question: "How do we get started?",
    answer:
      "Send us a message here or email contact@aiconic.ge. We typically respond within 24 hours and begin with a short discovery call to understand your project.",
  },
];

type Message = {
  id: string;
  role: "user" | "operator";
  content: string;
};

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#555]"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function VercelV0Chat({
  placeholder = "Ask us anything about AIconic...",
}: {
  placeholder?: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const listenerRegistered = useRef(false);

  // Scroll to bottom whenever messages or typing state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Register Crisp message:received listener once
  const registerListener = useCallback(() => {
    if (listenerRegistered.current) return;
    listenerRegistered.current = true;

    window.$crisp.push([
      "on",
      "message:received",
      (data: { type: string; content: string }) => {
        if (data.type !== "text") return;

        // Cancel fallback timer
        if (fallbackTimer.current) {
          clearTimeout(fallbackTimer.current);
          fallbackTimer.current = null;
        }

        setTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "operator",
            content: data.content,
          },
        ]);
      },
    ]);
  }, []);

  useEffect(() => {
    // Crisp may already be on window (script loaded), or still queued
    if (typeof window !== "undefined" && window.$crisp) {
      registerListener();
    }
    return () => {
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    };
  }, [registerListener]);

  // Chip click: answer immediately from hardcoded map, no Crisp needed
  const sendChip = useCallback(
    (question: string, answer: string) => {
      if (typing) return;
      const ts = Date.now();
      setMessages((prev) => [
        ...prev,
        { id: String(ts), role: "user", content: question },
      ]);
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: String(ts + 1), role: "operator", content: answer },
        ]);
      }, 700 + Math.random() * 400);
    },
    [typing]
  );

  // Free-form input: route through live Crisp session
  const send = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || typing) return;

      registerListener();

      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "user", content: trimmed },
      ]);
      setInput("");
      setTyping(true);

      window.$crisp.push(["do", "message:send", ["text", trimmed]]);

      fallbackTimer.current = setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "operator",
            content:
              "Thanks for reaching out. Our team will get back to you shortly — you can also email us directly at contact@aiconic.ge.",
          },
        ]);
      }, FALLBACK_DELAY);
    },
    [typing, registerListener]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send(input);
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col w-full items-center gap-5">
      {/* ── Message history ── */}
      <div
        className={`w-full max-w-2xl transition-all duration-500 ${
          hasMessages || typing ? "opacity-100" : "opacity-0 pointer-events-none h-0"
        }`}
      >
        <div
          className="flex flex-col gap-4 max-h-[360px] overflow-y-auto pr-1 pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "operator" && (
                  <div className="w-6 h-6 rounded-full border border-[rgba(200,200,200,0.18)] flex items-center justify-center mr-2.5 mt-0.5 flex-shrink-0">
                    <span
                      className="text-[8px] text-[#C8C8C8]"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      A
                    </span>
                  </div>
                )}
                <p
                  className={`text-sm leading-relaxed font-light max-w-[80%] ${
                    msg.role === "user"
                      ? "text-[#F5F0E8] bg-[rgba(200,200,200,0.07)] border border-[rgba(200,200,200,0.1)] px-4 py-3 rounded-2xl rounded-tr-sm"
                      : "text-[#9a9a8e] pt-1"
                  }`}
                >
                  {msg.content}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {typing && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.25 }}
                className="flex justify-start"
              >
                <div className="w-6 h-6 rounded-full border border-[rgba(200,200,200,0.18)] flex items-center justify-center mr-2.5 mt-0.5 flex-shrink-0">
                  <span
                    className="text-[8px] text-[#C8C8C8]"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    A
                  </span>
                </div>
                <TypingDots />
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Divider before input */}
        {(hasMessages || typing) && (
          <div className="w-full h-px bg-[rgba(200,200,200,0.06)] mt-4 mb-1" />
        )}
      </div>

      {/* ── Input ── */}
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-3 bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-2xl px-4 py-3 focus-within:border-[rgba(255,255,255,0.18)] transition-colors duration-300">
          <button
            type="button"
            tabIndex={-1}
            aria-label="Attach file"
            className="text-[#444] hover:text-[#888] transition-colors duration-200 flex-shrink-0"
          >
            <Paperclip size={17} />
          </button>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-[#F5F0E8] text-sm font-light placeholder:text-[#383838] outline-none"
          />

          <button
            onClick={() => send(input)}
            disabled={!input.trim() || typing}
            aria-label="Send"
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 hover:bg-[#E8E8E8] disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ArrowUp size={14} className="text-[#080808]" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* ── Suggestion chips ── */}
      <AnimatePresence>
        {!hasMessages && (
          <motion.div
            key="chips"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex flex-wrap justify-center gap-2 w-full max-w-2xl"
          >
            {QA_PAIRS.map(({ question, answer }) => (
              <button
                key={question}
                onClick={() => sendChip(question, answer)}
                disabled={typing}
                className="text-[11px] text-[#6B6A5E] tracking-[0.12em] border border-[rgba(200,200,200,0.1)] rounded-full px-4 py-2 hover:border-[rgba(200,200,200,0.3)] hover:text-[#C8C8C8] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 font-light text-left"
              >
                {question}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
