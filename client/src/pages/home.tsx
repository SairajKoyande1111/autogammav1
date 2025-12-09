import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Star, Shield, Zap, Trophy, CheckCircle2, Play, MapPin, Phone, Mail, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { contactFormSchema, type ContactFormData } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

import heroVideo from "@assets/Untitled_design_(3)_1765178051900.mp4";
import heroImage from "@assets/generated_images/cinematic_luxury_dark_car_hero_background_with_red_accents.png";
import tireImage from "@assets/pngegg_1765179057976.png";
import detailingImage from "@assets/generated_images/car_detailing_polishing_action_shot.png";
import ppfImage from "@assets/generated_images/paint_protection_film_application.png";
import interiorImage from "@assets/generated_images/luxury_car_interior_leather_detailing.png";
import pickupIcon from "@assets/generated_images/3d_glossy_red_location_pin_and_car_key.png";
import diverseIcon from "@assets/generated_images/3d_glossy_red_star_badge.png";
import economicalIcon from "@assets/generated_images/3d_glossy_red_shield.png";
import skilledIcon from "@assets/generated_images/3d_glossy_red_wrench_and_gear.png";
import galleryImage1 from "@assets/stock_images/luxury_car_in_dark_g_18d4fc70.jpg";
import galleryImage2 from "@assets/stock_images/luxury_car_interior__d9a8634a.jpg";
import galleryImage3 from "@assets/stock_images/suv_off-road_desert__38198823.jpg";
import galleryImage4 from "@assets/stock_images/car_interior_detaili_b4d46e1c.jpg";

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
              className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4"
            >
              Premium Auto Care
            </motion.p>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white leading-tight mb-6"
            >
              Auto Detailing<br />
              <span className="text-primary">Done to Perfection</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-white/80 text-lg md:text-xl mb-10 max-w-xl mx-auto"
            >
              Transform your vehicle with our expert detailing, PPF coating, and ceramic protection services.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap gap-4 justify-center"
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
        
        <div className="container px-4 mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16 space-y-4"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-orbitron font-bold text-white">
              OUR <span className="text-primary">SERVICES</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white text-xl font-semibold md:whitespace-nowrap">Complete automotive care solutions tailored to protect, enhance, and maintain your vehicle's pristine condition</motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerFast}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { title: "Auto Detailing", img: detailingImage, link: "/services" },
              { title: "Paint Protection", img: ppfImage, link: "/ppf" },
              { title: "Body Wrap", img: heroImage, link: "/services" },
              { title: "Sun Control Film", img: interiorImage, link: "/services" },
              { title: "Ceramic Coating", img: galleryImage1, link: "/services" },
              { title: "Car Accessories", img: galleryImage2, link: "/services" },
              { title: "Interior Steam Wash", img: galleryImage4, link: "/services" },
              { title: "Mechanical", img: galleryImage3, link: "/services" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Link href={item.link} className="group block h-[400px] relative overflow-hidden border border-white/10 cursor-pointer hover-lift">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${item.img})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl font-orbitron font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <div className="w-12 h-1 bg-primary mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex items-center gap-2">
                        Explore <ArrowRight size={14} />
                      </p>
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

      {/* You, Your Vehicle & Auto Gamma Section - Redesigned */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="container px-4 mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16 space-y-6"
          >
            <motion.div variants={fadeInUp} className="inline-block">
              <span className="text-primary text-sm font-bold tracking-[0.3em] uppercase">Why Choose Us</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-orbitron font-bold text-white leading-tight">
              YOU, YOUR VEHICLE &<br />
              <span className="text-primary">AUTO GAMMA</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Taking extra care of your vehicle with premium services, expert craftsmanship, and unmatched convenience.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerFast}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { 
                title: "Pickup & Drop-off", 
                img: galleryImage1,
                description: "Free doorstep pickup & delivery",
                highlight: "FREE SERVICE"
              },
              { 
                title: "Diverse Offerings", 
                img: detailingImage,
                description: "50+ specialized auto services",
                highlight: "50+ SERVICES"
              },
              { 
                title: "Economical Choices", 
                img: galleryImage2,
                description: "Premium quality, best prices",
                highlight: "BEST VALUE"
              },
              { 
                title: "Skilled Crew", 
                img: ppfImage,
                description: "10+ years of expertise",
                highlight: "10+ YEARS EXP"
              },
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="group block h-[350px] relative overflow-hidden border border-white/10 cursor-pointer hover-lift">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${feature.img})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 opacity-90 group-hover:opacity-80 transition-opacity" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold tracking-wider text-white bg-primary px-3 py-1.5">
                      {feature.highlight}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-orbitron font-bold text-white mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                    <div className="w-12 h-1 bg-primary mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <p className="text-sm text-white/80">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-black text-white">
        <div className="container px-4 mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-orbitron font-bold mb-4">DISCOVER THE SERVICES</motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground">The essence of automotive excellence with our expert services</motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerFast}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {[
              "Foam Washing", "Premium Washing", "Interior Deep Cleaning", 
              "Steam Sanitization", "Leather Treatment", "Ceramic Coating"
            ].map((service, i) => (
              <motion.div 
                key={i}
                variants={i % 2 === 0 ? fadeInLeft : fadeInRight}
                className="flex items-center justify-between p-6 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-xl font-medium font-rajdhani uppercase tracking-wide group-hover:text-primary transition-colors">{service}</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
                  <ArrowRight size={14} className="text-white" />
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Button asChild className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg font-bold">
              <Link href="/services">VIEW FULL MENU</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Auto Glimpses Gallery */}
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
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <motion.div variants={fadeInUp} className="md:row-span-2">
                <div className="relative h-full min-h-[300px] md:min-h-full group overflow-hidden rounded-lg hover-lift">
                  <img src={galleryImage1} alt="Luxury car in showroom" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
              
              <motion.div variants={fadeInUp}>
                <div className="relative aspect-[4/3] group overflow-hidden rounded-lg hover-lift">
                  <img src={galleryImage2} alt="Car interior detailing" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="md:row-span-2">
                <div className="relative h-full min-h-[300px] md:min-h-full group overflow-hidden rounded-lg hover-lift">
                  <img src={galleryImage4} alt="Steam cleaning interior" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
              
              <motion.div variants={fadeInUp}>
                <div className="relative aspect-[4/3] group overflow-hidden rounded-lg hover-lift cursor-pointer">
                  <img src={galleryImage3} alt="SUV adventure" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform">
                      <Play size={28} className="text-white ml-1" fill="white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
         </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black relative">
        <div className="container px-4 mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          >
            <motion.div variants={fadeInLeft} className="space-y-8">
              <h2 className="text-5xl font-orbitron font-bold text-white">
                CONTACT US TO <br /><span className="text-primary">KNOW MORE.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                Ready to give your vehicle the treatment it deserves? Reach out to us for appointments, quotes, or any queries.
              </p>
              
              <div className="space-y-6 pt-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-wide mb-1">Visit Us</h4>
                    <p className="text-muted-foreground">Shop no. 16 & 17, Shreeji Parasio, Beside Tulsi Aangan Soc., Prasad Hotel Road, Badlapur, Maharashtra - 421503</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-wide mb-1">Call Us</h4>
                    <p className="text-muted-foreground">+91 92268 82024</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-wide mb-1">Email Us</h4>
                    <p className="text-muted-foreground">info@autogamma.in</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInRight}
              className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl backdrop-blur-sm hover-glow"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onContactSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-white/60 uppercase tracking-wider">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-black/50 border-white/10 focus:border-primary h-12 text-white" data-testid="input-contact-name" {...field} />
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
                          <FormLabel className="text-sm text-white/60 uppercase tracking-wider">Contact Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 98765 43210" className="bg-black/50 border-white/10 focus:border-primary h-12 text-white" data-testid="input-contact-phone" {...field} />
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
                        <FormLabel className="text-sm text-white/60 uppercase tracking-wider">Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" className="bg-black/50 border-white/10 focus:border-primary h-12 text-white" data-testid="input-contact-email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-white/60 uppercase tracking-wider">Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your vehicle..." className="bg-black/50 border-white/10 focus:border-primary min-h-[150px] text-white" data-testid="input-contact-message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 text-lg uppercase tracking-widest"
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
