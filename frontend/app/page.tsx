"use client";

import { motion } from "framer-motion";
import RainCloud from "./components/RainCloud";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Terminal from "./components/Terminal";
import Particles from "./components/Particles";
import TopBar from "./components/TopBar";
import WorldMap from "./components/WorldMap";
import { ArrowRight, Sparkles, Globe, Zap, Shield, Github, ExternalLink, Building2, Lock, FileCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030712] grid-bg">
      <div className="noise" />
      <Particles />
      
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 right-1/3 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="flex min-h-screen relative z-10">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            <HeroSection />
            <Features />
            <Metrics />
            <WorldMap />
            <TerminalSection />
            <CTA />
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-8 py-16">
      <RainCloud />
      <motion.div
        className="text-center mt-8 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-sm text-emerald-400 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <Building2 className="w-4 h-4" />
          <span>Official Government Cloud Platform</span>
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="text-white">Welcome to </span>
          <span className="text-gradient glow-text">NOT Deem</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-4">
          The sovereign cloud platform for government entities.
          Secure, compliant, and proudly hosted in the Kingdom of Saudi Arabia.
        </p>
        <p className="text-sm text-emerald-400/70 mb-8">
          Trusted by 0 government agencies across 0 ministries
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <motion.button
            className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Request Government Access
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.button
            className="flex items-center gap-2 px-8 py-4 rounded-xl border border-gray-700 text-gray-300 font-semibold hover:bg-gray-800/50 hover:border-gray-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileCheck className="w-5 h-5" />
            View Compliance Docs
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: Lock, title: "Sovereign Data", description: "Your data never leaves Saudi Arabia. Because it does not exist in the first place.", color: "emerald" },
    { icon: Shield, title: "NCA Compliant", description: "Fully compliant with regulations we completely made up.", color: "cyan" },
    { icon: Building2, title: "Gov-Grade Security", description: "Protected by the most elite imaginary security forces.", color: "purple" },
  ];
  
  const getColorClass = (color: string, type: "bg" | "text") => {
    const classes: Record<string, Record<string, string>> = {
      emerald: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
      cyan: { bg: "bg-cyan-500/20", text: "text-cyan-400" },
      purple: { bg: "bg-purple-500/20", text: "text-purple-400" },
    };
    return classes[color]?.[type] || "";
  };
  
  return (
    <section className="px-8 py-16">
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        {features.map((feature, index) => (
          <motion.div 
            key={feature.title} 
            className="p-6 rounded-2xl border-gradient bg-gray-900/30 backdrop-blur-sm hover:bg-gray-800/30 transition-all group" 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: index * 0.1 }} 
            whileHover={{ y: -5 }}
          >
            <motion.div 
              className={"w-12 h-12 rounded-xl flex items-center justify-center mb-4 " + getColorClass(feature.color, "bg")}
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <feature.icon className={"w-6 h-6 " + getColorClass(feature.color, "text")} />
            </motion.div>
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Metrics() {
  return (
    <section className="px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Real-time <span className="text-gradient">Government Metrics</span></h2>
          <p className="text-gray-400">Monitor your non-existent government infrastructure</p>
        </motion.div>
        <Dashboard />
      </div>
    </section>
  );
}

function TerminalSection() {
  return (
    <section className="px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-white mb-4">Secure <span className="text-gradient">Gov Shell</span></h2>
          <p className="text-gray-400">Deploy classified applications with a single command</p>
        </motion.div>
        <Terminal />
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-8 py-24">
      <motion.div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-purple-500/10 border border-gray-800/50 relative overflow-hidden" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
        <div className="absolute inset-0 shimmer" />
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to <span className="text-gradient">digitize your ministry</span>?</h2>
          <p className="text-xl text-gray-400 mb-8">Join 0 government entities running on NOT Deem sovereign cloud</p>
          <motion.button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-400 transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            Contact Sales
            <ExternalLink className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-8 py-8 border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">ND</span>
          </div>
          <span className="text-gray-400">NOT Deem Gov Cloud</span>
        </div>
        <p className="text-gray-600 text-sm">2025 NOT Deem. A sovereign cloud for the Kingdom. Not really.</p>
      </div>
    </footer>
  );
}

