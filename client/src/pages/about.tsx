import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Trophy, Users, Car, Star, CheckCircle2,
  Target, Eye
} from "lucide-react";
import heroImage from "@assets/generated_images/cinematic_luxury_dark_car_hero_background_with_red_accents.png";
import galleryImage1 from "@assets/stock_images/luxury_car_in_dark_g_18d4fc70.jpg";
import detailingImage from "@assets/generated_images/car_detailing_polishing_action_shot.png";
import galleryImage2 from "@assets/stock_images/luxury_car_interior__d9a8634a.jpg";
import ppfImage from "@assets/generated_images/paint_protection_film_application.png";
import interiorImage from "@assets/generated_images/luxury_car_interior_leather_detailing.png";
import autoGammaLogo from "@assets/image_1765169951823.png";
import { Link } from "wouter";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
} as const;

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
} as const;

const staggerFast = {
  visible: { transition: { staggerChildren: 0.06 } },
} as const;

// ── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  return (
    <div className="w-full overflow-x-hidden bg-background min-h-screen">

      {/* ── Hero Section ── */}
      <section className="relative w-full min-h-[65vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Auto Gamma Studio"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
        </div>

        <div className="relative z-10 w-full container px-4 mx-auto pb-20 pt-40">
          <div className="flex items-end justify-between gap-8">
            {/* Left: Text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-2xl"
            >
              <motion.div variants={fadeInUp} className="mb-5">
                <img
                  src={autoGammaLogo}
                  alt="Auto Gamma"
                  className="h-16 md:h-20 w-auto object-contain"
                />
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold text-white font-sora uppercase tracking-wider leading-none mb-6"
              >
                AUTO GAMMA
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-white max-w-xl font-poppins text-lg md:text-xl leading-relaxed"
              >
                Badlapur's first and most trusted professional automotive detailing studio where precision meets passion and every vehicle leaves transformed.
              </motion.p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="py-14 border-y border-white/10" style={{ backgroundColor: "#0f0f0f" }}>
        <div className="container px-4 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { target: 650, suffix: "+", label: "Vehicles Detailed", icon: Car },
              { target: 900, suffix: "+", label: "Happy Customers", icon: Users },
              { target: 22, suffix: "+", label: "Brand Partners", icon: Star },
              { target: 10, suffix: "+", label: "Expert Crew", icon: Trophy },
            ].map((stat, i) => (
              <motion.div key={i} variants={scaleIn} className="space-y-3">
                <div className="flex justify-center text-primary">
                  <stat.icon size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-white font-sora">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </h3>
                <p className="text-white/50 font-poppins uppercase tracking-widest text-xs">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start"
          >
            {/* Left: Image + Bullets */}
            <motion.div variants={fadeInLeft} className="flex flex-col gap-6">
              {/* Image */}
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-primary" />
                <div className="relative overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    src={galleryImage1}
                    alt="Auto Gamma Workshop"
                    className="w-full h-72 md:h-96 object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-primary" />
                <div className="absolute bottom-6 left-6 bg-primary px-4 py-2">
                  <p className="text-white font-sora font-bold text-xs uppercase tracking-wider">Est. Badlapur</p>
                  <p className="text-white/80 font-poppins text-xs mt-0.5">Pioneer in Auto Detailing</p>
                </div>
              </div>

              {/* 6 Bullet Points below image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Cars & Bikes Specialists",
                  "Premium-Grade Products",
                  "Budget-Friendly Pricing",
                  "Skilled & Certified Crew",
                  "Free Pickup & Drop-off",
                  "50+ Specialized Services",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3">
                    <CheckCircle2 className="text-primary shrink-0" size={16} />
                    <span className="text-white font-poppins text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Text */}
            <motion.div variants={fadeInRight} className="space-y-6">
              <div>
                <p className="text-primary font-poppins text-sm font-bold tracking-[0.3em] uppercase mb-3">
                  Our Story
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-sora uppercase tracking-wider leading-tight mb-5">
                  BADLAPUR'S <span className="text-primary">FIRST PROFESSIONAL</span> AUTO DETAILING STUDIO
                </h2>
              </div>

              <div className="space-y-4 text-white font-poppins text-base leading-relaxed">
                <p>
                  Auto Gamma was founded with a singular vision to bring world-class automotive care to Badlapur. As the region's first dedicated professional detailing studio, we set the benchmark for quality, precision, and customer trust from day one.
                </p>
                <p>
                  We specialize in a comprehensive range of services covering both cars and bikes. From paint protection films and ceramic coatings to interior steam cleaning and body wraps, every service is executed with premium-grade products and razor-sharp attention to detail.
                </p>
                <p>
                  Our highly skilled crew brings passion and expertise to every vehicle that enters our studio. We believe in delivering showroom-grade results at prices that respect your budget, because excellence should never be exclusive.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-24 bg-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container px-4 mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16 space-y-4"
          >
            <motion.p variants={fadeInUp} className="text-primary font-poppins text-sm font-bold tracking-[0.3em] uppercase">
              Our Purpose
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-sora uppercase tracking-wider">
              MISSION &amp; <span className="text-primary">VISION</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Mission */}
            <motion.div variants={fadeInLeft} className="group relative overflow-hidden border border-white/10 hover:border-primary/60 transition-all duration-500 hover-lift">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-10">
                {/* Icon */}
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 bg-primary flex items-center justify-center flex-shrink-0">
                    <Target className="text-white" size={30} />
                  </div>
                  <div>
                    <p className="text-primary font-poppins text-xs font-bold tracking-[0.25em] uppercase mb-1">Our Mission</p>
                    <h3 className="text-xl font-sora font-bold text-white uppercase tracking-wide">
                      Excellence Without Compromise
                    </h3>
                  </div>
                </div>
                <p className="text-white font-poppins text-base leading-relaxed mb-6">
                  To deliver unmatched automotive care with industry-leading products, trained professionals, and a customer-first approach — ensuring every vehicle we touch reflects our commitment to perfection.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {["Premium Products", "Expert Technicians", "Customer First", "Zero Shortcuts"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-white/70 font-poppins text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>

            {/* Vision */}
            <motion.div variants={fadeInRight} className="group relative overflow-hidden border border-white/10 hover:border-primary/60 transition-all duration-500 hover-lift">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-10">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 bg-primary flex items-center justify-center flex-shrink-0">
                    <Eye className="text-white" size={30} />
                  </div>
                  <div>
                    <p className="text-primary font-poppins text-xs font-bold tracking-[0.25em] uppercase mb-1">Our Vision</p>
                    <h3 className="text-xl font-sora font-bold text-white uppercase tracking-wide">
                      Setting the Regional Standard
                    </h3>
                  </div>
                </div>
                <p className="text-white font-poppins text-base leading-relaxed mb-6">
                  To be the most respected and sought-after automotive detailing brand in the Badlapur-Kalyan-Thane region — recognized for our integrity, technical expertise, and transformational results.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {["Regional Leader", "Trusted Brand", "Innovation Driven", "Community Rooted"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-white/70 font-poppins text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-28 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="container px-4 mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16 space-y-4"
          >
            <motion.p variants={fadeInUp} className="text-primary font-poppins text-sm font-bold tracking-[0.3em] uppercase">
              Why Auto Gamma
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-sora uppercase tracking-wider">
              YOU, YOUR VEHICLE &amp; <span className="text-primary">AUTO GAMMA</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-sm sm:text-base md:text-lg text-white max-w-2xl mx-auto font-poppins">
              We go beyond detailing — an experience built on trust, skill, and relentless dedication to your vehicle.
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
              { title: "Free Pickup & Drop", img: galleryImage1, highlight: "DOORSTEP SERVICE", description: "We come to you. Free doorstep pickup and delivery so your schedule stays uninterrupted." },
              { title: "50+ Services", img: detailingImage, highlight: "DIVERSE EXPERTISE", description: "From ceramic coatings to mechanical work — one studio, every solution your vehicle needs." },
              { title: "Best Value Pricing", img: galleryImage2, highlight: "NO COMPROMISE", description: "Premium quality at prices that make sense. World-class care that is accessible to all." },
              { title: "Expert Crew", img: ppfImage, highlight: "10+ YRS EXPERIENCE", description: "A trained, passionate team that treats every vehicle with the precision of a craftsman." },
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <div className="group block h-[380px] relative overflow-hidden border border-white/10 cursor-pointer hover-lift">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${feature.img})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-poppins font-bold tracking-wider text-white bg-primary px-3 py-1.5">{feature.highlight}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-base font-sora font-semibold text-white mb-2 group-hover:text-primary transition-colors whitespace-nowrap">{feature.title}</h3>
                    <div className="w-12 h-1 bg-primary mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <p className="text-sm font-poppins text-white/80">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Our Process ── */}
      <section className="py-24 bg-neutral-900 relative overflow-hidden">
        <div className="container px-4 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16 space-y-4"
          >
            <motion.p variants={fadeInUp} className="text-primary font-poppins text-sm font-bold tracking-[0.3em] uppercase">
              How It Works
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-sora uppercase tracking-wider">
              OUR <span className="text-primary">PROCESS</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-sm sm:text-base md:text-lg text-white max-w-2xl mx-auto font-poppins">
              A streamlined, transparent approach designed to give you complete confidence from booking to delivery.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Book Your Slot", desc: "Choose your service and schedule a convenient time. We offer flexible slots including weekends." },
              { step: "02", title: "Pickup or Drop-in", desc: "We collect your vehicle from your location for free, or drive it directly to our studio." },
              { step: "03", title: "Expert Treatment", desc: "Our skilled technicians apply the finest products with precision techniques tailored to your vehicle." },
              { step: "04", title: "Delivered to You", desc: "Your vehicle is returned spotless, transformed, and ready to turn heads — right to your doorstep." },
            ].map(({ step, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
                className="group relative bg-white/5 border border-white/10 p-8 hover:border-primary/50 transition-all duration-300 hover-lift"
              >
                <div className="absolute top-0 left-0 w-full h-0.5 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="text-7xl font-bold text-white/5 font-sora group-hover:text-primary/15 transition-colors leading-none mb-6 select-none">
                  {step}
                </p>
                <h3 className="text-lg font-sora font-semibold text-white uppercase tracking-wide mb-3">{title}</h3>
                <p className="text-white font-poppins text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-28 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-transparent pointer-events-none" />
        <div className="container px-4 mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16 space-y-4"
          >
            <motion.p variants={fadeInUp} className="text-primary font-poppins text-sm font-bold tracking-[0.3em] uppercase">
              What Drives Us
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-sora uppercase tracking-wider">
              OUR CORE <span className="text-primary">VALUES</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { title: "INTEGRITY", desc: "Honest pricing, genuine products, and transparent communication. We never cut corners on service or relationships." },
              { title: "PRECISION", desc: "Every detail matters. Our technicians follow meticulous processes to deliver flawless results, every single time." },
              { title: "EXCELLENCE", desc: "We hold ourselves to the highest standards, using only premium products and proven techniques for lasting results." },
              { title: "CUSTOMER FIRST", desc: "Your satisfaction is our benchmark. From the first call to final delivery, your experience is our top priority." },
              { title: "PASSION", desc: "We love cars as much as you do. That genuine passion drives the quality and care we pour into every vehicle." },
              { title: "INNOVATION", desc: "We stay ahead with the latest techniques, products, and technologies to offer solutions that set new standards." },
            ].map(({ title, desc }, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="group relative overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 hover-lift"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-8">
                  <h3 className="text-xl font-sora font-semibold text-white uppercase tracking-wide mb-3">{title}</h3>
                  <div className="w-full h-0.5 bg-primary mb-4" />
                  <p className="text-white font-poppins text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={interiorImage} alt="Premium Detailing" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        </div>

        <div className="relative z-10 container px-4 mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="max-w-3xl mx-auto space-y-8"
          >
            <motion.p variants={fadeInUp} className="text-primary font-poppins text-sm font-bold tracking-[0.3em] uppercase">
              Ready to Transform Your Vehicle?
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-sora uppercase tracking-wider leading-tight">
              LET'S GIVE YOUR CAR THE <span className="text-primary">TREATMENT IT DESERVES</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-sm sm:text-base md:text-lg text-white max-w-2xl mx-auto font-poppins">
              Book a service today and experience the Auto Gamma difference — professional, precise, and unparalleled.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <button className="bg-primary text-white font-poppins font-bold h-11 text-base uppercase tracking-widest px-10 -skew-x-6 hover:bg-primary/90 transition-colors">
                  <span className="skew-x-6 inline-block">Explore Services</span>
                </button>
              </Link>
              <Link href="/#contact">
                <button className="border border-white/30 text-white font-poppins font-bold h-11 text-base uppercase tracking-widest px-10 -skew-x-6 hover:border-primary hover:text-primary transition-colors">
                  <span className="skew-x-6 inline-block">Contact Us</span>
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
