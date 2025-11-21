// app/services/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { servicesData } from "@/data";

export default function Services() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  useEffect(() => {
    // Handle hash navigation on mount and hash change
    const scrollToService = () => {
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

    scrollToService();
    window.addEventListener("hashchange", scrollToService);

    return () => window.removeEventListener("hashchange", scrollToService);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={servicesData.hero.image}
          alt="Services"
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
                {servicesData.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
                {servicesData.hero.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {servicesData.services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:items-center"
              >
                {/* Image - Always first on mobile */}
                <div
                  className={`order-1 ${
                    index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Content - Always second on mobile */}
                <div
                  className={`order-2 ${
                    index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <h2 className="text-3xl md:text-4xl text-[#0C0C0C] mb-6">
                    {service.title}
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-[#0C0C0C] mb-4">
              {servicesData.whyChooseUs.title}
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              {servicesData.whyChooseUs.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.whyChooseUs.reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <CheckCircle2 className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
                <p className="text-gray-700 text-lg">{reason}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquire Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl text-[#0C0C0C] mb-4">
                {servicesData.enquireForm.title}
              </h2>
              <p className="text-gray-600 text-lg">
                {servicesData.enquireForm.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-[#F7F7F7] p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="w-full bg-white border-2 border-gray-300 text-[#0C0C0C] px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="w-full bg-white border-2 border-gray-300 text-[#0C0C0C] px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="w-full bg-white border-2 border-gray-300 text-[#0C0C0C] px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-gray-300 text-[#0C0C0C] px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  >
                    <option value="">Select a Service</option>
                    {servicesData.services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={6}
                  required
                  className="w-full bg-white border-2 border-gray-300 text-[#0C0C0C] px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#D4AF37] text-[#0C0C0C] py-4 hover:bg-[#D4AF37]/90 transition-all text-lg"
              >
                Send Enquiry
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
