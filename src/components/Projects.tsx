"use client";
import { motion } from "framer-motion";
import AnimatedSection, { SectionTitle } from "./AnimatedSection";

const featuredProjects = [
  {
    title: "AI-Driven Cardiovascular Risk Stratification from Abdominal CT",
    description:
      "Developed an opportunistic screening pipeline to estimate cardiovascular risk from routine abdominal CT scans. Deep learning models for imaging-based risk prediction evaluated using survival analysis.",
    tags: ["PyTorch", "Medical Imaging", "Cox Models", "CT Scans"],
  },
  {
    title: "Atherosclerosis Screening from Chest X-Rays with Foundation Models",
    description:
      "Comparative evaluation of foundation models (Rad-DINO, DINOv2, CheXagent, CLIP) for opportunistic cardiovascular risk prediction from standard chest X-rays with explainability analysis.",
    tags: ["Foundation Models", "LoRA", "Grad-CAM", "Survival Analysis"],
    github: "https://github.com/Azkarehman/CXR-Atherosclerosis-Screening",
  },
];

const githubProjects = [
  {
    name: "MESAHA-Net",
    description: "Medical image segmentation and analysis network.",
    github: "https://github.com/Azkarehman/MESAHA-Net",
    tags: ["Python", "Medical Imaging"],
  },
  {
    name: "SDS-MSA-Net",
    description: "Fully automatic method for segmenting brain tumor regions using attention network.",
    github: "https://github.com/Azkarehman/SDS-MSA-Net",
    tags: ["Python", "Segmentation"],
  },
  {
    name: "KL Grade Classification in Knee X-ray Images",
    description: "Novel architectures for Kellgren-Lawrence grade classification from knee X-rays.",
    github: "https://github.com/Azkarehman/-KL-Grade-Classification-in-Knee-Xray-Images-",
    tags: ["Jupyter", "Classification"],
  },
  {
    name: "MAXedNet",
    description: "Deep learning network architecture for medical image analysis.",
    github: "https://github.com/Azkarehman/MAXedNet",
    tags: ["Jupyter", "Deep Learning"],
  },
];

export default function Projects() {
  return (
    <AnimatedSection id="projects" className="py-24 px-6 max-w-5xl mx-auto">
      <SectionTitle title="Projects" />

      {/* Featured research projects */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {featuredProjects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card p-6 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
                <span className="tag text-xs tag-teal">Research</span>
              </div>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-ink-muted hover:text-accent transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
            </div>
            <h4 className="text-lg font-semibold text-ink group-hover:text-accent transition-colors mb-3">
              {project.title}
            </h4>
            <p className="text-ink-light text-sm leading-relaxed mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="tag text-xs">{tag}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* GitHub repos */}
      <h3 className="font-serif text-xl text-ink font-semibold mb-6">Open Source & GitHub</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {githubProjects.map((project, i) => (
          <motion.a
            key={i}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            className="card p-5 group block"
          >
            <div className="flex items-center justify-between mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-ink-muted group-hover:text-accent transition-colors">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <h4 className="font-semibold text-ink group-hover:text-accent transition-colors text-sm mb-1">
              {project.name}
            </h4>
            <p className="text-ink-muted text-xs leading-relaxed mb-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="tag text-[0.6rem] tag-blue">{tag}</span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </AnimatedSection>
  );
}
