"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const links = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Publications", href: "#publications" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-xl font-bold gradient-text font-mono">
          AR.
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="text-sm text-gray-400 hover:text-[#00f5ff] transition-colors font-mono"
            >
              <span className="text-[#00f5ff] mr-1">0{i + 1}.</span>
              {link.name}
            </motion.a>
          ))}
        </div>
        <a
          href="/images/Azka_Rehman_CV.pdf"
          target="_blank"
          className="hidden md:block px-4 py-2 text-sm font-mono text-[#00f5ff] border border-[#00f5ff]/30 rounded-lg hover:bg-[#00f5ff]/10 transition-all"
        >
          Resume
        </a>
      </div>
    </motion.nav>
  );
}
