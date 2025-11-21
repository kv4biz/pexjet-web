//data/aircraft.ts
export interface Aircraft {
  id: number;
  name: string;
  image: string;
  description: string;
  specs: {
    luggageCapacity: string;
    interiorHeight: string;
    interiorWidth: string;
    aircraftType: string;
    aircraftName: string;
    classification: string;
  };
}

export const fleetData = {
  hero: {
    title: "Our Fleet",
    subtitle:
      "Experience luxury and performance with our meticulously maintained fleet of premium aircraft",
    image:
      "https://images.unsplash.com/photo-1657409845150-f31d72aff3a0?w=1920&q=80",
  },

  aircraft: [
    {
      id: 1,
      name: "Gulfstream G650",
      image:
        "https://images.unsplash.com/photo-1657409845150-f31d72aff3a0?w=1920&q=80",
      description:
        "The epitome of luxury and performance, the Gulfstream G650 offers unparalleled comfort and range. With its spacious cabin and cutting-edge technology, this aircraft redefines long-range travel for the most discerning passengers.",
      specs: {
        luggageCapacity: "195 cu ft",
        interiorHeight: "6'5\"",
        interiorWidth: "8'6\"",
        aircraftType: "Large Cabin",
        aircraftName: "Gulfstream G650",
        classification: "Ultra Long Range",
      },
    },
    {
      id: 2,
      name: "Bombardier Global 7500",
      image:
        "https://images.unsplash.com/photo-1719351030888-ad8fd251be38?w=1920&q=80",
      description:
        "Experience the pinnacle of aviation excellence with the Bombardier Global 7500. Featuring the industry's longest range and a revolutionary wing design, this aircraft delivers exceptional performance and the smoothest ride possible.",
      specs: {
        luggageCapacity: "195 cu ft",
        interiorHeight: "6'2\"",
        interiorWidth: "8'0\"",
        aircraftType: "Large Cabin",
        aircraftName: "Bombardier Global 7500",
        classification: "Ultra Long Range",
      },
    },
    {
      id: 3,
      name: "Cessna Citation X",
      image:
        "https://images.unsplash.com/photo-1657409845132-6c3096724946?w=1920&q=80",
      description:
        "The fastest civilian aircraft in the world, the Citation X combines speed with comfort. Perfect for executives who value time, this jet offers a transcontinental range with remarkable efficiency and style.",
      specs: {
        luggageCapacity: "90 cu ft",
        interiorHeight: "5'8\"",
        interiorWidth: "5'6\"",
        aircraftType: "Super Midsize",
        aircraftName: "Cessna Citation X",
        classification: "Long Range",
      },
    },
    {
      id: 4,
      name: "Embraer Phenom 300",
      image:
        "https://images.unsplash.com/photo-1636189395447-0b8c1390b869?w=1920&q=80",
      description:
        "The best-selling light jet for a reason, the Phenom 300 offers exceptional performance and versatility. Its spacious cabin and advanced avionics make it ideal for regional and short-haul flights.",
      specs: {
        luggageCapacity: "84 cu ft",
        interiorHeight: "4'11\"",
        interiorWidth: "5'1\"",
        aircraftType: "Light Jet",
        aircraftName: "Embraer Phenom 300",
        classification: "Light Jet",
      },
    },
    {
      id: 5,
      name: "Dassault Falcon 8X",
      image:
        "https://images.unsplash.com/photo-1692263211008-2dd087bb53b8?w=1920&q=80",
      description:
        "Combining French elegance with cutting-edge technology, the Falcon 8X delivers an ultra-long-range capability with exceptional fuel efficiency. Its tri-jet configuration ensures superior performance and safety.",
      specs: {
        luggageCapacity: "140 cu ft",
        interiorHeight: "6'2\"",
        interiorWidth: "7'8\"",
        aircraftType: "Large Cabin",
        aircraftName: "Dassault Falcon 8X",
        classification: "Ultra Long Range",
      },
    },
    {
      id: 6,
      name: "Hawker 900XP",
      image:
        "https://images.unsplash.com/photo-1661954864180-e61dea14208a?w=1920&q=80",
      description:
        "A versatile midsize jet that excels in both performance and comfort. The Hawker 900XP features a spacious stand-up cabin and excellent range, making it perfect for coast-to-coast travel.",
      specs: {
        luggageCapacity: "53 cu ft",
        interiorHeight: "5'9\"",
        interiorWidth: "6'0\"",
        aircraftType: "Midsize",
        aircraftName: "Hawker 900XP",
        classification: "Midsize",
      },
    },
    {
      id: 7,
      name: "Learjet 75",
      image:
        "https://images.unsplash.com/photo-1616748909432-c7facc5c417f?w=1920&q=80",
      description:
        "The iconic Learjet 75 offers legendary performance and efficiency in a light jet package. With its advanced avionics and comfortable cabin, it's the perfect choice for business travelers seeking speed and reliability.",
      specs: {
        luggageCapacity: "65 cu ft",
        interiorHeight: "5'1\"",
        interiorWidth: "5'1\"",
        aircraftType: "Light Jet",
        aircraftName: "Learjet 75",
        classification: "Light Jet",
      },
    },
    {
      id: 8,
      name: "Citation Latitude",
      image:
        "https://images.unsplash.com/photo-1515135682005-9f1fa4ef2264?w=1920&q=80",
      description:
        "The Citation Latitude redefines the midsize category with its spacious flat-floor cabin and exceptional range. Advanced systems and superior comfort make every journey a pleasure.",
      specs: {
        luggageCapacity: "127 cu ft",
        interiorHeight: "6'0\"",
        interiorWidth: "6'5\"",
        aircraftType: "Midsize",
        aircraftName: "Citation Latitude",
        classification: "Midsize",
      },
    },
    {
      id: 9,
      name: "Challenger 350",
      image:
        "https://images.unsplash.com/photo-1611401454589-e40b10d23fa7?w=1920&q=80",
      description:
        "The Challenger 350 sets the standard for super midsize jets with its wide cabin, low cabin altitude, and smooth ride. Perfect for transcontinental flights with unmatched comfort.",
      specs: {
        luggageCapacity: "106 cu ft",
        interiorHeight: "6'1\"",
        interiorWidth: "7'2\"",
        aircraftType: "Super Midsize",
        aircraftName: "Challenger 350",
        classification: "Super Midsize",
      },
    },
    {
      id: 10,
      name: "Pilatus PC-24",
      image:
        "https://images.unsplash.com/photo-1636189395447-0b8c1390b869?w=1920&q=80",
      description:
        "The Super Versatile Jet that can land on unpaved runways. The PC-24 combines the flexibility of a turboprop with the performance of a light jet, opening up thousands of additional airports.",
      specs: {
        luggageCapacity: "82 cu ft",
        interiorHeight: "5'5\"",
        interiorWidth: "5'7\"",
        aircraftType: "Light Jet",
        aircraftName: "Pilatus PC-24",
        classification: "Light Jet",
      },
    },
  ] as Aircraft[],
};
