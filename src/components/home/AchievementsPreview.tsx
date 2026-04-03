"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Trophy, Award, Medal } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    category: "Academic",
    title: "Sri Chaitanya's World Record at NASA",
    description: "Students set a world record at the NASA Space Settlement Design Competition.",
  },
  {
    icon: Award,
    category: "Co-Curricular",
    title: "NASA Healthy Space Design Competition",
    description: "Our students won the NASA Live in a Healthy Space Design Competition.",
  },
  {
    icon: Medal,
    category: "Sports",
    title: "National Level Sports Achievements",
    description: "Students won 15 medals at the National School Games including 5 golds.",
  },
];

export default function AchievementsPreview() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[#1e3a5f]">Achievements</h2>
          <div className="mt-2 mx-auto h-1 w-16 rounded bg-[#e53e3e]" />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {achievements.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full bg-[#1e3a5f]/10 p-2">
                    <Icon className="h-5 w-5 text-[#1e3a5f]" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#e53e3e]">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/achievements"
            className="inline-block rounded-full border-2 border-[#1e3a5f] px-6 py-2 text-sm font-semibold text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white transition-colors"
          >
            View All Achievements
          </Link>
        </div>
      </div>
    </section>
  );
}
