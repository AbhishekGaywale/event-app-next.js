"use client";

import React, { useState, useEffect } from "react";
import HeroSlider from "./components/HeroSection";
import MyStoryPage from "./mystory/page";
import Servicepage from "./services/page";
import HappyCustpage from "./happycustomer/page";
import Testimonialpage from "./testimonials/page";
import AboutPage from "./about/page";
import ContactPage from "./contact/page";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [showScrollTop, setShowScrollTop] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 300);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  return (
    // <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#FFF5F7] via-[#F4F7FF] to-[#FBF3E3]">
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      {/* Hero + MyStory in side-by-side layout */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-0 md:px-0 py-0 gap-0">
        {/* Left: MyStoryPage */}
       

        {/* Right: HeroSlider */}
          <HeroSlider />
      </div>

      {/* Other Sections */}
      <div className="space-y-16">
        <Servicepage />
        <HappyCustpage />
        <Testimonialpage />
        <AboutPage />
        <ContactPage />
      </div>

      {/* WhatsApp Button */}
      {/* <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-110"
        aria-label="WhatsApp Chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="M12.04 2.003a9.931 9.931 0 00-8.85 14.65l-1.17 4.293 4.387-1.153a9.944 9.944 0 004.143.938h.007c5.511 0 9.993-4.482 9.993-9.993a9.931 9.931 0 00-9.99-9.936z" />
        </svg>
      </a>

      {/* Call Button */}
      {/* <a
        href="tel:+919999999999"
        className="fixed bottom-24 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-110"
        aria-label="Call Us"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.48 2.53.73 3.88.73a1 1 0 011 1v3.5a1 1 0 01-1 1C10.4 22 2 13.6 2 3.5a1 1 0 011-1H6.5a1 1 0 011 1c0 1.35.25 2.67.73 3.88a1 1 0 01-.21 1.11l-2.4 2.3z" />
        </svg>
      </a>  */}
      {/* Scroll To Top Button */}
{mounted && (
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="fixed bottom-6 right-6 bg-[#51A4A8] hover:bg-[#3e898c] text-white p-3 rounded-full shadow-lg z-50 transition-transform hover:scale-110"
    aria-label="Scroll to Top"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 15l7-7 7 7"
      />
    </svg>
  </button>
)}
    </div>
  );
}
