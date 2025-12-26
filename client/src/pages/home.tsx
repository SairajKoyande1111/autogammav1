import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Star, Shield, Zap, Trophy, CheckCircle2, Play, MapPin, Phone, Mail, Loader2, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { contactFormSchema, type ContactFormData } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

import heroVideo from "@assets/Untitled_design_(3)_1765178051900.mp4";
import heroImage from "@assets/generated_images/cinematic_luxury_dark_car_hero_background_with_red_accents.png";
import tireImage from "@assets/pngegg_1765179057976.png";
import detailingImage from "@assets/generated_images/car_detailing_polishing_action_shot.png";
import ppfImage from "@assets/generated_images/paint_protection_film_application.png";
import ppfVideo from "@assets/Untitled_design_(4)_1766130916239.mp4";
import interiorImage from "@assets/generated_images/luxury_car_interior_leather_detailing.png";
import videoGlimpse1 from "@assets/SaveVid.Net_AQMUpHxmxuNGcHwkfVjOZ0Mkr1NrOCG6OIhZeH-eqN1FJTSHf-_1766132377158.mp4";
import videoGlimpse2 from "@assets/SaveVid.Net_AQPH07f6oeLwF1rITfpGkiIfbeYZ6l8fG46D8tmEg0if0HS0qe_1766132427707.mp4";
import videoGlimpse3 from "@assets/SaveVid.Net_AQOsV5pDj_W087f3UYP9VhECz3UgKbQ1xIiqsT0ZT3t8uOfysd_1766132465924.mp4";
import videoGlimpse4 from "@assets/SaveVid.Net_AQOYHI_R4snfehrTDo_tJJSmk7uEZK6nP9rnbYOT6mkEH4IuXJ_1766132518974.mp4";
import videoGlimpse5 from "@assets/SaveVid.Net_AQP82_8gVpK5rtDdyY5gRX-zzuC3vza-INl2HmFNIQjmRs1gNe_1766132590627.mp4";
import videoGlimpse6 from "@assets/SaveVid.Net_AQNDoeYV9HVDcEuo094Cyb5Mv_nf3CKBUNi238yrQ_m-wWVngl_1766132646182.mp4";
import pickupIcon from "@assets/generated_images/3d_glossy_red_location_pin_and_car_key.png";
import diverseIcon from "@assets/generated_images/3d_glossy_red_star_badge.png";
import economicalIcon from "@assets/generated_images/3d_glossy_red_shield.png";
import skilledIcon from "@assets/generated_images/3d_glossy_red_wrench_and_gear.png";
import galleryImage1 from "@assets/stock_images/luxury_car_in_dark_g_18d4fc70.jpg";
import galleryImage2 from "@assets/stock_images/luxury_car_interior__d9a8634a.jpg";
import galleryImage3 from "@assets/stock_images/suv_off-road_desert__38198823.jpg";
import galleryImage4 from "@assets/stock_images/car_interior_detaili_b4d46e1c.jpg";
import ceramicCoatingImage from "@assets/image_1766127336814.png";
import carDisplayImage from "@assets/Black_and_Red_Modern_Car_Dealer_Presentation_(1)_1766227724821.png";
import heroBgImage from "@assets/Black_and_Red_Modern_Car_Dealer_Presentation_(2)_1766236484545.png";
import facebookIcon from "@assets/facebook_1766217005798.png";
import instagramIcon from "@assets/—Pngtree—instagram_icon_instagram_logo_vector_3584852_1766216113430.png";
import youtubeIcon from "@assets/youtube_1766216255122.png";
import ppfAppImage from "@assets/image_1766729172233.png";
import shieldIcon from "@assets/image_1766729201482.png";
import rupeeIcon from "@assets/image_1766729223515.png";
import toolsIcon from "@assets/image_1766729246340.png";
import starIcon from "@assets/image_1766729264056.png";

