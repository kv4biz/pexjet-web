import BlogTeaser from "@/components/home/BlogTeaser";
import EmptyLegDeals from "@/components/home/EmptyLegDeals";
import FleetPreview from "@/components/home/FleetPreview";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import MembershipBanner from "@/components/home/MembershipBanner";
import Navbar from "@/components/Navbar";
import NewsletterCTA from "@/components/NewsletterCTA";
import SearchComponents from "@/components/home/SearchComponents";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Navbar />
      <main>
        <HeroSection />
        <SearchComponents />
        <EmptyLegDeals />
        <FleetPreview />
        <MembershipBanner />
        <BlogTeaser />
        <Testimonials />
        <NewsletterCTA />
      </main>
      <Footer />
    </div>
  );
}
