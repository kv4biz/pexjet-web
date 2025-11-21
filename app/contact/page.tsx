"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import NewsletterCTA from "@/components/NewsletterCTA";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1661954864180-e61dea14208a?w=1920&q=80"
          alt="Contact"
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
                Private Aviation Concierge
              </h1>
              <p className="text-xl md:text-2xl text-gray-200">
                Your journey begins with a conversation
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl text-[#0C0C0C] mb-6">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and our team will get back to you within
                24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="w-full bg-[#F7F7F7] border-2 border-gray-300 text-[#0C0C0C] px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-colors"
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
                    className="w-full bg-[#F7F7F7] border-2 border-gray-300 text-[#0C0C0C] px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="w-full bg-[#F7F7F7] border-2 border-gray-300 text-[#0C0C0C] px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows={6}
                    required
                    className="w-full bg-[#F7F7F7] border-2 border-gray-300 text-[#0C0C0C] px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D4AF37] text-[#0C0C0C] py-4 hover:bg-[#D4AF37]/90 transition-all text-lg"
                >
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl text-[#0C0C0C] mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  Our dedicated team is available 24/7 to assist you with all
                  your private aviation needs.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-[#F7F7F7]">
                  <Phone className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-[#0C0C0C] mb-2">Phone</h3>
                    <a
                      href="tel:+1234567890"
                      className="text-gray-700 hover:text-[#D4AF37] transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-[#F7F7F7]">
                  <Mail className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-[#0C0C0C] mb-2">Email</h3>
                    <a
                      href="mailto:info@pexjet.com"
                      className="text-gray-700 hover:text-[#D4AF37] transition-colors"
                    >
                      info@pexjet.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-[#F7F7F7]">
                  <MapPin className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-[#0C0C0C] mb-2">Office</h3>
                    <p className="text-gray-700">
                      123 Aviation Blvd, Suite 500
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-[#F7F7F7]">
                  <Clock className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-[#0C0C0C] mb-2">Availability</h3>
                    <p className="text-gray-700">24/7 Concierge Service</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-[#25D366]/10 border-2 border-[#25D366] p-6">
                <div className="flex items-center gap-4 mb-4">
                  <MessageCircle className="w-8 h-8 text-[#25D366]" />
                  <div>
                    <h3 className="text-[#0C0C0C] mb-1">WhatsApp</h3>
                    <p className="text-gray-600 text-sm">
                      Get instant assistance
                    </p>
                  </div>
                </div>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center px-6 py-3 bg-[#25D366] text-white hover:bg-[#25D366]/90 transition-all"
                >
                  Chat on WhatsApp
                </a>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-[#0C0C0C] mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all flex items-center justify-center"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all flex items-center justify-center"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all flex items-center justify-center"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all flex items-center justify-center"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-0">
        <div className="w-full h-96 bg-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830894612!2d-74.11976373946234!3d40.69766374865766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          />
        </div>
      </section>
      <NewsletterCTA />
      <Footer />
    </div>
  );
}
