"use client";

import { motion } from "framer-motion";

const datacenters = [
  { id: 1, name: "riyadh-central-1", x: 50, y: 40, status: "operational", city: "Riyadh" },
  { id: 2, name: "jeddah-west-1", x: 38, y: 55, status: "operational", city: "Jeddah" },
  { id: 3, name: "dammam-east-1", x: 62, y: 45, status: "operational", city: "Dammam" },
  { id: 4, name: "neom-north-1", x: 35, y: 30, status: "coming soon", city: "NEOM" },
  { id: 5, name: "madinah-holy-1", x: 40, y: 42, status: "operational", city: "Madinah" },
];

export default function WorldMap() {
  return (
    <section className="px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sovereign <span className="text-gradient">Infrastructure</span>
          </h2>
          <p className="text-gray-400">
            5 data centers across the Kingdom of Saudi Arabia
          </p>
        </motion.div>

        <motion.div
          className="relative rounded-3xl overflow-hidden border border-emerald-500/20 bg-gray-900/30 backdrop-blur-sm p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Saudi Arabia map outline */}
          <svg
            viewBox="0 0 100 80"
            className="w-full h-auto"
            fill="none"
          >
            {/* Simplified Saudi Arabia shape */}
            <path
              d="M25,25 L35,20 L50,18 L65,22 L75,30 L78,45 L72,55 L65,62 L55,65 L45,68 L35,65 L28,58 L22,48 L20,38 L25,25"
              fill="rgba(16, 185, 129, 0.1)"
              stroke="rgba(16, 185, 129, 0.3)"
              strokeWidth="0.5"
            />
            
            {/* Grid lines */}
            {[20, 40, 60, 80].map((y) => (
              <line key={`h-${y}`} x1="10" y1={y} x2="90" y2={y} stroke="rgba(6, 182, 212, 0.05)" strokeWidth="0.2" />
            ))}
            {[20, 40, 60, 80].map((x) => (
              <line key={`v-${x}`} x1={x} y1="10" x2={x} y2="70" stroke="rgba(6, 182, 212, 0.05)" strokeWidth="0.2" />
            ))}
          </svg>

          {/* Data center markers */}
          {datacenters.map((dc, index) => (
            <motion.div
              key={dc.id}
              className="absolute"
              style={{ left: `${dc.x}%`, top: `${dc.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              {/* Pulse ring */}
              <motion.div
                className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border ${
                  dc.status === "operational" ? "border-emerald-500/50" : "border-yellow-500/50"
                }`}
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              />
              
              {/* Center dot */}
              <motion.div
                className={`absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                  dc.status === "operational" 
                    ? "bg-emerald-500 shadow-lg shadow-emerald-500/50" 
                    : "bg-yellow-500 shadow-lg shadow-yellow-500/50"
                }`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />

              {/* Label */}
              <motion.div
                className="absolute left-4 top-0 whitespace-nowrap"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.3 }}
              >
                <div className="text-sm font-semibold text-white">{dc.city}</div>
                <div className="text-xs font-mono text-gray-500">{dc.name}</div>
                <div className={`text-xs flex items-center gap-1 ${
                  dc.status === "operational" ? "text-emerald-400" : "text-yellow-400"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    dc.status === "operational" ? "bg-emerald-500" : "bg-yellow-500"
                  }`} />
                  {dc.status}
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 80">
            <defs>
              <linearGradient id="lineGradientSA" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d="M50,40 L38,55"
              stroke="url(#lineGradientSA)"
              strokeWidth="0.3"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            />
            <motion.path
              d="M50,40 L62,45"
              stroke="url(#lineGradientSA)"
              strokeWidth="0.3"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
            <motion.path
              d="M50,40 L40,42"
              stroke="url(#lineGradientSA)"
              strokeWidth="0.3"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.6 }}
            />
          </svg>

          {/* Stats overlay */}
          <div className="absolute bottom-4 right-4 flex gap-4">
            <div className="px-3 py-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-emerald-500/20">
              <div className="text-xs text-gray-500">Uptime</div>
              <div className="text-lg font-bold text-emerald-400">99.99%</div>
            </div>
            <div className="px-3 py-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20">
              <div className="text-xs text-gray-500">Latency</div>
              <div className="text-lg font-bold text-cyan-400">&lt;5 ms</div>
            </div>
            <div className="px-3 py-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-purple-500/20">
              <div className="text-xs text-gray-500">Regions</div>
              <div className="text-lg font-bold text-purple-400">5</div>
            </div>
          </div>

          {/* Saudi flag colors accent */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="w-6 h-4 bg-emerald-600 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs">KSA</span>
            </div>
            <span className="text-xs text-gray-500">Sovereign Cloud</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
