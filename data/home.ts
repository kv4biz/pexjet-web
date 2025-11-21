export const homeData = {
  hero: {
    videoUrl:
      "https://res.cloudinary.com/dikzx4eyh/video/upload/v1763573579/Pexjet/PixVerse_Create_-_Make_AI_Videos_from_Your_Photos_Text_Easily_2_xu3g9a.mp4",
    title: {
      line1: "Discover a World",
      line2: "Far Beyond First Class",
    },
  },

  fleetPreview: {
    title: "Our Fleet",
    image:
      "https://images.unsplash.com/photo-1636189395447-0b8c1390b869?w=1920&q=80",
    description:
      "Experience unparalleled luxury with our meticulously maintained fleet of premium aircraft. From light jets for quick getaways to ultra-long-range jets for intercontinental travel, we have the perfect aircraft for every journey.",
    buttonText: "View Fleet",
    buttonLink: "/aircrafts",
  },

  emptyLegDeals: {
    title: "Current Empty Leg Deals",
    subtitle:
      "Take advantage of our empty leg flights and enjoy significant savings on luxury private jet travel.",
    deals: [
      {
        id: 1,
        from: "New York (JFK)",
        to: "Miami (MIA)",
        date: "Oct 28, 2025",
        price: "$12,500",
        aircraft: "Citation X",
        image:
          "https://images.unsplash.com/photo-1515135682005-9f1fa4ef2264?w=800&q=80",
      },
      {
        id: 2,
        from: "Los Angeles (LAX)",
        to: "Las Vegas (LAS)",
        date: "Oct 30, 2025",
        price: "$8,900",
        aircraft: "Learjet 75",
        image:
          "https://images.unsplash.com/photo-1616748909432-c7facc5c417f?w=800&q=80",
      },
      {
        id: 3,
        from: "London (LHR)",
        to: "Paris (CDG)",
        date: "Nov 2, 2025",
        price: "$15,200",
        aircraft: "Gulfstream G650",
        image:
          "https://images.unsplash.com/photo-1611401454589-e40b10d23fa7?w=800&q=80",
      },
      {
        id: 4,
        from: "Dubai (DXB)",
        to: "Singapore (SIN)",
        date: "Nov 5, 2025",
        price: "$45,000",
        aircraft: "Bombardier Global 7500",
        image:
          "https://images.unsplash.com/photo-1636189395447-0b8c1390b869?w=800&q=80",
      },
      {
        id: 5,
        from: "Tokyo (NRT)",
        to: "Hong Kong (HKG)",
        date: "Nov 8, 2025",
        price: "$28,500",
        aircraft: "Falcon 8X",
        image:
          "https://images.unsplash.com/photo-1692263211008-2dd087bb53b8?w=800&q=80",
      },
    ],
  },

  membership: {
    logo: "figma:asset/6cddc687b914d327d31d087ed0ff643b9b2d4871.png",
    image:
      "https://images.unsplash.com/photo-1522255272218-7ac5249be344?w=1920&q=80",
    badge: "EXCLUSIVE",
    description:
      "Join the elite circle of PexJet members and unlock unparalleled benefits, priority access, and exclusive privileges designed for the discerning traveler.",
    buttonText: "Explore Membership",
    buttonLink: "/membership",
  },

  testimonials: {
    title: "What Our Clients Say",
    subtitle:
      "Experience the exceptional service that has earned us the trust of discerning travelers worldwide.",
    items: [
      {
        id: 1,
        name: "Michael Roberts",
        role: "CEO",
        company: "Global Tech Solutions",
        image:
          "https://images.unsplash.com/photo-1708195886023-3ecb00ac7a49?w=400&q=80",
        quote:
          "PexJet has transformed the way we travel. The seamless booking process and impeccable service make every journey extraordinary. Their attention to detail and commitment to excellence is unmatched.",
        rating: 5,
      },
      {
        id: 2,
        name: "Sarah Chen",
        role: "Managing Director",
        company: "Luxe Investments",
        image:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
        quote:
          "The level of professionalism and luxury PexJet provides is exceptional. From the first inquiry to landing, everything is handled with precision and care. Truly a world-class experience.",
        rating: 5,
      },
      {
        id: 3,
        name: "James Wellington",
        role: "Founder",
        company: "Wellington Capital",
        image:
          "https://images.unsplash.com/photo-1629507208649-70919ca33793?w=400&q=80",
        quote:
          "Time is our most valuable asset, and PexJet understands this perfectly. Their efficiency, combined with unparalleled comfort and service, makes them our only choice for private aviation.",
        rating: 5,
      },
    ],
  },

  blog: {
    title: "News & Updates",
    posts: [
      {
        id: 1,
        title: "The Future of Private Aviation: Sustainable Flying",
        date: "October 20, 2025",
        image:
          "https://images.unsplash.com/photo-1610486611951-4d3999bc5cd1?w=800&q=80",
        excerpt:
          "Discover how PexJet is leading the charge in sustainable aviation technology.",
      },
      {
        id: 2,
        title: "Top 10 Luxury Destinations for Winter 2025",
        date: "October 18, 2025",
        image:
          "https://images.unsplash.com/photo-1761134342227-a94e55c59cef?w=800&q=80",
        excerpt:
          "Explore the world's most exclusive winter retreats accessible by private jet.",
      },
    ],
    buttonText: "View All Articles",
    buttonLink: "/blog",
  },

  newsletter: {
    icon: "mail",
    title: "Stay Informed",
    subtitle:
      "Subscribe to our membership for exclusive offers, empty leg deals, and the latest news in luxury private aviation.",
    buttonText: "Subscribe",
    privacyText: "We respect your privacy. Unsubscribe at any time.",
    placeholder: "Enter your email address",
  },
};
