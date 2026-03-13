"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-ink-muted font-mono text-sm mb-6 tracking-widest uppercase"
        >
          Welcome
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl font-bold text-ink mb-4 tracking-tight"
        >
          Azka Rehman
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-ink-light mb-8 font-light"
        >
          AI Researcher & Medical Imaging Specialist
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-ink-muted max-w-2xl mx-auto mb-12 text-lg leading-relaxed"
        >
          I teach machines to read medical scans and find what humans might miss —
          from hidden signs of heart disease in a routine chest X-ray to tiny
          lung nodules in a CT scan. 5+ publications, 5+ imaging modalities,
          and a belief that AI should reach where specialists can&apos;t.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <a
            href="#publications"
            className="px-8 py-3 rounded-lg text-sm bg-accent text-white hover:bg-accent/90 transition-all shadow-sm"
          >
            View Publications
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-lg text-sm border border-border text-ink-light hover:border-accent hover:text-accent transition-all"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-ink-muted/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-accent rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
