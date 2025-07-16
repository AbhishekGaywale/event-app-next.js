"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  { src: "/slide/Book.jpg", alt: "Balloon Decoration" },
  { src: "/slide/babyshower.jpg", alt: "Baby Shower Setup" },
  { src: "/slide/Minnie-theme.jpg", alt: "Theme Party" },
];

export default function HeroSection() {
  return (
    <section className="min-h-screen w-screen md:w-screen flex items-center relative bg-[linear-gradient(140deg,#1f2937_65%,#ffffff_35%)] px-4 md:px-12 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-7xl mx-auto w-full">
        {/* Left Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6 text-white">
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
        </div>

        {/* Right Image Slider Section */}
        <div className="w-full md:w-1/2 overflow-hidden shadow-xl border border-gray-200 relative rounded-xl">
          <div className="relative w-full h-[300px] md:h-[550px]">
            <Swiper
              modules={[Autoplay, Pagination, EffectFade]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              effect="fade"
              loop
              className="w-full h-full rounded-xl"
            >
              {slides.map((slide, i) => (
                <SwiperSlide key={i}>
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover rounded-xl"
                    priority
                  />
                  <div className="absolute inset-0 bg-white/25 z-10 rounded-xl" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, EffectFade } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/pagination";

// const slides = [
//   { src: "/slide/Book.jpg", alt: "Balloon Decoration" },
//   { src: "/slide/babyshower.jpg", alt: "Baby Shower Setup" },
//   { src: "/slide/Minnie-theme.jpg", alt: "Theme Party" },
// ];

// export default function HeroSection() {
//   return (
//     <section className="min-h-screen w-screen flex items-center relative bg-[linear-gradient(145deg,#7E0257_5%,#7E0257_30%,black_60%,white_60%,white_100%)] px-4 md:px-12 py-10">
//       <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-7xl mx-auto w-full">
//         {/* Left Text Section */}
//         <div className="w-full md:w-1/2 text-center md:text-left space-y-6 text-white">
//           <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] via-[#ec4899] to-[#8b5cf6]">
//             Let’s Celebrate Your Big Day in Style!
//           </h1>
//           <p className="text-gray-200 text-base sm:text-lg">
//             We create unforgettable experiences through color, balloons & magic.
//             Every event deserves a touch of class — let’s make it happen.
//           </p>
//           <Link
//             href="/contact"
//             className="inline-block px-6 py-3 bg-gradient-to-r from-[#f97316] via-[#ec4899] to-[#8b5cf6] text-white font-semibold rounded-full shadow-lg hover:scale-105 transition"
//           >
//             Plan Your Event
//           </Link>
//         </div>

//         {/* Right Image Slider Section */}
//         <div className="w-full md:w-1/2 overflow-hidden shadow-xl border border-gray-500 relative rounded-xl">
//           <div className="relative w-full h-[300px] md:h-[550px]">
//             <Swiper
//               modules={[Autoplay, Pagination, EffectFade]}
//               autoplay={{ delay: 3000, disableOnInteraction: false }}
//               pagination={{ clickable: true }}
//               effect="fade"
//               loop
//               className="w-full h-full rounded-xl"
//             >
//               {slides.map((slide, i) => (
//                 <SwiperSlide key={i}>
//                   <Image
//                     src={slide.src}
//                     alt={slide.alt}
//                     fill
//                     className="object-cover rounded-xl"
//                     priority
//                   />
//                   <div className="absolute inset-0 bg-black/25 z-10 rounded-xl" />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
