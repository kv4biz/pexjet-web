"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { homeData } from "../../data";

export default function MembershipBanner() {
  return (
    <section className="py-0 bg-white">
      <div className="relative h-[600px] md:h-[750px] overflow-hidden">
        {/* Background Image - Full Coverage */}
        <img
          src={homeData.membership.image}
          alt="Executive lifestyle"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay - Desktop: left to right (transparent to black) */}
        <div className="hidden md:block absolute inset-0 bg-linear-to-r from-transparent via-black/70 to-black" />

        {/* Gradient Overlay - Mobile: bottom to top (transparent to black) */}
        <div className="md:hidden absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl ml-auto text-center md:text-right">
              <motion.img
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                src={"/white-gold.png"}
                alt="PexJet"
                className="h-16 md:h-20 w-auto mx-auto md:ml-auto md:mr-0 mb-4 drop-shadow-2xl"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-[#D4AF37] text-xl md:text-2xl mb-4 tracking-widest"
              >
                {homeData.membership.badge}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-white text-lg md:text-xl mb-8 leading-relaxed"
              >
                {homeData.membership.description}
              </motion.p>

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                href={homeData.membership.buttonLink}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#D4AF37] text-[#0C0C0C] hover:bg-[#D4AF37]/90 transition-all group"
              >
                {homeData.membership.buttonText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
