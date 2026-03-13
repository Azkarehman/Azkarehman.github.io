"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#00f5ff] font-mono text-sm mb-4 tracking-widest"
        >
          HI, MY NAME IS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          <span className="gradient-text">Azka Rehman</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-2xl md:text-4xl font-semibold text-gray-400 mb-8"
        >
          AI Researcher & Medical Imaging Specialist
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-gray-500 max-w-2xl mx-auto mb-12 text-lg leading-relaxed"
        >
          Specializing in deep learning and computer vision for medical imaging.
          Developing advanced algorithms for opportunistic screening,
          cardiovascular risk prediction, and clinical AI applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <a
            href="#publications"
            className="px-8 py-3 rounded-xl font-mono text-sm bg-gradient-to-r from-[#00f5ff]/20 to-[#a855f7]/20 border border-[#00f5ff]/30 text-[#00f5ff] hover:from-[#00f5ff]/30 hover:to-[#a855f7]/30 transition-all hover:shadow-[0_0_30px_rgba(0,245,255,0.2)]"
          >
            View Publications
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-xl font-mono text-sm border border-white/10 text-gray-300 hover:border-[#a855f7]/30 hover:text-[#a855f7] transition-all"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#00f5ff]/5 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#a855f7]/5 rounded-full blur-[120px] animate-pulse" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-[#00f5ff] rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
