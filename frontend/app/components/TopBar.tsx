"use client";

import { motion } from "framer-motion";
import { Server, Users, Clock, MapPin, Shield } from "lucide-react";
import { useEffect, useState } from "react";

export default function TopBar() {
  const [time, setTime] = useState("");
  const [liveUsers, setLiveUsers] = useState(42);
  const [serverInfo, setServerInfo] = useState<string>("loading...");

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString("en-SA", {
        hour12: false,
        timeZone: "Asia/Riyadh"
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const userInterval = setInterval(() => {
      setLiveUsers(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
    }, 5000);

    // Fetch server info
    fetch("/api/server-info")
      .then(res => res.json())
      .then(data => setServerInfo(data.server))
      .catch(() => setServerInfo("unknown"));

    return () => {
      clearInterval(interval);
      clearInterval(userInterval);
    };
  }, []);

  return (
    <motion.div
      className="shrink-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50 px-6 py-3"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Server Indicator - Shows which backend is serving */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30">
            <Server className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-mono text-purple-300">{serverInfo}</span>
          </div>

          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-emerald-500"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-gray-400">All Systems Operational</span>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-sm">
              <span className="text-emerald-400 font-mono">NCA</span> Compliant
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="text-sm">Riyadh, KSA</span>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <Users className="w-4 h-4 text-cyan-400" />
            <span className="text-sm">
              <motion.span
                key={liveUsers}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-cyan-400 font-mono"
              >
                {liveUsers}
              </motion.span>
              {" "}gov users
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-mono">{time} AST</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
