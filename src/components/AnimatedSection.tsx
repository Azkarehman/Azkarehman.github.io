"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function AnimatedSection({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-12">
      <h2 className="section-title text-3xl md:text-4xl text-ink">{title}</h2>
      <div className="divider mt-4 w-24" />
    </div>
  );
}
