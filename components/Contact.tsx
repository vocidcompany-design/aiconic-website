"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type FormState = {
  name: string;
  company: string;
  email: string;
  message: string;
};

const INITIAL: FormState = { name: "", company: "", email: "", message: "" };

function Field({
  label,
  name,
  type = "text",
  required = false,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: keyof FormState;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-[10px] tracking-[0.35em] uppercase font-light"
        style={{ color: "var(--accent)" }}
      >
        {label}
        {required && <span className="ml-1" style={{ color: "var(--text-secondary)" }}>*</span>}
      </label>
      <div
        className="border-b transition-colors duration-300"
        style={{
          borderColor: focused
            ? "color-mix(in srgb, var(--accent) 50%, transparent)"
            : "color-mix(in srgb, var(--accent) 15%, transparent)",
        }}
      >
        <input
          className="w-full bg-transparent text-sm font-light py-3 px-0 outline-none transition-colors duration-300"
          style={{
            color: "var(--text-primary)",
          }}
          type={type}
          name={name}
          required={required}
          value={value}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
        />
      </div>
    </div>
  );
}

function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-[10px] tracking-[0.35em] uppercase font-light"
        style={{ color: "var(--accent)" }}
      >
        {label}
      </label>
      <div
        className="border-b transition-colors duration-300"
        style={{
          borderColor: focused
            ? "color-mix(in srgb, var(--accent) 50%, transparent)"
            : "color-mix(in srgb, var(--accent) 15%, transparent)",
        }}
      >
        <textarea
          className="w-full bg-transparent text-sm font-light py-3 px-0 outline-none resize-none transition-colors duration-300"
          style={{ color: "var(--text-primary)" }}
          name={name}
          rows={4}
          value={value}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (key: keyof FormState) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://formspree.io/f/mdappjvn", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          message: form.message,
        }),
      });
      if (res.ok) {
        setSent(true);
        setForm(INITIAL);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-32 md:py-48 px-6 overflow-hidden transition-colors duration-700"
      style={{ background: "var(--bg)" }}
    >
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(200,200,200,0.03) 0%, transparent 70%)",
        }}
      />

      {/* Top separator */}
      <div className="max-w-6xl mx-auto mb-20">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="h-px origin-left"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--accent), transparent)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 md:gap-32 items-start">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            <p
              className="text-xs tracking-[0.4em] uppercase mb-6"
              style={{ color: "var(--accent)" }}
            >
              Get In Touch
            </p>
            <h2
              className="text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.05] tracking-tight mb-8"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              Ready to elevate
              <br />
              your brand?
            </h2>
            <p
              className="text-sm leading-relaxed font-light max-w-sm mb-12"
              style={{ color: "var(--text-secondary)" }}
            >
              Tell us about your project. We respond to every serious inquiry
              within 24 hours.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-px opacity-40"
                  style={{ background: "var(--accent)" }}
                />
                <a
                  href="mailto:contact@aiconic.ge"
                  className="text-xs tracking-widest transition-colors duration-300"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "var(--text-secondary)")
                  }
                >
                  contact@aiconic.ge
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col justify-center min-h-[340px]"
              >
                <div
                  className="w-10 h-px mb-8"
                  style={{ background: "var(--accent)" }}
                />
                <p
                  className="text-3xl mb-4 leading-tight"
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  Message sent.
                </p>
                <p
                  className="text-sm font-light leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Your email client should open. We&apos;ll be in touch shortly.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-10 text-[10px] tracking-[0.3em] uppercase transition-colors duration-300 text-left"
                  style={{ color: "var(--accent)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color =
                      "var(--text-primary)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color =
                      "var(--accent)")
                  }
                >
                  Send another →
                </button>
              </motion.div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Field
                    label="Full Name"
                    name="name"
                    required
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your name"
                  />
                  <Field
                    label="Company"
                    name="company"
                    required
                    value={form.company}
                    onChange={set("company")}
                    placeholder="Your company"
                  />
                </div>
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={set("email")}
                  placeholder="you@company.com"
                />
                <TextAreaField
                  label="Message (optional)"
                  name="message"
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell us about your project..."
                />

                <div className="pt-2">
                  <button
                    type="submit"
                    className="group relative inline-flex items-center gap-4 px-10 py-4 border text-xs tracking-[0.3em] uppercase font-light transition-all duration-500 overflow-hidden"
                    style={{
                      borderColor: "var(--accent)",
                      color: "var(--accent)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "var(--accent)";
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "var(--bg)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "transparent";
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "var(--accent)";
                    }}
                  >
                    <span className="relative z-10">Send Inquiry</span>
                    <span className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative max-w-6xl mx-auto mt-32 pt-8"
      >
        <div className="h-px mb-8" style={{ background: "var(--border)" }} />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            className="tracking-[0.25em] uppercase text-sm font-light"
            style={{
              fontFamily: "var(--font-playfair), serif",
              color: "var(--accent)",
            }}
          >
            AIconic
          </span>
          <p
            className="text-xs tracking-wider"
            style={{ color: "var(--text-secondary)" }}
          >
            © {new Date().getFullYear()} AIconic. AI-powered visual marketing.
          </p>
          <p
            className="text-xs tracking-wider"
            style={{ color: "var(--text-secondary)" }}
          >
            Georgia
          </p>
        </div>
      </motion.footer>
    </section>
  );
}
