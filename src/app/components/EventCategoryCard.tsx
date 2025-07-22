"use client";

import Image from "next/image";
// import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function EventCategoryCard({
  // _id,
  // eventName,
  categoryName,
  description,
  images = [],
  price,
}: {
  _id: string;
  eventName: string;
  categoryName: string;
  description: string;
  images: string[];
  price?: number; // Optional
}) {
  const hasImages = images.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
      <div className="relative h-48 md:h-56">
        {hasImages ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop
            className="h-full"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={img}
                  alt={`${categoryName} ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Image
            src="/default-category.jpg"
            alt="No image available"
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="p-4 md:p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
            {categoryName}
          </h3>
          <p className="text-gray-600 text-sm md:text-base mb-2 line-clamp-2">
            {description}
          </p>
          <p className="text-sm text-gray-700 font-medium">
            Price: <span className="text-black">{price ? `₹${price}` : "***"}</span>
          </p>
        </div>

        {/* <Link
          href={`/event-category/${_id}`}
          className="text-[#51A4A8] hover:text-[#3e8a8e] font-medium text-sm md:text-base mt-auto"
        >
          View Details →
        </Link> */}
      </div>
    </div>
  );
}
