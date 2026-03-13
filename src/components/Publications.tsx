"use client";
import { motion } from "framer-motion";
import AnimatedSection, { SectionTitle } from "./AnimatedSection";

const publications = [
  {
    title:
      "Opportunistic AI for Enhanced Cardiovascular Disease Risk Stratification using Abdominal CT Scans",
    authors: "A. Rehman, J. Kim, H. Lee, J. Chang, S. Park",
    venue: "Computerized Medical Imaging and Graphics",
    impact: "IF: 5.4",
    year: "2025",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S0895611125000023",
    status: "published",
    first: true,
  },
  {
    title:
      "Opportunistic Screening of Carotid Atherosclerosis and Cardiovascular Mortality Risk Using Chest X-Rays: A Comparative Study of Foundation Models",
    authors: "A. Rehman, J. Kim, H. Lee, J. Chang, S. Park",
    venue: "Journal of American Heart Association",
    impact: "IF: 6.1",
    year: "2025",
    status: "under-review",
    first: true,
  },
  {
    title:
      "Optimizing Retinal Image-Based Carotid Atherosclerosis Prediction with Explainable Foundation Models",
    authors: "H. Lee, J. Kim, A. Rehman, J. Chang, S. Park",
    venue: "npj Digital Medicine",
    impact: "IF: 15.3",
    year: "2025",
    link: "https://www.nature.com/articles/s41746-025-01957-9",
    status: "published",
    first: false,
  },
  {
    title:
      "Selective Deeply Supervised Multi-Scale Attention Network for Brain Tumor Segmentation",
    authors: "A. Rehman, M. Usman, A. Shahid, S. Latif, J. Qadir",
    venue: "Sensors",
    impact: "IF: 3.9",
    year: "2023",
    link: "https://www.mdpi.com/1424-8220/23/4/2346",
    status: "published",
    first: true,
  },
  {
    title:
      "SSMT-Net: A Semi-Supervised Multitask Transformer-Based Network for Thyroid Nodule Segmentation",
    authors: "M. U. Farooq, A. Ur Rehman, A. Rehman, M. Usman, D. K. Chae",
    venue: "WACV 2026",
    year: "2025",
    status: "published",
    first: false,
  },
  {
    title:
      "MEDS-Net: Multi-Encoder Based Self-Distilled Network for Lung Nodule Detection",
    authors: "M. Usman, A. Rehman, A. Shahid, S. Latif, Y. G. Shin",
    venue: "Engineering Applications of Artificial Intelligence",
    impact: "IF: 8.0",
    year: "2024",
    link: "https://www.sciencedirect.com/science/article/pii/S0952197623017815",
    status: "published",
    first: false,
  },
  {
    title:
      "Intelligent Healthcare System for IoMT-Integrated Sonography",
    authors: "M. Usman, A. Rehman, S. Masood, T. M. Khan, J. Qadir",
    venue: "Internet of Things",
    impact: "IF: 5.9",
    year: "2024",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S2542660524000076",
    status: "published",
    first: false,
  },
  {
    title:
      "Advancing Metaverse-Based Healthcare With Multimodal Neuroimaging Fusion for Brain Age Estimation",
    authors:
      "M. Usman, A. Rehman, A. Shahid, A. U. Rehman, S. M. Gho, A. Lee, T. M. Khan",
    venue: "IEEE Journal of Biomedical and Health Informatics",
    impact: "IF: 6.7",
    year: "2024",
    link: "https://ieeexplore.ieee.org/document/10766589",
    status: "published",
    first: false,
  },
];

export default function Publications() {
  return (
    <AnimatedSection
      id="publications"
      className="py-24 px-6 max-w-5xl mx-auto"
    >
      <SectionTitle title="Publications" />
      <div className="space-y-4">
        {publications.map((pub, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="card p-6 group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {pub.first && (
                    <span className="tag text-xs">First Author</span>
                  )}
                  <span
                    className={`tag text-xs ${
                      pub.status === "under-review" ? "tag-teal" : "tag-blue"
                    }`}
                  >
                    {pub.status === "under-review"
                      ? "Under Review"
                      : pub.year}
                  </span>
                  {pub.impact && (
                    <span className="text-xs font-mono text-ink-muted">
                      {pub.impact}
                    </span>
                  )}
                </div>
                <h4 className="text-ink font-medium group-hover:text-accent transition-colors">
                  {pub.title}
                </h4>
                <p className="text-ink-muted text-sm mt-1">{pub.authors}</p>
                <p className="text-accent-blue text-sm font-medium mt-1 italic">
                  {pub.venue}
                </p>
              </div>
              {pub.link && (
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-muted hover:text-accent transition-colors shrink-0 mt-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
