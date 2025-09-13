import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, RefreshCw, Plus } from "lucide-react";
import { useEmployees } from "../../store/Employees";

export default function GetAllEmployees() {
  const { employees = [], loading, error, fetchAllEmployees, deleteEmployee } = useEmployees();

  useEffect(() => {
    fetchAllEmployees();
  }, [fetchAllEmployees]);

  return (
    <div className="space-y-4 p-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Employees</h1>

        <div className="flex items-center gap-2">
          <Link
            to="/createEmployee"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Employee
          </Link>
          <button
            onClick={() => fetchAllEmployees()}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* States */}
      {loading && <div className="h-24 animate-pulse rounded-lg bg-neutral-100" />}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
          <table className="min-w-full divide-y divide-neutral-200 text-sm">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-neutral-600">Name</th>
                <th className="px-4 py-2 text-left font-medium text-neutral-600">Email</th>
                <th className="px-4 py-2 text-left font-medium text-neutral-600">Gender</th>
                <th className="px-4 py-2 text-left font-medium text-neutral-600">Department</th>
                <th className="px-4 py-2 text-right font-medium text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {employees.map((e) => (
                <tr key={e._id || e.id}>
                  <td className="px-4 py-2">{e.name}</td>
                  <td className="px-4 py-2">{e.email}</td>
                  <td className="px-4 py-2">{e.gender || "-"}</td>
                  <td className="px-4 py-2">{e.department || "-"}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => {
                        if (confirm("Delete this employee?")) deleteEmployee(e._id || e.id);
                      }}
                      className="inline-flex items-center rounded-lg p-1 hover:bg-neutral-100"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}

              {employees.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-neutral-500">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
