import React from "react";
import { Patient } from "@/types";

interface PatientStatsProps {
  patients: Patient[];
}

export default function PatientStats({ patients }: PatientStatsProps) {
  const stats = {
    total: patients.length,
    female: patients.filter((p) => p.gender === "female").length,
    male: patients.filter((p) => p.gender === "male").length,
    thisMonth: patients.filter((p) => {
      const patientDate = new Date(p.createdAt);
      const now = new Date();
      return (
        patientDate.getMonth() === now.getMonth() &&
        patientDate.getFullYear() === now.getFullYear()
      );
    }).length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total de pacientes */}
      <div className="bg-white rounded-xl p-4 shadow-derma-soft border border-derma-pink-200">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-2xl font-bold text-derma-gray-900">
              {stats.total}
            </div>
            <div className="text-sm text-derma-gray-500">Total Pacientes</div>
          </div>
          <div className="w-10 h-10 bg-derma-pink-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-users text-derma-pink-400"></i>
          </div>
        </div>
      </div>

      {/* Pacientes mujeres */}
      <div className="bg-white rounded-xl p-4 shadow-derma-soft border border-derma-pink-200">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-2xl font-bold text-derma-gray-900">
              {stats.female}
            </div>
            <div className="text-sm text-derma-gray-500">Pacientes Mujeres</div>
          </div>
          <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-female text-pink-500"></i>
          </div>
        </div>
      </div>

      {/* Pacientes hombres */}
      <div className="bg-white rounded-xl p-4 shadow-derma-soft border border-derma-pink-200">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-2xl font-bold text-derma-gray-900">
              {stats.male}
            </div>
            <div className="text-sm text-derma-gray-500">Pacientes Hombres</div>
          </div>
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-male text-blue-500"></i>
          </div>
        </div>
      </div>

      {/* Nuevos este mes */}
      <div className="bg-white rounded-xl p-4 shadow-derma-soft border border-derma-pink-200">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-2xl font-bold text-derma-gray-900">
              {stats.thisMonth}
            </div>
            <div className="text-sm text-derma-gray-500">Nuevos este mes</div>
          </div>
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-user-plus text-green-500"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
