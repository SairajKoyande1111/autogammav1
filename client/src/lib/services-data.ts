export interface ServiceData {
  id: string;
  title: string;
  slug: string;
  price: string;
  description: string;
  features: string[];
  carTypes: string[];
  variants?: string[];
  warranty?: string;
  highlight?: boolean;
}

export const servicesData: ServiceData[] = [
  {
    id: "1",
    slug: "foam-washing",
    title: "FOAM WASHING",
    price: "₹400",
    description: "Complete exterior foam wash with attention to detail.",
    features: [
      "Tyre & Arches Cleaning",
      "Foam Wash",
      "All foot mats will be washed & vacuumed",
      "All 4 Wheels / Alloys Cleaning",
      "Laying paper mats"
    ],
    carTypes: ["Small Cars", "Hatch Back / Small Sedan", "Mid-size Sedans / Compact SUV"]
  },
  {
    id: "2",
    slug: "premium-washing",
    title: "PREMIUM WASHING",
    price: "₹600",
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
    carTypes: ["Small Cars", "Hatch Back / Small Sedan", "Mid-size Sedans / Compact SUV"],
    highlight: true
  },
  {
    id: "3",
    slug: "interior-cleaning",
    title: "INTERIOR CLEANING",
    price: "₹2,500",
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
    ],
    carTypes: ["Small Cars", "Hatch Back / Small Sedan", "Mid-size Sedans / Compact SUV"]
  },
  {
    id: "4",
    slug: "interior-steam-cleaning",
    title: "INTERIOR STEAM CLEANING",
    price: "₹3,500",
    description: "The ultimate interior sanitation and detailing package.",
    features: [
      "Washing + Interior Cleaning + AC Duct Cleaning",
      "Steam Cleaning",
      "Sanitization of Car using steam",
      "Leather Waxing"
    ],
    carTypes: ["Small Cars", "Hatch Back / Small Sedan", "Mid-size Sedans / Compact SUV"]
  },
  {
    id: "5",
    slug: "leather-treatment",
    title: "LEATHER TREATMENT",
    price: "₹5,000",
    description: "Restore and protect your premium leather interiors.",
    features: [
      "Washing",
      "Interior Steam Cleaning",
      "Leather Waxing and Conditioning"
    ],
    carTypes: ["Small Cars", "Hatch Back / Small Sedan", "Mid-size Sedans / Compact SUV"]
  },
  {
    id: "6",
    slug: "detailing",
    title: "DETAILING",
    price: "₹5,000",
    description: "Paint correction and restoration for showroom shine.",
    features: [
      "Washing + Interior Cleaning + Decontamination Using Clay Mitt",
      "Masking Multiple stages of compounding, Machine Compounding (rubbing)",
      "Removal of hard water marks & mineral deposits from all edges"
    ],
    carTypes: ["Small Cars", "Hatch Back / Small Sedan", "Mid-size Sedans / Compact SUV"],
    highlight: true
  },
  {
    id: "7",
    slug: "paint-sealant-coating",
    title: "PAINT SEALANT COATING (TEFLON)",
    price: "₹5,500",
    description: "Premium protection with 1 year warranty included.",
    features: [
      "Washing + Interior Cleaning + Detailing + Glazing and Swirl marks removal using D.A.",
      "Polisher, Application of wax",
      "Premium external glass cleaning & protection, Alloy protection",
      "1 Year Warranty"
    ],
    carTypes: ["Small Cars", "Hatch Back / Small Sedan", "Mid-size Sedans / Compact SUV"],
    warranty: "1 Year Warranty"
  },
  {
    id: "8",
    slug: "ceramic-coating",
    title: "CERAMIC COATING",
    price: "₹11,000",
    description: "Ultimate protection with variants and 2-year warranty.",
    features: [
      "Washing + Interior Cleaning",
      "Detailing + Paint Sealant Coating",
      "Application of Ceramic Coating",
      "1 Top up coat Free within a year"
    ],
    variants: ["9H", "MAFRA", "MENZA PRO", "KOCH CHEMIE"],
    carTypes: ["Small Cars", "Hatch Back / Small Sedan", "Mid-size Sedans / Compact SUV"],
    warranty: "2 Year Warranty - Made in India",
    highlight: true
  },
  {
    id: "9",
    slug: "corrosion-treatment",
    title: "CORROSION TREATMENT",
    price: "₹3,500",
    description: "Protect your underbody from rust and corrosion.",
    features: [
      "Washing + Underbody Rubberized Coating",
      "Silencer coating"
    ],
    carTypes: ["Small Cars", "Hatch Back / Small Sedan", "Mid-size Sedans / Compact SUV"]
  },
  {
    id: "10",
    slug: "windshield-coating",
    title: "WINDSHIELD COATING",
    price: "₹2,500 - ₹5,000",
    description: "Premium glass coating protection with water beading.",
    features: [
      "Washing + Machine Compounding (rubbing)",
      "Application of Glass Coating"
    ],
    carTypes: ["Small Cars", "Hatch Back / Small Sedan", "Mid-size Sedans / Compact SUV", "All Glasses"]
  },
  {
    id: "11",
    slug: "sun-control-film",
    title: "SUN CONTROL FILM",
    price: "₹5,200",
    description: "Heat rejection film with multiple variants available.",
    features: [
      "Professional Installation",
      "Premium Quality Film",
      "Heat Rejection Technology"
    ],
    variants: ["Economy (Heat Rejection 20%-30%)", "Standard (Heat Rejection 30%-40%)", "Premium (Heat Rejection 40%-50%)", "Ceramic (Heat Rejection 50%-60%)"],
    carTypes: ["Small Cars", "Hatch Back / Small Sedan", "Mid-size Sedans / Compact SUV / MUV", "SUV / MPV"]
  }
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find(service => service.slug === slug);
}
