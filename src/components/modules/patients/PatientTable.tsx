"use client";

import React, { useState } from "react";
import { Patient } from "@/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import PatientFormModal from "./PatientFormModal";
import ViewPatientModal from "./ViewPatientModal";

interface PatientTableProps {
  patients: Patient[];
  onPatientUpdate: (patients: Patient[]) => void;
}

export default function PatientTable({
  patients,
  onPatientUpdate,
}: PatientTableProps) {
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
  const [modalState, setModalState] = useState<{
    type: "create" | "edit" | "view" | null;
    patient: Patient | null;
  }>({ type: null, patient: null });

  // Funciones para abrir modales
  const openCreateModal = () =>
    setModalState({ type: "create", patient: null });
  const openViewModal = (patient: Patient) =>
    setModalState({ type: "view", patient });
  const openEditModal = (patient: Patient) =>
    setModalState({ type: "edit", patient });
  const closeModal = () => setModalState({ type: null, patient: null });

  // Función para manejar la creación/edición de pacientes
  const handlePatientSubmit = (
    patientData: Omit<Patient, "id" | "createdAt" | "updatedAt">
  ) => {
    if (modalState.type === "create") {
      // Crear nuevo paciente
      const newPatient: Patient = {
        ...patientData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      onPatientUpdate([...patients, newPatient]);
    } else if (modalState.type === "edit" && modalState.patient) {
      // Editar paciente existente
      const updatedPatients = patients.map((p) =>
        p.id === modalState.patient!.id
          ? { ...p, ...patientData, updatedAt: new Date() }
          : p
      );
      onPatientUpdate(updatedPatients);
    }
  };

  // Función para eliminar pacientes
  const handleDeletePatients = () => {
    if (selectedPatients.length > 0) {
      const updatedPatients = patients.filter(
        (p) => !selectedPatients.includes(p.id)
      );
      onPatientUpdate(updatedPatients);
      setSelectedPatients([]);
    }
  };

  // Resto del código de la tabla (togglePatientSelection, formatDate, calculateAge) se mantiene igual...
  const togglePatientSelection = (patientId: string) => {
    setSelectedPatients((prev) =>
      prev.includes(patientId)
        ? prev.filter((id) => id !== patientId)
        : [...prev, patientId]
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

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

  return (
    <>
      <Card className="p-6">
        {/* Header de la tabla */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-derma-gray-900">
            Lista de Pacientes ({patients.length})
          </h3>
          <Button onClick={openCreateModal}>
            <i className="fas fa-plus mr-2"></i>
            Nuevo Paciente
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
                        setSelectedPatients(patients.map((p) => p.id));
                      } else {
                        setSelectedPatients([]);
                      }
                    }}
                    checked={
                      selectedPatients.length === patients.length &&
                      patients.length > 0
                    }
                  />
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-derma-gray-500">
                  Paciente
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-derma-gray-500">
                  Contacto
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-derma-gray-500">
                  Edad
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-derma-gray-500">
                  Género
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-derma-gray-500">
                  Fecha Registro
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-derma-gray-500">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-derma-pink-100">
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-derma-pink-50 transition-colors duration-200"
                >
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedPatients.includes(patient.id)}
                      onChange={() => togglePatientSelection(patient.id)}
                      className="rounded border-derma-pink-300 text-derma-pink-400 focus:ring-derma-pink-300"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-derma-pink-300 to-derma-pink-400 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium text-derma-gray-900 text-sm">
                          {patient.name}
                        </div>
                        <div className="text-derma-gray-400 text-xs">
                          ID: {patient.id.slice(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-derma-gray-900">
                      {patient.email}
                    </div>
                    <div className="text-derma-gray-400 text-xs">
                      {patient.phone}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-derma-gray-900">
                    {calculateAge(patient.dateOfBirth)} años
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        patient.gender === "female"
                          ? "bg-pink-100 text-pink-800"
                          : patient.gender === "male"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {patient.gender === "female"
                        ? "Mujer"
                        : patient.gender === "male"
                        ? "Hombre"
                        : "Otro"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-derma-gray-600">
                    {formatDate(patient.createdAt)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openViewModal(patient)}
                        className="w-8 h-8 rounded-lg bg-derma-pink-50 text-derma-pink-500 hover:bg-derma-pink-100 flex items-center justify-center transition-colors"
                      >
                        <i className="far fa-eye text-sm"></i>
                      </button>
                      <button
                        onClick={() => openEditModal(patient)}
                        className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition-colors"
                      >
                        <i className="far fa-edit text-sm"></i>
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-green-50 text-green-500 hover:bg-green-100 flex items-center justify-center transition-colors">
                        <i className="fas fa-file-medical text-sm"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer de la tabla */}
        {selectedPatients.length > 0 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-derma-pink-200">
            <div className="text-sm text-derma-gray-500">
              {selectedPatients.length} paciente(s) seleccionado(s)
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <i className="fas fa-envelope mr-2"></i>
                Enviar recordatorio
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeletePatients}
              >
                <i className="fas fa-trash mr-2"></i>
                Eliminar selección
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Modales */}
      <PatientFormModal
        isOpen={modalState.type === "create" || modalState.type === "edit"}
        onClose={closeModal}
        onSubmit={handlePatientSubmit}
        patient={modalState.patient}
        mode={modalState.type as "create" | "edit"}
      />

      <ViewPatientModal
        isOpen={modalState.type === "view"}
        onClose={closeModal}
        patient={modalState.patient}
        onEdit={openEditModal}
      />
    </>
  );
}
