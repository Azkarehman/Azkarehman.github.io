"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection, { SectionTitle } from "./AnimatedSection";
import Image from "next/image";

const highlights = [
  {
    title: "WONCA 2025: Opportunistic Atherosclerosis Detection from Chest X-Rays",
    description:
      "Presented at WONCA 2025 on using foundation models (Rad-DINO, DINOv2, CheXagent, OpenCLIP) to detect atherosclerosis from routine chest X-rays, enabling cardiovascular risk prediction without specialized imaging.",
    image: "/images/wonca_title.png",
    tags: ["WONCA 2025", "Chest X-ray", "Foundation Models"],
  },
  {
    title: "Opportunistic CVD Risk Pipeline from Abdominal CT",
    description:
      "End-to-end pipeline extracting cardiovascular biomarkers from routine abdominal CT scans. Deep learning models predict body composition and atherosclerosis markers, validated against CVD mortality using Cox regression.",
    image: "/images/profile_ct_pipeline.png",
    tags: ["Abdominal CT", "Cox Models", "CMIG"],
  },
  {
    title: "Foundation Model Comparison for CXR-Based Screening",
    description:
      "Systematic comparison of 4 foundation models fine-tuned with LoRA for carotid atherosclerosis prediction. Rad-DINO achieved best performance with highest clinical relevance index (CRI) on Grad-CAM analysis.",
    image: "/images/wonca_methodology.png",
    tags: ["Rad-DINO", "LoRA", "Grad-CAM"],
  },
  {
    title: "Lung Nodule Detection: Human-in-the-Loop Solution",
    description:
      "Developed at HealthHub.kr: an interactive lung nodule detection system from chest CT scans with volume estimation. Deployed on the DICOMLINK/HPACS platform for clinical use.",
    image: "/images/lung_nodule.gif",
    isGif: true,
    tags: ["Lung CT", "Detection", "HealthHub"],
  },
  {
    title: "Explainability & Clinical Validation",
    description:
      "Grad-CAM visualizations showing model attention on cardiovascular structures in chest X-rays. Clinical Relevance Index (CRI) quantifies alignment between model focus and anatomically relevant regions.",
    image: "/images/wonca_explainability.png",
    tags: ["Grad-CAM", "XAI", "Clinical Validation"],
  },
  {
    title: "Brain Tumor Segmentation: SDS-MSA-Net",
    description:
      "Multi-scale attention network with selective deep supervision for brain tumor segmentation from multi-modal MRI (T1, T1ce, T2, FLAIR). Published in Sensors 2023.",
    image: "/images/profile_brain_tumor.png",
    tags: ["MRI", "Segmentation", "Sensors"],
  },
];

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <AnimatedSection id="gallery" className="py-24 px-6 max-w-5xl mx-auto">
      <SectionTitle title="Research Highlights" />
      <p className="text-ink-light mb-8 -mt-6 max-w-2xl">
        Visual snapshots from my research: presentations, pipelines, and deployed solutions across medical imaging modalities.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {highlights.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="card overflow-hidden group cursor-pointer"
            onClick={() => setSelected(i)}
          >
            <div className="relative h-48 overflow-hidden bg-paper flex items-center justify-center">
              {item.isGif ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
              ) : (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
              )}
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="tag text-[0.6rem]">{tag}</span>
                ))}
              </div>
              <h4 className="text-sm font-semibold text-ink group-hover:text-accent transition-colors leading-snug">
                {item.title}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 sm:h-80 bg-paper flex items-center justify-center">
                {highlights[selected].isGif ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={highlights[selected].image}
                    alt={highlights[selected].title}
                    className="w-full h-full object-contain"
                    loading="eager"
                  />
                ) : (
                  <Image
                    src={highlights[selected].image}
                    alt={highlights[selected].title}
                    fill
                    className="object-contain"
                  />
                )}
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {highlights[selected].tags.map((tag) => (
                    <span key={tag} className="tag text-xs">{tag}</span>
                  ))}
                </div>
                <h3 className="font-serif text-xl font-semibold text-ink mb-3">
                  {highlights[selected].title}
                </h3>
                <p className="text-ink-light leading-relaxed">
                  {highlights[selected].description}
                </p>
                <button
                  onClick={() => setSelected(null)}
                  className="mt-6 px-6 py-2 text-sm text-accent border border-accent/30 rounded-lg hover:bg-accent/5 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedSection>
  );
}
