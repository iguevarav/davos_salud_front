import Layout from "@/components/layout/Layout";
import StatCard from "@/components/dashboard/StatCard";
import ActivityItem from "@/components/dashboard/ActivityItem";
import ChartPlaceholder from "@/components/dashboard/ChartPlaceholder";
import { statCards, activities } from "@/lib/mockData";

export default function Home() {
  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-derma-gray-900">Dashboard</h1>
          <p className="text-derma-gray-500 mt-1">
            Bienvenida de nuevo, Dra. Rosa López
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              trend={stat.trend}
              icon={stat.icon}
              trendPositive={stat.trendPositive}
            />
          ))}
        </div>

        {/* Chart Section */}
        <div className="mb-8">
          <ChartPlaceholder />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-derma-soft border border-derma-pink-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-derma-gray-900 flex items-center gap-2">
              <i className="far fa-clock text-derma-pink-400"></i>
              Actividad Reciente
            </h3>
            <button className="text-sm text-derma-pink-500 hover:text-derma-pink-600 font-medium flex items-center gap-1">
              Ver todo
              <i className="fas fa-chevron-right text-xs"></i>
            </button>
          </div>

          <div className="space-y-3">
            {activities.map((activity, index) => (
              <ActivityItem
                key={index}
                icon={activity.icon}
                name={activity.name}
                description={activity.description}
                time={activity.time}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
