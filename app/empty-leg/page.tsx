// app/empty-leg/page.tsx
import HeroSection from "@/components/empty-leg/HeroSection";
import { MultiStepFormSection } from "@/components/empty-leg/MultiStepFormSection";
import { EmptyLegDealsSection } from "@/components/empty-leg/EmptyLegDealsSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NewsletterCTA from "@/components/NewsletterCTA";
import { EmptyLegFAQ } from "@/components/empty-leg/EmptyLegFAQ";

export default function EmptyLeg() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Navbar />
      <main>
        <HeroSection />
        <EmptyLegDealsSection />
        <MultiStepFormSection />
        <EmptyLegFAQ />
        <NewsletterCTA />
      </main>
      <Footer />
    </div>
  );
}
