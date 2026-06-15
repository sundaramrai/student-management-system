import { ReactNode } from "react";
import { clsx } from "clsx";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  color?: "indigo" | "emerald" | "violet" | "amber";
}

const colorClasses = {
  indigo: "bg-indigo-50 text-indigo-600",
  emerald: "bg-emerald-50 text-emerald-600",
  violet: "bg-violet-50 text-violet-600",
  amber: "bg-amber-50 text-amber-600",
};

export const StatCard = ({
  title,
  value,
  icon,
  trend,
  color = "indigo",
}: StatCardProps) => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        {trend && <p className="text-xs text-gray-400 mt-1">{trend}</p>}
      </div>
      <div className={clsx("p-3 rounded-xl", colorClasses[color])}>
        {icon}
      </div>
    </div>
  </div>
);
