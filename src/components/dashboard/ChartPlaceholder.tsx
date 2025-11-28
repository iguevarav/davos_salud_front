import React from "react";
import Card from "@/components/ui/Card";

export default function ChartPlaceholder() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-derma-gray-900 flex items-center gap-2">
          <i className="fas fa-chart-area text-derma-pink-400"></i>
          Estadísticas Mensuales
        </h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs bg-derma-pink-50 text-derma-pink-500 rounded-lg hover:bg-derma-pink-100 transition-colors">
            Mensual
          </button>
          <button className="px-3 py-1 text-xs bg-white text-derma-gray-500 rounded-lg hover:bg-derma-gray-50 transition-colors border">
            Anual
          </button>
        </div>
      </div>

      <div className="h-80 bg-gradient-to-br from-derma-pink-50 to-derma-gray-50 rounded-xl flex flex-col items-center justify-center border border-derma-pink-200">
        <i className="fas fa-chart-line text-4xl text-derma-pink-300 opacity-40 mb-4"></i>
        <p className="text-derma-gray-400 font-medium">Gráfico de tendencias</p>
        <p className="text-derma-gray-400 text-sm mt-2">
          Los datos se mostrarán aquí
        </p>
      </div>
    </Card>
  );
}
