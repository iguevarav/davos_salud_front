import React from "react";

interface ActivityItemProps {
  icon: string;
  name: string;
  time: string;
  description?: string;
}

export default function ActivityItem({
  icon,
  name,
  time,
  description,
}: ActivityItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-derma-gray-50 rounded-lg hover:bg-derma-pink-50 hover:border-derma-pink-200 border border-transparent transition-all duration-300 group hover:translate-x-2 cursor-pointer">
      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-derma-pink-400 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
        <i className={`${icon} text-sm`}></i>
      </div>
      <div className="flex-1">
        <div className="font-medium text-derma-gray-900 text-sm">{name}</div>
        {description && (
          <div className="text-derma-gray-500 text-xs mt-1">{description}</div>
        )}
        <div className="text-derma-gray-400 text-xs mt-1">{time}</div>
      </div>
    </div>
  );
}
