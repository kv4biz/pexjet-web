"use client";

import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
} from "react-icons/hi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { footerData } from "../data";

// Icon object
const socialIcons = {
  Facebook: FaFacebookF,
  Twitter: FaTwitter,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedinIn,
};

// Type for safe indexing
type SocialPlatform = keyof typeof socialIcons;

export default function Footer() {
  return (
    <footer className="bg-[#0C0C0C] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <img
              src={footerData.logo}
              alt="PexJet"
              className="h-10 w-auto mb-4"
            />
            <p className="text-gray-400 mb-6 max-w-xs">
              {footerData.description}
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-gray-400">
                <HiOutlineLocationMarker className="w-4 h-4 mt-1" />
                <span>
                  {footerData.contactInfo.address.line1}
                  <br />
                  {footerData.contactInfo.address.line2}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <HiOutlinePhone className="w-4 h-4" />
                <a
                  href={`tel:${footerData.contactInfo.phone.replace(
                    /\s/g,
                    ""
                  )}`}
                  className="hover:text-[#D4AF37]"
                >
                  {footerData.contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <HiOutlineMail className="w-4 h-4" />
                <a
                  href={`mailto:${footerData.contactInfo.email}`}
                  className="hover:text-[#D4AF37]"
                >
                  {footerData.contactInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerData.links).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-[#D4AF37] mb-4 font-medium tracking-wider uppercase text-sm">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm text-center md:text-left">
              {footerData.copyright}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {footerData.socialMedia.map((social) => {
                const Icon = socialIcons[social.platform as SocialPlatform];

                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    aria-label={social.platform}
                    className="w-10 h-10 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Legal Links */}
          {/* <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6 text-sm">
            {footerData.legalLinks.map((link, i) => (
              <span key={link.label} className="flex items-center gap-4">
                <a
                  href={link.href}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
                {i < footerData.legalLinks.length - 1 && (
                  <span className="text-gray-700">|</span>
                )}
              </span>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
  );
}
