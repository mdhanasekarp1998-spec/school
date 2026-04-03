"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface Board {
  id: string;
  name: string;
}

interface State {
  id: string;
  name: string;
}

interface City {
  id: string;
  name: string;
}

export default function SchoolFinderPreview() {
  const router = useRouter();
  const [boards, setBoards] = useState<Board[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [boardId, setBoardId] = useState("");
  const [stateId, setStateId] = useState("");
  const [cityId, setCityId] = useState("");

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

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (boardId) params.set("boardId", boardId);
    if (stateId) params.set("stateId", stateId);
    if (cityId) params.set("cityId", cityId);
    router.push(`/schools?${params.toString()}`);
  };

  return (
    <section className="relative -mt-10 z-10 mx-auto max-w-5xl px-4">
      <div className="rounded-2xl bg-white p-6 shadow-xl border border-gray-100">
        <h3 className="mb-4 text-lg font-semibold text-[#1e3a5f] text-center">
          Find a School Near You
        </h3>
        <div className="grid gap-4 md:grid-cols-4">
          <select
            value={boardId}
            onChange={(e) => setBoardId(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#1e3a5f] focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]"
          >
            <option value="">Select Board</option>
            {boards.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
          <select
            value={stateId}
            onChange={(e) => setStateId(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#1e3a5f] focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]"
          >
            <option value="">Select State</option>
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
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#1e3a5f] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#2c5282] transition-colors"
          >
            <Search className="h-4 w-4" />
            Find School
          </button>
        </div>
      </div>
    </section>
  );
}
