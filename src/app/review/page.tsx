"use client";

import React from "react";
import Image from "next/image";

export default function ReviewPage() {
  return (
    <div className="flex flex-col items-center px-4 py-12  bg-gray-50">
      <h1 className="text-3xl font-bold text-indigo-700 mb-10">OUR CLIENT'S REVIEW</h1>

      <div className="bg-blue-300 text-white max-w-2xl w-full rounded-md shadow-md p-6 relative">
        {/* Quotation Icon (top right) */}
        <div className="absolute top-4 right-4 text-4xl text-blue-700 font-bold">
          &rdquo;
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-4">
          <Image
            src="/clients/client1.jpg"
            alt="John Deo"
            width={60}
            height={60}
            className="rounded-full border-2 border-pink-400 object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold text-white">John Deo</h2>
            <p className="text-sm text-gray-100">Happy Clients</p>
          </div>
        </div>

        {/* Feedback */}
        <p className="text-white leading-relaxed text-sm sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
          dolor dicta cum. Eos beatae eligendi, magni numquam nemo sed ut
          corrupti, ipsam iure nisi unde et assumenda perspiciatis voluptatibus
          nihil.
        </p>
      </div>
    </div>
  );
}
