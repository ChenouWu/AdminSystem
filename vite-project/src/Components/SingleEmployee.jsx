import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useEmployees } from "../store/Employees";
import { Mail, Building2, VenetianMask, Clock } from "lucide-react";

export default function SingleEmployee() {
  const { name } = useParams();
  const { state } = useLocation();
  const { searchingEmployee } = useEmployees();

  const [employee, setEmployee] = useState(state || null);
  const [loading, setLoading] = useState(!state);
  const [error, setError] = useState("");

  useEffect(() => {
  // If name changed, send a new request
  if (state?.name?.toLowerCase() === name.toLowerCase()) {
    setEmployee(state);
    setLoading(false);
    return;
  }

  let cancelled = false;
  async function fetchEmployee() {
    try {
      setLoading(true);
      const data = await searchingEmployee(name);
      if (!cancelled) setEmployee(data);
    } catch (err) {
      if (!cancelled) setError(err.message);
    } finally {
      if (!cancelled) setLoading(false);
    }
  }

  fetchEmployee();
  return () => (cancelled = true);
}, [name, state, searchingEmployee]);

  if (loading)
    return <div className="flex justify-center items-center h-screen text-neutral-500 animate-pulse">Loading…</div>;
  if (error)
    return <div className="flex justify-center items-center h-screen text-red-600">{error}</div>;
  if (!employee)
    return <div className="flex justify-center items-center h-screen text-neutral-500">No data</div>;

  const initials = employee.name
    ? employee.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "👤";

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="rounded-2xl border bg-white dark:bg-neutral-800 p-8 shadow-lg w-full max-w-xl">
        {/**/}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700 shadow">
            {initials}
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            {employee.name}
          </h1>
          <p className="text-sm text-neutral-500 break-all">ID:{employee._id}</p>
        </div>

     
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <InfoRow icon={<Mail className="h-4 w-4" />} label="Email" value={employee.email} />
          <InfoRow icon={<VenetianMask className="h-4 w-4" />} label="Gender" value={employee.gender} />
          <InfoRow icon={<Building2 className="h-4 w-4" />} label="Department" value={employee.department} />
          <InfoRow icon={<Clock className="h-4 w-4" />} label="Created" value={fmt(employee.createdAt)} />
          <InfoRow icon={<Clock className="h-4 w-4" />} label="Updated" value={fmt(employee.updatedAt)} />
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="rounded-lg border bg-neutral-100 dark:bg-neutral-700 p-4">
      <div className="flex items-center gap-2 text-neutral-500 text-xs mb-1">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 break-words">
        {value || "-"}
      </div>
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
