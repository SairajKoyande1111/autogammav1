import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Star, Shield, Zap, Trophy, CheckCircle2, Play, MapPin, Phone, Mail, Loader2, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
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
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          {/* Dark red tint overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-red-950/30 to-black/70" />
        </div>
        
        <div className="relative z-10 container px-4 mx-auto flex items-center justify-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center"
          >
            <motion.p 
              variants={fadeInUp}
              className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4"
            >
              Premium Auto Care
            </motion.p>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-sora font-bold text-white leading-tight mb-6"
            >
              Auto Detailing<br />
              <span className="text-primary">Done to Perfection</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-white text-lg md:text-xl mb-10 max-w-xl mx-auto font-semibold"
            >
              Transform your vehicle with our expert detailing, PPF coating, and ceramic protection services.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col md:flex-row flex-wrap gap-4 justify-center"
            >
              <Button 
                asChild 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 text-lg"
                data-testid="button-hero-consult"
              >
                <Link href="#contact">Book Consultation</Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-bold px-8 py-6 text-lg"
                data-testid="button-hero-services"
              >
                <Link href="/services">Explore Services</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Services Catalogue */}
      <section className="pt-10 pb-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        
        <div className="container px-2 sm:px-4 mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16 space-y-4"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-sora font-bold text-white">
              OUR <span className="text-primary">SERVICES</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white text-xl font-semibold md:whitespace-nowrap">Complete automotive care solutions tailored to protect, enhance, and maintain your vehicle's pristine condition</motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerFast}
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6"
          >
            {[
              { title: "Auto Detailing", desc: "Expert washing, waxing & polish for pristine shine", img: detailingImage, link: "/services" },
              { title: "Paint Protection", desc: "Shield your paint from damage & weathering", img: ppfImage, link: "/ppf" },
              { title: "Body Wrap", desc: "Custom vinyl wraps for style & protection", img: heroImage, link: "/services" },
              { title: "Sun Control Film", desc: "UV protection & interior cooling", img: interiorImage, link: "/services" },
              { title: "Ceramic Coating", desc: "Long-lasting hydrophobic protection layer", img: ceramicCoatingImage, link: "/services" },
              { title: "Car Accessories", desc: "Premium add-ons & upgrades for your vehicle", img: galleryImage2, link: "/services" },
              { title: "Interior Steam Wash", desc: "Deep cleaning for pristine interiors", img: galleryImage4, link: "/services" },
              { title: "Mechanical", desc: "Professional maintenance & repairs", img: galleryImage3, link: "/services" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Link href={item.link} className="group block h-[320px] md:h-[400px] relative overflow-hidden border border-white/10 cursor-pointer hover-lift flex flex-col justify-end">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${item.img})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
                    
                    <div className="relative z-10 w-full p-3 md:p-8 mt-auto">
                      <h3 className="text-base md:text-2xl font-sora font-bold text-white mb-1 md:mb-2 line-clamp-2">{item.title}</h3>
                      <p className="text-xs md:text-sm text-white mb-2 md:mb-3 line-clamp-2">{item.desc}</p>
                    </div>
                </Link>
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
      <section className="py-24 bg-black text-white">
        <div className="container px-4 mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInLeft} className="space-y-8">
              <div className="space-y-4">
                <motion.div variants={fadeInUp} className="inline-block">
                  <span className="text-primary text-sm font-bold tracking-[0.3em] uppercase font-sora">Paint Protection</span>
                </motion.div>
                <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-orbitron font-bold">
                  DISCOVER <span className="text-primary">PPF PROTECTION</span>
                </motion.h2>
              </div>
              
              <motion.div variants={fadeInUp} className="space-y-4 text-white text-lg font-sora">
                <p>
                  Paint Protection Film (PPF) is a transparent urethane film applied to your vehicle's painted surfaces to protect your car from stone chips, bug splatters, and minor abrasions.
                </p>
                <p>
                  Our advanced PPF technology provides a sacrificial protection layer, keeping your paint looking showroom-fresh while adding a deep, glossy wet-look finish.
                </p>
              </motion.div>

              <motion.div 
                variants={stagger}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
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
                    <div className="w-2 h-2 bg-primary rounded-full shrink-0" />
                    <span className="text-white font-medium font-sora">{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Button asChild className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 text-lg">
                  <Link href="/ppf">LEARN MORE ABOUT PPF</Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInRight} className="relative">
              <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-2xl hover-lift w-full">
                <video 
                  src={ppfVideo} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-auto block"
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
              variants={stagger}
              className="text-center mb-12 space-y-4"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl font-orbitron font-bold text-white">THE AUTO GLIMPSES</motion.h2>
              <motion.p variants={fadeInUp} className="text-muted-foreground">View our latest work and transformations!</motion.p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={stagger}
              className="grid grid-cols-3 lg:grid-cols-3 gap-4"
            >
              {[videoGlimpse1, videoGlimpse2, videoGlimpse3, videoGlimpse4, videoGlimpse5, videoGlimpse6].map((video, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <div className="relative w-full bg-black group overflow-hidden rounded-lg hover-lift">
                    <video 
                      src={video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto object-contain transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
         </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 bg-black relative">
        <div className="container px-4 mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <motion.div variants={fadeInLeft} className="space-y-4 lg:col-span-1">
              <h2 className="text-3xl md:text-4xl font-sora font-bold text-white leading-tight">
                CONTACT US TO <br /><span className="text-primary">KNOW MORE.</span>
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Ready to give your vehicle the treatment it deserves? Reach out to us for appointments, quotes, or any queries.
              </p>
              
              <div className="space-y-3 pt-2">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-sora font-bold text-sm uppercase tracking-wide mb-0.5">Visit Us</h4>
                    <p className="text-muted-foreground text-xs">Shop no. 16 & 17, Shreeji Parasio, Badlapur, MH 421503</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-sora font-bold text-sm uppercase tracking-wide mb-0.5">Call Us</h4>
                    <p className="text-muted-foreground text-xs">+91 92268 82024</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-sora font-bold text-sm uppercase tracking-wide mb-0.5">Email Us</h4>
                    <p className="text-muted-foreground text-xs">info@autogamma.in</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="pt-2"
                >
                  <h4 className="text-white font-sora font-bold text-sm uppercase tracking-wide mb-2">Follow Us</h4>
                  <div className="flex gap-2">
                    <a href="https://facebook.com/autogamma" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary/20 transition-colors" data-testid="link-facebook">
                      <Facebook size={16} />
                    </a>
                    <a href="https://instagram.com/autogamma" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary/20 transition-colors" data-testid="link-instagram">
                      <Instagram size={16} />
                    </a>
                    <a href="https://twitter.com/autogamma" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary/20 transition-colors" data-testid="link-twitter">
                      <Twitter size={16} />
                    </a>
                    <a href="https://linkedin.com/company/autogamma" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary/20 transition-colors" data-testid="link-linkedin">
                      <Linkedin size={16} />
                    </a>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="rounded-xl overflow-hidden border border-white/10 h-48 mt-4"
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
            </motion.div>

            <motion.div 
              variants={fadeInRight}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover-glow lg:col-span-2"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onContactSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs text-white/60 uppercase tracking-wider font-sora">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-black/50 border-white/10 focus:border-primary h-10 text-white text-sm" data-testid="input-contact-name" {...field} />
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
                          <FormLabel className="text-xs text-white/60 uppercase tracking-wider font-sora">Contact Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 98765 43210" className="bg-black/50 border-white/10 focus:border-primary h-10 text-white text-sm" data-testid="input-contact-phone" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs text-white/60 uppercase tracking-wider font-sora">Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" className="bg-black/50 border-white/10 focus:border-primary h-10 text-white text-sm" data-testid="input-contact-email" {...field} />
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
                          <FormLabel className="text-xs text-white/60 uppercase tracking-wider font-sora">Service</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-black/50 border-white/10 text-white h-10 text-sm" data-testid="select-contact-service">
                                <SelectValue placeholder="Select service..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-neutral-900 border-white/10">
                              <SelectItem value="auto-detailing">Auto Detailing</SelectItem>
                              <SelectItem value="ppf">Paint Protection Film</SelectItem>
                              <SelectItem value="ceramic-coating">Ceramic Coating</SelectItem>
                              <SelectItem value="body-wrap">Body Wrap</SelectItem>
                              <SelectItem value="sun-control">Sun Control Film</SelectItem>
                              <SelectItem value="interior-cleaning">Interior Cleaning</SelectItem>
                              <SelectItem value="mechanical">Mechanical</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-white/60 uppercase tracking-wider font-sora">Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your vehicle..." className="bg-black/50 border-white/10 focus:border-primary min-h-[80px] text-white text-sm" data-testid="input-contact-message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-sora font-bold h-10 text-sm uppercase tracking-widest"
                    data-testid="button-submit-contact"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      "Submit Inquiry"
                    )}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-50" />
        <div className="container px-4 mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16 space-y-4"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-orbitron font-bold text-white">
              WHAT OUR <span className="text-primary">CUSTOMERS SAY</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">
              Trusted by car enthusiasts across India
            </motion.p>
          </motion.div>

          <div className="relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />
            <div className="flex gap-6 animate-marquee-testimonials">
              {[
                { name: "Rajesh Sharma", role: "BMW Owner", location: "Mumbai", rating: 5, text: "Absolutely incredible service! My BMW looks brand new after the ceramic coating. The attention to detail is unmatched." },
                { name: "Priya Patel", role: "Mercedes Owner", location: "Pune", rating: 5, text: "Auto Gamma transformed my car completely. The PPF installation was flawless and the team was very professional." },
                { name: "Amit Kumar", role: "Audi Owner", location: "Thane", rating: 5, text: "Best detailing service in the region. They treat every car like it's their own. Highly recommended!" },
                { name: "Sneha Deshmukh", role: "Range Rover Owner", location: "Navi Mumbai", rating: 5, text: "The interior deep cleaning service is outstanding. My car smells fresh and looks pristine inside." },
                { name: "Vikram Singh", role: "Porsche Owner", location: "Badlapur", rating: 5, text: "Premium service at reasonable prices. The ceramic coating has made my car shine like never before." },
                { name: "Ananya Reddy", role: "Jaguar Owner", location: "Kalyan", rating: 5, text: "Exceptional craftsmanship! The team at Auto Gamma really knows their work. Will definitely return." },
                { name: "Suresh Nair", role: "Toyota Owner", location: "Dombivli", rating: 5, text: "Even my daily driver looks like a showroom car now. Great value for money and excellent service." },
                { name: "Kavita Joshi", role: "Honda Owner", location: "Ulhasnagar", rating: 5, text: "Professional team, clean facility, and amazing results. They explained every step of the process." },
                { name: "Rohan Mehta", role: "Tata Safari Owner", location: "Ambernath", rating: 5, text: "The steam sanitization service was exactly what I needed. My car feels brand new and hygienic." },
                { name: "Deepika Iyer", role: "Hyundai Owner", location: "Karjat", rating: 5, text: "From booking to delivery, everything was smooth. The paint protection film is simply perfect!" },
                { name: "Rajesh Sharma", role: "BMW Owner", location: "Mumbai", rating: 5, text: "Absolutely incredible service! My BMW looks brand new after the ceramic coating. The attention to detail is unmatched." },
                { name: "Priya Patel", role: "Mercedes Owner", location: "Pune", rating: 5, text: "Auto Gamma transformed my car completely. The PPF installation was flawless and the team was very professional." },
                { name: "Amit Kumar", role: "Audi Owner", location: "Thane", rating: 5, text: "Best detailing service in the region. They treat every car like it's their own. Highly recommended!" },
                { name: "Sneha Deshmukh", role: "Range Rover Owner", location: "Navi Mumbai", rating: 5, text: "The interior deep cleaning service is outstanding. My car smells fresh and looks pristine inside." },
                { name: "Vikram Singh", role: "Porsche Owner", location: "Badlapur", rating: 5, text: "Premium service at reasonable prices. The ceramic coating has made my car shine like never before." },
              ].map((testimonial, i) => (
                <div 
                  key={i}
                  className="flex-shrink-0 w-[350px]"
                >
                  <Card className="bg-white/5 border-white/10 hover:border-primary/30 transition-all duration-300 h-full">
                    <CardContent className="p-8">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, j) => (
                          <Star key={j} size={18} className="text-primary fill-primary" />
                        ))}
                      </div>
                      <p className="text-white/80 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-red-700 flex items-center justify-center text-white font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-white font-bold">{testimonial.name}</h4>
                          <p className="text-muted-foreground text-sm">{testimonial.role} • {testimonial.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
