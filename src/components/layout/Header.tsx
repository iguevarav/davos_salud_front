"use client";

import React from "react";

export default function Header() {
  return (
    <header className="bg-white px-6 py-4 shadow-derma-soft border-b border-derma-pink-200 sticky top-0 z-1000 rounded-b-2xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-derma-pink-300 rounded-xl flex items-center justify-center text-white animation-float">
            <i className="fas fa-spa text-lg"></i>
          </div>
          <h1 className="text-xl font-semibold text-derma-gray-900">
            Davos Salud
          </h1>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-derma-gray-400"></i>
            <input
              type="text"
              placeholder="Buscar pacientes, tratamientos..."
              className="w-full pl-10 pr-4 py-2 bg-derma-gray-50 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent text-derma-gray-900 placeholder-derma-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative w-10 h-10 rounded-lg bg-derma-gray-50 hover:bg-derma-pink-100 flex items-center justify-center transition-colors group">
            <i className="far fa-bell text-derma-gray-500 group-hover:text-derma-pink-400"></i>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-derma-pink-400 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          <button className="relative w-10 h-10 rounded-lg bg-derma-gray-50 hover:bg-derma-pink-100 flex items-center justify-center transition-colors group">
            <i className="far fa-envelope text-derma-gray-500 group-hover:text-derma-pink-400"></i>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-derma-pink-400 text-white text-xs rounded-full flex items-center justify-center">
              5
            </span>
          </button>

          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-derma-pink-50 cursor-pointer transition-colors group">
            <div className="w-9 h-9 bg-gradient-to-br from-derma-pink-300 to-derma-pink-400 rounded-lg flex items-center justify-center text-white font-semibold text-sm shadow-md">
              DR
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-derma-gray-900">
                Dra. Rosa López
              </p>
              <p className="text-xs text-derma-gray-400">Dermatóloga</p>
            </div>
            <i className="fas fa-chevron-down text-derma-gray-400 text-xs hidden md:block"></i>
          </div>
        </div>
      </div>
    </header>
  );
}
