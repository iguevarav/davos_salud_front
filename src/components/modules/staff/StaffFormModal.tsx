"use client";

import React, { useState, useEffect } from "react";
import { Employee } from "@/types";
import Button from "@/components/ui/Button";

interface StaffFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (employee: Omit<Employee, "id">) => void;
  employee?: Employee | null;
  mode: "create" | "edit" | "view";
}

export default function StaffFormModal({
  isOpen,
  onClose,
  onSubmit,
  employee,
  mode,
}: StaffFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    role: "doctor" as "doctor" | "nurse" | "administrative",
    hireDate: "",
    status: "active" as "active" | "inactive",
  });

  // Inicializar formulario
  useEffect(() => {
    if (employee && (mode === "edit" || mode === "view")) {
      setFormData({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        specialty: employee.specialty || "",
        role: employee.role,
        hireDate: employee.hireDate.toISOString().split("T")[0],
        status: employee.status,
      });
    } else if (mode === "create") {
      setFormData({
        name: "",
        email: "",
        phone: "",
        specialty: "",
        role: "doctor",
        hireDate: new Date().toISOString().split("T")[0],
        status: "active",
      });
    }
  }, [employee, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      hireDate: new Date(formData.hireDate),
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
      ? "Nuevo Colaborador"
      : mode === "edit"
      ? "Editar Colaborador"
      : "Ver Colaborador";

  const specialties = {
    doctor: [
      "Dermatología General",
      "Dermatología Pediátrica",
      "Dermatología Estética",
      "Cirugía Dermatológica",
      "Oncodermatología",
    ],
    nurse: [
      "Enfermería Dermatológica",
      "Enfermería Estética",
      "Atención al Paciente",
    ],
    administrative: [
      "Recepcionista",
      "Administrativo",
      "Coordinador de Citas",
      "Gestión de Pacientes",
    ],
  };

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

            {/* Rol */}
            <div>
              <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                Rol *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={isViewMode}
                required
                className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent disabled:bg-derma-gray-50 disabled:text-derma-gray-500"
              >
                <option value="doctor">Médico</option>
                <option value="nurse">Enfermero/a</option>
                <option value="administrative">Administrativo</option>
              </select>
            </div>

            {/* Especialidad */}
            <div>
              <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                Especialidad/Cargo
              </label>
              <select
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                disabled={isViewMode}
                className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent disabled:bg-derma-gray-50 disabled:text-derma-gray-500"
              >
                <option value="">Seleccione una especialidad</option>
                {specialties[formData.role]?.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* Fecha de ingreso */}
            <div>
              <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                Fecha de ingreso *
              </label>
              <input
                type="date"
                name="hireDate"
                value={formData.hireDate}
                onChange={handleChange}
                disabled={isViewMode}
                required
                className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent disabled:bg-derma-gray-50 disabled:text-derma-gray-500"
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                Estado *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={isViewMode}
                required
                className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent disabled:bg-derma-gray-50 disabled:text-derma-gray-500"
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-derma-pink-200">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>

            {!isViewMode && (
              <Button type="submit">
                {mode === "create" ? (
                  <>
                    <i className="fas fa-plus mr-2"></i>
                    Crear Colaborador
                  </>
                ) : (
                  <>
                    <i className="fas fa-save mr-2"></i>
                    Guardar Cambios
                  </>
                )}
              </Button>
            )}

            {isViewMode && (
              <Button
                type="button"
                onClick={() => {
                  // Cambiar a modo edición
                  onClose();
                }}
              >
                <i className="fas fa-edit mr-2"></i>
                Editar Colaborador
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
