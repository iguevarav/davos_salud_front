"use client";

import React, { useState } from "react";
import { Prescription } from "@/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import PrescriptionFormModal from "./PrescriptionFormModal";
import ViewPrescriptionModal from "./ViewPrescriptionModal";

interface PrescriptionTableProps {
  prescriptions: Prescription[];
  onPrescriptionUpdate: (prescriptions: Prescription[]) => void;
}

export default function PrescriptionTable({
  prescriptions,
  onPrescriptionUpdate,
}: PrescriptionTableProps) {
  const [selectedPrescriptions, setSelectedPrescriptions] = useState<string[]>(
    []
  );
  const [modalState, setModalState] = useState<{
    type: "create" | "edit" | "view" | null;
    prescription: Prescription | null;
  }>({ type: null, prescription: null });

  // Funciones para abrir modales
  const openCreateModal = () =>
    setModalState({ type: "create", prescription: null });
  const openViewModal = (prescription: Prescription) =>
    setModalState({ type: "view", prescription });
  const openEditModal = (prescription: Prescription) =>
    setModalState({ type: "edit", prescription });
  const closeModal = () => setModalState({ type: null, prescription: null });

  // Función para manejar la creación/edición de recetas
  const handlePrescriptionSubmit = (
    prescriptionData: Omit<Prescription, "id">
  ) => {
    if (modalState.type === "create") {
      // Crear nueva receta
      const newPrescription: Prescription = {
        ...prescriptionData,
        id: Math.random().toString(36).substr(2, 9),
      };
      onPrescriptionUpdate([...prescriptions, newPrescription]);
    } else if (modalState.type === "edit" && modalState.prescription) {
      // Editar receta existente
      const updatedPrescriptions = prescriptions.map((p) =>
        p.id === modalState.prescription!.id ? { ...p, ...prescriptionData } : p
      );
      onPrescriptionUpdate(updatedPrescriptions);
    }
  };

  // Función para cambiar estado de recetas
  const handleStatusChange = (
    prescriptionId: string,
    newStatus: "active" | "completed" | "cancelled"
  ) => {
    const updatedPrescriptions = prescriptions.map((p) =>
      p.id === prescriptionId ? { ...p, status: newStatus } : p
    );
    onPrescriptionUpdate(updatedPrescriptions);
  };

  const togglePrescriptionSelection = (prescriptionId: string) => {
    setSelectedPrescriptions((prev) =>
      prev.includes(prescriptionId)
        ? prev.filter((id) => id !== prescriptionId)
        : [...prev, prescriptionId]
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: {
        color: "bg-blue-100 text-blue-800",
        label: "Activa",
        icon: "fas fa-play",
      },
      completed: {
        color: "bg-green-100 text-green-800",
        label: "Completada",
        icon: "fas fa-check",
      },
      cancelled: {
        color: "bg-red-100 text-red-800",
        label: "Cancelada",
        icon: "fas fa-times",
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      color: "bg-gray-100 text-gray-800",
      label: status,
      icon: "fas fa-question",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        <i className={`${config.icon} mr-1 text-[10px]`}></i>
        {config.label}
      </span>
    );
  };

  return (
    <>
      <Card className="p-6">
        {/* Header de la tabla */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-derma-gray-900">
            Recetas Médicas ({prescriptions.length})
          </h3>
          <Button onClick={openCreateModal}>
            <i className="fas fa-file-medical mr-2"></i>
            Nueva Receta
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
                        setSelectedPrescriptions(
                          prescriptions.map((p) => p.id)
                        );
                      } else {
                        setSelectedPrescriptions([]);
                      }
                    }}
                    checked={
                      selectedPrescriptions.length === prescriptions.length &&
                      prescriptions.length > 0
                    }
                  />
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-derma-gray-500">
                  Paciente
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-derma-gray-500">
                  Médico
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-derma-gray-500">
                  Medicamentos
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-derma-gray-500">
                  Diagnóstico
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-derma-gray-500">
                  Fecha
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
              {prescriptions.map((prescription) => (
                <tr
                  key={prescription.id}
                  className="hover:bg-derma-pink-50 transition-colors duration-200"
                >
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedPrescriptions.includes(prescription.id)}
                      onChange={() =>
                        togglePrescriptionSelection(prescription.id)
                      }
                      className="rounded border-derma-pink-300 text-derma-pink-400 focus:ring-derma-pink-300"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-derma-pink-300 to-derma-pink-400 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {prescription.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium text-derma-gray-900 text-sm">
                          {prescription.patientName}
                        </div>
                        <div className="text-derma-gray-400 text-xs">
                          ID: {prescription.patientId.slice(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-derma-gray-900">
                      {prescription.doctorName}
                    </div>
                    <div className="text-derma-gray-400 text-xs">
                      ID: {prescription.doctorId.slice(0, 8)}...
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-derma-gray-900">
                      {prescription.medications.length} medicamento(s)
                    </div>
                    <div className="text-derma-gray-400 text-xs">
                      {prescription.medications
                        .slice(0, 2)
                        .map((m) => m.name)
                        .join(", ")}
                      {prescription.medications.length > 2 && "..."}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-derma-gray-900 max-w-xs truncate">
                      {prescription.diagnosis}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-derma-gray-600">
                    {formatDate(prescription.date)}
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(prescription.status)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openViewModal(prescription)}
                        className="w-8 h-8 rounded-lg bg-derma-pink-50 text-derma-pink-500 hover:bg-derma-pink-100 flex items-center justify-center transition-colors"
                      >
                        <i className="far fa-eye text-sm"></i>
                      </button>
                      <button
                        onClick={() => openEditModal(prescription)}
                        className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition-colors"
                      >
                        <i className="far fa-edit text-sm"></i>
                      </button>
                      <div className="relative group">
                        <button className="w-8 h-8 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 flex items-center justify-center transition-colors">
                          <i className="fas fa-ellipsis-v text-sm"></i>
                        </button>
                        <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-derma-pink-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                          {prescription.status === "active" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusChange(
                                    prescription.id,
                                    "completed"
                                  )
                                }
                                className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-t-lg flex items-center gap-2"
                              >
                                <i className="fas fa-check text-xs"></i>
                                Completar
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusChange(
                                    prescription.id,
                                    "cancelled"
                                  )
                                }
                                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg flex items-center gap-2"
                              >
                                <i className="fas fa-times text-xs"></i>
                                Cancelar
                              </button>
                            </>
                          )}
                          {prescription.status !== "active" && (
                            <button
                              onClick={() =>
                                handleStatusChange(prescription.id, "active")
                              }
                              className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-2"
                            >
                              <i className="fas fa-play text-xs"></i>
                              Reactivar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer de la tabla */}
        {selectedPrescriptions.length > 0 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-derma-pink-200">
            <div className="text-sm text-derma-gray-500">
              {selectedPrescriptions.length} receta(s) seleccionada(s)
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <i className="fas fa-print mr-2"></i>
                Imprimir selección
              </Button>
              <Button variant="outline" size="sm">
                <i className="fas fa-file-export mr-2"></i>
                Exportar PDF
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Modales */}
      <PrescriptionFormModal
        isOpen={modalState.type === "create" || modalState.type === "edit"}
        onClose={closeModal}
        onSubmit={handlePrescriptionSubmit}
        prescription={modalState.prescription}
        mode={modalState.type as "create" | "edit"}
      />

      <ViewPrescriptionModal
        isOpen={modalState.type === "view"}
        onClose={closeModal}
        prescription={modalState.prescription}
        onEdit={openEditModal}
      />
    </>
  );
}