import logoPolk from "@assets/image_1765180647538.png";
import logoHertz from "@assets/image_1765180659355.png";
import logoCrosslink from "@assets/image_1765180665333.png";
import logoKochChemie from "@assets/image_1765180674823.png";
import logoNippon from "@assets/image_1765180690668.png";
import logoPioneer from "@assets/image_1765180699887.png";
import logoBlaupunkt from "@assets/image_1765180711219.png";
import logoMaxxlink from "@assets/image_1765180720687.png";
import logoGarware from "@assets/image_1765180761821.png";
import logoQubo from "@assets/image_1765180776395.png";
import logoAvery from "@assets/image_1765180796870.png";
import logoSunkool from "@assets/image_1765180803554.png";
import logoLlumar from "@assets/image_1765180809382.png";
import logo3M from "@assets/image_1765180836267.png";
import logoCardi from "@assets/image_1765180859879.png";
import logoCerwin from "@assets/image_1765180872400.png";

import profile1 from "@assets/stock_images/indian_professional__10ae0555.jpg";
import profile2 from "@assets/stock_images/indian_professional__b766b1cd.jpg";
import profile3 from "@assets/stock_images/indian_professional__c83cbdcf.jpg";
import profile4 from "@assets/stock_images/indian_professional__06af6b2b.jpg";
import profile5 from "@assets/stock_images/indian_professional__c76f3810.jpg";
import profile6 from "@assets/stock_images/indian_professional__5a134d93.jpg";
import profile7 from "@assets/stock_images/indian_professional__d8bfb386.jpg";
import profile8 from "@assets/stock_images/indian_professional__0f632df0.jpg";
import profile9 from "@assets/stock_images/indian_professional__1a8573a3.jpg";
import profile10 from "@assets/stock_images/indian_professional__5fa5daa6.jpg";


const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
} as const;

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
} as const;

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
} as const;

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
} as const;

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
} as const;

const staggerFast = {
  visible: { transition: { staggerChildren: 0.05 } }
} as const;

const brandLogos = [
  { name: "Polk Audio", logo: logoPolk },
  { name: "Hertz", logo: logoHertz },
  { name: "Crosslink Wheels", logo: logoCrosslink },
  { name: "Koch Chemie", logo: logoKochChemie },
  { name: "Nippon", logo: logoNippon },
  { name: "Pioneer", logo: logoPioneer },
  { name: "Blaupunkt", logo: logoBlaupunkt },
  { name: "Maxxlink", logo: logoMaxxlink },
  { name: "Garware", logo: logoGarware },
  { name: "Qubo", logo: logoQubo },
  { name: "Avery Dennison", logo: logoAvery },
  { name: "Sunkool", logo: logoSunkool },
  { name: "Llumar", logo: logoLlumar },
  { name: "3M", logo: logo3M },
  { name: "Cardi", logo: logoCardi },
  { name: "Cerwin Vega", logo: logoCerwin },
];

