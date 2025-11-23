"use client";

import { motion } from "motion/react";
import { Mail, ArrowRight } from "lucide-react";
import { homeData } from "../data";
import { Button } from "./ui/button";

export default function NewsletterCTA() {
  const handleJoinClick = () => {
    // Scroll to membership contact form
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-[#0C0C0C]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Mail className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />

          <h2 className="text-4xl md:text-5xl text-white mb-4">
            {homeData.newsletter.title}
          </h2>

          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            {homeData.newsletter.subtitle}
          </p>

          <div className=" mx-auto">
            <Button
              onClick={handleJoinClick}
              variant={"outline"}
              className="py-2 px-4 bg-[#D4AF37] border-0"
            >
              {homeData.newsletter.buttonText}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-gray-500 text-sm mt-4">
              {homeData.newsletter.privacyText}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
