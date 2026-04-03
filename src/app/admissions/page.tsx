"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { CheckCircle, Loader2 } from "lucide-react";

const schema = z.object({
  academicYear: z.string().min(1, "Required"),
  boardId: z.string().min(1, "Required"),
  stateId: z.string().min(1, "Required"),
  cityId: z.string().min(1, "Required"),
  schoolId: z.string().min(1, "Required"),
  grade: z.string().min(1, "Required"),
  studentName: z.string().min(2, "Min 2 characters"),
  gender: z.string().min(1, "Required"),
  parentName: z.string().min(2, "Min 2 characters"),
  email: z.email("Invalid email"),
  phone: z.string().min(10, "Min 10 digits"),
});

type FormData = z.infer<typeof schema>;

interface SelectOption { id: string; name: string; }
interface School { id: string; name: string; }

const grades = [
  "Nursery", "LKG", "UKG",
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
];

export default function AdmissionsPage() {
  const [boards, setBoards] = useState<SelectOption[]>([]);
  const [states, setStates] = useState<SelectOption[]>([]);
  const [cities, setCities] = useState<SelectOption[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { academicYear: "2026-2027" },
  });

  const stateId = watch("stateId");
  const cityId = watch("cityId");
  const boardId = watch("boardId");

  useEffect(() => {
    fetch("/api/boards").then((r) => r.json()).then(setBoards).catch(() => {});
    fetch("/api/states").then((r) => r.json()).then(setStates).catch(() => {});
  }, []);

  useEffect(() => {
    if (stateId) {
      fetch(`/api/cities?stateId=${stateId}`).then((r) => r.json()).then(setCities).catch(() => {});
    } else {
      setCities([]);
    }
    setValue("cityId", "");
    setValue("schoolId", "");
  }, [stateId, setValue]);

  useEffect(() => {
    if (cityId) {
      const params = new URLSearchParams({ cityId });
      if (boardId) params.set("boardId", boardId);
      fetch(`/api/schools?${params.toString()}`).then((r) => r.json()).then(setSchools).catch(() => {});
    } else {
      setSchools([]);
    }
    setValue("schoolId", "");
  }, [cityId, boardId, setValue]);

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div>
        <section className="bg-gradient-to-br from-[#1e3a5f] to-[#2c5282] py-16">
          <div className="mx-auto max-w-7xl px-4 text-center text-white">
            <h1 className="text-4xl font-bold">Admissions</h1>
          </div>
        </section>
        <div className="mx-auto max-w-lg px-4 py-20 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Enquiry Submitted Successfully!
          </h2>
          <p className="text-gray-600 mb-8">
            Thank you for your interest. Our admissions team will contact you shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="rounded-lg bg-[#1e3a5f] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#2c5282]"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-1 ${
      hasError
        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:border-[#1e3a5f] focus:ring-[#1e3a5f]"
    }`;

  return (
    <div>
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#2c5282] py-16">
        <div className="mx-auto max-w-7xl px-4 text-center text-white">
          <h1 className="text-4xl font-bold">Admissions</h1>
          <p className="mt-2 text-gray-200">Academic Year 2026-2027</p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
          <h2 className="text-xl font-bold text-[#1e3a5f] mb-6">Admission Enquiry Form</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Academic Year *
                </label>
                <select {...register("academicYear")} className={fieldClass(!!errors.academicYear)}>
                  <option value="2026-2027">2026-2027</option>
                </select>
                {errors.academicYear && <p className="mt-1 text-xs text-red-500">{errors.academicYear.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Board *</label>
                <select {...register("boardId")} className={fieldClass(!!errors.boardId)}>
                  <option value="">Select Board</option>
                  {boards.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
                {errors.boardId && <p className="mt-1 text-xs text-red-500">{errors.boardId.message}</p>}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                <select {...register("stateId")} className={fieldClass(!!errors.stateId)}>
                  <option value="">Select State</option>
                  {states.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                {errors.stateId && <p className="mt-1 text-xs text-red-500">{errors.stateId.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <select {...register("cityId")} className={fieldClass(!!errors.cityId)} disabled={!stateId}>
                  <option value="">Select City</option>
                  {cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                {errors.cityId && <p className="mt-1 text-xs text-red-500">{errors.cityId.message}</p>}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">School *</label>
                <select {...register("schoolId")} className={fieldClass(!!errors.schoolId)} disabled={!cityId}>
                  <option value="">Select School</option>
                  {schools.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                {errors.schoolId && <p className="mt-1 text-xs text-red-500">{errors.schoolId.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade *</label>
                <select {...register("grade")} className={fieldClass(!!errors.grade)}>
                  <option value="">Select Grade</option>
                  {grades.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
                {errors.grade && <p className="mt-1 text-xs text-red-500">{errors.grade.message}</p>}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Name *</label>
                <input type="text" {...register("studentName")} className={fieldClass(!!errors.studentName)} placeholder="Enter student name" />
                {errors.studentName && <p className="mt-1 text-xs text-red-500">{errors.studentName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                <select {...register("gender")} className={fieldClass(!!errors.gender)}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent/Guardian Name *</label>
              <input type="text" {...register("parentName")} className={fieldClass(!!errors.parentName)} placeholder="Enter parent name" />
              {errors.parentName && <p className="mt-1 text-xs text-red-500">{errors.parentName.message}</p>}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" {...register("email")} className={fieldClass(!!errors.email)} placeholder="parent@example.com" />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input type="tel" {...register("phone")} className={fieldClass(!!errors.phone)} placeholder="9876543210" />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-[#e53e3e] px-6 py-3 text-sm font-semibold text-white hover:bg-[#c53030] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? "Submitting..." : "Submit Enquiry"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
