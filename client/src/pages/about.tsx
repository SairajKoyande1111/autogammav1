import { motion } from "framer-motion";
import { CheckCircle2, Users, Car, Star, Trophy } from "lucide-react";
import heroImage from "@assets/generated_images/cinematic_luxury_dark_car_hero_background_with_red_accents.png";
import galleryImage1 from "@assets/stock_images/luxury_car_in_dark_g_18d4fc70.jpg";
import detailingImage from "@assets/generated_images/car_detailing_polishing_action_shot.png";
import galleryImage2 from "@assets/stock_images/luxury_car_interior__d9a8634a.jpg";
import ppfImage from "@assets/generated_images/paint_protection_film_application.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
} as const;

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
} as const;

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
} as const;

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
} as const;

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
} as const;

const staggerFast = {
  visible: { transition: { staggerChildren: 0.05 } }
} as const;

export default function About() {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="container px-4 mx-auto mb-20">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center max-w-3xl mx-auto space-y-6"
        >
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-orbitron font-bold text-white">WHO WE ARE & <br/><span className="text-primary">WHAT WE DO</span></motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground">Crafting Excellence in Car Detailing and Services</motion.p>
          <motion.div variants={fadeInUp} className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>
      </section>

      {/* Content Split */}
      <section className="container px-4 mx-auto mb-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeInLeft} className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary rounded-tl-3xl z-0" />
            <div className="relative z-10 rounded-lg overflow-hidden border border-white/10 shadow-2xl hover-lift">
              <img src={heroImage} alt="About Auto Gamma" className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-primary rounded-br-3xl z-0" />
          </motion.div>

          <motion.div variants={fadeInRight} className="space-y-8">
            <h2 className="text-3xl font-orbitron font-bold text-white">First Professional Auto Detailing Studio in Badlapur</h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Auto Gamma is proud to be the pioneer of professional auto detailing in Badlapur. We offer specialized services for both cars and bikes, ensuring that every vehicle that enters our studio leaves with a showroom-like finish.
              </p>
              <p>
                Our mission is simple: to provide high-quality, budget-friendly detailing solutions without compromising on skill or materials. Our crew is highly trained, passionate, and dedicated to the art of automotive care.
              </p>
            </div>
            
            <motion.div 
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
            >
              {[
                "Cars & Bikes Service", "Budget Friendly", 
                "Highly Skilled Crew", "Premium Products"
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={scaleIn}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="text-primary shrink-0" />
                  <span className="text-white font-medium">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Counter */}
      <section className="py-20 bg-white/5 border-y border-white/10 mb-24">
        <div className="container px-4 mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { count: "650+", label: "Vehicles Detailed", icon: Car },
              { count: "900+", label: "Happy Customers", icon: Users },
              { count: "22+", label: "Associated Brands", icon: Star },
              { count: "10", label: "Skilled Crew Members", icon: Trophy },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                variants={scaleIn}
                className="space-y-2"
              >
                <div className="flex justify-center mb-4 text-primary opacity-50">
                  <stat.icon size={40} />
                </div>
                <h3 className="text-4xl md:text-5xl font-orbitron font-bold text-white">{stat.count}</h3>
                <p className="text-muted-foreground uppercase tracking-wider text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us - You, Your Vehicle & Auto Gamma Section */}
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
    </div>
  );
}
