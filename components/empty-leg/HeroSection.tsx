// components/empty-leg/HeroSection.tsx
"use client";
import { emptylegHeroData } from "../../data";
import { CompactSearchForm } from "./CompactSearchForm";

const HeroSection = () => {
  const handleSearch = (data: any) => {
    // Dispatch custom event to notify other components
    const event = new CustomEvent("emptyLegSearchSubmitted", { detail: data });
    window.dispatchEvent(event);
  };

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center py-24 pt-32">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={emptylegHeroData.backgroundImage}
          alt="Charter Your Journey"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <CompactSearchForm onSearch={handleSearch} />
      </div>
    </section>
  );
};

export default HeroSection;
