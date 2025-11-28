"use client";

import React from "react";
import { SidebarItem } from "@/types";

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", href: "/", icon: "fas fa-th-large", section: "main" },
  {
    label: "Pacientes",
    href: "/patients",
    icon: "far fa-user",
    section: "main",
  },

  // {
  //   label: "Citas",
  //   href: "/appointments",
  //   icon: "far fa-calendar",
  //   section: "main",
  // },
  // {
  //   label: "Historias Clínicas",
  //   href: "/medical-records",
  //   icon: "far fa-file-alt",
  //   section: "main",
  // },
  {
    label: "Recetas Medicas",
    href: "/prescriptions",
    icon: "far fa-file-alt",
    section: "main",
  },
  {
    label: "Personal",
    href: "/staff",
    icon: "fas fa-user-md",
    section: "management",
  },
  // {
  //   label: "Inventario",
  //   href: "/inventory",
  //   icon: "fas fa-box",
  //   section: "management",
  // },
  {
    label: "Configuración",
    href: "/settings",
    icon: "fas fa-cog",
    section: "management",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-derma-pink-200 h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto sidebar-scroll">
      <nav className="p-4">
        {/* Main Navigation */}
        <div className="space-y-1">
          {sidebarItems
            .filter((item) => item.section === "main")
            .map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                  item.href === "/"
                    ? "bg-derma-pink-50 text-derma-pink-500 border-r-2 border-derma-pink-400 font-medium"
                    : "text-derma-gray-500 hover:bg-derma-pink-50 hover:text-derma-pink-400"
                }`}
              >
                <i
                  className={`${item.icon} w-5 text-center group-hover:scale-110 transition-transform`}
                ></i>
                <span>{item.label}</span>
              </a>
            ))}
        </div>

        {/* Management Section */}
        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-derma-gray-400 uppercase tracking-wider mb-2">
            Gestión
          </h3>
          <div className="space-y-1">
            {sidebarItems
              .filter((item) => item.section === "management")
              .map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-derma-gray-500 hover:bg-derma-pink-50 hover:text-derma-pink-400 transition-all duration-200 group"
                >
                  <i
                    className={`${item.icon} w-5 text-center group-hover:scale-110 transition-transform`}
                  ></i>
                  <span>{item.label}</span>
                </a>
              ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
