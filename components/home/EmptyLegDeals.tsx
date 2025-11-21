"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Plane,
  Calendar,
  DollarSign,
} from "lucide-react";
import { homeData } from "../../data";

export default function EmptyLegDeals() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState<number>(4); // default large
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const deals = homeData.emptyLegDeals.deals;

  // determine cardsToShow based on viewport
  useEffect(() => {
    function getCardsForWidth() {
      if (typeof window === "undefined") return 1;
      const w = window.innerWidth;
      // Tailwind default breakpoints: md = 768, lg = 1024
      if (w >= 1024) return 4; // large
      if (w >= 768) return 2; // medium
      return 1; // small / mobile
    }

    // initialize
    setCardsToShow(getCardsForWidth());

    // listener
    const onResize = () => {
      setCardsToShow(getCardsForWidth());
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Next / Prev move by cardsToShow
  const next = () => {
    setCurrentIndex((prev) => (prev + cardsToShow) % deals.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - cardsToShow + deals.length) % deals.length
    );
  };

  // When currentIndex or cardsToShow changes, if in mobile/horizontal mode, scroll
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    // Only perform programmatic scroll on mobile (cardsToShow === 1)
    // If you prefer to scroll on medium as well, change condition to (cardsToShow <= 2)
    if (cardsToShow === 1) {
      // compute child width (first child)
      const firstChild = el.children[0] as HTMLElement | undefined;
      if (!firstChild) return;
      const childWidth =
        firstChild.getBoundingClientRect().width +
        parseFloat(getComputedStyle(el).gap || "0");
      el.scrollTo({
        left: currentIndex * childWidth,
        behavior: "smooth",
      });
    }
    // otherwise (desktop grid) no scroll behavior required
  }, [currentIndex, cardsToShow]);

  // Build visibleDeals length = cardsToShow (wrap around)
  const visibleDeals = Array.from(
    { length: Math.min(cardsToShow, deals.length) },
    (_, i) => {
      return deals[(currentIndex + i) % deals.length];
    }
  );

  return (
    <section className="py-20 bg-[#F7F7F7]">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl tracking-wider text-[#0C0C0C] mb-4 text-center">
            {homeData.emptyLegDeals.title}
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            {homeData.emptyLegDeals.subtitle}
          </p>

          {/* Desktop / Tablet Grid */}
          {/* grid-cols set to 1 / 2 / 4 for small / md / lg */}
          <div className="hidden md:block mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10">
              {visibleDeals.map((deal, index) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border-2 border-transparent hover:border-[#D4AF37] transition-all duration-300 group cursor-pointer shadow-md overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={deal.image}
                      alt={deal.aircraft}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                      <Plane className="w-4 h-4" />
                      <span className="text-sm">{deal.aircraft}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="text-sm text-gray-500">From</div>
                          <div className="text-[#0C0C0C]">{deal.from}</div>
                        </div>
                        <div className="text-[#D4AF37]">→</div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">To</div>
                          <div className="text-[#0C0C0C]">{deal.to}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{deal.date}</span>
                    </div>

                    <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-[#D4AF37]" />
                        <span className="text-2xl text-[#0C0C0C]">
                          {deal.price}
                        </span>
                      </div>
                      <button className="text-[#D4AF37] group-hover:translate-x-1 transition-transform">
                        Book Now →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile / Small - horizontal scroll */}
          <div className="md:hidden mb-8">
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {deals.map((deal) => (
                <div
                  key={deal.id}
                  className="shrink-0 w-[85%] snap-center bg-white border-2 border-transparent shadow-lg overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={deal.image}
                      alt={deal.aircraft}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                      <Plane className="w-4 h-4" />
                      <span className="text-sm">{deal.aircraft}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="text-sm text-gray-500">From</div>
                          <div className="text-[#0C0C0C]">{deal.from}</div>
                        </div>
                        <div className="text-[#D4AF37]">→</div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">To</div>
                          <div className="text-[#0C0C0C]">{deal.to}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{deal.date}</span>
                    </div>

                    <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-[#D4AF37]" />
                        <span className="text-2xl text-[#0C0C0C]">
                          {deal.price}
                        </span>
                      </div>
                      <button className="text-[#D4AF37]">Book Now →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 lg:gap-8">
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
        </motion.div>
      </div>
    </section>
  );
}
