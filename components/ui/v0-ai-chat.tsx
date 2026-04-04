"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "What services do you offer?",
  "How does AI video production work?",
  "Tell me about your past projects.",
];

// Static reply map — no external API needed
function getReply(input: string): string {
  const q = input.toLowerCase();
  if (q.match(/video|film|cinematic|production/))
    return "Our AI Video Production service combines generative visuals with human creative direction — we produce cinematic property films and brand reels that position your development as a landmark. Every frame is intentional.";
  if (q.match(/brand|campaign|identity|logo|visual/))
    return "We build full visual brand systems — from hero imagery to social assets. Our Cinematic Brand Campaigns align every touchpoint with a single powerful narrative designed to command premium perception.";
  if (q.match(/tempo|lisi|project|work|portfolio|past/))
    return "Our work includes Tempo District (full visual brand campaign and launch film for a landmark Tbilisi mixed-use development) and Lisi Trio (strategic positioning and AI-enhanced campaign for three premium towers overlooking Lisi Lake).";
  if (q.match(/price|cost|fee|budget|rate|how much/))
    return "Every project is scoped individually based on your development's scale and objectives. Reach out at contact@aiconic.ge with details and we'll prepare a tailored proposal within 24 hours.";
  if (q.match(/georgia|tbilisi|market|local/))
    return "We're Georgia-native. We know Tbilisi's luxury real estate landscape, its buyers' expectations, and the aesthetic language that resonates. That market-specific insight is baked into every campaign we produce.";
  if (q.match(/ai|artificial intelligence|technology|how/))
    return "We use AI at every stage — from concept development and visual rendering to color grading and asset variation. The result is premium output at a pace traditional production can't match, without sacrificing craft.";
  if (q.match(/contact|email|reach|talk|meet|call/))
    return "You can reach our team directly at contact@aiconic.ge. We respond to every serious inquiry within 24 hours. Alternatively, use the contact form below to send us a brief.";
  if (q.match(/positioning|strategy|perception/))
    return "Strategic Visual Positioning is our most consultative service — we analyze your market, your competitors, and your buyers, then design a visual identity system that occupies a distinct and aspirational place in the minds of premium buyers.";
  return "That's a great question for a direct conversation. Our team can walk you through exactly how we approach your specific project type. Email us at contact@aiconic.ge or fill out the brief below — we'll be in touch quickly.";
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#C8C8C8]"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

export function VercelV0Chat({
  heading = "Let's Talk About Your Brand.",
  placeholder = "Ask us anything about your project...",
}: {
  heading?: string;
  placeholder?: string;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      content:
        "Hello. I'm here to answer questions about AIconic — our services, approach, and past work. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulate response delay
    setTimeout(
      () => {
        const reply: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: getReply(trimmed),
        };
        setMessages((prev) => [...prev, reply]);
        setLoading(false);
      },
      900 + Math.random() * 600
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto h-full">
      {/* Message list */}
      <div className="flex-1 overflow-y-auto px-1 py-4 space-y-4 scrollbar-thin">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-6 h-6 rounded-full border border-[rgba(200,200,200,0.2)] flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span
                    className="text-[8px] text-[#C8C8C8] tracking-wider"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    A
                  </span>
                </div>
              )}
              <div
                className={`max-w-[80%] text-sm leading-relaxed font-light ${
                  msg.role === "user"
                    ? "text-[#F5F0E8] bg-[rgba(200,200,200,0.07)] border border-[rgba(200,200,200,0.1)] px-4 py-3"
                    : "text-[#9a9a8e]"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="w-6 h-6 rounded-full border border-[rgba(200,200,200,0.2)] flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span
                className="text-[8px] text-[#C8C8C8] tracking-wider"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                A
              </span>
            </div>
            <TypingIndicator />
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestion chips */}
      {messages.length === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-2 px-1 pb-4"
        >
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="text-[10px] tracking-[0.15em] uppercase text-[#6B6A5E] border border-[rgba(200,200,200,0.1)] px-3 py-2 hover:border-[rgba(200,200,200,0.3)] hover:text-[#C8C8C8] transition-all duration-300 font-light"
            >
              {s}
            </button>
          ))}
        </motion.div>
      )}

      {/* Input row */}
      <div className="relative border-t border-[rgba(200,200,200,0.1)] pt-4">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={3}
          className="pr-14 bg-[rgba(200,200,200,0.03)] border-[rgba(200,200,200,0.12)] focus-visible:border-[rgba(200,200,200,0.3)] text-[#F5F0E8]"
        />
        <button
          onClick={() => send(input)}
          disabled={!input.trim() || loading}
          className="absolute right-3 bottom-3 w-8 h-8 flex items-center justify-center border border-[rgba(200,200,200,0.2)] text-[#C8C8C8] hover:bg-[#C8C8C8] hover:text-[#080808] disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-300"
          aria-label="Send message"
        >
          {loading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Send size={14} />
          )}
        </button>
        <p className="mt-2 text-[10px] text-[#3a3a3a] tracking-wider">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
