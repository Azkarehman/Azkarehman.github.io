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
            I am an AI researcher focused on developing deep learning systems
            for medical image analysis. My work centers on{" "}
            <span className="text-accent font-medium">opportunistic screening</span>:
            extracting clinically meaningful biomarkers from routine imaging
            studies such as chest X-rays and abdominal CT scans to identify
            early signs of cardiovascular disease.
          </p>
          <p>
            My research is at the intersection of{" "}
            <span className="text-accent font-medium">computer vision</span> and{" "}
            <span className="text-accent font-medium">clinical medicine</span>,
            with a focus on foundation models, explainability, and survival analysis
            for risk stratification. The goal is to make every routine scan count,
            especially in settings where specialized imaging is not available.
          </p>
          <p>
            I completed my M.S. at{" "}
            <span className="text-accent-blue font-medium">Seoul National University</span>{" "}
            and spent 2+ years at HealthHub.kr deploying clinical AI products
            used by radiologists in practice. I have worked across{" "}
            <span className="font-medium text-ink">5+ imaging modalities</span> (CT,
            MRI, X-ray, ultrasound, retinal fundus) and published in journals
            including npj Digital Medicine, IEEE JBHI, and CMIG.
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
