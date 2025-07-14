"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonialpage() {
  const videos = [
    "/videos/testimonial-v.mp4",

    "/videos/testimonial-v2.mp4",
    "/videos/testimonial-v.mp4",
    "/videos/testimonial-v3.mp4",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev - 3 < 0 ? Math.max(videos.length - 3, 0) : prev - 3
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 3 >= videos.length ? 0 : prev + 3));
  };

  const currentVideos = videos.slice(currentIndex, currentIndex + 3);

  return (
    <div className="px-4 py-10 bg-white">
      <h1 className="text-3xl font-semibold font-serif text-center mb-10 text-[#51A4A8]">
        What Our Customers Say
      </h1>

      {/* ✅ Mobile: Single video with arrows */}
      <div className="relative max-w-2xl h-80 mx-auto block md:hidden">
        <video
          src={videos[currentIndex]}
          controls
          autoPlay
          loop
          muted
          className="rounded-lg shadow-xl w-full h-96  object-fit"
        />

        {/* Arrows */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-[#D08700] text-white p-2 rounded-full shadow-md hover:bg-[#bd7c00] transition"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-[#D08700] text-white p-2 rounded-full shadow-md hover:bg-[#bd7c00] transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* ✅ Desktop: 3 videos with navigation */}
      <div className="relative hidden md:block max-w-7xl mx-auto h-1/2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {currentVideos.map((video, index) => (
            <video
              key={index}
              src={video}
              controls
              autoPlay
              loop
              muted
              className="rounded-lg shadow-xl w-full h-96 object-fit"
            />
          ))}
        </div>

        {/* Desktop Arrows */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-0 -translate-y-1/2 bg-[#9ac4cf] text-white p-3 rounded-full shadow-md hover:bg-[#bd7c00] transition"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-0 -translate-y-1/2 bg-[#9ac4cf] text-white p-3 rounded-full shadow-md hover:bg-[#bd7c00] transition"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}
