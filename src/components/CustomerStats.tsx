"use client";

type Stat = {
  title: string;
  value: string;
  target?: string;
  change?: string;
  changeColor?: string;
};

export default function CustomerStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Customer Stats */}
      <div className="lg:col-span-1 space-y-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-semibold text-gray-800">{stat.value}</span>
                {stat.change ? (
                  <span className={`text-sm ${stat.changeColor || "text-gray-500"}`}>
                    {stat.change}
                  </span>
                ) : (
                  <span className="text-sm text-gray-500">{stat.target}</span>
                )}
              </div>
              {stat.title === "Customer Satisfaction" && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-base_purple h-2 rounded-full" 
                    style={{ width: `${parseFloat(stat.value)}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
