"use client";
import { motion } from "framer-motion";
import AnimatedSection, { SectionTitle } from "./AnimatedSection";

const education = [
  {
    degree: "M.S. in Biomedical Sciences",
    school: "Seoul National University (SNU)",
    location: "Seoul, South Korea",
    period: "2023 - 2025",
    thesis:
      "AI-Driven Opportunistic Screening for Cardiovascular Disease Risk Using Abdominal CT Scans",
    highlights: [
      "Health System Data Science Lab, supervised by Dr. Sang Min Park.",
      "Research on foundation models for opportunistic cardiovascular screening from medical images.",
      "Published in CMIG, npj Digital Medicine, and IEEE JBHI.",
    ],
  },
  {
    degree: "B.S. in Electrical Engineering",
    school: "National University of Science and Technology (NUST)",
    location: "Islamabad, Pakistan",
    period: "2016 - 2020",
    thesis: "Chest X-Ray Abnormality Detection using Deep Learning",
    highlights: [
      "Focus on signal processing and machine learning.",
      "Published brain tumor segmentation work (Sensors 2023).",
    ],
  },
];

const experiences = [
  {
    role: "Researcher",
    company: "Health System Data Science Lab, Seoul National University",
    location: "Seoul, South Korea",
    period: "Sep 2023 - Aug 2025",
    points: [
      "Developed opportunistic screening pipelines for cardiovascular risk prediction from chest X-rays and abdominal CT scans.",
      "Evaluated foundation models (Rad-DINO, DINOv2, CheXagent, OpenCLIP) with LoRA fine-tuning for atherosclerosis detection.",
      "Conducted survival analysis linking imaging biomarkers to cardiovascular mortality outcomes.",
    ],
  },
  {
    role: "AI Research Engineer",
    company: "HealthHub.kr",
    location: "Seoul, South Korea",
    period: "Jan 2021 - Jul 2023",
    points: [
      "Developed deep learning solutions for lung nodule detection and medical image analysis deployed on the DICOMLINK/HPACS platform.",
      "Integrated AI pipelines with clinical systems, optimizing for efficiency and scalability.",
      "Mentored and trained new engineers on ML/DL workflows for medical imaging.",
    ],
  },
];

export default function Experience() {
  return (
    <AnimatedSection id="experience" className="py-24 px-6 max-w-5xl mx-auto">
      <SectionTitle title="Education & Experience" />

      {/* Education */}
      <h3 className="text-lg font-serif text-ink font-semibold mb-6">
        Education
      </h3>
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {education.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="card p-6"
          >
            <h4 className="text-lg font-semibold text-ink">{edu.degree}</h4>
            <p className="text-accent-blue font-medium text-sm">
              {edu.school}
            </p>
            <p className="text-ink-muted text-sm mt-1">
              {edu.period} | {edu.location}
            </p>
            <p className="text-ink-light text-sm mt-3">
              <span className="text-ink-muted italic">Thesis:</span>{" "}
              {edu.thesis}
            </p>
            <ul className="mt-3 space-y-1.5">
              {edu.highlights.map((h, j) => (
                <li key={j} className="text-ink-light text-sm flex gap-2">
                  <span className="text-accent mt-0.5 shrink-0">&#9655;</span>
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Work Experience */}
      <h3 className="text-lg font-serif text-ink font-semibold mb-6">
        Work Experience
      </h3>
      <div className="relative pl-8 space-y-8">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-border to-transparent" />
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="relative"
          >
            <div className="absolute -left-[2.15rem] top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-cream" />
            <div className="card p-6">
              <h4 className="text-lg font-semibold text-ink">{exp.role}</h4>
              <p className="text-accent font-medium text-sm">{exp.company}</p>
              <p className="text-ink-muted text-sm mt-1">
                {exp.period} | {exp.location}
              </p>
              <ul className="mt-4 space-y-2">
                {exp.points.map((point, j) => (
                  <li key={j} className="text-ink-light text-sm flex gap-2">
                    <span className="text-accent mt-1 shrink-0">&#9655;</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
