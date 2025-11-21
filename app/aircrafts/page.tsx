// app/aircrafts/page.tsx
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { fleetData } from "../../data";
import NewsletterCTA from "@/components/NewsletterCTA";

export default function Fleet() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % fleetData.aircraft.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + fleetData.aircraft.length) % fleetData.aircraft.length
    );
  };

  const currentAircraft = fleetData.aircraft[currentIndex];
  const progress = ((currentIndex + 1) / fleetData.aircraft.length) * 100;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={fleetData.hero.image}
          alt={fleetData.hero.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <h1 className="text-5xl md:text-6xl mb-4">
                {fleetData.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
                {fleetData.hero.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Carousel Controls and Pagination */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={prev}
                  className="w-12 h-12 border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all flex items-center justify-center"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all flex items-center justify-center"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="text-[#0C0C0C]">
                <span className="text-2xl">{currentIndex + 1}</span>
                <span className="text-gray-400">
                  {" "}
                  of {fleetData.aircraft.length}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-0.5 bg-gray-200">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#D4AF37]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Aircraft Display */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            {/* Massive Image */}
            <div className="relative h-[400px] md:h-[600px] overflow-hidden mb-8">
              <img
                src={currentAircraft.image}
                alt={currentAircraft.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
            </div>

            {/* Aircraft Name */}
            <h2 className="text-3xl md:text-4xl text-[#0C0C0C] mb-6">
              {currentAircraft.name}
            </h2>

            {/* Description */}
            <p className="text-gray-700 text-lg leading-relaxed mb-10 max-w-4xl">
              {currentAircraft.description}
            </p>

            {/* Technical Specifications */}
            <div className="bg-[#F7F7F7] p-8 border-l-4 border-[#D4AF37]">
              <h3 className="text-2xl text-[#0C0C0C] mb-6">
                Technical Specifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border-b border-gray-300 pb-4">
                  <div className="text-sm text-gray-500 mb-1">
                    Aircraft Name
                  </div>
                  <div className="text-[#0C0C0C]">
                    {currentAircraft.specs.aircraftName}
                  </div>
                </div>

                <div className="border-b border-gray-300 pb-4">
                  <div className="text-sm text-gray-500 mb-1">
                    Aircraft Type
                  </div>
                  <div className="text-[#0C0C0C]">
                    {currentAircraft.specs.aircraftType}
                  </div>
                </div>

                <div className="border-b border-gray-300 pb-4">
                  <div className="text-sm text-gray-500 mb-1">
                    Classification
                  </div>
                  <div className="text-[#0C0C0C]">
                    {currentAircraft.specs.classification}
                  </div>
                </div>

                <div className="border-b border-gray-300 pb-4">
                  <div className="text-sm text-gray-500 mb-1">
                    Interior Height
                  </div>
                  <div className="text-[#0C0C0C]">
                    {currentAircraft.specs.interiorHeight}
                  </div>
                </div>

                <div className="border-b border-gray-300 pb-4">
                  <div className="text-sm text-gray-500 mb-1">
                    Interior Width
                  </div>
                  <div className="text-[#0C0C0C]">
                    {currentAircraft.specs.interiorWidth}
                  </div>
                </div>

                <div className="border-b border-gray-300 pb-4">
                  <div className="text-sm text-gray-500 mb-1">
                    Luggage Capacity
                  </div>
                  <div className="text-[#0C0C0C]">
                    {currentAircraft.specs.luggageCapacity}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-10 text-center">
              <a
                href="/charter"
                className="inline-block px-10 py-4 bg-[#D4AF37] text-[#0C0C0C] hover:bg-[#D4AF37]/90 transition-all"
              >
                Request a Quote
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      <NewsletterCTA />
      <Footer />
    </div>
  );
}
