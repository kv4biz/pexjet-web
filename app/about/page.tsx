// app/about/page.tsx
"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { aboutData } from "../../data";
import NewsletterCTA from "@/components/NewsletterCTA";
import {
  Users,
  Shield,
  CheckCircle,
  Star,
  Award,
  Briefcase,
  Mail,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Icon mapping for dynamic icon rendering
const iconMap = {
  Shield,
  Users,
  Star,
  Award,
};

export default function About() {
  useEffect(() => {
    const scrollToSection = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }
    };

    scrollToSection();
    window.addEventListener("hashchange", scrollToSection);

    return () => window.removeEventListener("hashchange", scrollToSection);
  }, []);

  const sections = [
    { id: "company", ...aboutData.company },
    { id: "aircraft-acquisition", ...aboutData.aircraftAcquisition },
    { id: "operator", ...aboutData.operator },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src={aboutData.hero.image}
          alt="About PexJet"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <h1 className="text-5xl md:text-7xl mb-4 font-bold">
                {aboutData.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
                {aboutData.hero.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dynamic Sections */}
      {sections.map((section, index) => {
        const isReversed = index % 2 === 1;

        return (
          <section
            id={section.id}
            key={section.id}
            className={`py-20 ${isReversed ? "bg-[#F7F7F7]" : "bg-white"}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={isReversed ? "lg:order-2" : ""}
                >
                  <h2 className="text-4xl md:text-5xl text-[#0C0C0C] mb-6 font-bold">
                    {section.title}
                  </h2>
                  <div className="w-24 h-1 bg-[#D4AF37] mb-8" />

                  {section.paragraphs.map((p, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-gray-700 text-lg leading-relaxed mb-6"
                    >
                      {p}
                    </p>
                  ))}

                  {/* Features */}
                  {"features" in section && section.features && (
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      {section.features.map((feature, fIndex) => {
                        const Icon =
                          iconMap[feature.icon as keyof typeof iconMap];
                        return (
                          <div key={fIndex} className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-[#D4AF37]" />
                            <span className="text-gray-700 font-medium">
                              {feature.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Acquisition Benefits */}
                  {"benefits" in section && section.benefits && (
                    <div className="mt-8 space-y-3">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">
                        Our Comprehensive Services:
                      </h4>
                      {section.benefits.map((benefit, bIndex) => (
                        <div key={bIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Requirements */}
                  {"requirements" in section && section.requirements && (
                    <div className="mt-8 space-y-3">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">
                        Operator Partnership Requirements:
                      </h4>
                      {section.requirements.map((req, rIndex) => (
                        <div key={rIndex} className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-[#D4AF37]" />
                          <span className="text-gray-700">{req}</span>
                        </div>
                      ))}

                      <div className="mt-6 p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                        <p className="text-gray-700 text-sm">
                          <strong>{aboutData.operator.partnershipText}</strong>
                        </p>
                        <Link href="/contact" className="">
                          <Button
                            variant="outline"
                            size="sm"
                            className="t-3 px-4 py-2 bg-[#D4AF37] text-white text-sm  hover:bg-[#D4AF37]/90 transition-colors flex items-center gap-2"
                          >
                            <Mail className="w-4 h-4" />
                            Contact Partnerships
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`relative h-[500px] ${
                    isReversed ? "lg:order-1" : ""
                  }`}
                >
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-black/10 to-transparent" />
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      <NewsletterCTA />
      <Footer />
    </div>
  );
}
