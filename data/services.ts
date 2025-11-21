// data/services.ts
export interface Service {
  id: string;
  title: string;
  image: string;
  description: string;
}

export const servicesData = {
  hero: {
    title: "Our Services",
    subtitle: "Comprehensive private aviation solutions tailored to your needs",
    image:
      "https://images.unsplash.com/photo-1692263211008-2dd087bb53b8?w=1920&q=80",
  },

  services: [
    {
      id: "charter",
      title: "Charter Service",
      image:
        "https://images.unsplash.com/photo-1616620418653-c2f1603f507d?w=1920&q=80",
      description:
        "Experience the ultimate in personalized travel with our bespoke charter services. We provide on-demand access to our entire fleet, ensuring you travel on your schedule with complete flexibility. From business meetings to family vacations, our dedicated team handles every detail from flight planning to ground transportation, delivering a seamless journey tailored to your exact requirements.",
    },

    {
      id: "empty-leg",
      title: "Empty Leg Services",
      image:
        "https://images.unsplash.com/photo-1636189395447-0b8c1390b869?w=1920&q=80",
      description:
        "Enjoy significant savings on luxury private jet travel with our empty leg services. When our aircraft reposition between flights, we offer these legs at substantially reduced rates. Access the same premium service and comfort while optimizing cost-efficiency. Subscribe to our empty leg alerts to never miss an opportunity.",
    },
    {
      id: "corporate",
      title: "Group/Corporate Flights",
      image:
        "https://images.unsplash.com/photo-1583169327375-a5078762c09c?w=1920&q=80",
      description:
        "Streamline your corporate travel with our specialized group and corporate flight solutions. Perfect for executive teams, board meetings, or company events, we provide customized flight programs that maximize productivity and minimize travel time. Benefit from dedicated account management, flexible scheduling, and volume-based pricing structures designed for business efficiency.",
    },
  ] as Service[],

  whyChooseUs: {
    title: "Why Choose PexJet",
    subtitle:
      "We are committed to delivering an unparalleled private aviation experience through excellence in service, safety, and reliability.",
    reasons: [
      "Uncompromising safety standards with rigorous maintenance protocols",
      "24/7 dedicated concierge service for all your travel needs",
      "Access to over 5,000 airports worldwide",
      "Transparent pricing with no hidden fees",
      "Experienced flight crew with thousands of flight hours",
      "State-of-the-art aircraft with luxury amenities",
    ],
  },

  enquireForm: {
    title: "Get in Touch",
    subtitle:
      "Have questions about our services? Fill out the form below and our team will get back to you shortly.",
  },
};
