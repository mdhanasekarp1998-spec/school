"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, Phone, BookOpen } from "lucide-react";

interface School {
  id: string;
  name: string;
  address: string;
  phone: string;
  board: { id: string; name: string };
  city: { id: string; name: string; state: { id: string; name: string } };
}

interface Board { id: string; name: string; }
interface State { id: string; name: string; }
interface City { id: string; name: string; }

function SchoolsContent() {
  const searchParams = useSearchParams();
  const [schools, setSchools] = useState<School[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [boardId, setBoardId] = useState(searchParams.get("boardId") || "");
  const [stateId, setStateId] = useState(searchParams.get("stateId") || "");
  const [cityId, setCityId] = useState(searchParams.get("cityId") || "");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

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
    setCityId("");
  }, [stateId]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (boardId) params.set("boardId", boardId);
    if (stateId) params.set("stateId", stateId);
    if (cityId) params.set("cityId", cityId);
    if (searchText) params.set("search", searchText);

    fetch(`/api/schools?${params.toString()}`)
      .then((r) => r.json())
      .then(setSchools)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [boardId, stateId, cityId, searchText]);

  return (
    <div>
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#2c5282] py-16">
        <div className="mx-auto max-w-7xl px-4 text-center text-white">
          <h1 className="text-4xl font-bold">Find a School</h1>
          <p className="mt-2 text-gray-200">Search across 950+ schools in 22 states</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-xl bg-white p-6 shadow-md border border-gray-100">
          <div className="grid gap-4 md:grid-cols-5">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search school name..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:border-[#1e3a5f] focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]"
              />
            </div>
            <select
              value={boardId}
              onChange={(e) => setBoardId(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#1e3a5f] focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]"
            >
              <option value="">All Boards</option>
              {boards.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
            <select
              value={stateId}
              onChange={(e) => setStateId(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#1e3a5f] focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]"
            >
              <option value="">All States</option>
              {states.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <select
              value={cityId}
              onChange={(e) => setCityId(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#1e3a5f] focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]"
              disabled={!stateId}
            >
              <option value="">All Cities</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse rounded-xl bg-gray-100 p-6 h-48" />
            ))}
          </div>
        ) : schools.length === 0 ? (
          <div className="text-center py-16">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No schools found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search filters</p>
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm text-gray-500">{schools.length} school(s) found</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {schools.map((school) => (
                <div
                  key={school.id}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base font-semibold text-[#1e3a5f] leading-tight">
                      {school.name}
                    </h3>
                    <span className="shrink-0 ml-2 rounded-full bg-[#1e3a5f]/10 px-2.5 py-0.5 text-xs font-medium text-[#1e3a5f]">
                      {school.board.name}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gray-400" />
                      <span>{school.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 shrink-0 text-gray-400" />
                      <span>{school.city.name}, {school.city.state.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0 text-gray-400" />
                      <span>{school.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default function SchoolsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SchoolsContent />
    </Suspense>
  );
}
