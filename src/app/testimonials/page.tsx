"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  videoUrl: string;
  // Add other properties if they exist in your API response
  // id: string;
  // name: string;
  // etc.
}

export default function Testimonialpage() {
  const [testimonials, setTestimonials] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const data: Testimonial[] = await res.json();
        const videoUrls = data.map((item) => item.videoUrl);
        setTestimonials(videoUrls);
      } catch (error) {
        console.error("Failed to load testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev - 3 < 0 ? Math.max(testimonials.length - 3, 0) : prev - 3
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + 3 >= testimonials.length ? 0 : prev + 3
    );
  };

  const currentVideos = testimonials.slice(currentIndex, currentIndex + 3);

  return (
    <div className="px-4 py-10 bg-white">
      <h1 className="text-3xl font-semibold font-serif text-center mb-10 text-[#6A005F]">
        What Our Customers Say
      </h1>

      {/* Mobile: Single video */}
      <div className="relative max-w-2xl h-80 mx-auto block md:hidden">
        {testimonials.length > 0 && (
          <video
            src={testimonials[currentIndex]}
            controls
            autoPlay
            loop
            muted
            className="rounded-lg shadow-xl w-full h-96 object-cover"
          />
        )}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-[#6A005F] text-white p-2 rounded-full shadow-md hover:bg-[#bd7c00] transition"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-[#6A005F] text-white p-2 rounded-full shadow-md hover:bg-[#bd7c00] transition"
          aria-label="Next testimonial"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Desktop: 3 videos */}
      <div className="relative hidden md:block max-w-7xl mx-auto h-1/2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {currentVideos.map((video, index) => (
            <video
              key={`${video}-${index}`}
              src={video}
              controls
              autoPlay
              loop
              muted
              className="rounded-lg shadow-xl w-full h-96 object-cover"
            />
          ))}
        </div>
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-0 -translate-y-1/2 bg-[#6A005F] text-white p-3 rounded-full shadow-md hover:bg-[#bd7c00] transition"
          aria-label="Previous testimonials"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-0 -translate-y-1/2 bg-[#6A005F] text-white p-3 rounded-full shadow-md hover:bg-[#bd7c00] transition"
          aria-label="Next testimonials"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}