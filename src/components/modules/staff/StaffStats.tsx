import React from "react";
import { Employee } from "@/types";

interface StaffStatsProps {
  employees: Employee[];
}

export default function StaffStats({ employees }: StaffStatsProps) {
  const stats = {
    total: employees.length,
    doctors: employees.filter((e) => e.role === "doctor").length,
    nurses: employees.filter((e) => e.role === "nurse").length,
    administrative: employees.filter((e) => e.role === "administrative").length,
    active: employees.filter((e) => e.status === "active").length,
    inactive: employees.filter((e) => e.status === "inactive").length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total de colaboradores */}
      <div className="bg-white rounded-xl p-4 shadow-derma-soft border border-derma-pink-200">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-2xl font-bold text-derma-gray-900">
              {stats.total}
            </div>
            <div className="text-sm text-derma-gray-500">
              Total Colaboradores
            </div>
          </div>
          <div className="w-10 h-10 bg-derma-pink-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-users text-derma-pink-400"></i>
          </div>
        </div>
      </div>

      {/* Médicos */}
      <div className="bg-white rounded-xl p-4 shadow-derma-soft border border-derma-pink-200">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-2xl font-bold text-derma-gray-900">
              {stats.doctors}
            </div>
            <div className="text-sm text-derma-gray-500">Médicos</div>
          </div>
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-user-md text-blue-500"></i>
          </div>
        </div>
      </div>

      {/* Enfermeros */}
      <div className="bg-white rounded-xl p-4 shadow-derma-soft border border-derma-pink-200">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-2xl font-bold text-derma-gray-900">
              {stats.nurses}
            </div>
            <div className="text-sm text-derma-gray-500">Enfermeros/as</div>
          </div>
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-user-nurse text-green-500"></i>
          </div>
        </div>
      </div>

      {/* Activos */}
      <div className="bg-white rounded-xl p-4 shadow-derma-soft border border-derma-pink-200">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-2xl font-bold text-derma-gray-900">
              {stats.active}
            </div>
            <div className="text-sm text-derma-gray-500">Activos</div>
          </div>
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-check-circle text-green-500"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
