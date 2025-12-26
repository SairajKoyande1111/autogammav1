import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ppfImage from "@assets/generated_images/paint_protection_film_application.png";
import ppfAppImage from "@assets/image_1766730418736.png";
import shieldIcon from "@assets/image_1766729201482.png";
import rupeeIcon from "@assets/image_1766729223515.png";
import toolsIcon from "@assets/image_1766729246340.png";
import starIcon from "@assets/image_1766729264056.png";

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
    <div className="pt-24 pb-20 bg-background min-h-screen">
      {/* Top Section / Hero */}
      <section className="container px-4 mx-auto mb-12 pt-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center mb-10"
        >
          <motion.p 
            variants={fadeInUp}
            className="text-gray-400 text-[10px] tracking-[0.3em] mb-3 uppercase font-poppins"
          >
            Protect Your Car, Preserve Its Shine!
          </motion.p>
          <motion.h1 
            variants={fadeInUp}
            className="text-3xl md:text-5xl lg:text-6xl font-poppins font-bold text-white leading-tight uppercase mb-2"
          >
            Guard Your Car's Paint With Our<br />
            Advanced
          </motion.h1>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl lg:text-6xl font-poppins font-bold text-primary leading-tight uppercase"
          >
            PPF Technology For A Perfect,<br />
            Glossy Finish
          </motion.h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-12 max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInLeft} className="relative group">
            <img 
              src={ppfAppImage} 
              alt="PPF Application" 
              className="relative w-full rounded-2xl shadow-xl max-h-[400px] object-cover"
            />
          </motion.div>
          
          <motion.div variants={fadeInRight} className="space-y-6">
            <div className="space-y-4">
              <p className="text-gray-400 text-base md:text-lg leading-relaxed font-poppins">
                Paint Protection Film (PPF) is a transparent, urethane film applied 
                to a vehicle's painted surface to protect it from scratches, chips, 
                and other forms of damage. This durable film acts as a sacrificial 
                layer, absorbing the impact of road debris, rocks, and other 
                environmental factors.
              </p>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed font-poppins">
                PPF not only preserves your vehicle's original paint but also enhances its appearance by adding a glossy, protective layer that creates a durable barrier between your vehicle's paint and the outside world.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="container px-4 mx-auto mb-32 pt-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p 
            variants={fadeInUp}
            className="text-gray-500 text-sm tracking-[0.2em] mb-2 font-poppins"
          >
            Benefits of Paint Protection Film
          </motion.p>
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-poppins font-bold text-white"
          >
            Ultimate Protection <span className="text-primary">for Your Vehicle</span>
          </motion.h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { 
              title: "Ultimate Protection", 
              desc: "Shield your vehicle's paint from scratches, chips, and other forms of damage caused by road debris, rocks, and harsh weather conditions.",
              icon: shieldIcon
            },
            { 
              title: "Preserving Resale Value", 
              desc: "Maintain your car's pristine appearance and increase its resale value by protecting its original paint finish.",
              icon: rupeeIcon
            },
            { 
              title: "Easy Maintenance", 
              desc: "Repel dirt, grime, and water, making cleaning and maintenance a breeze.",
              icon: toolsIcon
            },
            { 
              title: "Enhanced Aesthetics", 
              desc: "Enhance your vehicle's shine and gloss, giving it a showroom-quality finish that lasts.",
              icon: starIcon
            },
          ].map((benefit, i) => (
            <motion.div 
              key={i} 
              variants={scaleIn}
              className="bg-[#2a2a2a] border border-white/5 p-10 rounded-[2rem] flex flex-col items-center text-center group transition-all duration-300 hover:bg-[#333333]"
            >
              <div className="mb-8 p-6 bg-[#1a1a1a] rounded-2xl">
                <img src={benefit.icon} alt={benefit.title} className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-poppins uppercase tracking-wider leading-tight">{benefit.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Pricing Packages */}
      <section className="container px-4 mx-auto pb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-poppins font-bold text-center text-white mb-12 uppercase tracking-widest"
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
              <h3 className="text-2xl font-poppins font-bold text-primary uppercase tracking-widest">Elite Package</h3>
              <div className="h-[1px] bg-white/20 flex-grow"></div>
            </motion.div>

            <motion.div 
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
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
            <motion.div 
              variants={fadeInUp}
              className="border border-white/10 bg-[#111111] p-8 rounded-[1.5rem] relative overflow-hidden group hover:border-primary/50 transition-all hover-lift"
            >
               <h3 className="text-xl font-poppins font-bold text-white mb-6 text-center">GARWARE PLUS</h3>
               <div className="space-y-4">
                 <PriceRow label="Small Cars" price="₹62,000" />
                 <PriceRow label="Hatchback" price="₹65,000" />
                 <PriceRow label="Mid Sedans/SUV" price="₹65,000" />
                 <PriceRow label="Full SUV" price="₹85,000" />
               </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="border border-primary bg-white/5 p-8 rounded-[1.5rem] relative overflow-hidden shadow-[0_0_30px_rgba(255,0,0,0.1)] hover-glow"
            >
               <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1">POPULAR</div>
               <h3 className="text-xl font-poppins font-bold text-white mb-2 text-center">GARWARE PREMIUM</h3>
               <p className="text-center text-primary text-sm mb-6 font-bold">8 YEAR WARRANTY</p>
               <div className="space-y-4">
                 <PriceRow label="Small Cars" price="₹80,000" highlight />
                 <PriceRow label="Hatchback" price="₹85,000" highlight />
                 <PriceRow label="Mid Sedans" price="₹90,000" highlight />
                 <PriceRow label="SUV" price="₹95,000" highlight />
               </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="border border-white/10 bg-[#111111] p-8 rounded-[1.5rem] relative overflow-hidden group hover:border-primary/50 transition-all hover-lift"
            >
               <h3 className="text-xl font-poppins font-bold text-white mb-2 text-center">GARWARE MATT</h3>
               <p className="text-center text-muted-foreground text-sm mb-6 font-poppins">5 YEAR WARRANTY</p>
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
    <div className="bg-[#111111] rounded-[1.5rem] p-6 border border-white/5 hover:bg-[#1a1a1a] transition-all duration-300 hover-lift h-full flex flex-col">
      <h4 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-4 font-poppins uppercase tracking-wider">{title}</h4>
      <div className="space-y-4 flex-grow">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between items-center text-sm font-poppins">
            <span className="text-gray-400">{item.label}</span>
            <span className="font-bold text-white font-mono">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PriceRow({ label, price, highlight = false }: { label: string, price: string, highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0 font-poppins">
      <span className={`${highlight ? 'text-white font-medium' : 'text-gray-400'}`}>{label}</span>
      <span className={`font-bold font-mono ${highlight ? 'text-primary text-lg' : 'text-white'}`}>{price}</span>
    </div>
  );
}
