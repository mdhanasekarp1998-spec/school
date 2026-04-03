"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Star } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  body: string;
  category: string;
  isFeatured: boolean;
  publishedAt: string;
}

const categories = ["", "Academics", "Admissions", "Events", "Campus"];

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    fetch(`/api/news?${params.toString()}`)
      .then((r) => r.json())
      .then(setNews)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div>
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#2c5282] py-16">
        <div className="mx-auto max-w-7xl px-4 text-center text-white">
          <h1 className="text-4xl font-bold">News & Announcements</h1>
          <p className="mt-2 text-gray-200">Stay updated with the latest from Sri Chaitanya</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-[#1e3a5f] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat || "All"}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse rounded-xl bg-gray-100 h-36" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {news.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {new Date(item.publishedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <span className="rounded-full bg-[#1e3a5f]/10 px-3 py-0.5 text-xs font-medium text-[#1e3a5f]">
                    {item.category}
                  </span>
                  {item.isFeatured && (
                    <span className="flex items-center gap-1 rounded-full bg-[#f6ad55]/20 px-3 py-0.5 text-xs font-medium text-[#c05621]">
                      <Star className="h-3 w-3" /> Featured
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
                <p className="text-gray-600 leading-relaxed">{item.body}</p>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
