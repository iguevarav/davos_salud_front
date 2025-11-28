"use client";

import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import PatientStats from "@/components/modules/patients/PatientStats";
import PatientFilters from "@/components/modules/patients/PatientFilters";
import PatientTable from "@/components/modules/patients/PatientTable";
import { mockPatients } from "@/lib/mockData";
import { Patient } from "@/types"; // Agregar este import

export default function PatientsPage() {
  const [filters, setFilters] = useState({});
  const [patients, setPatients] = useState(mockPatients);

  const handleFilterChange = (newFilters: any) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handlePatientUpdate = (updatedPatients: Patient[]) => {
    setPatients(updatedPatients);
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-derma-gray-900">
            Gestión de Pacientes
          </h1>
          <p className="text-derma-gray-500 mt-1">
            Administra y visualiza la información de tus pacientes
          </p>
        </div>

        {/* Estadísticas */}
        <PatientStats patients={patients} />

        {/* Filtros */}
        <PatientFilters onFilterChange={handleFilterChange} />

        {/* Tabla de pacientes */}
        <PatientTable
          patients={patients}
          onPatientUpdate={handlePatientUpdate}
        />
      </div>
    </Layout>
  );
}
