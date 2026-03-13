"use client";
import { motion } from "framer-motion";
import AnimatedSection, { SectionTitle } from "./AnimatedSection";

const skillCategories = [
  {
    title: "Deep Learning & AI",
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
    tagClass: "",
  },
  {
    title: "Medical Imaging",
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
    tagClass: "tag-blue",
  },
  {
    title: "Data Science & Analysis",
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
    tagClass: "tag-teal",
  },
  {
    title: "Tools & Infrastructure",
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
    tagClass: "tag-blue",
  },
];

export default function Skills() {
  return (
    <AnimatedSection id="skills" className="py-24 px-6 max-w-5xl mx-auto">
      <SectionTitle title="Skills & Tools" />
      <div className="grid md:grid-cols-2 gap-6">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card p-6"
          >
            <h4 className="font-serif text-lg font-semibold text-ink mb-4">
              {cat.title}
            </h4>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className={`tag text-xs ${cat.tagClass}`}
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
