import Link from "next/link";
import { GraduationCap, Users, Globe, Award } from "lucide-react";

const highlights = [
  { icon: GraduationCap, title: "Academic Excellence", description: "Consistently top results in CBSE, ICSE, and State board examinations." },
  { icon: Users, title: "Expert Faculty", description: "50,000+ experienced teachers dedicated to student success." },
  { icon: Globe, title: "Pan-India Presence", description: "950+ schools across 22 states for accessible quality education." },
  { icon: Award, title: "Holistic Development", description: "Focus on academics, sports, arts, and personality development." },
];

export default function AboutPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Sri Chaitanya?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            For over three decades, Sri Chaitanya has been shaping the future of millions of students
            with world-class education and innovative teaching methodologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="text-center p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-blue-700" />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
