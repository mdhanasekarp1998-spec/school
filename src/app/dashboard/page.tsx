"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, SessionProvider } from "next-auth/react";
import { signOut } from "next-auth/react";
import {
  Users,
  School,
  FileText,
  Trophy,
  LogOut,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

interface Enquiry {
  id: string;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  grade: string;
  gender: string;
  status: string;
  createdAt: string;
  board: { name: string };
  school: { name: string; city: { name: string; state: { name: string } } };
}

function DashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/admissions")
        .then((r) => r.json())
        .then(setEnquiries)
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [status]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/admissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#1e3a5f]" />
      </div>
    );
  }

  if (!session) return null;

  const stats = [
    { label: "Total Enquiries", value: enquiries.length, icon: FileText, color: "bg-blue-500" },
    { label: "New", value: enquiries.filter((e) => e.status === "NEW").length, icon: Clock, color: "bg-yellow-500" },
    { label: "Contacted", value: enquiries.filter((e) => e.status === "CONTACTED").length, icon: Users, color: "bg-green-500" },
    { label: "Enrolled", value: enquiries.filter((e) => e.status === "ENROLLED").length, icon: CheckCircle, color: "bg-purple-500" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "NEW": return "bg-yellow-100 text-yellow-700";
      case "CONTACTED": return "bg-blue-100 text-blue-700";
      case "ENROLLED": return "bg-green-100 text-green-700";
      case "REJECTED": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fafc]">
      <div className="bg-white border-b shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-bold text-[#1e3a5f]">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome, {session.user?.name}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-xl bg-white p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${stat.color}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Admission Enquiries</h2>
          </div>

          {enquiries.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No enquiries yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-6 py-3 font-medium text-gray-500">Student</th>
                    <th className="px-6 py-3 font-medium text-gray-500">School</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Grade</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Contact</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Status</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {enquiries.map((enquiry) => (
                    <tr key={enquiry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{enquiry.studentName}</div>
                        <div className="text-xs text-gray-500">{enquiry.parentName} (Parent)</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{enquiry.school.name}</div>
                        <div className="text-xs text-gray-500">
                          {enquiry.school.city.name}, {enquiry.school.city.state.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{enquiry.grade}</td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{enquiry.email}</div>
                        <div className="text-xs text-gray-500">{enquiry.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusBadge(enquiry.status)}`}>
                          {enquiry.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          {enquiry.status === "NEW" && (
                            <button
                              onClick={() => updateStatus(enquiry.id, "CONTACTED")}
                              className="rounded bg-blue-50 px-2 py-1 text-xs text-blue-600 hover:bg-blue-100"
                            >
                              Contact
                            </button>
                          )}
                          {enquiry.status === "CONTACTED" && (
                            <button
                              onClick={() => updateStatus(enquiry.id, "ENROLLED")}
                              className="rounded bg-green-50 px-2 py-1 text-xs text-green-600 hover:bg-green-100"
                            >
                              Enroll
                            </button>
                          )}
                          {enquiry.status !== "REJECTED" && enquiry.status !== "ENROLLED" && (
                            <button
                              onClick={() => updateStatus(enquiry.id, "REJECTED")}
                              className="rounded bg-red-50 px-2 py-1 text-xs text-red-600 hover:bg-red-100"
                            >
                              Reject
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <SessionProvider>
      <DashboardContent />
    </SessionProvider>
  );
}
