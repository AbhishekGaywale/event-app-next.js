"use client";

import React from "react";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function MyStoryPage() {
  return (
    <section
      className={`${poppins.className} bg-gradient-to-br from-[#FFF5F7] via-[#F0F4FF] to-[#FDF7E3] py-20 px-4`}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md border border-[#f0e7da] px-6 sm:px-10 py-12 rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.1)]"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#D97706] via-[#A855F7] to-[#10B981] mb-8"
        >
          The Balloon Story
        </motion.h1>

        {/* Paragraph 1 */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-[#444] text-base sm:text-lg leading-relaxed tracking-wide"
        >
          Every celebration starts with a{" "}
          <span className="text-[#a855f7] font-semibold">spark of joy</span> — and for us, that spark has always
          been balloons. What began as a passion for{" "}
          <span className="text-[#f59e0b] font-medium">color</span> and{" "}
          <span className="text-[#10b981] font-medium">creativity</span> has
          grown into a mission to transform moments into memories.
        </motion.p>

        {/* Paragraph 2 */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-6 text-[#555] text-base sm:text-lg leading-relaxed tracking-wide"
        >
          From <strong className="text-[#D97706]">birthday surprises</strong> and{" "}
          <strong className="text-[#ec4899]">baby showers</strong> to grand
          openings and <strong className="text-[#6366f1]">wedding proposals</strong>,
          we create installations that speak elegance, excitement, and joy.
        </motion.p>

        {/* Paragraph 3 */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-6 text-[#444] text-base sm:text-lg leading-relaxed tracking-wide"
        >
          Let us help you{" "}
          <strong className="text-[#a855f7]">elevate your occasion</strong> —
          one balloon at a time.
        </motion.p>
      </motion.div>
    </section>
  );
}
