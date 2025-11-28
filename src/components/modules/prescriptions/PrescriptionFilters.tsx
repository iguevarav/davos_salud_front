"use client";

import React from "react";
import Card from "@/components/ui/Card";

interface PrescriptionFiltersProps {
  onFilterChange: (filters: any) => void;
}

export default function PrescriptionFilters({
  onFilterChange,
}: PrescriptionFiltersProps) {
  return (
    <Card className="p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-end">
        {/* Búsqueda por paciente */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-derma-gray-700 mb-2">
            Buscar receta
          </label>
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-derma-gray-400"></i>
            <input
              type="text"
              placeholder="Paciente, médico o diagnóstico..."
              className="w-full pl-10 pr-4 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent"
              onChange={(e) => onFilterChange({ search: e.target.value })}
            />
          </div>
        </div>

        {/* Filtro por estado */}
        <div className="w-full lg:w-48">
          <label className="block text-sm font-medium text-derma-gray-700 mb-2">
            Estado
          </label>
          <select
            className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent bg-white"
            onChange={(e) => onFilterChange({ status: e.target.value })}
          >
            <option value="">Todos</option>
            <option value="active">Activas</option>
            <option value="completed">Completadas</option>
            <option value="cancelled">Canceladas</option>
          </select>
        </div>

        {/* Filtro por fecha */}
        <div className="w-full lg:w-48">
          <label className="block text-sm font-medium text-derma-gray-700 mb-2">
            Fecha
          </label>
          <select
            className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent bg-white"
            onChange={(e) => onFilterChange({ dateRange: e.target.value })}
          >
            <option value="">Todas</option>
            <option value="today">Hoy</option>
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
            <option value="year">Este año</option>
          </select>
        </div>

        {/* Botón de limpiar filtros */}
        <button className="px-4 py-2 text-derma-gray-500 hover:text-derma-gray-700 transition-colors">
          <i className="fas fa-times mr-2"></i>
          Limpiar
        </button>
      </div>
    </Card>
  );
}
