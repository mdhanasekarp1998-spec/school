"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Medal } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
}

const tabs = [
  { key: "", label: "All", icon: Trophy },
  { key: "academic", label: "Academic", icon: Trophy },
  { key: "co_curricular", label: "Co-Curricular", icon: Award },
  { key: "sports", label: "Sports", icon: Medal },
];

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = category
      ? `/api/achievements?category=${category}`
      : "/api/achievements";
    fetch(url)
      .then((r) => r.json())
      .then(setAchievements)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [category]);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "academic": return "bg-blue-100 text-blue-700";
      case "co_curricular": return "bg-purple-100 text-purple-700";
      case "sports": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "academic": return "Academic";
      case "co_curricular": return "Co-Curricular";
      case "sports": return "Sports";
      default: return cat;
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#2c5282] py-16">
        <div className="mx-auto max-w-7xl px-4 text-center text-white">
          <h1 className="text-4xl font-bold">Our Achievements</h1>
          <p className="mt-2 text-gray-200">Excellence across academics, co-curriculars, and sports</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setCategory(tab.key)}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  category === tab.key
                    ? "bg-[#1e3a5f] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse rounded-xl bg-gray-100 h-48" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getCategoryColor(item.category)}`}
                  >
                    {getCategoryLabel(item.category)}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(item.date).toLocaleDateString("en-IN", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
