import React from "react";
import { Prescription } from "@/types";

interface PrescriptionStatsProps {
  prescriptions: Prescription[];
}

export default function PrescriptionStats({
  prescriptions,
}: PrescriptionStatsProps) {
  const stats = {
    total: prescriptions.length,
    active: prescriptions.filter((p) => p.status === "active").length,
    completed: prescriptions.filter((p) => p.status === "completed").length,
    cancelled: prescriptions.filter((p) => p.status === "cancelled").length,
    thisMonth: prescriptions.filter((p) => {
      const prescriptionDate = new Date(p.date);
      const now = new Date();
      return (
        prescriptionDate.getMonth() === now.getMonth() &&
        prescriptionDate.getFullYear() === now.getFullYear()
      );
    }).length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total de recetas */}
      <div className="bg-white rounded-xl p-4 shadow-derma-soft border border-derma-pink-200">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-2xl font-bold text-derma-gray-900">
              {stats.total}
            </div>
            <div className="text-sm text-derma-gray-500">Total Recetas</div>
          </div>
          <div className="w-10 h-10 bg-derma-pink-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-file-medical text-derma-pink-400"></i>
          </div>
        </div>
      </div>

      {/* Recetas activas */}
      <div className="bg-white rounded-xl p-4 shadow-derma-soft border border-derma-pink-200">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-2xl font-bold text-derma-gray-900">
              {stats.active}
            </div>
            <div className="text-sm text-derma-gray-500">Activas</div>
          </div>
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-play text-blue-500"></i>
          </div>
        </div>
      </div>

      {/* Recetas completadas */}
      <div className="bg-white rounded-xl p-4 shadow-derma-soft border border-derma-pink-200">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-2xl font-bold text-derma-gray-900">
              {stats.completed}
            </div>
            <div className="text-sm text-derma-gray-500">Completadas</div>
          </div>
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-check text-green-500"></i>
          </div>
        </div>
      </div>

      {/* Este mes */}
      <div className="bg-white rounded-xl p-4 shadow-derma-soft border border-derma-pink-200">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-2xl font-bold text-derma-gray-900">
              {stats.thisMonth}
            </div>
            <div className="text-sm text-derma-gray-500">Este mes</div>
          </div>
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-calendar-alt text-purple-500"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
