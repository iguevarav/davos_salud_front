"use client";

import React, { useState, useEffect } from "react";
import { Prescription, Medication } from "@/types";
import Button from "@/components/ui/Button";

interface PrescriptionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (prescription: Omit<Prescription, "id">) => void;
  prescription?: Prescription | null;
  mode: "create" | "edit" | "view";
}

export default function PrescriptionFormModal({
  isOpen,
  onClose,
  onSubmit,
  prescription,
  mode,
}: PrescriptionFormModalProps) {
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    doctorId: "",
    doctorName: "",
    diagnosis: "",
    instructions: "",
    date: "",
    status: "active" as "active" | "completed" | "cancelled",
    followUpDate: "",
    notes: "",
  });

  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    },
  ]);

  const [newMedication, setNewMedication] = useState<Omit<Medication, "id">>({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  });

  // Datos de ejemplo para selects
  const patients = [
    { id: "1", name: "María González" },
    { id: "2", name: "Carlos Rodríguez" },
    { id: "3", name: "Ana Martínez" },
    { id: "4", name: "Pedro Sánchez" },
    { id: "5", name: "Laura Fernández" },
  ];

  const doctors = [
    { id: "1", name: "Dra. Rosa López" },
    { id: "2", name: "Dr. Carlos Mendez" },
    { id: "3", name: "Dr. Javier Ruiz" },
  ];

  // Inicializar formulario
  useEffect(() => {
    if (prescription && (mode === "edit" || mode === "view")) {
      setFormData({
        patientId: prescription.patientId,
        patientName: prescription.patientName,
        doctorId: prescription.doctorId,
        doctorName: prescription.doctorName,
        diagnosis: prescription.diagnosis,
        instructions: prescription.instructions,
        date: prescription.date.toISOString().split("T")[0],
        status: prescription.status,
        followUpDate: prescription.followUpDate
          ? prescription.followUpDate.toISOString().split("T")[0]
          : "",
        notes: prescription.notes || "",
      });
      setMedications(prescription.medications);
    } else if (mode === "create") {
      setFormData({
        patientId: "",
        patientName: "",
        doctorId: "1", // Dra. Rosa López por defecto
        doctorName: "Dra. Rosa López",
        diagnosis: "",
        instructions: "",
        date: new Date().toISOString().split("T")[0],
        status: "active",
        followUpDate: "",
        notes: "",
      });
      setMedications([
        {
          id: "1",
          name: "",
          dosage: "",
          frequency: "",
          duration: "",
          instructions: "",
        },
      ]);
    }
  }, [prescription, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que haya al menos un medicamento con nombre
    const validMedications = medications.filter(
      (med) => med.name.trim() !== ""
    );
    if (validMedications.length === 0) {
      alert("Debe agregar al menos un medicamento");
      return;
    }

    onSubmit({
      ...formData,
      medications: validMedications,
      date: new Date(formData.date),
      followUpDate: formData.followUpDate
        ? new Date(formData.followUpDate)
        : undefined,
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

    // Actualizar nombres automáticamente cuando se selecciona ID
    if (name === "patientId") {
      const patient = patients.find((p) => p.id === value);
      if (patient) {
        setFormData((prev) => ({ ...prev, patientName: patient.name }));
      }
    }
    if (name === "doctorId") {
      const doctor = doctors.find((d) => d.id === value);
      if (doctor) {
        setFormData((prev) => ({ ...prev, doctorName: doctor.name }));
      }
    }
  };

  const handleMedicationChange = (
    id: string,
    field: keyof Medication,
    value: string
  ) => {
    setMedications((prev) =>
      prev.map((med) => (med.id === id ? { ...med, [field]: value } : med))
    );
  };

  const addMedication = () => {
    if (newMedication.name.trim()) {
      setMedications((prev) => [
        ...prev,
        {
          ...newMedication,
          id: Math.random().toString(36).substr(2, 9),
        },
      ]);
      setNewMedication({
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      });
    }
  };

  const removeMedication = (id: string) => {
    setMedications((prev) => prev.filter((med) => med.id !== id));
  };

  if (!isOpen) return null;

  const isViewMode = mode === "view";
  const title =
    mode === "create"
      ? "Nueva Receta Médica"
      : mode === "edit"
      ? "Editar Receta Médica"
      : "Ver Receta Médica";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Selección de Paciente */}
            <div>
              <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                Paciente *
              </label>
              <select
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                disabled={isViewMode}
                required
                className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent disabled:bg-derma-gray-50 disabled:text-derma-gray-500"
              >
                <option value="">Seleccione un paciente</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Selección de Médico */}
            <div>
              <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                Médico *
              </label>
              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                disabled={isViewMode}
                required
                className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent disabled:bg-derma-gray-50 disabled:text-derma-gray-500"
              >
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Diagnóstico */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                Diagnóstico *
              </label>
              <input
                type="text"
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                disabled={isViewMode}
                required
                className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent disabled:bg-derma-gray-50 disabled:text-derma-gray-500"
                placeholder="Ingrese el diagnóstico"
              />
            </div>

            {/* Fecha de la receta */}
            <div>
              <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                Fecha de la receta *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                disabled={isViewMode}
                required
                className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent disabled:bg-derma-gray-50 disabled:text-derma-gray-500"
              />
            </div>

            {/* Fecha de seguimiento */}
            <div>
              <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                Fecha de seguimiento
              </label>
              <input
                type="date"
                name="followUpDate"
                value={formData.followUpDate}
                onChange={handleChange}
                disabled={isViewMode}
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
                <option value="active">Activa</option>
                <option value="completed">Completada</option>
                <option value="cancelled">Cancelada</option>
              </select>
            </div>
          </div>

          {/* Medicamentos */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-derma-gray-900 mb-4 flex items-center gap-2">
              <i className="fas fa-pills text-derma-pink-400"></i>
              Medicamentos
            </h3>

            {medications.map((medication, index) => (
              <div
                key={medication.id}
                className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 p-4 bg-derma-pink-50 rounded-lg"
              >
                <div>
                  <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                    Medicamento *
                  </label>
                  <input
                    type="text"
                    value={medication.name}
                    onChange={(e) =>
                      handleMedicationChange(
                        medication.id,
                        "name",
                        e.target.value
                      )
                    }
                    disabled={isViewMode}
                    required
                    className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent disabled:bg-white disabled:text-derma-gray-500"
                    placeholder="Nombre del medicamento"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                    Dosis *
                  </label>
                  <input
                    type="text"
                    value={medication.dosage}
                    onChange={(e) =>
                      handleMedicationChange(
                        medication.id,
                        "dosage",
                        e.target.value
                      )
                    }
                    disabled={isViewMode}
                    required
                    className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent disabled:bg-white disabled:text-derma-gray-500"
                    placeholder="Ej: 500mg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                    Frecuencia *
                  </label>
                  <input
                    type="text"
                    value={medication.frequency}
                    onChange={(e) =>
                      handleMedicationChange(
                        medication.id,
                        "frequency",
                        e.target.value
                      )
                    }
                    disabled={isViewMode}
                    required
                    className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent disabled:bg-white disabled:text-derma-gray-500"
                    placeholder="Ej: Cada 8 horas"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                    Duración *
                  </label>
                  <input
                    type="text"
                    value={medication.duration}
                    onChange={(e) =>
                      handleMedicationChange(
                        medication.id,
                        "duration",
                        e.target.value
                      )
                    }
                    disabled={isViewMode}
                    required
                    className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent disabled:bg-white disabled:text-derma-gray-500"
                    placeholder="Ej: 7 días"
                  />
                </div>
                <div className="flex items-end">
                  {!isViewMode && medications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMedication(medication.id)}
                      className="w-8 h-8 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 flex items-center justify-center transition-colors"
                    >
                      <i className="fas fa-times text-sm"></i>
                    </button>
                  )}
                </div>
                <div className="md:col-span-5">
                  <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                    Instrucciones adicionales
                  </label>
                  <textarea
                    value={medication.instructions || ""}
                    onChange={(e) =>
                      handleMedicationChange(
                        medication.id,
                        "instructions",
                        e.target.value
                      )
                    }
                    disabled={isViewMode}
                    rows={2}
                    className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent disabled:bg-white disabled:text-derma-gray-500 resize-none"
                    placeholder="Instrucciones específicas para este medicamento"
                  />
                </div>
              </div>
            ))}

            {!isViewMode && (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-derma-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                    Nuevo Medicamento
                  </label>
                  <input
                    type="text"
                    value={newMedication.name}
                    onChange={(e) =>
                      setNewMedication((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent"
                    placeholder="Nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                    Dosis
                  </label>
                  <input
                    type="text"
                    value={newMedication.dosage}
                    onChange={(e) =>
                      setNewMedication((prev) => ({
                        ...prev,
                        dosage: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent"
                    placeholder="Dosis"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                    Frecuencia
                  </label>
                  <input
                    type="text"
                    value={newMedication.frequency}
                    onChange={(e) =>
                      setNewMedication((prev) => ({
                        ...prev,
                        frequency: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent"
                    placeholder="Frecuencia"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-derma-gray-700 mb-2">
                    Duración
                  </label>
                  <input
                    type="text"
                    value={newMedication.duration}
                    onChange={(e) =>
                      setNewMedication((prev) => ({
                        ...prev,
                        duration: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent"
                    placeholder="Duración"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={addMedication}
                    disabled={!newMedication.name.trim()}
                    className="w-full px-3 py-2 bg-derma-pink-300 text-white rounded-lg hover:bg-derma-pink-400 disabled:bg-derma-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-plus text-sm"></i>
                    Agregar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Instrucciones generales */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-derma-gray-700 mb-2">
              Instrucciones generales *
            </label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              disabled={isViewMode}
              required
              rows={4}
              className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent disabled:bg-derma-gray-50 disabled:text-derma-gray-500 resize-none"
              placeholder="Instrucciones generales para el paciente sobre el tratamiento..."
            />
          </div>

          {/* Notas adicionales */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-derma-gray-700 mb-2">
              Notas adicionales
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              disabled={isViewMode}
              rows={3}
              className="w-full px-3 py-2 border border-derma-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-derma-pink-300 focus:border-transparent disabled:bg-derma-gray-50 disabled:text-derma-gray-500 resize-none"
              placeholder="Observaciones o notas adicionales..."
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-derma-pink-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>

            {!isViewMode && (
              <Button type="submit">
                {mode === "create" ? (
                  <>
                    <i className="fas fa-file-medical mr-2"></i>
                    Crear Receta
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
                Editar Receta
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
