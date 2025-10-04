"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Water from "../images/products/water.jpg";
import Whey from "../images/products/whey.jpg";
import HandGrip from "../images/products/hand-grip.jpg";
import Creatine from "../images/products/creatine.jpg";
import Cofeee from "../images/products/coffee.jpg";
import PrivateTrainer from "../images/trainer/private-trainer2.jpg";

type Category = "all" | "drink" | "suplement" | "equipment" | "trainer";

interface PortfolioCardProps {
  showCard: Category;
  category: Category;
  imageHref: string;
  title: string;
  onOpen: () => void;
}

const categoryLabels: Record<string, string> = {
  all: "All Products",
  suplement: "Suplements",
  trainer: "Private Trainer",
  drink: "Drinks",
  equipment: "Equipments",
};

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  showCard,
  category,
  imageHref,
  title,
  onOpen,
}) => {
  const isVisible = showCard === "all" || showCard === category;

  return (
    <motion.div
      className={`w-full px-4 md:w-1/2 xl:w-1/3 ${isVisible ? "block" : "hidden"}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="relative mb-12">
        <div className="overflow-hidden rounded-xl shadow-lg">
          <img
            src={imageHref}
            alt={title}
            className="w-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="relative z-10 mx-6 -mt-12 rounded-xl bg-white dark:bg-gray-900 py-8 px-6 text-center shadow-lg">
          <span className="text-cyan-300 mb-2 block text-sm font-semibold uppercase tracking-wide">
            {category}
          </span>
          <h3 className="text-gray-900 dark:text-white mb-5 text-xl font-bold">
            {title}
          </h3>
          <button
            onClick={onOpen}
            className="inline-block rounded-lg border border-base_semi_purple py-2 px-6 text-sm font-medium text-white transition-all hover:bg-base_purple hover:text-white"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  image: string;
}> = ({ isOpen, onClose, title, image }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/70 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal content */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-lg w-full p-6 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 bg-base_purple hover:bg-base_semi_purple 
                          rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>


              <img
                src={image}
                alt={title}
                className="w-full rounded-xl mb-4"
              />
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                {title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Detail produk bisa ditaruh di sini.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Others: React.FC = () => {
  const [showCard, setShowCard] = useState<Category>("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{ title: string; image: string }>({
    title: "",
    image: "",
  });

  const openModal = (title: string, image: string) => {
    setModalData({ title, image });
    setModalOpen(true);
  };

  const categories: Category[] = [
    "all",
    "drink",
    "suplement",
    "equipment",
    "trainer",
  ];

  return (
    <section className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Our <span className="text-base_purple">Menus</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mt-4">
            Explore some of our menu across drink, suplement,
            private trainer, and equipment.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setShowCard(cat)}
              className={`rounded-lg py-2 px-6 text-sm font-semibold transition-colors duration-300 ${
                showCard === cat
                  ? "bg-base_purple text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-base_purple hover:text-white"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="flex flex-wrap -mx-4">
          <PortfolioCard
            imageHref={Water.src}
            category="drink"
            title="Mineral Water"
            showCard={showCard}
            onOpen={() => openModal("Mineral Water", Water.src)}
          />
          <PortfolioCard
            imageHref={Whey.src}
            category="suplement"
            title="Whey Protein"
            showCard={showCard}
            onOpen={() => openModal("Whey Protein", Whey.src)}
          />
          <PortfolioCard
            imageHref={HandGrip.src}
            category="equipment"
            title="Hand Grip"
            showCard={showCard}
            onOpen={() => openModal("Hand Grip", HandGrip.src)}
          />
          <PortfolioCard
            imageHref={PrivateTrainer.src}
            category="trainer"
            title="Private Trainer"
            showCard={showCard}
            onOpen={() => openModal("Private Trainer", PrivateTrainer.src)}
          />
          <PortfolioCard
            imageHref={Creatine.src}
            category="suplement"
            title="Creatine"
            showCard={showCard}
            onOpen={() => openModal("Creatine", Creatine.src)}
          />
          <PortfolioCard
            imageHref={Cofeee.src}
            category="drink"
            title="Coffee"
            showCard={showCard}
            onOpen={() => openModal("Coffee", Cofeee.src)}
          />
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalData.title}
        image={modalData.image}
      />
    </section>
  );
};

export default Others;
