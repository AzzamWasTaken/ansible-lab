"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, Cpu, HardDrive, Wifi } from "lucide-react";
import { useEffect, useState } from "react";

const stats = [
  {
    label: "Gov Instances",
    value: 67,
    unit: "%",
    trend: "up",
    icon: Cpu,
    color: "emerald",
  },
  {
    label: "Memory",
    value: 4.2,
    unit: "GB",
    trend: "down",
    icon: Activity,
    color: "cyan",
  },
  {
    label: "Secure Storage",
    value: 2.4,
    unit: "TB",
    trend: "up",
    icon: HardDrive,
    color: "purple",
  },
  {
    label: "Network",
    value: 847,
    unit: "Mbps",
    trend: "up",
    icon: Wifi,
    color: "emerald",
  },
];

function StatCard({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setDisplayValue(stat.value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current * 10) / 10);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [stat.value]);

  const colorClasses: Record<string, string> = {
    emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30",
    cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30",
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
  };

  const textColors: Record<string, string> = {
    emerald: "text-emerald-400",
    cyan: "text-cyan-400",
    purple: "text-purple-400",
  };

  const bgColors: Record<string, string> = {
    emerald: "bg-emerald-500",
    cyan: "bg-cyan-500",
    purple: "bg-purple-500",
  };

  return (
    <motion.div
      className={`p-4 rounded-2xl bg-gradient-to-br ${colorClasses[stat.color]} border backdrop-blur-sm`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="flex items-start justify-between mb-3">
        <stat.icon className={`w-5 h-5 ${textColors[stat.color]}`} />
        {stat.trend === "up" ? (
          <TrendingUp className="w-4 h-4 text-emerald-400" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-400" />
        )}
      </div>
      <p className="text-3xl font-bold text-white">
        {displayValue}
        <span className="text-lg text-gray-400 ml-1">{stat.unit}</span>
      </p>
      <p className="text-sm text-gray-500 mt-1">{stat.label}</p>

      <div className="mt-3 h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${bgColors[stat.color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${(stat.value / (stat.unit === "%" ? 100 : stat.value * 1.5)) * 100}%` }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={stat.label} stat={stat} index={index} />
      ))}
    </div>
  );
}
