"use client";

import React, { useState, useEffect } from "react";
import { Patient } from "@/types";
import Button from "@/components/ui/Button";

interface PatientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (patient: Omit<Patient, "id" | "createdAt" | "updatedAt">) => void;
  patient?: Patient | null;
  mode: "create" | "edit" | "view";
}

export default function PatientFormModal({
  isOpen,
  onClose,
  onSubmit,
  patient,
  mode,
}: PatientFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "" as "male" | "female" | "other",
    medicalHistory: "",
  });

  // Inicializar formulario cuando se abre el modal o cambia el paciente
  useEffect(() => {
    if (patient && (mode === "edit" || mode === "view")) {
      setFormData({
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        dateOfBirth: patient.dateOfBirth.toISOString().split("T")[0],
        gender: patient.gender,
        medicalHistory: patient.medicalHistory || "",
      });
    } else if (mode === "create") {
      setFormData({
        name: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "female",
        medicalHistory: "",
      });
    }
  }, [patient, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      dateOfBirth: new Date(formData.dateOfBirth),
    });
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  const isViewMode = mode === "view";
  const title =
    mode === "create"
      ? "Nuevo Paciente"
      : mode === "edit"
      ? "Editar Paciente"
      : "Ver Paciente";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-derma-pink-200">
          <h2 className="text-xl font-semibold text-derma-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-derma-pink-50 flex items-center justify-center transition-colors"
          >
            <i className="fas fa-times text-derma-gray-400"></i>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                Nombre completo *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isViewMode}
                required
                className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent disabled:bg-derma-gray-50 disabled:text-derma-gray-500"
                placeholder="Ingrese el nombre completo"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isViewMode}
                required
                className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent disabled:bg-derma-gray-50 disabled:text-derma-gray-500"
                placeholder="email@ejemplo.com"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                Teléfono *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isViewMode}
                required
                className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent disabled:bg-derma-gray-50 disabled:text-derma-gray-500"
                placeholder="+34 612 345 678"
              />
            </div>

            {/* Fecha de nacimiento */}
            <div>
              <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                Fecha de nacimiento *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                disabled={isViewMode}
                required
                className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent disabled:bg-derma-gray-50 disabled:text-derma-gray-500"
              />
            </div>

            {/* Género */}
            <div>
              <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                Género *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={isViewMode}
                required
                className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent disabled:bg-derma-gray-50 disabled:text-derma-gray-500"
              >
                <option value="female">Mujer</option>
                <option value="male">Hombre</option>
                <option value="other">Otro</option>
              </select>
            </div>

            {/* Historia médica */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                Historia médica
              </label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                disabled={isViewMode}
                rows={4}
                className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent disabled:bg-derma-gray-50 disabled:text-derma-gray-500 resize-none"
                placeholder="Alergias, condiciones médicas previas, tratamientos anteriores..."
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-derma-pink-200">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>

            {!isViewMode && (
              <button
                type="submit"
                className="px-4 py-2 bg-derma-pink-500 text-white rounded-lg hover:bg-derma-pink-600 transition-colors font-medium"
              >
                {mode === "create" ? (
                  <>
                    <i className="fas fa-plus mr-2"></i>
                    Crear Paciente
                  </>
                ) : (
                  <>
                    <i className="fas fa-save mr-2"></i>
                    Guardar Cambios
                  </>
                )}
              </button>
            )}

            {isViewMode && (
              <Button
                onClick={() => {
                  // Aquí podrías cambiar a modo edición o redirigir
                  onClose();
                }}
              >
                <i className="fas fa-edit mr-2"></i>
                Editar Paciente
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
