"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Poppins } from "next/font/google";
import ContactUsPage from "@/app/contact/page";
import { motion } from "framer-motion";
import EventCard from "@/app/component/EventCard";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const services = [
  {
    title: "Birthday",
    slug: "birthday",
    description:
      "Celebrate life's milestones with joyful and creative birthday decorations.",
    image: "/slide/Book.jpg",
    features: ["Balloon Arch", "Theme Banners", "Cake Table Decor"],
  },
  {
    title: "Baby Shower",
    slug: "baby-shower",
    description:
      "Make every baby shower special with delightful and colorful themes.",
    image: "/slide/babyshower.jpg",
    features: ["Pastel Setup", "Welcome Board", "Photo Booth"],
  },
  {
    title: "Anniversary",
    slug: "anniversary",
    description:
      "Celebrate anniversaries with elegant and romantic decor setups.",
    image: "/images/events/anniversary.jpg",
    features: ["Floral Backdrop", "LED Lights", "Couple Chairs"],
  },
  {
    title: "Haldi Decor",
    slug: "haldi-decor",
    description:
      "Traditional haldi ceremonies enhanced with festive colors and decor.",
    image: "/images/events/haldi.jpg",
    features: ["Yellow Drapes", "Marigold Setup", "Stage Decor"],
  },
  {
    title: "Mehendi Decor",
    slug: "mehendi-decor",
    description:
      "Colorful mehendi functions brought to life with vibrant decor.",
    image: "/images/events/mehendi.jpg",
    features: ["Green & Yellow Drapes", "Henna Station", "Flower Decor"],
  },
  {
    title: "Proposal Decor",
    slug: "proposal",
    description: "Make your proposal magical with themed and romantic setups.",
    image: "/images/events/proposal.jpg",
    features: ["Rose Petal Aisle", "Love Balloons", "Marry Me LED"],
  },
];

export default function EventDetailPage() {
  const { slug } = useParams();
  const event = services.find((item) => item.slug === slug);

  if (!event) {
    return (
      <div className="text-center text-red-500 py-20 text-xl font-semibold">
        🚫 Event not found
      </div>
    );
  }

  return (
  <section className={`${poppins.className}`}>
  {/* Hero Section */}
  <div className="relative w-full h-[240px] md:h-[200px]">
    <Image
      src="/slide/design_05.jpg"
      alt="Hero Background"
      fill
      className="object-cover brightness-[0.4]"
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg font-serif">
        {event.title}
      </h1>
    </div>
  </div>

  {/* Detail Section - Text Left, Image Right */}
  <div className="bg-[linear-gradient(130deg,#fffaf3,#fdf0d1,#ffffff)] py-20 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Left: Text */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="bg-transparent backdrop-blur-md p-8 md:p-10 rounded-3xl shadow"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#3b310b] mb-6">
          What’s Included
        </h2>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
          {event.description}
        </p>
        <ul className="space-y-4 text-[#6b4e09] font-medium text-base sm:text-lg">
          {event.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-1 text-amber-500">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Right: Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="overflow-hidden rounded-3xl shadow-2xl"
      >
        <Image
          src={event.image}
          alt={event.title}
          width={600}
          height={400}
          className="w-full h-[300px] sm:h-[420px] object-cover hover:scale-[1.03] transition-transform duration-700 ease-in-out"
        />
      </motion.div>
    </div>
  </div>
{event.slug === "birthday" && (
  <div className="px-4 md:px-6 py-10 bg-white">
    <h3 className="text-2xl font-bold text-[#3b310b] mb-6">Similar Packages</h3>
    <EventCard
      title="Birthday Party"
      rating="4.5"
      description="Celebrate your kid's birthday with balloons, cake, and fun themes."
      imageUrl="/images/theme.jpg"
    />
  </div>
)}


  {/* Contact Section */}
  <div className="bg-white py-16 px-4 md:px-6">
    <h3 className="text-3xl font-bold text-center text-[#3b310b] mb-10">
      Ready to Book?
    </h3>
    <ContactUsPage />
  </div>
</section>

  );
}
