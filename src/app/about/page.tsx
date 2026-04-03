import { BookOpen, Target, Eye, Users, Heart } from "lucide-react";

const values = [
  { icon: Heart, label: "Morals", desc: "The ability to discriminate between right and wrong" },
  { icon: Target, label: "Values", desc: "The unique beliefs and feelings of an individual" },
  { icon: BookOpen, label: "Ethics", desc: "The principles that define everyday behaviour" },
  { icon: Eye, label: "Problem-solving", desc: "The skill to resolve difficult issues" },
  { icon: Users, label: "Positive Attitude", desc: "The highest indicator of a healthy personality" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#2c5282] py-20">
        <div className="mx-auto max-w-7xl px-4 text-center text-white">
          <h1 className="text-4xl font-bold md:text-5xl">About Us</h1>
          <p className="mt-4 text-lg text-gray-200">
            Asia&apos;s Largest Educational Group Since 1986
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The world today is a global village and people are its citizens. As boundaries of
            location, people and time cease to exist, it is of utmost importance that we move
            with the times. At Sri Chaitanya, we have created a unique blend of world-class
            curricula, contemporary teaching methodologies, and equal focus on intellectual,
            physical and personality development, resulting future leaders who are ready to take
            on the world.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Today, we stand as the force behind creating countless world-class doctors,
            engineers, IAS officers, chartered accountants, and so much more. Sri Chaitanya
            first surfaced on the academic horizon in 1986 and within a span of 40 years went
            on to become Asia&apos;s largest educational group.
          </p>
        </div>
      </section>

      <section className="bg-[#f7fafc] py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Our goal is to focus on the holistic development of each child, and to give them a
            competitive edge with the help of an extensive curriculum and dynamic teaching
            methodologies.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.label}
                  className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm"
                >
                  <Icon className="h-5 w-5 text-[#e53e3e] mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#1e3a5f]">{v.label}</h3>
                    <p className="text-sm text-gray-500">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            We endeavour to be the right mentor for aspirants, while also helping them develop a
            global perspective, with a keen interest in community life. We prepare students for
            competitive exams by providing in-depth knowledge of various subjects.
          </p>

          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">Management</h2>
          <p className="text-gray-600 leading-relaxed">
            Our management&apos;s futuristic vision, determination and leadership has enabled
            them to set new benchmarks, ultimately resulting in a world-class education system.
            Taking our founders&apos; vision further, our team of young, dynamic, determined
            leaders continue to groom our community of global learners, through methodologies
            that are an extraordinary blend of conventional and contemporary.
          </p>
        </div>
      </section>

      <section className="bg-[#1e3a5f] py-16">
        <div className="mx-auto max-w-4xl px-4 text-center text-white sm:px-6">
          <h2 className="text-2xl font-bold mb-4">Diversity</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            At Sri Chaitanya, we understand the importance of equal opportunity and it reflects
            in the constant rise in the percentage of female employees.
          </p>
          <div className="flex justify-center gap-8">
            <div>
              <div className="text-3xl font-bold text-[#f6ad55]">57%</div>
              <div className="text-sm text-gray-300">Female Employees</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#f6ad55]">43%</div>
              <div className="text-sm text-gray-300">Male Employees</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
