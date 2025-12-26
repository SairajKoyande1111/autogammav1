import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { servicesData } from "@/lib/services-data";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
} as const;

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
} as const;

export default function Services() {
  return (
    <div className="pt-24 pb-20 bg-background">
      {/* Hero Section */}
      <section className="container px-4 mx-auto mb-20 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-sora font-semibold text-white mb-6 uppercase"
          >
            DISCOVER THE <span className="text-primary">SERVICES</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-white font-medium max-w-2xl mx-auto font-sora">
            The essence of expert services! Choose from our comprehensive range of car care solutions tailored for your machine.
          </motion.p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="container px-4 mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {servicesData.map((service) => (
            <motion.div key={service.id} variants={fadeInUp}>
              <Link href={`/service/${service.slug}`}>
                <Card className={`h-full cursor-pointer transition-all duration-300 hover:border-primary/50 ${
                  service.highlight 
                    ? 'border-primary/50 bg-primary/5' 
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                } p-6 flex flex-col justify-between group`}
                data-testid={`card-service-${service.slug}`}
                >
                  {/* Highlight Badge */}
                  {service.highlight && (
                    <div className="mb-4">
                      <Badge className="bg-primary text-white text-xs font-semibold uppercase">Featured Service</Badge>
                    </div>
                  )}

                  {/* Title and Price */}
                  <div className="mb-6">
                    <h3 className={`text-2xl font-sora font-semibold mb-2 transition-colors uppercase ${
                      service.highlight ? 'text-primary' : 'text-white group-hover:text-primary'
                    }`}
                    data-testid={`text-service-title-${service.slug}`}
                    >
                      {service.title}
                    </h3>
                    <p className="text-white font-medium text-sm line-clamp-2 mb-4 font-sora">{service.description}</p>
                    <p className="text-3xl font-mono font-semibold text-primary">{service.pricing ? service.pricing[0].price : service.price}</p>
                  </div>

                  {/* Pricing Tiers Preview */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-1">
                      {service.pricing && service.pricing.slice(0, 2).map((tier, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-primary/10 border-primary/30 text-primary font-semibold">
                          {tier.carType}: {tier.price}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Features Preview */}
                  <div className="mb-6 flex-1">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2 font-sora">Key Features:</h4>
                    <ul className="text-xs text-white/80 space-y-1 font-sora">
                      {service.features.slice(0, 3).map((feature: string, i: number) => (
                        <li key={i} className="line-clamp-1 font-medium">• {feature}</li>
                      ))}
                      {service.features.length > 3 && (
                        <li className="text-primary text-xs font-semibold">+{service.features.length - 3} more features</li>
                      )}
                    </ul>
                  </div>

                  {/* Warranty Badge */}
                  {service.warranty && (
                    <div className="mb-4 px-3 py-2 bg-primary/20 border border-primary/30 rounded text-xs text-primary font-semibold text-center uppercase tracking-wide">
                      {service.warranty}
                    </div>
                  )}

                  {/* View Details Button */}
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold group/btn uppercase tracking-widest h-11"
                    data-testid={`button-view-service-${service.slug}`}
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 mx-auto max-w-4xl mt-24 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
        >
          <motion.h2 variants={fadeInUp} className="text-4xl font-sora font-semibold text-white mb-6 uppercase">
            Ready to Transform Your Car?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-white font-medium mb-8 font-sora">
            Choose any service above to view detailed information, pricing, and book your appointment today.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white font-semibold h-12 px-8 uppercase tracking-widest"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Book a Service
            </Button>
            <Link href="/contact">
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 h-12 px-8 uppercase tracking-widest font-semibold">
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
