"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { navbarData } from "../data";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<
    string | null
  >(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="xl:max-w-10/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* ----------------------- LOGO ----------------------- */}
          <a href="/" className="shrink-0">
            <img
              src={isScrolled ? navbarData.logoBlack : navbarData.logoWhite}
              alt="PexJet Logo"
              className="h-8 md:h-10 w-auto transition-all duration-300"
            />
          </a>

          {/* ----------------------- DESKTOP NAV ----------------------- */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {navbarData.navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.dropdown ? (
                  <>
                    <button
                      className={`flex items-center gap-1 transition-colors uppercase text-sm tracking-wide ${
                        isScrolled
                          ? "text-[#0C0C0C] hover:text-[#D4AF37]"
                          : "text-white hover:text-[#D4AF37]"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg border-t-2 border-[#D4AF37] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {item.dropdown.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2 text-[#0C0C0C] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] uppercase text-sm"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <a
                    href={item.href}
                    className={`uppercase text-sm tracking-wide transition-colors ${
                      isScrolled
                        ? "text-[#0C0C0C] hover:text-[#D4AF37]"
                        : "text-white hover:text-[#D4AF37]"
                    }`}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}

            {/* Desktop Currency Switcher */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1  uppercase text-sm tracking-wide border py-2 px-4 ${
                  isScrolled
                    ? "text-[#0C0C0C] hover:text-[#D4AF37]"
                    : "text-white hover:text-[#D4AF37]"
                }`}
              >
                {navbarData.currencySwitcher.default}
                <ChevronDown className="w-4 h-4" />
              </button>

              <div className="absolute top-full left-0 mt-2 w-32 bg-white shadow-lg border-t-2 border-[#D4AF37] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {navbarData.currencySwitcher.items.map((cur) => (
                  <button
                    key={cur.code}
                    className="block w-full text-left px-4 py-2 text-[#0C0C0C] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] uppercase text-sm"
                  >
                    {cur.code} ({cur.symbol})
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href={navbarData.ctaButton.href}
              className="px-6 py-2 bg-[#D4AF37] text-[#0C0C0C] hover:bg-[#D4AF37]/90 uppercase tracking-wide transition-all"
            >
              {navbarData.ctaButton.text}
            </a>
          </div>

          {/* ----------------------- MOBILE NAV ----------------------- */}
          <div className="flex items-center lg:hidden gap-4">
            {/* Mobile Currency Switcher (topbar only) */}
            <div className="relative">
              <button
                className={`flex items-center gap-1 uppercase text-xs border py-2 px-4 ${
                  isScrolled ? "text-[#0C0C0C]" : "text-white"
                }`}
                onClick={() =>
                  setMobileActiveDropdown(
                    mobileActiveDropdown === "currency" ? null : "currency"
                  )
                }
              >
                {navbarData.currencySwitcher.default}
                <ChevronDown className="w-3 h-3" />
              </button>

              {mobileActiveDropdown === "currency" && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg border-t-2 border-[#D4AF37] py-2 w-32 z-50">
                  {navbarData.currencySwitcher.items.map((cur) => (
                    <button
                      key={cur.code}
                      className="block w-full text-left px-4 py-2 text-sm text-[#0C0C0C] hover:text-[#D4AF37]"
                    >
                      {cur.code} ({cur.symbol})
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant={"ghost"}
                  className={`p-2 bg-transparent ${
                    isScrolled ? "text-[#0C0C0C]" : "text-white"
                  }`}
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] bg-white p-0">
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto py-6">
                    <nav className="space-y-1">
                      {navbarData.navItems.map((item) => (
                        <div key={item.label}>
                          {item.dropdown ? (
                            <>
                              <button
                                onClick={() =>
                                  setMobileActiveDropdown(
                                    mobileActiveDropdown === item.label
                                      ? null
                                      : item.label
                                  )
                                }
                                className="w-full flex items-center justify-between px-6 py-3 text-[#0C0C0C] hover:bg-[#D4AF37]/10 uppercase text-sm"
                              >
                                {item.label}
                                <ChevronDown
                                  className={`w-4 h-4 transition-transform ${
                                    mobileActiveDropdown === item.label
                                      ? "rotate-180"
                                      : ""
                                  }`}
                                />
                              </button>

                              {mobileActiveDropdown === item.label && (
                                <div className="bg-[#F7F7F7] py-2">
                                  {item.dropdown.map((sub) => (
                                    <a
                                      key={sub.label}
                                      href={sub.href}
                                      onClick={() => setMobileOpen(false)}
                                      className="block px-10 py-2 text-sm text-gray-700 hover:text-[#D4AF37] uppercase"
                                    >
                                      {sub.label}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <a
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="block px-6 py-3 text-[#0C0C0C] hover:bg-[#D4AF37]/10 uppercase text-sm"
                            >
                              {item.label}
                            </a>
                          )}
                        </div>
                      ))}
                    </nav>
                  </div>

                  {/* CTA Button */}
                  <div className="p-6 border-t border-gray-200">
                    <a
                      href={navbarData.ctaButton.href}
                      onClick={() => setMobileOpen(false)}
                      className="block w-full text-center px-6 py-3 bg-[#D4AF37] text-[#0C0C0C] hover:bg-[#D4AF37]/90 uppercase tracking-wide transition-all"
                    >
                      {navbarData.ctaButton.text}
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
