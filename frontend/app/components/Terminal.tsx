"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Terminal as TerminalIcon, Circle } from "lucide-react";

const commands = [
  { prompt: "gov@notdeem:~$", command: "notdeem deploy --region riyadh-central-1 --tier gov", delay: 0 },
  { prompt: "", command: "Authenticating with Gov SSO...", delay: 1000, isOutput: true },
  { prompt: "", command: "✓ NCA compliance check passed", delay: 2000, isOutput: true, success: true },
  { prompt: "", command: "✓ Data sovereignty verified (KSA only)", delay: 2800, isOutput: true, success: true },
  { prompt: "", command: "✓ Container deployed to riyadh-central-1", delay: 3600, isOutput: true, success: true },
  { prompt: "", command: "  → https://ministry.notdeem.gov.sa", delay: 4200, isOutput: true, link: true },
  { prompt: "gov@notdeem:~$", command: "notdeem status --ministry finance", delay: 5200 },
  { prompt: "", command: "┌─────────────────────────────────────┐", delay: 5700, isOutput: true },
  { prompt: "", command: "│  Ministry: Finance                  │", delay: 5900, isOutput: true },
  { prompt: "", command: "│  Status: OPERATIONAL                │", delay: 6100, isOutput: true },
  { prompt: "", command: "│  Region: riyadh-central-1           │", delay: 6300, isOutput: true },
  { prompt: "", command: "│  Compliance: NCA Level 3            │", delay: 6500, isOutput: true },
  { prompt: "", command: "└─────────────────────────────────────┘", delay: 6700, isOutput: true },
  { prompt: "gov@notdeem:~$", command: "_", delay: 7500, cursor: true },
];

export default function Terminal() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [currentTyping, setCurrentTyping] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    commands.forEach((cmd, index) => {
      setTimeout(() => {
        if (cmd.isOutput) {
          setVisibleLines((prev) => [...prev, index]);
        } else {
          const text = cmd.command;
          let charIndex = 0;
          const typeInterval = setInterval(() => {
            setCurrentTyping((prev) => ({
              ...prev,
              [index]: text.slice(0, charIndex + 1),
            }));
            charIndex++;
            if (charIndex >= text.length) {
              clearInterval(typeInterval);
              setVisibleLines((prev) => [...prev, index]);
            }
          }, 50);
        }
      }, cmd.delay);
    });
  }, []);

  return (
    <motion.div
      className="rounded-2xl overflow-hidden border border-emerald-500/20 bg-gray-900/80 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-900/90 border-b border-gray-800/50">
        <div className="flex gap-2">
          <Circle className="w-3 h-3 fill-red-500 text-red-500" />
          <Circle className="w-3 h-3 fill-yellow-500 text-yellow-500" />
          <Circle className="w-3 h-3 fill-emerald-500 text-emerald-500" />
        </div>
        <div className="flex items-center gap-2 ml-4 text-gray-400 text-sm">
          <TerminalIcon className="w-4 h-4" />
          <span>NOT Deem Gov Shell - Riyadh</span>
        </div>
      </div>

      {/* Terminal content */}
      <div className="p-4 font-mono text-sm h-64 overflow-hidden">
        {commands.map((cmd, index) => {
          const isVisible = visibleLines.includes(index);
          const typingText = currentTyping[index];

          if (!isVisible && !typingText) return null;

          return (
            <motion.div
              key={index}
              className="flex gap-2 mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {cmd.prompt && (
                <span className="text-emerald-400">{cmd.prompt}</span>
              )}
              <span
                className={`${
                  cmd.success
                    ? "text-emerald-400"
                    : cmd.link
                      ? "text-cyan-400 underline"
                      : cmd.isOutput
                        ? "text-gray-400"
                        : "text-white"
                } ${cmd.cursor ? "animate-pulse" : ""}`}
              >
                {isVisible ? cmd.command : typingText}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
