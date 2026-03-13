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
            I am an AI researcher specializing in deep learning and computer
            vision, with expertise in developing advanced image-processing
            algorithms for applications in object segmentation, detection, and
            classification.
          </p>
          <p>
            My work focuses on translating theoretical advancements into
            practical solutions, particularly in{" "}
            <span className="text-accent font-medium">medical imaging</span> and{" "}
            <span className="text-accent font-medium">healthcare</span>. I develop
            opportunistic screening methods that leverage routine clinical images
            for cardiovascular risk prediction.
          </p>
          <p>
            Currently pursuing my M.S. in Biomedical Sciences at{" "}
            <span className="text-accent-blue font-medium">Seoul National University</span>,
            working on AI-driven cardiovascular disease risk stratification.
          </p>

          <div className="pt-4 grid grid-cols-2 gap-2 text-sm font-mono text-ink-muted">
            {[
              "PyTorch",
              "TensorFlow",
              "Computer Vision",
              "Medical Imaging",
              "Foundation Models",
              "Survival Analysis",
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
