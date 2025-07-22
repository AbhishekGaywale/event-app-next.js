
// "use client";

// import React from "react";
// import { useInView } from "react-intersection-observer";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import CountUp from "react-countup";

// const celebrationData = [
//   { type: "Events", count: 3000 },
//   { type: "Trusted Clients", count: 1000 },
//   { type: "Years of Experience", count: 10 },
// ];

// const AnimatedCounter = ({ end }: { end: number }) => {
//   const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
//   return (
//     <p
//       ref={ref}
//       className="text-5xl font-bold text-gray-700 tracking-tight font-serif"
//     >
//       {inView ? <CountUp end={end} duration={2} /> : 0}+
//     </p>
//   );
// };

// export default function HappyCustPage() {
//   return (
//     <section className="bg-[linear-gradient(150deg,#F3F8F6_60%,#ffffff_40%)] pt-10 relative overflow-hidden">
//       {/* Top Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-6 mb-28 relative z-10">
//         {/* Text */}
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="space-y-6"
//         >
//           <h2 className="text-3xl font-serif font text-[#51A4A8] leading-tight">
//             Why Choose Us?
//           </h2>
//           <p className="text-gray-700 text-lg font-semibold leading-relaxed">
//             At <strong className="text-[#3e3412]">The Balloon Story</strong>, we
//             transform your dreams into beautifully crafted realities.
//           </p>
//           <p className="text-gray-700 leading-relaxed">
//             Whether it’s a romantic proposal or a child’s first birthday, we
//             promise perfection with every pop of a balloon.
//           </p>
//           <ul className="list-disc list-inside text-gray-600 space-y-2">
//             <li>Unique, customized decoration themes</li>
//             <li>Timely setup & excellent coordination</li>
//             <li>Affordable and premium packages</li>
//             <li>Trusted by 1000+ happy customers</li>
//             <li>End-to-end event support from concept to celebration</li>
//           </ul>
//         </motion.div>

//         {/* Image */}
//         <motion.div
//           initial={{ opacity: 0, x: 40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="relative"
//         >
//           <div className="relative z-20">
//             <Image
//               src="/images/aboutus.jpg"
//               alt="Why Choose Us"
//               width={520}
//               height={400}
//               className="rounded-tr-[60px] rounded-bl-[60px] object-cover shadow-2xl transition-transform duration-500 hover:scale-105"
//             />
//           </div>
//           {/* Image extending out of section */}
//           <div className="absolute -bottom-10 -left-10 w-full h-full bg-transparent z-0" />
//         </motion.div>
//       </div>

//       {/* Numbers Section */}
//       <div className="text-center mb-16 px-4 relative z-10">
//         <h3 className="text-2xl font-serif font-bold text-[#51A4A8] mb-4">
//           Numbers That Speak for Themselves
//         </h3>
//         <p className="text-gray-700 max-w-2xl mx-auto text-lg">
//           Join thousands of happy clients who trusted us to make their moments magical.
//           Our growing portfolio and glowing feedback reflect our unwavering commitment to excellence.
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6 pb-20 relative z-10">
//         {celebrationData.map((item, index) => {
//           const { ref, inView } = useInView({
//             triggerOnce: true,
//             threshold: 0.4,
//           });

//           return (
//             <motion.div
//               key={index}
//               ref={ref}
//               initial={{ y: 50, opacity: 0 }}
//               animate={inView ? { y: 0, opacity: 1 } : {}}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//               className="bg-white rounded-3xl px-8 py-6 text-center shadow-md hover:shadow-xl transition"
//             >
//               <AnimatedCounter end={item.count} />
//               <h2 className="text-xl font-semibold text-gray-800 mt-1 font-sans">
//                 {item.type}
//               </h2>
//             </motion.div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }
"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";
import CountUp from "react-countup";

const celebrationData = [
  { type: "Events", count: 3000 },
  { type: "Trusted Clients", count: 1000 },
  { type: "Years of Experience", count: 10 },
];

const AnimatedCounter = ({ end }: { end: number }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  return (
    <p
      ref={ref}
      className="text-5xl font-bold text-gray-700 tracking-tight font-serif"
    >
      {inView ? <CountUp end={end} duration={2} /> : 0}+
    </p>
  );
};

const CelebrationCard = ({ item, index }: { item: { type: string; count: number }, index: number }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  return (
    <motion.div
      key={index}
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-white rounded-3xl px-8 py-6 text-center shadow-md hover:shadow-xl transition"
    >
      <AnimatedCounter end={item.count} />
      <h2 className="text-xl font-semibold text-gray-800 mt-1 font-sans">
        {item.type}
      </h2>
    </motion.div>
  );
};

export default function HappyCustPage() {
  return (
    <section className="bg-[linear-gradient(150deg,#F3F8F6_60%,#ffffff_40%)] pt-10 relative overflow-hidden">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-6 mb-28 relative z-10">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-serif font text-[#6A005F] leading-tight">
            Why Choose Us?
          </h2>
          <p className="text-gray-700 text-lg font-semibold leading-relaxed">
            At <strong className="text-[#3e3412]">The Balloon Story</strong>, we
            transform your dreams into beautifully crafted realities.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether its a romantic proposal or a childs first birthday, we
            promise perfection with every pop of a balloon.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Unique, customized decoration themes</li>
            <li>Timely setup & excellent coordination</li>
            <li>Affordable and premium packages</li>
            <li>Trusted by 1000+ happy customers</li>
            <li>End-to-end event support from concept to celebration</li>
          </ul>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative z-20">
            <Image
              src="/images/aboutus.jpg"
              alt="Why Choose Us"
              width={520}
              height={400}
              className="rounded-tr-[60px] rounded-bl-[60px] object-cover shadow-2xl transition-transform duration-500 hover:scale-105"
            />
          </div>
          {/* Image extending out of section */}
          <div className="absolute -bottom-10 -left-10 w-full h-full bg-transparent z-0" />
        </motion.div>
      </div>

      {/* Numbers Section */}
      <div className="text-center mb-16 px-4 relative z-10">
        <h3 className="text-2xl font-serif font-bold text-[#51A4A8] mb-4">
          Numbers That Speak for Themselves
        </h3>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg">
          Join thousands of happy clients who trusted us to make their moments magical.
          Our growing portfolio and glowing feedback reflect our unwavering commitment to excellence.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6 pb-20 relative z-10">
        {celebrationData.map((item, index) => (
          <CelebrationCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}