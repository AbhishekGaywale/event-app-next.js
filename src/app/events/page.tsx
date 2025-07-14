"use client";

import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import ContactUsPage from "@/app/contact/page";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function EventDetailPage() {
  return (
    <section className={`${poppins.className} max-w-7xl mx-auto px-4 py-16`}>
      {/* Event Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
        {/* Left Text */}
        <div>
          <h1 className="text-3xl font-semibold text-amber-950 mb-6">
            Elegant Birthday Celebration
          </h1>
          <p className=" text-[#bd9f28] text-lg leading-relaxed mb-6">
            Celebrate your loved one's special day with vibrant balloon décor,
            themed setups, and unforgettable ambiance. From kids' parties to
            milestone birthdays, we craft every detail with joy.
          </p>
          <ul className="list-disc list-inside text-[#bd9f28] space-y-2">
            <li>Custom balloon arrangements</li>
            <li>LED backdrops & photo booths</li>
            <li>Personalized theme decorations</li>
            <li>Affordable, all-inclusive packages</li>
          </ul>
        </div>

        {/* Right Image */}
        <div>
          <Image
            src="/images/bday.jpeg"
            alt="Birthday Celebration"
            width={600}
            height={400}
            className="rounded-xl w-full h-[400px] object-cover shadow-lg"
          />
        </div>
      </div>

      {/* Contact Section Below */}
      <ContactUsPage />
    </section>
  );
}
