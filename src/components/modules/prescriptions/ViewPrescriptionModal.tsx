"use client";

import React from "react";
import { Prescription } from "@/types";

interface ViewPrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  prescription: Prescription | null;
  onEdit: (prescription: Prescription) => void;
}

export default function ViewPrescriptionModal({
  isOpen,
  onClose,
  prescription,
  onEdit,
}: ViewPrescriptionModalProps) {
  if (!isOpen || !prescription) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
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

    const config = statusConfig[status as keyof typeof statusConfig];

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
      >
        <i className={`${config.icon} mr-2 text-xs`}></i>
        {config.label}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-derma-pink-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-derma-pink-300 to-derma-pink-400 rounded-xl flex items-center justify-center text-white font-semibold text-lg">
              <i className="fas fa-file-medical"></i>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-derma-gray-900">
                Receta Médica
              </h2>
              <p className="text-derma-gray-500 text-sm">
                {formatDate(prescription.date)} •{" "}
                {getStatusBadge(prescription.status)}
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
          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-derma-gray-900 flex items-center gap-2">
                <i className="fas fa-user-injured text-derma-pink-400"></i>
                Información del Paciente
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-derma-gray-500">
                    Paciente
                  </label>
                  <p className="text-derma-gray-900 font-semibold">
                    {prescription.patientName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-derma-gray-500">
                    ID del Paciente
                  </label>
                  <p className="text-derma-gray-900 font-mono text-sm">
                    {prescription.patientId}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-derma-gray-900 flex items-center gap-2">
                <i className="fas fa-user-md text-derma-pink-400"></i>
                Información del Médico
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-derma-gray-500">
                    Médico Tratante
                  </label>
                  <p className="text-derma-gray-900 font-semibold">
                    {prescription.doctorName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-derma-gray-500">
                    ID del Médico
                  </label>
                  <p className="text-derma-gray-900 font-mono text-sm">
                    {prescription.doctorId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnóstico */}
          <div className="mb-8">
            <h3 className="font-semibold text-derma-gray-900 flex items-center gap-2 mb-4">
              <i className="fas fa-stethoscope text-derma-pink-400"></i>
              Diagnóstico
            </h3>
            <div className="bg-derma-pink-50 rounded-lg p-4">
              <p className="text-derma-gray-700">{prescription.diagnosis}</p>
            </div>
          </div>

          {/* Medicamentos */}
          <div className="mb-8">
            <h3 className="font-semibold text-derma-gray-900 flex items-center gap-2 mb-4">
              <i className="fas fa-pills text-derma-pink-400"></i>
              Medicamentos Recetados ({prescription.medications.length})
            </h3>

            <div className="space-y-4">
              {prescription.medications.map((medication, index) => (
                <div
                  key={medication.id}
                  className="bg-white border border-derma-pink-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-derma-gray-900 text-lg">
                      {medication.name}
                    </h4>
                    <span className="text-sm text-derma-gray-500">
                      #{index + 1}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <label className="font-medium text-derma-gray-500">
                        Dosis
                      </label>
                      <p className="text-derma-gray-900">{medication.dosage}</p>
                    </div>
                    <div>
                      <label className="font-medium text-derma-gray-500">
                        Frecuencia
                      </label>
                      <p className="text-derma-gray-900">
                        {medication.frequency}
                      </p>
                    </div>
                    <div>
                      <label className="font-medium text-derma-gray-500">
                        Duración
                      </label>
                      <p className="text-derma-gray-900">
                        {medication.duration}
                      </p>
                    </div>
                  </div>

                  {medication.instructions && (
                    <div className="mt-3">
                      <label className="font-medium text-derma-gray-500">
                        Instrucciones específicas
                      </label>
                      <p className="text-derma-gray-700 text-sm mt-1">
                        {medication.instructions}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Instrucciones generales */}
          <div className="mb-8">
            <h3 className="font-semibold text-derma-gray-900 flex items-center gap-2 mb-4">
              <i className="fas fa-list-alt text-derma-pink-400"></i>
              Instrucciones Generales
            </h3>
            <div className="bg-derma-gray-50 rounded-lg p-4">
              <p className="text-derma-gray-700 whitespace-pre-wrap">
                {prescription.instructions}
              </p>
            </div>
          </div>

          {/* Información adicional */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-derma-gray-900 flex items-center gap-2">
                <i className="fas fa-calendar-alt text-derma-pink-400"></i>
                Fechas
              </h3>

              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-derma-gray-500">
                    Fecha de emisión
                  </label>
                  <p className="text-derma-gray-900">
                    {formatDate(prescription.date)}
                  </p>
                </div>
                {prescription.followUpDate && (
                  <div>
                    <label className="text-sm font-medium text-derma-gray-500">
                      Fecha de seguimiento
                    </label>
                    <p className="text-derma-gray-900">
                      {formatDate(prescription.followUpDate)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {prescription.notes && (
              <div className="space-y-3">
                <h3 className="font-semibold text-derma-gray-900 flex items-center gap-2">
                  <i className="fas fa-sticky-note text-derma-pink-400"></i>
                  Notas Adicionales
                </h3>

                <div className="bg-derma-pink-50 rounded-lg p-4">
                  <p className="text-derma-gray-700 text-sm whitespace-pre-wrap">
                    {prescription.notes}
                  </p>
                </div>
              </div>
            )}
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
            onClick={() => onEdit(prescription)}
            className="px-4 py-2 bg-derma-pink-300 text-white rounded-lg hover:bg-derma-pink-400 transition-colors flex items-center gap-2"
          >
            <i className="fas fa-edit"></i>
            Editar Receta
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <i className="fas fa-print"></i>
            Imprimir
          </button>
        </div>
      </div>
    </div>
  );
}
