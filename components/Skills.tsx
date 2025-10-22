"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award } from "lucide-react";
import { skills, certifications } from "@/data/resume";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="py-32 bg-dark relative overflow-hidden"
    >
      {/* Geometric background */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-neon-green/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-1 bg-neon-cyan" />
            <span className="text-neon-cyan font-mono text-sm uppercase tracking-widest">
              // TECHNICAL ARSENAL
            </span>
          </div>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-50 tracking-tighter">
            SKILLS
          </h2>
        </motion.div>

        {/* Skills by Category */}
        <div className="space-y-12">
          {Object.entries(skills.categories).map(([category, skillList], catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: catIdx * 0.1 }}
            >
              {/* Category Title */}
              <h3 className="text-2xl md:text-3xl font-black text-slate-50 uppercase mb-6 flex items-center gap-4">
                <span className="text-neon-cyan">///</span>
                {category}
              </h3>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {skillList.map((skill, idx) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: catIdx * 0.1 + idx * 0.02 }}
                    className="border-2 border-slate-400/30 bg-navy-950 p-4 text-center hover:border-neon-cyan hover:bg-navy-900 transition-all group"
                  >
                    <span className="text-slate-300 group-hover:text-neon-cyan font-semibold text-sm transition-colors">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-2xl md:text-3xl font-black text-slate-50 uppercase mb-6 flex items-center gap-4">
            <span className="text-neon-green">///</span>
            CERTIFICATIONS
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, idx) => (
              <div
                key={cert.name}
                className="border-2 border-neon-green/30 bg-navy-950 p-6 hover:border-neon-green hover:bg-navy-900 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neon-green/10">
                    <Award className="text-neon-green" size={28} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-lg text-slate-50 mb-1 uppercase">
                      {cert.name}
                    </h4>
                    <p className="text-slate-400 text-sm mb-1">{cert.issuer}</p>
                    <p className="text-neon-green text-xs font-mono">{cert.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Proficiency Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 border-l-4 border-neon-pink pl-6 py-4"
        >
          <p className="text-slate-400 font-mono text-sm">
            <span className="text-neon-pink font-bold">NOTE:</span> All skills listed represent
            hands-on production experience and active project work. Constantly learning and
            expanding the toolkit.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
