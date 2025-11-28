"use client";

import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import StaffStats from "@/components/modules/staff/StaffStats";
import StaffFilters from "@/components/modules/staff/StaffFilters";
import StaffTable from "@/components/modules/staff/StaffTable";
import { mockEmployees } from "@/lib/mockData";
import { Employee } from "@/types"; // Agregar este import

export default function StaffPage() {
  const [filters, setFilters] = useState({});
  const [employees, setEmployees] = useState(mockEmployees);

  const handleFilterChange = (newFilters: any) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleEmployeeUpdate = (updatedEmployees: Employee[]) => {
    setEmployees(updatedEmployees);
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-derma-gray-900">
            Gestión de Personal
          </h1>
          <p className="text-derma-gray-500 mt-1">
            Administra la información de médicos, enfermeros y personal
            administrativo
          </p>
        </div>

        {/* Estadísticas */}
        <StaffStats employees={employees} />

        {/* Filtros */}
        <StaffFilters onFilterChange={handleFilterChange} />

        {/* Tabla de personal */}
        <StaffTable
          employees={employees}
          onEmployeeUpdate={handleEmployeeUpdate}
        />
      </div>
    </Layout>
  );
}
