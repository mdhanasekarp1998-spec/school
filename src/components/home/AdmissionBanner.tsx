"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AdmissionBanner() {
  return (
    <section className="bg-gradient-to-r from-[#e53e3e] to-[#c53030] py-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Admissions Open
          </h2>
          <p className="mt-2 text-5xl font-extrabold text-white md:text-6xl">
            2026-2027
          </p>
          <p className="mt-4 text-lg text-red-100">
            CBSE | ICSE | IGCSE | STATE Board
          </p>
          <Link
            href="/admissions"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#e53e3e] shadow-lg hover:bg-gray-100 transition-colors"
          >
            Admission Enquiry
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
