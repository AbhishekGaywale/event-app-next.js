"use client";

import React from "react";
import Image from "next/image";

interface EventCardProps {
  title: string;
  rating: string; // example: "4.5"
  description: string;
  imageUrl: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  rating,
  description,
  imageUrl,
}) => {
  const numericRating = parseFloat(rating);
  const fullStars = Math.floor(numericRating);
  const halfStar = numericRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="bg-white rounded overflow-hidden w-full h-[420px] transition hover:shadow-lg flex flex-col">
      <Image
        src={imageUrl}
        alt={title}
        width={200}
        height={220}
        className="w-full h-64 object-cover"
      />
      <div className="p-2">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>

        {/* Star Rating */}
        <div className="flex items-center text-yellow-500 text-sm mt-1">
          {Array(fullStars)
            .fill(null)
            .map((_, i) => (
              <span key={`full-${i}`}>&#9733;</span> // full star ★
            ))}
          {halfStar && <span>&#189;</span>} {/* half star ½ */}
          {Array(emptyStars)
            .fill(null)
            .map((_, i) => (
              <span key={`empty-${i}`} className="text-gray-300">&#9733;</span> // empty star ☆
            ))}
          <span className="ml-2 text-gray-600">{rating}</span>
        </div>

        <button className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm px-4 py-2 rounded-full hover:from-blue-700 hover:to-indigo-700 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
