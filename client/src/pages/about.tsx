import { motion } from "framer-motion";
import { CheckCircle2, Users, Car, Star, Trophy } from "lucide-react";
import heroImage from "@assets/generated_images/cinematic_luxury_dark_car_hero_background_with_red_accents.png";

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

      {/* Why Choose Us */}
      <section className="container px-4 mx-auto">
         <motion.h2 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-3xl font-orbitron font-bold text-center text-white mb-12"
         >
           WHY CHOOSE AUTO GAMMA
         </motion.h2>
         <motion.div 
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-50px" }}
           variants={stagger}
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
         >
            {[
              { title: "Pickup & Drop Off", desc: "Convenience at your doorstep" },
              { title: "Diverse Offerings", desc: "One stop solution for all needs" },
              { title: "Economical Choices", desc: "Premium quality, fair pricing" },
              { title: "Skilled Crew", desc: "Experts you can trust" },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={scaleIn}
                className="p-8 border border-white/10 rounded-lg bg-black hover:border-primary transition-colors text-center group hover-lift"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <Star size={20} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
         </motion.div>
      </section>
    </div>
  );
}
