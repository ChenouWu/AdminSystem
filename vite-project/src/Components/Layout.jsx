import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Header + main */}
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4 bg-gray-50 dark:bg-neutral-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
