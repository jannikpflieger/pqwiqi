"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/*
 * Building blocks shared by the About page and its sub-pages (e.g. Partners),
 * so they look and reveal alike.
 */

// Quantum particle animation component
const QuantumParticle = ({ delay = 0 }: { delay?: number }) => {
  return (
    <motion.div
      className="absolute h-2 w-2 rounded-full bg-pink-500/50"
      initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
      animate={{
        scale: [0, 1.5, 0.5, 1.2, 0],
        x: [null, Math.random() * 200 - 100],
        y: [null, Math.random() * 200 - 100],
        opacity: [0, 0.8, 0.2, 0.9, 0],
      }}
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        delay: delay,
        ease: "easeInOut",
      }}
    />
  );
};

// Quantum field background
export const QuantumField = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-90">
      {Array.from({ length: 20 }).map((_, i) => (
        <QuantumParticle key={i} delay={i * 0.4} />
      ))}
    </div>
  );
};

// Animation variants — matching the posts pages so the site reveals alike
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 10,
    },
  },
};

export const LINK_CLASS =
  "font-medium text-pink-700 underline decoration-pink-700/40 underline-offset-2 transition-colors hover:text-pink-900 hover:decoration-pink-900 dark:text-pink-300 dark:decoration-pink-300/40 dark:hover:text-pink-200";

/** Renders an <a> for a rich-text tag pointing at an external site. */
export const extLink = (href: string) =>
  function ExtLink(chunks: ReactNode): ReactNode {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={LINK_CLASS}
      >
        {chunks}
      </a>
    );
  };

/** Renders a next/link for a rich-text tag pointing inside the site. */
export const inLink = (href: string) =>
  function InLink(chunks: ReactNode): ReactNode {
    return (
      <Link href={href} className={LINK_CLASS}>
        {chunks}
      </Link>
    );
  };

/**
 * A section whose children reveal one after another the first time it
 * scrolls into view. Wrap each chunk in <Item> to put it in the sequence.
 */
export function Section({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <motion.section
      id={id}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8"
    >
      {children}
    </motion.section>
  );
}

/** One chunk in a section's reveal sequence. */
export function Item({ children }: { children: ReactNode }) {
  return <motion.div variants={itemVariants}>{children}</motion.div>;
}

export function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-6 font-serif text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">
      {children}
    </h2>
  );
}

export const PARAGRAPH_CLASS =
  "text-lg leading-relaxed text-slate-700 dark:text-indigo-100";
