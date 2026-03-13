"use client";
import { motion } from "framer-motion";
import AnimatedSection, { SectionTitle } from "./AnimatedSection";

const experiences = [
  {
    role: "Researcher",
    company: "Health System Data Science Lab, Seoul National University",
    location: "Seoul, South Korea",
    period: "Sep 2023 - Aug 2025",
    points: [
      "Working under Dr. Sang Min Park in the Department of Biomedical Sciences.",
      "Research on leveraging AI and data science techniques to address challenges in healthcare systems.",
      "Projects involving health data analysis, predictive modeling, and medical image analysis.",
    ],
  },
  {
    role: "AI Research Engineer",
    company: "HealthHub.kr",
    location: "Seoul, South Korea",
    period: "Jan 2021 - Jul 2023",
    points: [
      "Researched and implemented SOTA machine learning and deep learning algorithms in medical image analysis.",
      "Developed computer vision and deep learning-based medical diagnostic solutions.",
      "Integrated AI solutions with HealthHub DICOMLINK system, optimizing the pipeline for efficiency and scalability.",
      "Mentored and trained new employees, facilitating their onboarding and professional development.",
    ],
  },
];

const education = [
  {
    degree: "M.S. in Biomedical Sciences",
    school: "Seoul National University (SNU)",
    period: "2023 - 2025",
    thesis:
      "AI-Driven Opportunistic Screening for Cardiovascular Disease Risk Using Abdominal CT Scans",
  },
  {
    degree: "B.S. in Electrical Engineering",
    school: "National University of Science and Technology (NUST)",
    period: "2016 - 2020",
    thesis: "Chest X-Ray Abnormality Detection using Deep Learning",
  },
];

export default function Experience() {
  return (
    <AnimatedSection id="experience" className="py-24 px-6 max-w-5xl mx-auto">
      <SectionTitle title="Experience & Education" />

      <div className="grid md:grid-cols-2 gap-12">
        {/* Experience */}
        <div>
          <h3 className="text-lg font-serif text-ink font-semibold mb-8">
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
                  <h4 className="text-lg font-semibold text-ink">
                    {exp.role}
                  </h4>
                  <p className="text-accent font-medium text-sm">
                    {exp.company}
                  </p>
                  <p className="text-ink-muted text-sm mt-1">
                    {exp.period} | {exp.location}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {exp.points.map((point, j) => (
                      <li
                        key={j}
                        className="text-ink-light text-sm flex gap-2"
                      >
                        <span className="text-accent mt-1 shrink-0">
                          &#9655;
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-lg font-serif text-ink font-semibold mb-8">
            Education
          </h3>
          <div className="space-y-6">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="card p-6"
              >
                <h4 className="text-lg font-semibold text-ink">
                  {edu.degree}
                </h4>
                <p className="text-accent-blue font-medium text-sm">{edu.school}</p>
                <p className="text-ink-muted text-sm mt-1">
                  {edu.period}
                </p>
                <p className="text-ink-light text-sm mt-3">
                  <span className="text-ink-muted italic">Thesis:</span> {edu.thesis}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Academic Services */}
          <h3 className="text-lg font-serif text-ink font-semibold mt-12 mb-8">
            Academic Services
          </h3>
          <div className="card p-6">
            <p className="text-sm text-ink-light mb-3 font-semibold">
              Reviewer for:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "IEEE Trans. Medical Imaging",
                "IEEE Trans. AI",
                "Medical Physics",
                "Neurocomputing",
                "npj Digital Medicine",
                "Scientific Reports",
                "Sensors MDPI",
              ].map((journal) => (
                <span key={journal} className="tag text-xs">
                  {journal}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
