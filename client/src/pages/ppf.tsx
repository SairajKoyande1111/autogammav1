import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ppfImage from "@assets/generated_images/paint_protection_film_application.png";
import shieldIcon from "@assets/generated_images/3d_red_shield_protection_icon.png";
import dollarIcon from "@assets/generated_images/3d_red_dollar_value_icon.png";
import sparkleIcon from "@assets/generated_images/3d_red_sparkle_aesthetics_icon.png";
import clockIcon from "@assets/generated_images/3d_red_clock_maintenance_icon.png";

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
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
} as const;

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
} as const;

export default function PPF() {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden mb-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/70 z-10" />
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: `url(${ppfImage})` }} 
          />
        </div>
        <div className="container relative z-20 px-4 text-center max-w-4xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-6"
            >
              PROTECT YOUR CAR,<br/> PRESERVE ITS <span className="text-primary">SHINE!</span>
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300"
            >
              Guard Your Car's Paint with Our Advanced PPF Technology
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="container px-4 mx-auto mb-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-16"
        >
          <motion.div variants={fadeInLeft} className="space-y-6">
            <h2 className="text-3xl font-orbitron font-bold text-white">What is PPF?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Paint Protection Film (PPF) is a transparent urethane film applied to the painted surfaces of a new or used car in order to protect the paint from stone chips, bug splatters, and minor abrasions. This film is also used on airplanes, RVs, cell phones, electronics, screens, motorcycles and many other areas.
            </p>
            <ul className="space-y-3 mt-4">
              {[
                "Transparent urethane film",
                "Protects from debris, chips, scratches",
                "Significant gloss enhancement",
                "Acts as sacrificial protection layer"
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-white"
                >
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
             {[
               { img: shieldIcon, title: "Ultimate Protection", desc: "Best defense against road debris." },
               { img: dollarIcon, title: "Resale Value", desc: "Keeps your paint looking brand new." },
               { img: sparkleIcon, title: "Enhanced Aesthetics", desc: "Adds a deep, glossy wet-look finish." },
               { img: clockIcon, title: "Easy Maintenance", desc: "Hydrophobic properties make washing easy." },
             ].map((benefit, i) => (
               <motion.div 
                 key={i} 
                 variants={scaleIn}
                 className="bg-white/5 border border-white/10 p-6 rounded-lg hover:border-primary/50 transition-colors hover-lift"
               >
                 <img src={benefit.img} alt={benefit.title} className="w-16 h-16 object-contain mb-4" />
                 <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                 <p className="text-sm text-muted-foreground">{benefit.desc}</p>
               </motion.div>
             ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Pricing Packages */}
      <section className="container px-4 mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-orbitron font-bold text-center text-white mb-12"
        >
          PPF PACKAGES & PRICING
        </motion.h2>
        
        <div className="space-y-16">
          
          {/* Elite Package */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="space-y-6"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-8">
              <div className="h-[1px] bg-white/20 flex-grow"></div>
              <h3 className="text-2xl font-orbitron font-bold text-primary uppercase tracking-widest">Elite Package</h3>
              <div className="h-[1px] bg-white/20 flex-grow"></div>
            </motion.div>

            <motion.div 
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {/* Small Cars */}
              <motion.div variants={scaleIn}>
                <PricingCard 
                  title="Small Cars" 
                  items={[
                    { label: "TPU 5 Years", price: "₹55,000" },
                    { label: "TPU 5 Years Matt", price: "₹60,000" },
                    { label: "TPU 7 Years", price: "₹80,000" },
                    { label: "TPU 10 Years", price: "₹95,000" },
                  ]} 
                />
              </motion.div>
              
              {/* Hatchback */}
              <motion.div variants={scaleIn}>
                <PricingCard 
                  title="Hatchback / Sedan" 
                  items={[
                    { label: "TPU 5 Years", price: "₹60,000" },
                    { label: "Matt", price: "₹70,000" },
                    { label: "7 Years", price: "₹85,000" },
                    { label: "10 Years", price: "₹1,05,000" },
                  ]} 
                />
              </motion.div>

              {/* Mid Sedan */}
              <motion.div variants={scaleIn}>
                <PricingCard 
                  title="Mid Sedan / Compact SUV" 
                  items={[
                    { label: "5 Years", price: "₹70,000" },
                    { label: "Matt", price: "₹75,000" },
                    { label: "7 Years", price: "₹90,000" },
                    { label: "10 Years", price: "₹1,12,000" },
                  ]} 
                />
              </motion.div>

              {/* SUV */}
              <motion.div variants={scaleIn}>
                <PricingCard 
                  title="SUV / MPV" 
                  items={[
                    { label: "5 Years", price: "₹80,000" },
                    { label: "Matt", price: "₹85,000" },
                    { label: "7 Years", price: "₹95,000" },
                    { label: "10 Years", price: "₹1,20,000" },
                  ]} 
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Garware Packages Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Plus Package */}
            <motion.div 
              variants={fadeInUp}
              className="border border-white/10 bg-black p-8 rounded-xl relative overflow-hidden group hover:border-primary/50 transition-all hover-lift"
            >
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
               <h3 className="text-xl font-orbitron font-bold text-white mb-6 text-center">GARWARE PLUS</h3>
               <div className="space-y-4">
                 <PriceRow label="Small Cars" price="₹62,000" />
                 <PriceRow label="Hatchback" price="₹65,000" />
                 <PriceRow label="Mid Sedans/SUV" price="₹65,000" />
                 <PriceRow label="Full SUV" price="₹85,000" />
               </div>
            </motion.div>

            {/* Premium Package */}
            <motion.div 
              variants={fadeInUp}
              className="border border-primary bg-white/5 p-8 rounded-xl relative overflow-hidden transform lg:-translate-y-4 shadow-[0_0_30px_rgba(255,0,0,0.1)] hover-glow"
            >
               <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1">POPULAR</div>
               <h3 className="text-xl font-orbitron font-bold text-white mb-2 text-center">GARWARE PREMIUM</h3>
               <p className="text-center text-primary text-sm mb-6 font-bold">8 YEAR WARRANTY</p>
               <div className="space-y-4">
                 <PriceRow label="Small Cars" price="₹80,000" highlight />
                 <PriceRow label="Hatchback" price="₹85,000" highlight />
                 <PriceRow label="Mid Sedans" price="₹90,000" highlight />
                 <PriceRow label="SUV" price="₹95,000" highlight />
               </div>
            </motion.div>

            {/* Matt Package */}
            <motion.div 
              variants={fadeInUp}
              className="border border-white/10 bg-black p-8 rounded-xl relative overflow-hidden group hover:border-primary/50 transition-all hover-lift"
            >
               <h3 className="text-xl font-orbitron font-bold text-white mb-2 text-center">GARWARE MATT</h3>
               <p className="text-center text-muted-foreground text-sm mb-6">5 YEAR WARRANTY</p>
               <div className="space-y-4">
                 <PriceRow label="Small Cars" price="₹1,05,000" />
                 <PriceRow label="Hatchback" price="₹1,10,000" />
                 <PriceRow label="Mid Sedans" price="₹1,15,000" />
                 <PriceRow label="SUV" price="₹1,20,000" />
               </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function PricingCard({ title, items }: { title: string, items: {label: string, price: string}[] }) {
  return (
    <div className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors hover-lift">
      <h4 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">{title}</h4>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">{item.label}</span>
            <span className="font-bold text-white font-mono">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PriceRow({ label, price, highlight = false }: { label: string, price: string, highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
      <span className={`${highlight ? 'text-white' : 'text-muted-foreground'}`}>{label}</span>
      <span className={`font-bold font-mono ${highlight ? 'text-primary text-lg' : 'text-white'}`}>{price}</span>
    </div>
  );
}
