'use client'

import { Variants, motion } from "framer-motion";
import Image from "next/image";
import Treadmill from '../images/treadmill.jpg'

// Animation variants with proper typing
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.16, 1, 0.3, 1], // Using an ease array instead of string
      duration: 0.5,
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.8,
    },
  },
};

const dividerVariants: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.8,
      delay: 0.5,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1], // "backOut" equivalent
    },
  }),
};

const equipmentItems = [
  {
    id: 1,
    name: "Cable Row",
    description: "High-performance running machine",
    image: Treadmill,
  },
  {
    id: 2,
    name: "Dumbbells",
    description: "Adjustable weight set",
    image: Treadmill,
  },
  {
    id: 3,
    name: "treadmill",
    description: "Cardio cycling machine",
   image: Treadmill,
  },
  {
    id: 4,
    name: "Bench Press",
    description: "Non-slip premium mat",
     image: Treadmill,
  },
  {
     id: 5,
    name: "Cable Pulldown",
    description: "High-performance running machine",
    image: Treadmill,
  },
  {
    id: 6,
    name: "Butterfly Machine",
    description: "Adjustable weight set",
    image: Treadmill,
  },
  {
    id: 7,
    name: "Lat Pulldown",
    description: "Cardio cycling machine",
   image: Treadmill,
  },
  {
    id: 8,
    name: "High row machine",
    description: "Non-slip premium mat",
     image: Treadmill,

  }
];

export default function FitnessEquipment() {
  return (
    <section className="py-32 bg-black">
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Animated Title Section */}
        <motion.div className="text-center mb-16" variants={containerVariants}>
          <motion.h2
            className="text-5xl md:text-6xl font-bold uppercase text-white"
            variants={titleVariants}
          >
            Fit<span className="text-base_purple">ness</span>
          </motion.h2>
          <motion.h2
            className="text-5xl md:text-6xl font-bold uppercase text-white mt-2"
            variants={titleVariants}
          >
            Equipment
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-base_purple mx-auto mt-6"
            variants={dividerVariants}
          />
        </motion.div>

        {/* Animated Equipment Grid */}
        <motion.div
          className="relative border-2 border-base_purple rounded-xl p-6 shadow-lg max-w-6xl mx-auto"
          variants={itemVariants}
          >

          {/* Purple glow effect */}
          <div className="absolute inset-0 rounded-xl ring-4 ring-base_purple/30 ring-inset pointer-events-none" />

          {/* Grid with staggered animations */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {equipmentItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-white"
                variants={cardVariants}
                custom={index}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="relative h-40 sm:h-56">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}