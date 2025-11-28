"use client";

import React from "react";
import { Employee } from "@/types";

interface ViewStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  onEdit: (employee: Employee) => void;
}

export default function ViewStaffModal({
  isOpen,
  onClose,
  employee,
  onEdit,
}: ViewStaffModalProps) {
  if (!isOpen || !employee) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateSeniority = (hireDate: Date) => {
    const today = new Date();
    const hire = new Date(hireDate);
    const years = today.getFullYear() - hire.getFullYear();
    const months = today.getMonth() - hire.getMonth();

    let seniority = "";
    if (years > 0) {
      seniority += `${years} año${years > 1 ? "s" : ""}`;
    }
    if (months > 0) {
      seniority += `${seniority ? " y " : ""}${months} mes${
        months > 1 ? "es" : ""
      }`;
    }

    return seniority || "Menos de 1 mes";
  };

  const getRoleLabel = (role: string) => {
    const roles = {
      doctor: "Médico",
      nurse: "Enfermero/a",
      administrative: "Administrativo",
    };
    return roles[role as keyof typeof roles] || role;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-derma-pink-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-derma-pink-300 to-derma-pink-400 rounded-xl flex items-center justify-center text-white font-semibold text-lg">
              {employee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-derma-gray-900">
                {employee.name}
              </h2>
              <p className="text-derma-gray-500 text-sm">
                {getRoleLabel(employee.role)} •{" "}
                {employee.status === "active" ? "Activo" : "Inactivo"}
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
                  <p className="text-derma-gray-900">{employee.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-derma-gray-500">
                    Teléfono
                  </label>
                  <p className="text-derma-gray-900">{employee.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-derma-gray-500">
                    Especialidad/Cargo
                  </label>
                  <p className="text-derma-gray-900">
                    {employee.specialty || "No especificada"}
                  </p>
                </div>
              </div>
            </div>

            {/* Información laboral */}
            <div className="space-y-4">
              <h3 className="font-semibold text-derma-gray-900 flex items-center gap-2">
                <i className="fas fa-briefcase text-derma-pink-400"></i>
                Información laboral
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-derma-gray-500">
                    Rol
                  </label>
                  <p className="text-derma-gray-900">
                    {getRoleLabel(employee.role)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-derma-gray-500">
                    Fecha de ingreso
                  </label>
                  <p className="text-derma-gray-900">
                    {formatDate(employee.hireDate)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-derma-gray-500">
                    Antigüedad
                  </label>
                  <p className="text-derma-gray-900">
                    {calculateSeniority(employee.hireDate)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-derma-gray-500">
                    Estado
                  </label>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      employee.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <i
                      className={`fas fa-circle text-[8px] mr-1 ${
                        employee.status === "active"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    ></i>
                    {employee.status === "active" ? "Activo" : "Inactivo"}
                  </span>
                </div>
              </div>
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
            onClick={() => onEdit(employee)}
            className="px-4 py-2 bg-derma-pink-300 text-white rounded-lg hover:bg-derma-pink-400 transition-colors flex items-center gap-2"
          >
            <i className="fas fa-edit"></i>
            Editar Colaborador
          </button>
        </div>
      </div>
    </div>
  );
}
