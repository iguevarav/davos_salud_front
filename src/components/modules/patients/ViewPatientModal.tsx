"use client";

import React from "react";
import { Patient } from "@/types";

interface ViewPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
  onEdit: (patient: Patient) => void;
}

export default function ViewPatientModal({
  isOpen,
  onClose,
  patient,
  onEdit,
}: ViewPatientModalProps) {
  if (!isOpen || !patient) return null;

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-derma-pink-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-derma-pink-300 to-derma-pink-400 rounded-xl flex items-center justify-center text-white font-semibold text-lg">
              {patient.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-derma-gray-900">
                {patient.name}
              </h2>
              <p className="text-derma-gray-500 text-sm">
                {calculateAge(patient.dateOfBirth)} años •{" "}
                {patient.gender === "female"
                  ? "Mujer"
                  : patient.gender === "male"
                  ? "Hombre"
                  : "Otro"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-derma-pink-50 flex items-center justify-center transition-colors"
          >
            <i className="fas fa-times text-derma-gray-400"></i>
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Información de contacto */}
            <div className="space-y-4">
              <h3 className="font-semibold text-derma-gray-900 flex items-center gap-2">
                <i className="fas fa-address-card text-derma-pink-400"></i>
                Información de contacto
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-derma-gray-500">
                    Email
                  </label>
                  <p className="text-derma-gray-900">{patient.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-derma-gray-500">
                    Teléfono
                  </label>
                  <p className="text-derma-gray-900">{patient.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-derma-gray-500">
                    Fecha de nacimiento
                  </label>
                  <p className="text-derma-gray-900">
                    {formatDate(patient.dateOfBirth)}
                  </p>
                </div>
              </div>
            </div>

            {/* Información del registro */}
            <div className="space-y-4">
              <h3 className="font-semibold text-derma-gray-900 flex items-center gap-2">
                <i className="fas fa-clipboard-list text-derma-pink-400"></i>
                Información del registro
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-derma-gray-500">
                    ID del paciente
                  </label>
                  <p className="text-derma-gray-900 font-mono text-sm">
                    {patient.id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-derma-gray-500">
                    Fecha de registro
                  </label>
                  <p className="text-derma-gray-900">
                    {formatDate(patient.createdAt)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-derma-gray-500">
                    Última actualización
                  </label>
                  <p className="text-derma-gray-900">
                    {formatDate(patient.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Historia médica */}
          <div className="space-y-4">
            <h3 className="font-semibold text-derma-gray-900 flex items-center gap-2">
              <i className="fas fa-file-medical text-derma-pink-400"></i>
              Historia médica
            </h3>

            <div className="bg-derma-gray-50 rounded-lg p-4">
              {patient.medicalHistory ? (
                <p className="text-derma-gray-700 whitespace-pre-wrap">
                  {patient.medicalHistory}
                </p>
              ) : (
                <p className="text-derma-gray-400 italic">
                  No hay información médica registrada.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-derma-pink-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-derma-gray-500 hover:text-derma-gray-700 transition-colors"
          >
            Cerrar
          </button>
          <button
            onClick={() => onEdit(patient)}
            className="px-4 py-2 bg-derma-pink-300 text-white rounded-lg hover:bg-derma-pink-400 transition-colors flex items-center gap-2"
          >
            <i className="fas fa-edit"></i>
            Editar Paciente
          </button>
        </div>
      </div>
    </div>
  );
}
