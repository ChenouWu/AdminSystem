import { useState } from "react";
import { LayoutDashboard, Users} from "lucide-react";
import { NavLink } from "react-router-dom"; 

export default function Sidebar({ collapsed = false,  }) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const links = [
    { to: "/mainboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/employees", label: "Employees", icon: <Users size={18} /> },

  ];

  return (
    <aside
      className={`h-screen border-r bg-white dark:bg-neutral-900 dark:border-neutral-800 
                  transition-all duration-300 ${isCollapsed ? "w-16" : "w-60"}`}
    >
     
      <div className="flex items-center justify-between p-4 border-b dark:border-neutral-800">
        {!isCollapsed && <span className="text-lg font-bold">Admin</span>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="rounded-md p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          aria-label="Toggle sidebar"
        >
         
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

     
      <nav className="flex flex-col p-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors 
              hover:bg-neutral-100 dark:hover:bg-neutral-800 
              ${isActive ? "bg-neutral-100 font-medium dark:bg-neutral-800" : ""}`
            }
          >
            {link.icon}
            {!isCollapsed && <span>{link.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
