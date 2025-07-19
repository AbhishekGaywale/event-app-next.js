// "use client";

// import React from "react";
// import Image from "next/image";

// interface EventCardProps {
//   title: string;
//   rating: string; // e.g., "4.5"
//   description: string;
//   imageUrl: string;
// }

// const EventCategoryCard: React.FC<EventCardProps> = ({
//   title,
//   rating,
//   description,
//   imageUrl,
// }) => {
//   const numericRating = parseFloat(rating);
//   const fullStars = Math.floor(numericRating);
//   const halfStar = numericRating % 1 >= 0.5;
//   const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

//   return (
//     <div className="bg-white/20 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl overflow-hidden transition-transform hover:scale-[1.03] hover:shadow-2xl duration-500 w-full max-w-sm mx-auto">
//       <div className="relative w-full h-64">
//         <Image
//           src={imageUrl}
//           alt={title}
//           fill
//           className="object-cover"
//         />
//       </div>

//       <div className="p-5 space-y-3 bg-white bg-opacity-80 backdrop-blur-md">
//         <h3 className="text-xl font-bold text-gray-800">{title}</h3>
//         <p className="text-gray-600 text-sm line-clamp-2">{description}</p>

//         {/* Star Rating */}
//         <div className="flex items-center text-yellow-500 text-base">
//           {Array(fullStars).fill(null).map((_, i) => (
//             <span key={`full-${i}`}>&#9733;</span>
//           ))}
//           {halfStar && <span>&#189;</span>}
//           {Array(emptyStars).fill(null).map((_, i) => (
//             <span key={`empty-${i}`} className="text-gray-300">&#9733;</span>
//           ))}
//           <span className="ml-2 text-gray-700 font-medium">{rating}</span>
//         </div>

//         <button className="w-full mt-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-full font-semibold hover:from-purple-700 hover:to-pink-600 transition-all duration-300">
//           View Details
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EventCategoryCard;
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface EventCategoryCardProps {
  eventName: string;
  categoryName: string;
  description: string;
  image: string;
  _id: string;
}

const EventCategoryCard: React.FC<EventCategoryCardProps> = ({
  eventName,
  categoryName,
  description,
  image,
  _id,
}) => {
  return (
    <Link href={`/event-category/${_id}`} passHref>
      <div className="bg-white/20 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl overflow-hidden transition-transform hover:scale-[1.03] hover:shadow-2xl duration-500 w-full max-w-[300px] mx-auto cursor-pointer">
        <div className="relative w-full h-64">
          <Image
            src={image}
            alt={`${eventName} - ${categoryName}`}
            fill
            className="object-fit"
            unoptimized={true} // For base64 images
          />
        </div>

        <div className="p-5 space-y-3 bg-white bg-opacity-80 backdrop-blur-md">
          <div>
            <h3 className="text-sm  text-gray-800">{eventName}</h3>
            <p className="text-x1 font-bold text-gray-500">{categoryName}</p>
          </div>
          <p className="text-gray-600 text-sm line-clamp-2">{description}</p>

          <button className="w-full mt-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-full font-semibold hover:from-purple-700 hover:to-pink-600 transition-all duration-300">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default EventCategoryCard;