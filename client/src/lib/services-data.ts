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
    description: "Complete exterior foam wash with attention to detail.",
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
    description: "Enhanced washing service including underbody and interior vacuum.",
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
    description: "Deep cleaning for a fresh, hygienic cabin.",
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
    description: "The ultimate interior sanitation and detailing package.",
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
    description: "Restore and protect your premium leather interiors.",
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
    description: "Paint correction and restoration for showroom shine.",
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
    description: "Premium protection with 1 year warranty included.",
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
    description: "Ultimate protection with professional ceramic coating variants.",
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
    description: "Protect your underbody from rust and corrosion.",
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
    description: "Premium glass coating protection with water beading.",
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
    description: "Heat rejection film with multiple variants available.",
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
