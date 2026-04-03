"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

const newsItems = [
  {
    title: "CBSE Class X State-wise Top Results",
    category: "Academics",
    date: "Aug 31, 2026",
  },
  {
    title: "NEET 2025 All India Top 100 Ranks",
    category: "Academics",
    date: "Aug 31, 2026",
  },
  {
    title: "International Math Olympiad Selection",
    category: "Academics",
    date: "Jul 15, 2026",
  },
];

export default function NewsPreview() {
  return (
    <section className="py-16 bg-[#f7fafc]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[#1e3a5f]">News & Announcements</h2>
          <div className="mt-2 mx-auto h-1 w-16 rounded bg-[#e53e3e]" />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {newsItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group rounded-xl bg-white p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-500">{item.date}</span>
                <span className="ml-auto rounded-full bg-[#1e3a5f]/10 px-2.5 py-0.5 text-xs font-medium text-[#1e3a5f]">
                  {item.category}
                </span>
              </div>
              <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#1e3a5f] transition-colors">
                {item.title}
              </h3>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#e53e3e]">
                Read more
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/news"
            className="inline-block rounded-full border-2 border-[#1e3a5f] px-6 py-2 text-sm font-semibold text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white transition-colors"
          >
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
}
