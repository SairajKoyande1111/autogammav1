export interface PricingTier {
  carType: string;
  price: string;
}

export interface ServiceData {
  id: string;
  title: string;
  slug: string;
  price?: string; // For backwards compatibility, some services may still use single price
  pricing?: PricingTier[]; // New pricing by car type
  description: string;
  features: string[];
  carTypes?: string[]; // Deprecated, use pricing instead
  variants?: string[];
  warranty?: string;
  highlight?: boolean;
}

export const servicesData: ServiceData[] = [
  {
    id: "1",
    slug: "foam-washing",
    title: "FOAM WASHING",
    description: "Our foam washing service uses premium pH-balanced foam that gently lifts dirt, grime, and contaminants from every panel without scratching the paintwork. Using professional-grade equipment and techniques, we ensure a thorough clean from tyres to roof — leaving your car spotless, fresh, and showroom-ready.",
    features: [
      "Tyre & Arches Cleaning",
      "Foam Wash",
      "All foot mats will be washed & vacuumed",
      "All 4 Wheels / Alloys Cleaning",
      "Laying paper mats"
    ],
    pricing: [
      { carType: "Small Cars", price: "₹400" },
      { carType: "Hatch Back / Small Sedan", price: "₹500" },
      { carType: "Mid-size Sedans / Compact SUV / MUV", price: "₹600" },
      { carType: "SUV / MPV", price: "₹700" }
    ]
  },
  {
    id: "2",
    slug: "premium-washing",
    title: "PREMIUM WASHING",
    pricing: [
      { carType: "Small Cars", price: "₹600" },
      { carType: "Hatch Back / Small Sedan", price: "₹700" },
      { carType: "Mid-size Sedans / Compact SUV", price: "₹800" },
      { carType: "SUV / MPV", price: "₹900" }
    ],
    description: "A step above standard washing, our premium service covers every inch of your vehicle — inside and out. We go deep with underbody cleaning, alloy polishing, dashboard detailing, and full interior vacuuming to deliver a truly refreshed and immaculate vehicle that looks and feels brand new.",
    features: [
      "Underbody Wash Tyre & Arches Cleaning",
      "All 4 Wheels / Alloys Cleaning",
      "All Tyre Polishing",
      "Exterior Plastic Parts Polishing",
      "Foam Wash",
      "All Foot mats will be washed & vacuumed",
      "All 4 Doors & Dashboard Cleaned and Polished from inside",
      "Full Car vacuumed including seats & boots",
      "Laying paper mats"
    ],
    highlight: true
  },
  {
    id: "3",
    slug: "interior-cleaning",
    title: "INTERIOR CLEANING",
    pricing: [
      { carType: "Small Cars", price: "₹2,500" },
      { carType: "Hatch Back / Small Sedan", price: "₹3,000" },
      { carType: "Mid-size Sedans / Compact SUV", price: "₹3,500" },
      { carType: "SUV / MPV", price: "₹4,000" }
    ],
    description: "Our interior cleaning service eliminates dust, allergens, stains, and odours from every corner of your cabin. From AC vents and seat belts to carpets and roof lining, every surface is meticulously cleaned, dressed, and polished — creating a hygienic, fresh, and comfortable environment for you and your passengers.",
    features: [
      "Washing + Interior Vacuuming",
      "Deep Cleaning the Interior Dash",
      "Center Console & Door Panels",
      "Interior Dressing (Glossy Finish / Satin Finish)",
      "Roof Cleaning",
      "Upholstery & Carpet Cleaning",
      "AC Vents Cleaning",
      "Seat belt & Boots Cleaning",
      "Glass Cleaning from inside"
    ]
  },
  {
    id: "4",
    slug: "interior-steam-cleaning",
    title: "INTERIOR STEAM CLEANING",
    pricing: [
      { carType: "Small Cars", price: "₹3,500" },
      { carType: "Hatch Back / Small Sedan", price: "₹4,000" },
      { carType: "Mid-size Sedans / Compact SUV", price: "₹4,500" },
      { carType: "SUV / MPV", price: "₹5,000" }
    ],
    description: "Using high-temperature steam technology, this service sanitizes and deep-cleans your entire interior without the use of harsh chemicals. Steam penetrates fabrics, vents, and hard-to-reach crevices, killing bacteria, removing stubborn stains, and eliminating odours — leaving your cabin hygienic, fresh, and beautifully presented.",
    features: [
      "Washing + Interior Cleaning + AC Duct Cleaning",
      "Steam Cleaning",
      "Sanitization of Car using steam",
      "Leather Waxing"
    ]
  },
  {
    id: "5",
    slug: "leather-treatment",
    title: "LEATHER TREATMENT",
    pricing: [
      { carType: "Small Cars", price: "₹5,000" },
      { carType: "Hatch Back / Small Sedan", price: "₹5,500" },
      { carType: "Mid-size Sedans / Compact SUV", price: "₹6,000" },
      { carType: "SUV / MPV", price: "₹6,500" }
    ],
    description: "Premium leather deserves premium care. Our leather treatment service restores suppleness, removes cracks and discolouration, and applies a professional conditioning wax that protects against UV fading and daily wear. Ideal for luxury vehicles, this service keeps your leather seats looking rich, soft, and luxurious for years to come.",
    features: [
      "Washing",
      "Interior Steam Cleaning",
      "Leather Waxing and Conditioning"
    ]
  },
  {
    id: "6",
    slug: "detailing",
    title: "DETAILING",
    pricing: [
      { carType: "Small Cars", price: "₹5,000" },
      { carType: "Hatch Back / Small Sedan", price: "₹6,000" },
      { carType: "Mid-size Sedans / Compact SUV", price: "₹7,000" },
      { carType: "SUV / MPV", price: "₹8,000" }
    ],
    description: "Our professional detailing service is a comprehensive paint correction and restoration treatment designed to bring back your car's showroom brilliance. Using multi-stage machine compounding, decontamination, and clay mitt treatment, we eliminate swirl marks, water spots, fine scratches, and oxidation — revealing a flawless, mirror-like finish.",
    features: [
      "Washing + Interior Cleaning + Decontamination Using Clay Mitt",
      "Masking Multiple stages of compounding, Machine Compounding (rubbing)",
      "Removal of hard water marks & mineral deposits from all edges"
    ],
    highlight: true
  },
  {
    id: "7",
    slug: "paint-sealant-coating",
    title: "PAINT SEALANT COATING (TEFLON)",
    pricing: [
      { carType: "Small Cars", price: "₹5,500" },
      { carType: "Hatch Back / Small Sedan", price: "₹6,500" },
      { carType: "Mid-size Sedans / Compact SUV", price: "₹7,500" },
      { carType: "SUV / MPV", price: "₹8,500" }
    ],
    description: "Our Teflon paint sealant coating creates a durable, protective layer over your vehicle's paintwork, shielding it from UV rays, bird droppings, minor scratches, and environmental contaminants. Combined with a full detailing treatment and premium glass protection, this service delivers a high-gloss, long-lasting finish backed by a 1-year warranty.",
    features: [
      "Washing + Interior Cleaning + Detailing + Glazing and Swirl marks removal using D.A.",
      "Polisher, Application of wax",
      "Premium external glass cleaning & protection, Alloy protection",
      "1 Year Warranty"
    ],
    warranty: "1 Year Warranty"
  },
  {
    id: "8",
    slug: "ceramic-coating",
    title: "CERAMIC COATING",
    pricing: [
      { carType: "Small Cars", price: "₹11,000" },
      { carType: "Hatch Back / Small Sedan", price: "₹12,500" },
      { carType: "Mid-size Sedans / Compact SUV / MUV", price: "₹15,000" },
      { carType: "SUV / MPV", price: "₹18,000" },
      { carType: "MAFRA - Small Cars", price: "₹12,500" },
      { carType: "MAFRA - Hatch Back / Small Sedan", price: "₹15,000" },
      { carType: "MAFRA - Mid-size Sedan / Compact SUV / MUV", price: "₹18,000" },
      { carType: "MAFRA - SUV / MPV", price: "₹21,000" },
      { carType: "MENZA PRO - Small Cars", price: "₹15,000" },
      { carType: "MENZA PRO - Hatch Back / Small Sedan", price: "₹18,000" },
      { carType: "MENZA PRO - Mid-size Sedan / Compact SUV / MUV", price: "₹21,000" },
      { carType: "MENZA PRO - SUV / MPV", price: "₹24,000" },
      { carType: "KOCH CHEMIE - Small Cars", price: "₹18,000" },
      { carType: "KOCH CHEMIE - Hatch Back / Small Sedan", price: "₹22,000" },
      { carType: "KOCH CHEMIE - Mid-size Sedan / Compact SUV / MUV", price: "₹25,000" },
      { carType: "KOCH CHEMIE - SUV / MPV", price: "₹28,000" }
    ],
    description: "Ceramic coating is the pinnacle of automotive paint protection. This nano-technology treatment bonds permanently to your vehicle's surface, creating an ultra-hard, hydrophobic shell that repels water, dirt, UV rays, and chemical contaminants. Available in four premium variants — from Made in India to Made in Germany — each backed by a 2-year warranty and one free top-up coat.",
    features: [
      "Washing + Interior Cleaning",
      "Detailing + Paint Sealant Coating",
      "Application of Ceramic Coating",
      "1 Top up coat Free within a year"
    ],
    variants: [
      "9H (2 Year Warranty - Made in India)",
      "MAFRA (2 Year Warranty - Made in Italy)",
      "MENZA PRO (2 Year Warranty - Made in Japan)",
      "KOCH CHEMIE (2 Year Warranty - Made in Germany)"
    ],
    warranty: "2 Year Warranty",
    highlight: true
  },
  {
    id: "9",
    slug: "corrosion-treatment",
    title: "CORROSION TREATMENT",
    pricing: [
      { carType: "Small Cars", price: "₹3,500" },
      { carType: "Hatch Back / Small Sedan", price: "₹4,000" },
      { carType: "Mid-size Sedans / Compact SUV", price: "₹4,500" },
      { carType: "SUV / MPV", price: "₹5,000" }
    ],
    description: "Rust and corrosion silently weaken your vehicle's underbody over time. Our corrosion treatment applies a tough rubberized coating beneath your car and on the silencer, forming a protective barrier against moisture, road salt, and debris. It's an essential service for long-term structural protection and resale value.",
    features: [
      "Washing + Underbody Rubberized Coating",
      "Silencer coating"
    ]
  },
  {
    id: "10",
    slug: "windshield-coating",
    title: "WINDSHIELD COATING",
    pricing: [
      { carType: "Small Cars", price: "₹2,500" },
      { carType: "Hatch Back / Small Sedan", price: "₹3,000" },
      { carType: "Mid-size Sedan / Compact SUV / MUV", price: "₹3,500" },
      { carType: "SUV / MPV", price: "₹4,000" },
      { carType: "All Glasses - Small Cars", price: "₹5,000" },
      { carType: "All Glasses - Hatch Back / Small Sedan", price: "₹5,500" },
      { carType: "All Glasses - Mid-size Sedan / Compact SUV / MUV", price: "₹6,000" },
      { carType: "All Glasses - SUV / MPV", price: "₹6,500" }
    ],
    description: "Our professional glass coating treatment bonds to your windshield at a molecular level, creating a water-repellent surface that dramatically improves wet-weather visibility. Rain beads and rolls off instantly, reducing the need for wipers and making night driving clearer and safer. Available for front windshield only or all glass surfaces.",
    features: [
      "Washing + Machine Compounding (rubbing)",
      "Application of Glass Coating"
    ],
    variants: ["Front Windshield", "All Glasses"]
  },
  {
    id: "11",
    slug: "sun-control-film",
    title: "SUN CONTROL FILM",
    pricing: [
      { carType: "Small Cars", price: "₹5,200" },
      { carType: "Hatch Back / Small Sedan", price: "₹6,000" },
      { carType: "Mid-size Sedan / Compact SUV / MUV", price: "₹6,500" },
      { carType: "SUV / MPV", price: "₹8,400" },
      { carType: "Standard - Small Cars", price: "₹7,500" },
      { carType: "Standard - Hatch Back / Small Sedan", price: "₹8,300" },
      { carType: "Standard - Mid-size Sedan / Compact SUV / MUV", price: "₹9,500" },
      { carType: "Standard - SUV / MPV", price: "₹12,500" },
      { carType: "Premium - Small Cars", price: "₹11,500" },
      { carType: "Premium - Hatch Back / Small Sedan", price: "₹13,000" },
      { carType: "Premium - Mid-size Sedan / Compact SUV / MUV", price: "₹15,000" },
      { carType: "Premium - SUV / MPV", price: "₹18,000" },
      { carType: "Ceramic - Small Cars", price: "₹13,500" },
      { carType: "Ceramic - Hatch Back / Small Sedan", price: "₹15,500" },
      { carType: "Ceramic - Mid-size Sedan / Compact SUV / MUV", price: "₹18,000" },
      { carType: "Ceramic - SUV / MPV", price: "₹21,000" }
    ],
    description: "Sun control film dramatically reduces cabin heat, blocks harmful UV rays, and enhances privacy — without compromising your view. Our premium films range from Economy to Ceramic grade, offering up to 60% heat rejection. Professionally installed for a perfect fit, our films keep your car cooler, protect your interiors from fading, and improve overall driving comfort.",
    features: [
      "Professional Installation",
      "Premium Quality Film",
      "Heat Rejection Technology"
    ],
    variants: [
      "Economy (Heat Rejection 25%-30%)",
      "Standard (Heat Rejection 30%-40%)",
      "Premium (Heat Rejection 40%-50%)",
      "Ceramic (Heat Rejection 50%-60%)"
    ]
  }
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find(service => service.slug === slug);
}
