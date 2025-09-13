import React from "react";
import { useRef, useState } from "react";
import { Menu, Bell, ChevronDown, User, LogOut } from "lucide-react";
import SearchBar from "./searchbar.jsx";

export default function Header({
  onToggleSidebar,
  breadcrumbs = ["Dashboard"],
  userName = "Admin",
  avatarUrl = "",
  onLogout,
  onSearch,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // 点击外部关闭菜单
  React.useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = userName
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-4">
        {/* Left: Sidebar toggle + Breadcrumbs */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-neutral-100"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          <nav className="hidden md:flex items-center text-sm text-neutral-500">
            {breadcrumbs.map((b, i) => (
              <div key={`${b}-${i}`} className="flex items-center">
                <span
                  className={`truncate max-w-[180px] ${
                    i === breadcrumbs.length - 1 ? "text-neutral-900 font-medium" : ""
                  }`}
                >
                  {b}
                </span>
                {i < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
              </div>
            ))}
          </nav>
        </div>

        {/* Search Bar */}
        <div className="mx-4 flex flex-1">
          <SearchBar onSearch={onSearch} placeholder="Search users, orders..." />
        </div>

        {/* Right side: Notifications + User Menu */}
        <div className="ml-auto flex items-center gap-2">
          <button
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-neutral-100"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-red-500" />
          </button>

          {/* Divider */}
          <div className="hidden md:block h-6 w-px bg-neutral-200 mx-1" />

          {/* User Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-neutral-100"
              onClick={() => setMenuOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              <div className="h-7 w-7 overflow-hidden rounded-full bg-neutral-200 flex items-center justify-center">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={userName} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xs font-semibold">{initials}</span>
                )}
              </div>
              <span className="hidden max-w-[140px] truncate text-sm md:inline">{userName}</span>
              <ChevronDown className="hidden h-4 w-4 text-neutral-400 md:inline" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg">
                <div className="px-3 py-2 text-sm font-medium">{userName}</div>
                <div className="h-px bg-neutral-200" />
                <button
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-neutral-100"
                  onClick={() => setMenuOpen(false)}
                >
                  <User className="h-4 w-4" /> Profile
                </button>
                <div className="h-px bg-neutral-200" />
                <button
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  onClick={() => {
                    setMenuOpen(false);
                    onLogout?.();
                  }}
                >
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
