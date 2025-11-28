import React from "react";
import Card from "@/components/ui/Card";

interface StatCardProps {
  title: string;
  value: number | string;
  description: string;
  trend: string;
  icon: string;
  trendPositive?: boolean;
}

export default function StatCard({
  title,
  value,
  description,
  trend,
  icon,
  trendPositive = true,
}: StatCardProps) {
  return (
    <Card hover className="p-6 relative overflow-hidden group">
      {/* Efecto de brillo al hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-derma-pink-50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-2xl font-bold text-derma-gray-900">
              {value}
            </div>
            <div className="text-sm text-derma-gray-500 mt-1">
              {description}
            </div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-derma-pink-300 to-derma-pink-400 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
            <i className={`${icon} text-lg`}></i>
          </div>
        </div>

        <div
          className={`flex items-center gap-1 text-sm ${
            trendPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          <i
            className={`fas ${
              trendPositive ? "fa-arrow-up" : "fa-arrow-down"
            } text-xs`}
          ></i>
          <span>{trend}</span>
        </div>
      </div>
    </Card>
  );
}
