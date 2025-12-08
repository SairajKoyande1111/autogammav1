import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { bookingFormSchema, type BookingFormData } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import detailingImage from "@assets/generated_images/car_detailing_polishing_action_shot.png";
import interiorImage from "@assets/generated_images/luxury_car_interior_leather_detailing.png";

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

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
} as const;

export default function Services() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const { toast } = useToast();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      date: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      const response = await apiRequest("POST", "/api/booking", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Submitted!",
        description: "We'll contact you shortly to confirm your appointment.",
      });
      form.reset();
      setBookingOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const openBookingModal = (serviceName: string) => {
    setSelectedService(serviceName);
    form.setValue("service", serviceName);
    setBookingOpen(true);
  };

  const onSubmit = (data: BookingFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="pt-24 pb-20">
      <section className="container px-4 mx-auto mb-20 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-orbitron font-bold text-white mb-6"
          >
            DISCOVER THE <span className="text-primary">SERVICES</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground">The essence of expert services tailored for your machine.</motion.p>
        </motion.div>
      </section>

      <section className="container px-4 mx-auto max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            
            <motion.div variants={fadeInUp}>
              <ServiceItem 
                value="item-1"
                title="FOAM WASHING"
                price="₹400"
                description="Complete exterior foam wash with attention to detail."
                includes={[
                  "Tyre & Arch Cleaning",
                  "Alloys Cleaning",
                  "Premium Foam Wash",
                  "Foot Mats Vacuum",
                  "Paper Mats Placed"
                ]}
                onBook={openBookingModal}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <ServiceItem 
                value="item-2"
                title="PREMIUM WASHING"
                price="₹600"
                description="Enhanced washing service including underbody and interior vacuum."
                includes={[
                  "Underbody Wash",
                  "Tyre Polish",
                  "Exterior Plastic Polish",
                  "All Mats Vacuum",
                  "Dashboard Cleaning",
                  "Full Interior Vacuum"
                ]}
                highlight
                onBook={openBookingModal}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <ServiceItem 
                value="item-3"
                title="INTERIOR CLEANING"
                price="₹2,500"
                description="Deep cleaning for a fresh, hygienic cabin."
                includes={[
                  "Deep Interior Vacuuming",
                  "Roof Cleaning",
                  "Upholstery Cleaning",
                  "Dashboard & Console Detailing",
                  "AC Vents Cleaning",
                  "Boot Space Cleaning"
                ]}
                onBook={openBookingModal}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <ServiceItem 
                value="item-4"
                title="INTERIOR STEAM CLEANING"
                price="₹3,500"
                description="The ultimate interior sanitation and detailing package."
                includes={[
                  "Full Steam Cleaning",
                  "Complete Sanitization",
                  "AC Duct Treatment",
                  "Leather Waxing & Conditioning",
                  "Stain Removal"
                ]}
                onBook={openBookingModal}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <ServiceItem 
                value="item-5"
                title="LEATHER TREATMENT"
                price="₹5,000"
                description="Restore and protect your premium leather interiors."
                includes={[
                  "Interior Steam Cleaning",
                  "Deep Leather Cleaning",
                  "Premium Leather Waxing",
                  "Leather Conditioning",
                  "UV Protection Application"
                ]}
                onBook={openBookingModal}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <ServiceItem 
                value="item-6"
                title="COMPLETE DETAILING"
                price="₹5,000"
                description="Paint correction and restoration for showroom shine."
                includes={[
                  "Multi-stage Compounding",
                  "Clay Bar Decontamination",
                  "Rubbing & Swirl Mark Removal",
                  "Glaze Application",
                  "Paint Sealant / Wax"
                ]}
                highlight
                onBook={openBookingModal}
              />
            </motion.div>

          </Accordion>
        </motion.div>
      </section>

      <section className="container px-4 mx-auto mt-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div variants={fadeInLeft} className="rounded-xl overflow-hidden border border-white/10 h-80 relative group hover-lift">
            <img src={detailingImage} alt="Detailing" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-6 left-6">
               <h3 className="text-2xl font-orbitron font-bold text-white">Exterior Perfection</h3>
            </div>
          </motion.div>
          <motion.div variants={fadeInRight} className="rounded-xl overflow-hidden border border-white/10 h-80 relative group hover-lift">
            <img src={interiorImage} alt="Interior" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
             <div className="absolute bottom-6 left-6">
               <h3 className="text-2xl font-orbitron font-bold text-white">Interior Hygiene</h3>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-[500px] bg-black/95 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-orbitron text-white">
              Book <span className="text-primary">{selectedService}</span>
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" className="bg-white/5 border-white/10" data-testid="input-booking-name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 00000 00000" className="bg-white/5 border-white/10" data-testid="input-booking-phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@domain.com" className="bg-white/5 border-white/10" data-testid="input-booking-email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service</FormLabel>
                    <FormControl>
                      <Input readOnly className="bg-white/10 border-white/10 text-primary font-medium" data-testid="input-booking-service" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Date</FormLabel>
                    <FormControl>
                      <Input type="date" className="bg-white/5 border-white/10" data-testid="input-booking-date" {...field} />
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
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any specific requirements..." className="bg-white/5 border-white/10 min-h-[80px]" data-testid="input-booking-message" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 uppercase tracking-widest"
                data-testid="button-submit-booking"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <Calendar className="mr-2 h-5 w-5" /> Confirm Booking
                  </>
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface ServiceItemProps {
  value: string;
  title: string;
  price: string;
  description: string;
  includes: string[];
  highlight?: boolean;
  onBook: (serviceName: string) => void;
}

function ServiceItem({ value, title, price, description, includes, highlight = false, onBook }: ServiceItemProps) {
  return (
    <AccordionItem value={value} className={`border ${highlight ? 'border-primary/50 bg-primary/5' : 'border-white/10 bg-white/5'} rounded-lg px-6 overflow-hidden transition-all duration-300 hover:border-primary/30`}>
      <AccordionTrigger className="hover:no-underline py-6">
        <div className="flex justify-between items-center w-full pr-4">
          <div className="text-left">
            <h3 className={`text-xl md:text-2xl font-orbitron font-bold ${highlight ? 'text-primary' : 'text-white'}`}>{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          <span className="text-xl md:text-2xl font-mono font-bold text-white whitespace-nowrap ml-4">{price}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-6">
        <div className="pt-4 border-t border-white/10">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Includes:</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {includes.map((item: string, i: number) => (
              <li key={i} className="flex items-center gap-2 text-muted-foreground">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6">
             <Button 
               onClick={() => onBook(title)} 
               className="bg-white text-black hover:bg-gray-200 font-bold w-full sm:w-auto"
               data-testid={`button-book-${value}`}
             >
               Book This Service
             </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
