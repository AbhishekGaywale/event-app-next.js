
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const slides = [
  { type: "image", src: "/slide/Book.jpg", alt: "Balloon Decoration" },
  { type: "image", src: "/slide/babyshower.jpg", alt: "Baby Shower Setup" },
  { type: "image", src: "/slide/Minnie-theme.jpg", alt: "Theme Party" },
  // { type: "video", src: "/slide/decovideo.mp4", alt: "Event Highlights" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  // useEffect(() => {
  //   const timer = setTimeout(
  //     () => {
  //       setCurrent((prev) => (prev + 1) % slides.length);
  //     },
  //     slides[current].type === "video" ? 6000 : 3500
  //   );
  //   return () => clearTimeout(timer);
  // }, [current]);

  return (
    <section className="min-h-screen w-screen md:w-screen flex items-center relative bg-[linear-gradient(140deg,#1f2937_65%,#ffffff_35%)] px-4 md:px-12 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-7xl mx-auto w-full">
        {/* Left: Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 text-center md:text-left space-y-6 text-white"
        >
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#10b981]">
            Let’s Celebrate Your Big Day in Style!
          </h1>
          <p className="text-gray-200 text-base sm:text-lg">
            We create unforgettable experiences through color, balloons & magic.
            Every event deserves a touch of class — let’s make it happen.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-white font-medium rounded-full shadow-md hover:scale-105 transition"
          >
            Plan Your Event
          </Link>
        </motion.div>

        {/* Right: Slider Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 overflow-hidden shadow-xl border border-gray-200 relative rounded-xl"
        >
          <div className="relative w-full  h-[300px] md:h-[550px]">
            <motion.div
              key={slides[current].src}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full"
            >
              {slides[current].type === "image" && (
                <Image
                  src={slides[current].src}
                  alt={slides[current].alt}
                  fill
                  className="object-fit rounded-xl"
                  priority
                />
                // ) : (
                //   <video
                //     className="w-full h-full object-cover rounded-xl"
                //     // src={slides[current].src}
                //     autoPlay
                //     muted
                //     loop
                //     playsInline
                //   />
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-white/25 z-10 rounded-xl" />
            </motion.div>

            {/* Dots/Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-3 h-3 rounded-full ${
                    current === i ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
