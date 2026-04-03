"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Shaping Future Leaders",
    subtitle: "Asia's Largest Educational Group",
    description: "950+ schools across 22 states, nurturing excellence since 1986",
    cta: "Explore Schools",
    href: "/schools",
    gradient: "from-[#1e3a5f] to-[#2c5282]",
  },
  {
    title: "Admissions Open 2026-2027",
    subtitle: "CBSE | ICSE | IGCSE | STATE",
    description: "Join the legacy of academic excellence and holistic development",
    cta: "Apply Now",
    href: "/admissions",
    gradient: "from-[#7b341e] to-[#e53e3e]",
  },
  {
    title: "World Record at NASA",
    subtitle: "Once Again No. 1",
    description: "Sri Chaitanya students set new benchmarks in space science competitions",
    cta: "View Achievements",
    href: "/achievements",
    gradient: "from-[#2d3748] to-[#4a5568]",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className={`absolute inset-0 bg-gradient-to-br ${slides[current].gradient}`}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center text-white">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#f6ad55]"
            >
              {slides[current].subtitle}
            </motion.p>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-4 text-4xl font-bold md:text-6xl"
            >
              {slides[current].title}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8 max-w-2xl text-lg text-gray-200"
            >
              {slides[current].description}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href={slides[current].href}
                className="rounded-full bg-[#e53e3e] px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#c53030] transition-colors"
              >
                {slides[current].cta}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === current ? "w-8 bg-white" : "w-2.5 bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
