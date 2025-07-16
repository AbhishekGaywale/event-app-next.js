// "use client";

// import React from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Poppins } from "next/font/google";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "600", "700"],
// });

// interface Service {
//   title: string;
//   slug: string;
//   description: string;
//   icon: React.ReactNode;
// }

// export default function EventCategoryCard({
//   services,
// }: {
//   services: Service[];
// }) {
//   return (
//     <section className={`${poppins.className} py-8 px-2 sm:px-4 md:px-6`}>
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
//         {services.map((service, index) => (
//           <Link key={index} href={`/services/${service.slug}`} prefetch={true}>
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.12 }}
//               viewport={{ once: true }}
//               tabIndex={0} // required for focus to work
//               className="group relative cursor-pointer bg-transparent backdrop-blur-xl hover:bg-white focus:bg-white transition-all duration-300 p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 overflow-hidden focus:outline-none border-b-2 border-b-fuchsia-300"
//             >
//               {/* Border animation */}
//               <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-purple-500 transition-all duration-500 group-hover:w-full group-focus:w-full" />

//               {/* Icon */}
//               <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#F8E7EC] group-hover:bg-[#e5e7eb] flex items-center justify-center transition-all duration-300">
//                 {service.icon}
//               </div>

//               {/* Text */}
//               <div className="text-center md:text-left space-y-2">
//                 <motion.h3
//                   initial={{ opacity: 0, y: 10 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.4, delay: 0.2 }}
//                   viewport={{ once: true }}
//                   className="text-xl font-semibold text-gray-800 group-hover:text-[#7c3aed] tracking-tight"
//                 >
//                   {service.title}
//                 </motion.h3>
//                 <motion.p
//                   initial={{ opacity: 0, y: 10 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.3 }}
//                   viewport={{ once: true }}
//                   className="text-sm text-gray-600 leading-relaxed"
//                 >
//                   {service.description}
//                 </motion.p>
//               </div>
//             </motion.div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

interface Service {
  title: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
}

export default function EventCategoryCard({
  services,
}: {
  services: Service[];
}) {
  return (
    <section className={`${poppins.className} py-8 px-2 sm:px-4 md:px-6`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <Link key={index} href={`/services/${service.slug}`} prefetch={true}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              viewport={{ once: true }}
              tabIndex={0}
              className="group relative cursor-pointer bg-transparent backdrop-blur-xl hover:bg-white focus:bg-white transition-all duration-300 p-6 sm:p-8 flex flex-col items-center gap-4 overflow-hidden focus:outline-none border-b-2 border-b-fuchsia-300 text-center w-full h-[300px] max-w-[280px] mx-auto"
            >
              {/* Border animation */}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-purple-500 transition-all duration-500 group-hover:w-full group-focus:w-full" />

              {/* Icon */}
              <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#F8E7EC] group-hover:bg-[#e5e7eb] flex items-center justify-center transition-all duration-300">
    {service.icon}
  </div>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl font-semibold text-gray-800 group-hover:text-[#7c3aed] tracking-tight"
              >
                {service.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-sm text-gray-600 leading-relaxed"
              >
                {service.description}
              </motion.p>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
