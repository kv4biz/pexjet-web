// app/membership/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  CheckCircle2,
  Clock,
  Shield,
  Sparkles,
  Zap,
  Users,
  UserPlus,
  Bell,
  CreditCard,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { membershipData } from "@/data";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

// Icon mapping for dynamic icon rendering
const iconMap = {
  Zap,
  Sparkles,
  Shield,
  Clock,
  Users,
  UserPlus,
  Bell,
  CreditCard,
};

export default function Membership() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    contactMethod: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      contactMethod: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={membershipData.hero.image}
          alt="Membership"
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
                {membershipData.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
                {membershipData.hero.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Free Membership Section */}
      <section id="membership" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-[#0C0C0C] mb-4">
              {membershipData.membership.title}
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              {membershipData.membership.subtitle}
            </p>
          </motion.div>

          {/* Membership Card */}
          <div className="max-w-5xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              {/* Membership Card Visual */}
              <div className="relative overflow-hidden group">
                <div className="bg-linear-to-br from-blue-900 to-purple-900 p-12 h-80 relative shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-4xl text-white mb-4">Free</h3>
                      <div className="h-1 w-24 bg-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-white/80 mb-2">
                        {membershipData.membership.period}
                      </p>
                      <p className="text-3xl text-white">
                        {membershipData.membership.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Membership Description */}
              <div>
                <h3 className="text-3xl text-[#0C0C0C] mb-6">
                  Empty Leg Alerts
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {membershipData.membership.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {membershipData.membership.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#contact-form"
                    className="inline-block px-8 py-3 bg-[#D4AF37] text-[#0C0C0C] hover:bg-[#D4AF37]/90 transition-all text-center"
                  >
                    {membershipData.membership.cta.primary}
                  </a>
                  <a
                    href="#benefits"
                    className="inline-block px-8 py-3 border-2 border-[#D4AF37] text-[#0C0C0C] hover:bg-[#D4AF37] hover:text-white transition-all text-center"
                  >
                    {membershipData.membership.cta.secondary}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 className="text-3xl text-[#0C0C0C] mb-12 text-center">
              {membershipData.howItWorks.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {membershipData.howItWorks.steps.map((step, index) => {
                const StepIcon = iconMap[step.icon as keyof typeof iconMap];
                return (
                  <div key={step.step} className="text-center">
                    <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                      <StepIcon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-[#D4AF37] mb-2">
                      Step {step.step}
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h4>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
      {/* Membership Benefits Section */}
      <section id="benefits" className="py-20 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-[#0C0C0C] mb-4">
              {membershipData.benefits.title}
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6" />
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              {membershipData.benefits.subtitle}
            </p>
          </motion.div>

          <div className="space-y-12">
            {membershipData.benefits.categories.map((category, index) => {
              const CategoryIcon =
                iconMap[category.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 border-l-4 border-[#D4AF37]"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#D4AF37]/10 flex items-center justify-center">
                      <CategoryIcon className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-2xl md:text-3xl text-[#0C0C0C]">
                      {category.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <p className="text-gray-700">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-[#0C0C0C] mb-4">
              {membershipData.testimonials.title}
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              {membershipData.testimonials.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipData.testimonials.testimonials.map(
              (testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-[#F7F7F7] p-6 border border-gray-200"
                >
                  <div className="text-2xl font-bold text-[#D4AF37] mb-2">
                    {testimonial.savings}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>
      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-[#F7F7F7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl text-[#0C0C0C] mb-4">
                {membershipData.contactForm.title}
              </h2>
              <p className="text-gray-600 text-lg">
                {membershipData.contactForm.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-4 md:p-6">
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="w-full bg-white border-2 border-gray-300 text-[#0C0C0C] px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-colors "
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
                    className="w-full bg-white border-2 border-gray-300 text-[#0C0C0C] px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-colors "
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="WhatsApp Number"
                    required
                    className="w-full bg-white border-2 border-gray-300 text-[#0C0C0C] px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-colors "
                  />
                </div>

                <div>
                  <select
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-gray-300 text-[#0C0C0C] px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-colors "
                  >
                    <option value="">Preferred Contact Method</option>
                    <option value="whatsapp">WhatsApp Only</option>
                    <option value="email">Email Only</option>
                    <option value="both">Both WhatsApp & Email</option>
                  </select>
                </div>
              </div>

              <Button
                variant={"outline"}
                type="submit"
                className="w-full bg-[#D4AF37] "
              >
                Join Free Membership
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
