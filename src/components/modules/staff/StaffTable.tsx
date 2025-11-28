"use client";

import React, { useState } from "react";
import { Employee } from "@/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import StaffFormModal from "./StaffFormModal";
import ViewStaffModal from "./ViewStaffModal";

interface StaffTableProps {
  employees: Employee[];
  onEmployeeUpdate: (employees: Employee[]) => void;
}

export default function StaffTable({
  employees,
  onEmployeeUpdate,
}: StaffTableProps) {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [modalState, setModalState] = useState<{
    type: "create" | "edit" | "view" | null;
    employee: Employee | null;
  }>({ type: null, employee: null });

  // Funciones para abrir modales
  const openCreateModal = () =>
    setModalState({ type: "create", employee: null });
  const openViewModal = (employee: Employee) =>
    setModalState({ type: "view", employee });
  const openEditModal = (employee: Employee) =>
    setModalState({ type: "edit", employee });
  const closeModal = () => setModalState({ type: null, employee: null });

  // Función para manejar la creación/edición de empleados
  const handleEmployeeSubmit = (employeeData: Omit<Employee, "id">) => {
    if (modalState.type === "create") {
      // Crear nuevo empleado
      const newEmployee: Employee = {
        ...employeeData,
        id: Math.random().toString(36).substr(2, 9),
      };
      onEmployeeUpdate([...employees, newEmployee]);
    } else if (modalState.type === "edit" && modalState.employee) {
      // Editar empleado existente
      const updatedEmployees = employees.map((e) =>
        e.id === modalState.employee!.id ? { ...e, ...employeeData } : e
      );
      onEmployeeUpdate(updatedEmployees);
    }
  };

  // Función para eliminar empleados
  const handleDeleteEmployees = () => {
    if (selectedEmployees.length > 0) {
      const updatedEmployees = employees.filter(
        (e) => !selectedEmployees.includes(e.id)
      );
      onEmployeeUpdate(updatedEmployees);
      setSelectedEmployees([]);
    }
  };

  const toggleEmployeeSelection = (employeeId: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      doctor: { color: "bg-blue-100 text-blue-800", label: "Médico" },
      nurse: { color: "bg-green-100 text-green-800", label: "Enfermero/a" },
      administrative: {
        color: "bg-purple-100 text-purple-800",
        label: "Administrativo",
      },
    };

    const config = roleConfig[role as keyof typeof roleConfig] || {
      color: "bg-gray-100 text-gray-800",
      label: role,
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          status === "active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        <i
          className={`fas fa-circle text-[8px] mr-1 ${
            status === "active" ? "text-green-500" : "text-red-500"
          }`}
        ></i>
        {status === "active" ? "Activo" : "Inactivo"}
      </span>
    );
  };

  return (
    <>
      <Card className="p-6">
        {/* Header de la tabla */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-derma-gray-900">
            Lista de Colaboradores ({employees.length})
          </h3>
          <Button onClick={openCreateModal}>
            <i className="fas fa-plus mr-2"></i>
            Nuevo Colaborador
          </Button>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-derma-pink-200">
                <th className="text-left py-3 px-4 w-12">
                  <input
                    type="checkbox"
                    className="rounded border-derma-pink-300 text-derma-pink-400 focus:ring-derma-pink-300"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedEmployees(employees.map((e) => e.id));
                      } else {
                        setSelectedEmployees([]);
                      }
                    }}
                    checked={
                      selectedEmployees.length === employees.length &&
                      employees.length > 0
                    }
                  />
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-derma-gray-500">
                  Colaborador
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-derma-gray-500">
                  Contacto
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-derma-gray-500">
                  Especialidad
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-derma-gray-500">
                  Rol
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-derma-gray-500">
                  Fecha Ingreso
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-derma-gray-500">
                  Estado
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-derma-gray-500">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-derma-pink-100">
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="hover:bg-derma-pink-50 transition-colors duration-200"
                >
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(employee.id)}
                      onChange={() => toggleEmployeeSelection(employee.id)}
                      className="rounded border-derma-pink-300 text-derma-pink-400 focus:ring-derma-pink-300"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-derma-pink-300 to-derma-pink-400 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium text-derma-gray-900 text-sm">
                          {employee.name}
                        </div>
                        <div className="text-derma-gray-400 text-xs">
                          ID: {employee.id.slice(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-derma-gray-900">
                      {employee.email}
                    </div>
                    <div className="text-derma-gray-400 text-xs">
                      {employee.phone}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-derma-gray-900">
                    {employee.specialty || "No especificada"}
                  </td>
                  <td className="py-3 px-4">{getRoleBadge(employee.role)}</td>
                  <td className="py-3 px-4 text-sm text-derma-gray-600">
                    {formatDate(employee.hireDate)}
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(employee.status)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openViewModal(employee)}
                        className="w-8 h-8 rounded-lg bg-derma-pink-50 text-derma-pink-500 hover:bg-derma-pink-100 flex items-center justify-center transition-colors"
                      >
                        <i className="far fa-eye text-sm"></i>
                      </button>
                      <button
                        onClick={() => openEditModal(employee)}
                        className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition-colors"
                      >
                        <i className="far fa-edit text-sm"></i>
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-green-50 text-green-500 hover:bg-green-100 flex items-center justify-center transition-colors">
                        <i className="fas fa-calendar-alt text-sm"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer de la tabla */}
        {selectedEmployees.length > 0 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-derma-pink-200">
            <div className="text-sm text-derma-gray-500">
              {selectedEmployees.length} colaborador(es) seleccionado(s)
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <i className="fas fa-envelope mr-2"></i>
                Enviar notificación
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteEmployees}
              >
                <i className="fas fa-trash mr-2"></i>
                Eliminar selección
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Modales */}
      <StaffFormModal
        isOpen={modalState.type === "create" || modalState.type === "edit"}
        onClose={closeModal}
        onSubmit={handleEmployeeSubmit}
        employee={modalState.employee}
        mode={modalState.type as "create" | "edit"}
      />

      <ViewStaffModal
        isOpen={modalState.type === "view"}
        onClose={closeModal}
        employee={modalState.employee}
        onEdit={openEditModal}
      />
    </>
  );
}