// Carousel Component
function CarouselContent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsData = [
    { name: "Rajesh Sharma", vehicle: "BMW 7 Series", location: "Mumbai", rating: 5, text: "Absolutely incredible service! My BMW looks brand new after the ceramic coating. The attention to detail is unmatched.", image: profile1 },
    { name: "Priya Patel", vehicle: "Mercedes C-Class", location: "Pune", rating: 5, text: "Auto Gamma transformed my car completely. The PPF installation was flawless and the team was very professional.", image: profile2 },
    { name: "Amit Kumar", vehicle: "Audi Q5", location: "Thane", rating: 5, text: "Best detailing service in the region. They treat every car like it's their own. Highly recommended!", image: profile3 },
    { name: "Sneha Deshmukh", vehicle: "Range Rover", location: "Navi Mumbai", rating: 5, text: "The interior deep cleaning service is outstanding. My car smells fresh and looks pristine inside.", image: profile4 },
    { name: "Vikram Singh", vehicle: "Porsche 911", location: "Badlapur", rating: 5, text: "Premium service at reasonable prices. The ceramic coating has made my car shine like never before.", image: profile5 },
    { name: "Ananya Reddy", vehicle: "Jaguar XF", location: "Kalyan", rating: 5, text: "Exceptional craftsmanship! The team at Auto Gamma really knows their work. Will definitely return.", image: profile6 },
    { name: "Rohan Gupta", vehicle: "Audi A6", location: "Delhi", rating: 5, text: "Fantastic experience! The PPF application was perfect and the attention to detail was outstanding.", image: profile7 },
    { name: "Kavya Sharma", vehicle: "BMW X5", location: "Bangalore", rating: 5, text: "The ceramic coating makes my car look showroom fresh. Highly professional team and excellent service.", image: profile8 },
    { name: "Arjun Singh", vehicle: "Mercedes E-Class", location: "Hyderabad", rating: 5, text: "Best auto detailing service I've ever used. The interior steam cleaning was thorough and professional.", image: profile9 },
    { name: "Pooja Nair", vehicle: "Range Rover Evoque", location: "Kochi", rating: 5, text: "Outstanding work! The paint protection film has given me peace of mind. Great team and great results.", image: profile10 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % reviewsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const itemsPerView = 4;
  const visibleReviews = Array.from({ length: itemsPerView }, (_, i) => 
    reviewsData[(currentIndex + i) % reviewsData.length]
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleReviews.map((review, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="bg-white/5 border border-white/10 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-14 h-14 border-2 border-primary flex-shrink-0">
                    {review.image && <AvatarImage src={review.image} alt={review.name} />}
                    <AvatarFallback className="bg-primary text-white font-bold text-sm">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-white font-semibold text-sm">{review.name}</h4>
                    <p className="text-white/60 text-xs">{review.vehicle}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} size={13} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed flex-grow mb-3">"{review.text}"</p>
                <p className="text-white/50 text-xs flex items-center gap-1">
                  <MapPin size={11} /> {review.location}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center gap-2">
        {reviewsData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentIndex ? 'bg-primary w-6' : 'bg-white/30 w-2'
            }`}
            data-testid={`carousel-dot-${idx}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you shortly.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onContactSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const tireRotation = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const tireY = useTransform(scrollYProgress, [0, 0.3], [0, 400]);
  
  const smoothScrollProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20, mass: 0.5 });
  const carX = useTransform(smoothScrollProgress, [0, 1], ["0vw", "85vw"]);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section 
        className="hero-bg relative w-full flex flex-col justify-between" 
        style={{ 
          height: "100vh",
        }}
      >
        <video 
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="hero-bg-video"
        />
        {/* No overlay - image displays without tint */}
        {/* Main Content Container */}
        <div className="flex-1 flex flex-col items-center justify-center w-full px-4 pt-20 md:pt-28 lg:pt-32 pb-12 md:pb-16 relative z-10">
          {/* Tagline */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0 }}
            className="text-center mb-4 md:mb-8 lg:mb-10"
          >
            <div className="text-white text-base md:text-lg lg:text-xl font-bold tracking-[0.2em] uppercase" style={{ letterSpacing: "0.15em", fontFamily: "'Poppins', sans-serif" }}>
              PREMIUM AUTO CARE
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-center mb-6 md:mb-10 lg:mb-12 max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-2" style={{ color: "#FFFFFF", fontFamily: "'Poppins', sans-serif" }}>
              AUTO DETAILING
            </h1>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight" style={{ color: "hsl(var(--primary))", fontFamily: "'Poppins', sans-serif" }}>
              DONE TO PERFECTION
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-center mb-8 md:mb-12 max-w-5xl"
          >
            <p className="text-base md:text-lg lg:text-xl text-white font-bold md:whitespace-nowrap" style={{ fontFamily: "'Poppins', sans-serif" }}>All in One Solution for Your Car PPF, Ceramic Coating & Complete Protection.</p>
          </motion.div>

          {/* Buttons Section */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button 
              asChild 
              className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 text-base md:text-lg md:px-10 md:py-3 lg:px-12 skew-x-[-15deg] min-h-12"
              data-testid="button-hero-consult"
            >
              <Link href="#contact">Book Consultation</Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline"
              className="border-white text-white hover:bg-white/10 backdrop-blur-sm font-bold px-8 py-3 text-base md:text-lg md:px-10 md:py-3 lg:px-12 skew-x-[-15deg] min-h-12"
              data-testid="button-hero-services"
            >
              <Link href="/services">Explore Services</Link>
            </Button>
          </motion.div>
        </div>

        {/* Services Card at Bottom of Hero */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-20 w-full mb-0"
        >
          <div className="bg-black/90 border-t border-b border-white/10 py-4 md:py-5">
            <div className="w-full px-4 md:px-8 lg:px-12 overflow-x-auto">
              <div className="flex flex-nowrap justify-center items-center gap-2 md:gap-3 lg:gap-4 text-white text-xs md:text-sm lg:text-base font-semibold uppercase tracking-wide whitespace-nowrap">
                <span className="text-primary shrink-0">PAINT PROTECTION FILM</span>
                <span className="text-white text-xs md:text-sm lg:text-base font-bold shrink-0">|</span>
                <span className="shrink-0">SUN CONTROL FILM</span>
                <span className="text-white text-xs md:text-sm lg:text-base font-bold shrink-0">|</span>
                <span className="text-primary shrink-0">BODY WRAP</span>
                <span className="text-white text-xs md:text-sm lg:text-base font-bold shrink-0">|</span>
                <span className="shrink-0">CERAMIC COATING</span>
                <span className="text-white text-xs md:text-sm lg:text-base font-bold shrink-0">|</span>
                <span className="text-primary shrink-0">STEAM WASH</span>
                <span className="text-white text-xs md:text-sm lg:text-base font-bold shrink-0">|</span>
                <span className="shrink-0">DETAILING</span>
                <span className="text-white text-xs md:text-sm lg:text-base font-bold shrink-0">|</span>
                <span className="text-primary shrink-0">CAR ACCESSORIES</span>
                <span className="text-white text-xs md:text-sm lg:text-base font-bold shrink-0">|</span>
                <span className="shrink-0">MECHANICAL</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* PPF Hero Section */}
      <section className="py-20 md:py-32 bg-neutral-900 text-white relative overflow-hidden">
        <div className="container px-4 mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInLeft} className="space-y-8">
              <div className="space-y-6">
                <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl font-bold leading-tight font-poppins">
                  <span className="text-white">PROTECT YOUR CAR,</span><br/>
                  <span className="text-white">PRESERVE ITS</span> <span className="text-primary">SHINE!</span>
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-lg text-white/80 font-poppins">
                  Guard Your Car's Paint with Our Advanced PPF Technology
                </motion.p>
              </div>
              
              <motion.div variants={fadeInUp} className="space-y-4 font-poppins">
                <p className="text-white/90 leading-relaxed">
                  Paint Protection Film (PPF) is a transparent, urethane film applied to your vehicle's painted surface to protect it from scratches, chips, and other forms of damage caused by road debris, rocks, and harsh weather conditions.
                </p>
                <p className="text-white/90 leading-relaxed">
                  PPF creates a protective barrier between your vehicle's paint and the outside world. When a rock chip or other debris strikes the film, it absorbs the impact, preventing damage to the underlying paint.
                </p>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInRight} className="relative">
              <img 
                src={ppfAppImage} 
                alt="PPF Application"
                className="w-full h-auto rounded-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-neutral-900 relative">
        <div className="container px-4 mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16 space-y-4"
          >
            <p className="text-primary font-bold text-sm tracking-wider uppercase font-poppins">Benefits of Paint Protection Film</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-poppins">
              <span>Ultimate Protection</span> <span className="text-primary">for Your Vehicle</span>
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: shieldIcon,
                title: "Ultimate Protection",
                desc: "Shield your vehicle's paint from scratches, chips, and other forms of damage caused by road debris, rocks, and harsh weather conditions."
              },
              {
                icon: rupeeIcon,
                title: "Preserving Resale Value",
                desc: "Maintain your car's pristine appearance and increase its resale value by protecting its original paint finish."
              },
              {
                icon: toolsIcon,
                title: "Easy Maintenance",
                desc: "Repair dirt, grime, and water-making cleaning and maintenance a breeze with our advanced protective layer."
              },
              {
                icon: starIcon,
                title: "Enhanced Aesthetics",
                desc: "Enhance your vehicle's shine and gloss, giving it a short-term quality finish that lasts."
              }
            ].map((benefit, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full space-y-4 hover-lift">
                  <img src={benefit.icon} alt={benefit.title} className="h-16 w-16" />
                  <h3 className="text-xl font-bold text-white font-poppins">{benefit.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed font-poppins">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Brand Partners Logo Strip */}
      <section className="py-12 bg-neutral-900 relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neutral-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-neutral-900 to-transparent z-10 pointer-events-none" />
        
        <div className="flex animate-marquee-brands">
          {[...brandLogos, ...brandLogos].map((brand, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 mx-8 flex items-center justify-center"
              data-testid={`logo-brand-${i}`}
            >
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="h-16 md:h-20 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </section>


      {/* PPF Details Preview */}
      <section className="py-24 bg-neutral-900 text-white relative">
        <div className="container px-4 mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInLeft} className="space-y-8">
              <div className="space-y-4">
                <motion.div variants={fadeInUp}>
                  <span className="text-primary text-sm font-bold tracking-wider uppercase font-poppins">Paint Protection Film</span>
                </motion.div>
                <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold font-poppins">
                  <span className="text-white">DISCOVER</span> <span className="text-primary">PPF</span> <span className="text-white">PROTECTION</span>
                </motion.h2>
              </div>
              
              <motion.div variants={fadeInUp} className="space-y-6 text-white/90 text-lg leading-relaxed font-poppins">
                <p>
                  Paint Protection Film (PPF) is a transparent urethane film applied to your vehicle's painted surfaces to protect your car from stone chips, bug splatters, and minor abrasions.
                </p>
                <p>
                  Our advanced PPF technology provides a sacrificial protection layer, keeping your paint looking showroom-fresh while adding a deep, glossy wet-look finish.
                </p>
              </motion.div>

              <motion.div 
                variants={stagger}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4"
              >
                {[
                  "Ultimate Protection",
                  "Enhanced Gloss",
                  "Resale Value",
                  "Easy Maintenance"
                ].map((benefit, i) => (
                  <motion.div 
                    key={i}
                    variants={fadeInUp}
                    className="flex items-center gap-3"
                  >
                    <div className="w-3 h-3 bg-primary rounded-full shrink-0" />
                    <span className="text-white/90 font-medium font-poppins">{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Button asChild className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 text-base font-poppins">
                  <Link href="/ppf">LEARN MORE ABOUT PPF</Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInRight} className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl hover-lift w-full bg-black/50 flex items-center justify-center min-h-96">
                <video 
                  src={ppfVideo} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Auto Glimpses Videos */}
      <section className="py-24 bg-neutral-900 relative">
         <div className="container px-4 mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-16 space-y-4"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                <span className="text-primary">TRANSFORMATION</span> <span className="text-white">GALLERY</span>
              </h2>
              <p className="text-white text-lg max-w-2xl mx-auto font-poppins">
                Witness the stunning transformations we've created for our valued clients. Premium detailing that elevates every vehicle to perfection.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={stagger}
              className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[videoGlimpse1, videoGlimpse2, videoGlimpse3, videoGlimpse4, videoGlimpse5, videoGlimpse6].map((video, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <div className="relative w-full aspect-video group overflow-hidden rounded-2xl hover-lift">
                    <video 
                      src={video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
         </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-neutral-900 relative">
        <div className="container px-4 mx-auto">
          {/* Header */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              <span className="text-primary">CONTACT</span> <span className="text-white">US</span>
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto font-poppins">
              Ready to give your vehicle the treatment it deserves? Reach out to us for appointments, quotes, or any queries.
            </p>
          </motion.div>

          {/* Content Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          >
            {/* Left: Form */}
            <motion.div variants={fadeInLeft} className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm h-full">
              <h3 className="text-xl font-poppins font-bold text-white mb-8">Send Us a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onContactSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base text-white font-poppins mb-8">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" className="bg-black/50 border-white/10 focus:border-primary h-11 text-white text-base placeholder:text-white/50 rounded-lg font-poppins" data-testid="input-contact-name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base text-white font-poppins mb-8">Contact Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Your mobile number" className="bg-black/50 border-white/10 focus:border-primary h-11 text-white text-base placeholder:text-white/50 rounded-lg font-poppins" data-testid="input-contact-phone" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base text-white font-poppins mb-8">Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" className="bg-black/50 border-white/10 focus:border-primary h-11 text-white text-base placeholder:text-white/50 rounded-lg font-poppins" data-testid="input-contact-email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base text-white font-poppins mb-8">Service Interested In</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-black/50 border-white/10 text-white h-11 text-base rounded-lg font-poppins" data-testid="select-contact-service">
                              <SelectValue placeholder="Select a service..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-neutral-900 border-white/10">
                            <SelectItem value="auto-detailing">Auto Detailing</SelectItem>
                            <SelectItem value="ppf">Paint Protection Film</SelectItem>
                            <SelectItem value="ceramic-coating">Ceramic Coating</SelectItem>
                            <SelectItem value="body-wrap">Body Wrap</SelectItem>
                            <SelectItem value="sun-control">Sun Control Film</SelectItem>
                            <SelectItem value="interior-cleaning">Interior Cleaning</SelectItem>
                            <SelectItem value="mechanical">Mechanical Services</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base text-white font-poppins mb-8">Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your vehicle..." className="bg-black/50 border-white/10 focus:border-primary min-h-[120px] text-white text-base placeholder:text-white/50 rounded-lg font-poppins" data-testid="input-contact-message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-poppins font-bold h-11 text-base uppercase tracking-widest rounded-full mt-6"
                    data-testid="button-submit-contact"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                      </>
                    ) : (
                      "Submit Inquiry"
                    )}
                  </Button>
                  <p className="text-center text-white italic text-sm mt-6 -skew-x-6">
                    "Your car deserves perfection, and we deliver it with precision."
                  </p>
                </form>
              </Form>
            </motion.div>

            {/* Right: Contact Info & Map */}
            <motion.div variants={fadeInRight} className="space-y-6 flex flex-col h-full">
              {/* Map */}
              <motion.div 
                variants={fadeInUp}
                className="rounded-2xl overflow-hidden border border-white/10 h-72"
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.0961146405354!2d73.30156332346936!3d19.17484898204387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1c1c1c1c1c1%3A0x0!2sShop%20no.%2016%20%26%2017%2C%20Shreeji%20Parasio%2C%20Badlapur!5e0!3m2!1sen!2sin!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  data-testid="map-location"
                />
              </motion.div>

              {/* Contact Info Container */}
              <motion.div 
                variants={fadeInUp}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm flex-1"
              >
                {/* Shop Address */}
                <div className="flex items-start gap-4 mb-6 pb-6 border-b border-white">
                  <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-poppins font-bold text-base mb-2">SHOP ADDRESS</h4>
                    <p className="text-white text-sm leading-relaxed">Shop no. 16 & 17, Shreeji Parasio, Beside Tulsi Aangan Soc., Prasad Hotel Road, Badlapur, Maharashtra - 421503</p>
                  </div>
                </div>

                {/* Contact Number */}
                <div className="flex items-start gap-4 mb-6 pb-6 border-b border-white">
                  <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-poppins font-bold text-base mb-2">CONTACT NUMBER</h4>
                    <p className="text-white text-sm">+91 92268 82024</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 mb-6 pb-6 border-b border-white">
                  <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-poppins font-bold text-base mb-2">Email</h4>
                    <p className="text-white text-sm">info@autogamma.in</p>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h4 className="text-white font-poppins font-bold text-base mb-4">Connect With Us</h4>
                  <div className="flex gap-3">
                    <a href="https://facebook.com/autogamma" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity" data-testid="link-facebook">
                      <img src={facebookIcon} alt="Facebook" className="w-8 h-8 object-contain" />
                    </a>
                    <a href="https://instagram.com/autogamma" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity" data-testid="link-instagram">
                      <img src={instagramIcon} alt="Instagram" className="w-full h-full object-contain" />
                    </a>
                    <a href="https://youtube.com/autogamma" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity" data-testid="link-youtube">
                      <img src={youtubeIcon} alt="YouTube" className="w-full h-full object-contain" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-50" />

        <div className="container px-4 mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12 space-y-2"
          >
            <motion.h2 className="text-3xl md:text-5xl font-bold text-white">
              <span className="text-primary">Customer</span> <span className="text-white">Reviews</span>
            </motion.h2>
            <motion.p className="text-white text-base">
              Real testimonials from satisfied clients across India
            </motion.p>
          </motion.div>

          {/* Auto-Rotating Carousel */}
          <CarouselContent />
        </div>
      </section>

    </div>
  );
}
