"use client";

import { motion } from "framer-motion";
import {
  Cloud,
  Server,
  Database,
  HardDrive,
  Globe,
  Shield,
  BarChart3,
  Cpu,
  Container,
  Workflow,
  Key,
  Bell,
  Settings,
  ChevronDown,
  Zap,
  Building2,
  FileCheck,
  Users,
} from "lucide-react";

const services = [
  {
    category: "Compute",
    icon: Cpu,
    items: [
      { name: "Gov Instances", icon: Server, status: "12 running" },
      { name: "Gov Containers", icon: Container, status: "8 active" },
      { name: "Serverless", icon: Zap, status: "24 functions" },
    ],
  },
  {
    category: "Storage",
    icon: HardDrive,
    items: [
      { name: "Secure Buckets", icon: Cloud, status: "2.4 TB" },
      { name: "Block Storage", icon: HardDrive, status: "500 GB" },
    ],
  },
  {
    category: "Database",
    icon: Database,
    items: [
      { name: "Gov SQL", icon: Database, status: "3 instances" },
      { name: "Gov Cache", icon: Zap, status: "Redis" },
    ],
  },
  {
    category: "Security",
    icon: Shield,
    items: [
      { name: "IAM", icon: Key, status: "15 users" },
      { name: "Compliance", icon: FileCheck, status: "NCA Ready" },
      { name: "Firewall", icon: Shield, status: "Enabled" },
    ],
  },
  {
    category: "Gov Services",
    icon: Building2,
    items: [
      { name: "Ministry Portal", icon: Building2, status: "Active" },
      { name: "Citizen API", icon: Users, status: "v2.1" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function Sidebar() {
  return (
    <motion.aside
      className="w-64 h-screen bg-gray-900/50 backdrop-blur-xl border-r border-gray-800/50 flex flex-col overflow-hidden sticky top-0 shrink-0"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Cloud className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-gradient">NOT Deem</h1>
            <p className="text-xs text-emerald-400/70">Gov Cloud Console</p>
          </div>
        </div>
      </div>

      {/* Services List */}
      <motion.div
        className="flex-1 overflow-y-auto py-4 px-2 custom-scrollbar"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service) => (
          <motion.div key={service.category} variants={itemVariants} className="mb-2">
            <div className="flex items-center gap-2 px-3 py-2 text-gray-400 text-xs font-semibold uppercase tracking-wider">
              <service.icon className="w-4 h-4" />
              {service.category}
              <ChevronDown className="w-3 h-3 ml-auto" />
            </div>
            <div className="space-y-1">
              {service.items.map((item) => (
                <motion.button
                  key={item.name}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-emerald-500/10 hover:text-white transition-all group"
                  whileHover={{ x: 4 }}
                >
                  <item.icon className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors" />
                  <span className="text-sm flex-1 text-left">{item.name}</span>
                  <span className="text-xs text-gray-600 group-hover:text-emerald-400/70">
                    {item.status}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom section */}
      <div className="p-4 border-t border-gray-800/50">
        <motion.button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-white transition-all"
          whileHover={{ scale: 1.02 }}
        >
          <Settings className="w-4 h-4" />
          <span className="text-sm">Settings</span>
        </motion.button>
        <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
          <p className="text-xs text-gray-400">Monthly Usage</p>
          <p className="text-2xl font-bold text-gradient">0 SAR</p>
          <p className="text-xs text-emerald-400/70">Gov Tier - Free</p>
        </div>
      </div>
    </motion.aside>
  );
}
