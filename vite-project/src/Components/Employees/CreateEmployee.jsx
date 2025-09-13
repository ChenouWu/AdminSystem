// src/pages/CreateEmployee.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEmployees } from "../../store/Employees.js"; // ← 按你的实际路径修改

const GENDERS = ["male", "female", "other"];
const DEPARTMENTS = ["HR", "Engineering", "Sales", "Marketing", "Finance"];

export default function CreateEmployee() {
  const navigate = useNavigate();
  const { createEmployee, loading, error } = useEmployees();

  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "male",
    department: "Engineering",
  });
  const [success, setSuccess] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    const res = await createEmployee(form);
    if (res?.success) {
      setSuccess("Employee created successfully!");
      setTimeout(() => navigate("/employees"), 800);
    }
  };

  return (
    <div className="min-h-screen w-full bg-neutral-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-xl border bg-white p-6 shadow">
        <h1 className="mb-4 text-xl font-semibold text-neutral-900 text-center">
          Create Employee
        </h1>

        {error && (
          <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              required
              placeholder="Alice"
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
              placeholder="alice@example.com"
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={onChange}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400"
              >
                {GENDERS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Department</label>
              <select
                name="department"
                value={form.department}
                onChange={onChange}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create"}
            </button>
            <button
              type="button"
              onClick={() =>
                setForm({ name: "", email: "", gender: "male", department: "Engineering" })
              }
              className="rounded-lg border px-4 py-2 text-sm hover:bg-neutral-50"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
