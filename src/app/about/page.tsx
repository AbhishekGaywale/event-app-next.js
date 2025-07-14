"use client";

import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function AboutPage() {
  return (
    <section
      className={`${poppins.className} w-full bg-transparent from-[#fffdf8] to-[#f5f5fa] py-20 px-4`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text mb-16">
          <h2 className="text-3xl md:text-3xl font-serif  text-[#51A4A8]">
            -About Us
          </h2>
          <p className="mt-3 text-gray-600 text-2xl font-serif font-semibold max-w-2xl">
            Creating joyful memories through thoughtful design and celebration.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="space-y-6">
            <h3 className="text-2xl text font-semibold">
              Your Celebration, Our Passion
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed text-justify">
              At The Balloon Story, we turn special moments into magical
              experiences. From themed birthdays and elegant proposals to baby
              showers and anniversaries, our team ensures that every detail
              reflects your personality and style.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed text-justify">
              With a flair for creativity and a heart for service, we’re
              committed to delivering timeless memories through bespoke
              decorations and smooth execution.
            </p>
            {/* CTA Button */}
            <div>
              <button className="mt-2 inline-block px-6 py-3 rounded-full bg-sky-100 text-sky-900 font-medium shadow hover:bg-[#5c798b] transition duration-300">
                Let's Plan Together
              </button>
            </div>
          </div>

          {/* Right: Image + Video */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <video
              src="/slide/decovideo.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="rounded-xl w-full sm:w-1/2 h-[250px] sm:h-[320px] object-cover shadow-lg"
            />
            <Image
              src="/slide/babyshower.jpg"
              alt="Decor Sample"
              width={500}
              height={350}
              className="rounded-xl w-full sm:w-1/2 h-[250px] sm:h-[320px] object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
