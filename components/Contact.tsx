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
  const base =
    "w-full bg-transparent text-[#F5F0E8] text-sm font-light py-3 px-0 outline-none placeholder:text-[#2e2e2e] transition-colors duration-300";
  const border = focused
    ? "border-b border-[rgba(200,200,200,0.5)]"
    : "border-b border-[rgba(200,200,200,0.15)]";

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[#C8C8C8] text-[10px] tracking-[0.35em] uppercase font-light">
        {label}
        {required && <span className="text-[#888] ml-1">*</span>}
      </label>
      <div className={border}>
        <input
          className={base}
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
  const base =
    "w-full bg-transparent text-[#F5F0E8] text-sm font-light py-3 px-0 outline-none resize-none placeholder:text-[#2e2e2e] transition-colors duration-300";
  const border = focused
    ? "border-b border-[rgba(200,200,200,0.5)]"
    : "border-b border-[rgba(200,200,200,0.15)]";

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[#C8C8C8] text-[10px] tracking-[0.35em] uppercase font-light">
        {label}
      </label>
      <div className={border}>
        <textarea
          className={base}
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `New inquiry — ${form.company || form.name}`
    );
    const body = encodeURIComponent(
      `Full Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\n\n${form.message ? `Message:\n${form.message}` : ""}`
    );
    window.location.href = `mailto:contact@aiconic.ge?subject=${subject}&body=${body}`;
    setSent(true);
    setForm(INITIAL);
  };

  return (
    <section className="relative py-32 md:py-48 px-6 overflow-hidden bg-[#080808]">
      {/* Subtle silver glow */}
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
          className="h-px bg-gradient-to-r from-transparent via-[rgba(200,200,200,0.35)] to-transparent origin-left"
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
            <p className="text-[#C8C8C8] text-xs tracking-[0.4em] uppercase mb-6">
              Get In Touch
            </p>
            <h2
              className="text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-[#F5F0E8] mb-8"
              style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
            >
              Ready to elevate
              <br />
              your brand?
            </h2>
            <p className="text-[#6B6A5E] text-sm leading-relaxed font-light max-w-sm mb-12">
              Tell us about your project. We respond to every serious inquiry
              within 24 hours.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-px bg-[#C8C8C8] opacity-40" />
                <a
                  href="mailto:contact@aiconic.ge"
                  className="text-[#6B6A5E] text-xs tracking-widest hover:text-[#C8C8C8] transition-colors duration-300"
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
                <div className="w-10 h-px bg-[#C8C8C8] mb-8" />
                <p
                  className="text-[#F5F0E8] text-3xl mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600 }}
                >
                  Message sent.
                </p>
                <p className="text-[#6B6A5E] text-sm font-light leading-relaxed">
                  Your email client should open. We&apos;ll be in touch shortly.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-10 text-[#C8C8C8] text-[10px] tracking-[0.3em] uppercase hover:text-[#F5F0E8] transition-colors duration-300 text-left"
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
                    className="group relative inline-flex items-center gap-4 px-10 py-4 border border-[#C8C8C8] text-[#C8C8C8] text-xs tracking-[0.3em] uppercase font-light hover:bg-[#C8C8C8] hover:text-[#080808] transition-all duration-500 overflow-hidden"
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
        <div className="h-px bg-[rgba(200,200,200,0.08)] mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            className="text-[#C8C8C8] tracking-[0.25em] uppercase text-sm font-light"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            AIconic
          </span>
          <p className="text-[#6B6A5E] text-xs tracking-wider">
            © {new Date().getFullYear()} AIconic. AI-powered visual marketing.
          </p>
          <p className="text-[#6B6A5E] text-xs tracking-wider">Georgia</p>
        </div>
      </motion.footer>
    </section>
  );
}
