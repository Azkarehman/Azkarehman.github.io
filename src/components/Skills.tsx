"use client";
import { motion } from "framer-motion";
import AnimatedSection, { SectionTitle } from "./AnimatedSection";

const skillCategories = [
  {
    title: "Deep Learning & AI",
    icon: "&#9672;",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "FastAI",
      "Scikit-Learn",
      "Foundation Models",
      "LoRA Fine-tuning",
      "Transformers",
    ],
    color: "#00f5ff",
  },
  {
    title: "Medical Imaging",
    icon: "&#9672;",
    skills: [
      "DICOM Standards",
      "Image Segmentation",
      "Object Detection",
      "Classification",
      "SimpleITK",
      "Pydicom",
      "Grad-CAM / XAI",
      "3D Visualization",
    ],
    color: "#a855f7",
  },
  {
    title: "Data Science & Analysis",
    icon: "&#9672;",
    skills: [
      "Survival Analysis",
      "Cox Regression",
      "Statistical Modeling",
      "Data Visualization",
      "NLP",
      "OpenCV",
      "Scikit-image",
      "Pandas / NumPy",
    ],
    color: "#ec4899",
  },
  {
    title: "Tools & Infrastructure",
    icon: "&#9672;",
    skills: [
      "Linux (Ubuntu, CentOS)",
      "Git",
      "Docker",
      "AWS",
      "MLFlow",
      "RESTful APIs",
      "VTK",
      "Flask",
    ],
    color: "#3b82f6",
  },
];

export default function Skills() {
  return (
    <AnimatedSection id="skills" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionTitle number="05" title="Skills & Tools" />
      <div className="grid md:grid-cols-2 gap-6">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6"
          >
            <h4
              className="text-lg font-semibold mb-4 font-mono"
              style={{ color: cat.color }}
            >
              {cat.title}
            </h4>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg text-sm font-mono transition-all hover:scale-105"
                  style={{
                    background: `${cat.color}10`,
                    color: `${cat.color}cc`,
                    border: `1px solid ${cat.color}20`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
