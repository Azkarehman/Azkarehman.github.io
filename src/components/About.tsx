"use client";
import { motion } from "framer-motion";
import AnimatedSection, { SectionTitle } from "./AnimatedSection";
import Image from "next/image";

export default function About() {
  return (
    <AnimatedSection id="about" className="py-24 px-6 max-w-5xl mx-auto">
      <SectionTitle title="About Me" />
      <div className="grid md:grid-cols-[3fr_2fr] gap-12 items-start">
        <div className="space-y-4 text-ink-light leading-relaxed">
          <p>
            I&apos;m Azka — an AI researcher who got hooked on the idea that a routine
            hospital scan could quietly save someone&apos;s life. What started as curiosity
            about deep learning turned into a mission:{" "}
            <span className="text-accent font-medium">making every medical image count</span>.
          </p>
          <p>
            My research sits at the intersection of{" "}
            <span className="text-accent font-medium">computer vision</span> and{" "}
            <span className="text-accent font-medium">clinical medicine</span>. I build
            opportunistic screening systems — AI that looks at a chest X-ray taken
            for a cough and spots early signs of cardiovascular disease. The kind of
            thing that could matter most in places where a CT angiogram isn&apos;t an option.
          </p>
          <p>
            I completed my M.S. at{" "}
            <span className="text-accent-blue font-medium">Seoul National University</span>{" "}
            and spent 2+ years at HealthHub.kr deploying clinical AI products that
            actually made it to radiologists&apos; screens. I&apos;ve worked across{" "}
            <span className="font-medium text-ink">5+ imaging modalities</span> —
            CT, MRI, X-ray, ultrasound, and retinal fundus — and published in
            journals like npj Digital Medicine, IEEE JBHI, and CMIG.
          </p>
          <p className="text-ink-muted italic text-sm">
            When I&apos;m not training models, you&apos;ll probably find me reading papers
            at a cafe or trying to explain attention mechanisms to my husband.
          </p>

          <div className="pt-4 grid grid-cols-2 gap-2 text-sm font-mono text-ink-muted">
            {[
              "PyTorch",
              "Foundation Models",
              "Computer Vision",
              "Medical Imaging",
              "Survival Analysis",
              "DICOM / Clinical AI",
            ].map((skill) => (
              <div key={skill} className="flex items-center gap-2">
                <span className="text-accent">&#9655;</span> {skill}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative group mx-auto"
        >
          <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/profile.jpg"
              alt="Azka Rehman"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="absolute inset-0 border-2 border-accent/20 rounded-2xl translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
