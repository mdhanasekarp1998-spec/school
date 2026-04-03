import Link from "next/link";
import { GraduationCap, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-8 w-8" />
              <span className="text-xl font-bold">
                Sri Chaitanya <span className="text-[#f6ad55]">Schools</span>
              </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Asia&apos;s largest educational group with 950+ schools across 22 states,
              nurturing future leaders since 1986.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f6ad55] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/schools", label: "Find a School" },
                { href: "/admissions", label: "Admissions" },
                { href: "/achievements", label: "Achievements" },
                { href: "/news", label: "News & Events" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f6ad55] mb-4">
              Academics
            </h3>
            <ul className="space-y-2">
              {["Pre-Primary", "Primary School", "High School", "CBSE Board", "ICSE Board", "IGCSE Board"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-sm text-gray-300">{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f6ad55] mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-300">
                  Plot No: 80, Sri Sai Plaza, Ayyappa Society, Madhapur, Hyderabad - 500081
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span className="text-sm text-gray-300">040-44600600</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span className="text-sm text-gray-300">info@srichaitanya.net</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Sri Chaitanya Schools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
