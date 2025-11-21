//app/charter/page.tsx
import { CharterBenefits } from "@/components/charter/CharterBenefits";
import { CharterFAQ } from "@/components/charter/CharterFAQ";
import HeroSection from "@/components/charter/HeroSection";
import { MultiStepFormSection } from "@/components/charter/MultiStepFormSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NewsletterCTA from "@/components/NewsletterCTA";

export default function Charter() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Navbar />
      <main>
        <HeroSection />
        <MultiStepFormSection />
        <CharterBenefits />
        <CharterFAQ />
        <NewsletterCTA />
      </main>
      <Footer />
    </div>
  );
}
