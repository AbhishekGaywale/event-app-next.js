// "use client";

// import React from "react";
// import Image from "next/image";

// const images = [
//   "/gallery/haldihero.png",
//   "/gallery/proposal.jpeg",
//   "/images/bday.jpeg",
//   "/gallery/anvrsry.jpg",
//   "/gallery/babyShower.jpeg",
//   "/gallery/bday2.jpeg",
// ];

// export default function GalleryPage() {
//   return (
//     <div className="min-h-screen px-2 sm:px-6 py-12 bg-gray-50 w-full">
//       <h1 className="text-3xl font-bold text-center mb-8 text-pink-950">
//         Celebrating Moments💫
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 w-full">
//         {images.map((src, index) => (
//           <div key={index} className="overflow-hidden  shadow-2xl   bg-white">
//             <Image
//               src={src}
//               alt={`Gallery Image ${index + 1}`}
//               width={300}
//               height={200}
//               className="w-full h-48 sm:h-52 md:h-56 object-cover transition-transform
//                duration-300 hover:scale-105 border-2 border-amber-600"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const galleryItems = [
  { type: "image", src: "/gallery/haldihero.png" },
  { type: "video", src: "/videos/event1.mp4" },
  { type: "image", src: "/images/bday.jpeg" },
  { type: "video", src: "/videos/event2.mp4" },
  { type: "image", src: "/gallery/anvrsry.jpg" },
  { type: "image", src: "/gallery/babyShower.jpeg" },
];

export default function GalleryPage() {
  const [modalItem, setModalItem] = useState<null | { type: string; src: string }>(null);

  return (
    <div className="min-h-screen px-4 py-16 bg-gradient-to-tr from-[#fef6f6] via-[#fff3ec] to-[#f4f8ff]">
      <h1 className="text-4xl font text-center mb-14 text-[#4fcbdc] font-serif tracking-tight">
        Our Magical Moments
      </h1>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {galleryItems.map((item, index) => (
          <div
            key={index}
            onClick={() => setModalItem(item)}
            className="relative group rounded-3xl overflow-hidden shadow-lg hover:shadow-xl border border-gray-200 hover:scale-[1.03] transition duration-300 cursor-pointer bg-white"
          >
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={`Gallery ${index + 1}`}
                width={500}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <video
                muted
                autoPlay
                loop
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              >
                <source src={item.src} type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all" />
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden p-4"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalItem(null)}
                className="absolute top-3 right-3 text-gray-700 hover:text-red-500 z-50"
              >
                <X size={28} />
              </button>

              {/* Preview */}
              {modalItem.type === "image" ? (
                <Image
                  src={modalItem.src}
                  alt="Preview"
                  width={1000}
                  height={700}
                  className="w-full max-h-[80vh] object-contain rounded-xl"
                />
              ) : (
                <video
                  src={modalItem.src}
                  controls
                  autoPlay
                  className="w-full max-h-[80vh] rounded-xl"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
