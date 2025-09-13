// src/pages/SingleEmployee.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Mail, User, Building2, VenetianMask, Trash2, Pencil } from "lucide-react";
import { useEmployees } from "../../store/Employees"; // ← 按你的实际路径修改
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export default function SingleEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { employees = [], deleteEmployee } = useEmployees();
  const cached = useMemo(
    () => employees.find((e) => (e._id || e.id) === id),
    [employees, id]
  );

  const [employee, setEmployee] = useState(cached || null);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cached) return; // 列表里已有数据
    let abort = false;

    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${API_BASE}/api/employees/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!abort) setEmployee(data);
      } catch (e) {
        if (!abort) setError(e.message || "Failed to load employee");
      } finally {
        if (!abort) setLoading(false);
      }
    })();

    return () => {
      abort = true;
    };
  }, [cached, id]);

  const handleDelete = async () => {
    
    try {
      await deleteEmployee?.(id);
      navigate("/employees");
    } catch (e) {
      alert("Delete failed");
    }
  };

  const e = employee;
  const initials = e?.name
    ? e.name.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase()
    : "👤";

  return (
    <div className="p-4">
      {/* Top bar */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm hover:bg-neutral-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-xl font-semibold">Employee Detail</h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/employees/${id}/edit`}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      {/* States */}
      {loading && <div className="h-32 animate-pulse rounded-xl bg-neutral-100" />}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}
      {!loading && !error && !e && (
        <div className="rounded-lg border px-4 py-6 text-center text-neutral-500">
          Employee not found.
        </div>
      )}

      {/* Card */}
      {!loading && !error && e && (
        <div className="rounded-xl border bg-white p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-200 text-lg font-bold">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="text-lg font-semibold">{e.name}</div>
              <div className="text-sm text-neutral-500">{e._id || e.id}</div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <InfoRow icon={<Mail className="h-4 w-4" />} label="Email" value={e.email} />
            <InfoRow icon={<VenetianMask className="h-4 w-4" />} label="Gender" value={e.gender} />
            <InfoRow icon={<Building2 className="h-4 w-4" />} label="Department" value={e.department} />
            <InfoRow icon={<User className="h-4 w-4" />} label="Created" value={fmt(e.createdAt)} />
            <InfoRow icon={<User className="h-4 w-4" />} label="Updated" value={fmt(e.updatedAt)} />
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="rounded-lg border bg-neutral-50 p-3">
      <div className="flex items-center gap-2 text-neutral-500 text-xs">
        {icon}
        <span>{label}</span>
      </div>
      <div className="mt-1 text-sm font-medium text-neutral-900">{value || "-"}</div>
    </div>
  );
}

function fmt(ts) {
  if (!ts) return "-";
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return String(ts);
  }
}
