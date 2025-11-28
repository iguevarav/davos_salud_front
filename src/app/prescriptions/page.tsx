"use client";

import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import PrescriptionStats from "@/components/modules/prescriptions/PrescriptionStats";
import PrescriptionFilters from "@/components/modules/prescriptions/PrescriptionFilters";
import PrescriptionTable from "@/components/modules/prescriptions/PrescriptionTable";
import { mockPrescriptions } from "@/lib/mockData";
import { Prescription } from "@/types"; 

export default function PrescriptionsPage() {
  const [filters, setFilters] = useState({});
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions);

  const handleFilterChange = (newFilters: any) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handlePrescriptionUpdate = (updatedPrescriptions: Prescription[]) => {
    setPrescriptions(updatedPrescriptions);
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-derma-gray-900">
            Recetas Médicas
          </h1>
          <p className="text-derma-gray-500 mt-1">
            Gestiona y controla las recetas médicas de los pacientes
          </p>
        </div>

        {/* Estadísticas - CORREGIDO: Quitamos onFilterChange */}
        <PrescriptionStats prescriptions={prescriptions} />

        {/* Filtros - CORREGIDO: onFilterChange va aquí */}
        <PrescriptionFilters onFilterChange={handleFilterChange} />

        {/* Tabla de recetas */}
        <PrescriptionTable
          prescriptions={prescriptions}
          onPrescriptionUpdate={handlePrescriptionUpdate}
        />
      </div>
    </Layout>
  );
}
