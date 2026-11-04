"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

// Gradient hero with floating particles, shared by the Applications overview and detail pages
export default function ApplicationsHero({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 py-20">
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                               radial-gradient(circle at 75% 75%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-white/20"
            initial={{
              x:
                typeof window !== "undefined"
                  ? Math.random() * window.innerWidth
                  : Math.random() * 1200,
              y:
                typeof window !== "undefined"
                  ? Math.random() * window.innerHeight
                  : Math.random() * 800,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * -200 - 100],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm"
          >
            <span className="text-white">{icon}</span>
          </motion.div>

          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>

          {subtitle && (
            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300 dark:text-gray-100">
              {subtitle}
            </p>
          )}

          {children}
        </motion.div>
      </div>
    </section>
  );
}
