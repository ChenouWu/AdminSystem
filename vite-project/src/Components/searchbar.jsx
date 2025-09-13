// src/components/SearchBar.jsx
import { Search } from "lucide-react";
import { useState } from "react";
import { useEmployees } from "../store/Employees";
import { toast } from "react-hot-toast";

export default function SearchBar({ placeholder = "Search…", onSearch }) {
  const [value, setValue] = useState("");
  const {searchingEmployee}  = useEmployees()
 const handleSubmit = async (e) => {
    e.preventDefault();

    const name = value.trim();
    if (!name) return; // ✅ 空值不请求

    try {
      const data = await searchingEmployee(name);
      console.log(data)
      if(data === "Employee not found"){
        toast.error(`Employee not found`);
        setValue('')
      }
    
    } catch (err) {
      console.error("search error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 py-2 text-sm outline-none
                   focus:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
      />
    </form>
  );
}
