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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Calendar, Check } from "lucide-react";
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
                features={[
                  "Tyre & Arches Cleaning",
                  "Foam Wash",
                  "All foot mats will be washed & vacuumed",
                  "All 4 Wheels / Alloys Cleaning",
                  "Laying paper mats"
                ]}
                carTypes={["Small Cars", "Hatch Back / Small Sedan", "Mid-size Sedans / Compact SUV"]}
                onBook={openBookingModal}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <ServiceItem 
                value="item-2"
                title="PREMIUM WASHING"
                price="₹600"
                description="Enhanced washing service including underbody and interior vacuum."
                features={[
                  "Underbody Wash Tyre & Arches Cleaning",
                  "All 4 Wheels / Alloys Cleaning",
                  "All Tyre Polishing",
                  "Exterior Plastic Parts Polishing",
                  "Foam Wash",
                  "All Foot mats will be washed & vacuumed",
                  "All 4 Doors & Dashboard Cleaned and Polished from inside",
                  "Full Car vacuumed including seats & boots",
                  "Laying paper mats"
                ]}
                carTypes={["Small Cars", "Hatch Back / Small Sedan", "Mid-size Sedans / Compact SUV"]}
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
                features={[
                  "Washing + Interior Vacuuming",
                  "Deep Cleaning the Interior Dash",
                  "Center Console & Door Panels",
                  "Interior Dressing (Glossy Finish / Satin Finish)",
                  "Roof Cleaning",
                  "Upholstery & Carpet Cleaning",
                  "AC Vents Cleaning",
                  "Seat belt & Boots Cleaning",
                  "Glass Cleaning from inside"
                ]}
                carTypes={["Small Cars", "Hatch Back / Small Sedan", "Mid-size Sedans / Compact SUV"]}
                onBook={openBookingModal}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <ServiceItem 
                value="item-4"
                title="INTERIOR STEAM CLEANING"
                price="₹3,500"
                description="The ultimate interior sanitation and detailing package."
                features={[
                  "Washing + Interior Cleaning + AC Duct Cleaning",
                  "Steam Cleaning",
                  "Sanitization of Car using steam",
                  "Leather Waxing"
                ]}
                carTypes={["Small Cars", "Hatch Back / Small Sedan", "Mid-size Sedans / Compact SUV"]}
                onBook={openBookingModal}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <ServiceItem 
                value="item-5"
                title="LEATHER TREATMENT"
                price="₹5,000"
                description="Restore and protect your premium leather interiors."
                features={[
                  "Washing",
                  "Interior Steam Cleaning",
                  "Leather Waxing and Conditioning"
                ]}
                carTypes={["Small Cars", "Hatch Back / Small Sedan", "Mid-size Sedans / Compact SUV"]}
                onBook={openBookingModal}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <ServiceItem 
                value="item-6"
                title="DETAILING"
                price="₹5,000"
                description="Paint correction and restoration for showroom shine."
                features={[
                  "Washing + Interior Cleaning + Decontamination Using Clay Mitt",
                  "Masking Multiple stages of compounding, Machine Compounding (rubbing)",
                  "Removal of hard water marks & mineral deposits from all edges"
                ]}
                carTypes={["Small Cars", "Hatch Back / Small Sedan", "Mid-size Sedans / Compact SUV"]}
                highlight
                onBook={openBookingModal}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <ServiceItem 
                value="item-7"
                title="PAINT SEALANT COATING (TEFLON)"
                price="₹5,500"
                description="Premium protection with 1 year warranty included."
                features={[
                  "Washing + Interior Cleaning + Detailing + Glazing and Swirl marks removal using D.A.",
                  "Polisher, Application of wax",
                  "Premium external glass cleaning & protection, Alloy protection",
                  "1 Year Warranty"
                ]}
                carTypes={["Small Cars", "Hatch Back / Small Sedan", "Mid-size Sedans / Compact SUV"]}
                warranty="1 Year Warranty"
                onBook={openBookingModal}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <ServiceItem 
                value="item-8"
                title="CERAMIC COATING"
                price="₹11,000"
                description="Ultimate protection with variants and 2-year warranty."
                features={[
                  "Washing + Interior Cleaning",
                  "Detailing + Paint Sealant Coating",
                  "Application of Ceramic Coating",
                  "1 Top up coat Free within a year"
                ]}
                variants={["9H", "MAFRA", "MENZA PRO", "KOCH CHEMIE"]}
                carTypes={["Small Cars", "Hatch Back / Small Sedan", "Mid-size Sedans / Compact SUV"]}
                warranty="2 Year Warranty - Made in India"
                highlight
                onBook={openBookingModal}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <ServiceItem 
                value="item-9"
                title="CORROSION TREATMENT"
                price="₹3,500"
                description="Protect your underbody from rust and corrosion."
                features={[
                  "Washing + Underbody Rubberized Coating",
                  "Silencer coating"
                ]}
                carTypes={["Small Cars", "Hatch Back / Small Sedan", "Mid-size Sedans / Compact SUV"]}
                onBook={openBookingModal}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <ServiceItem 
                value="item-10"
                title="WINDSHIELD COATING"
                price="₹2,500 - ₹5,000"
                description="Premium glass coating protection with water beading."
                features={[
                  "Washing + Machine Compounding (rubbing)",
                  "Application of Glass Coating"
                ]}
                carTypes={["Small Cars", "Hatch Back / Small Sedan", "Mid-size Sedans / Compact SUV", "All Glasses"]}
                onBook={openBookingModal}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <ServiceItem 
                value="item-11"
                title="SUN CONTROL FILM"
                price="₹5,200"
                description="Heat rejection film with multiple variants available."
                features={[
                  "Professional Installation",
                  "Premium Quality Film",
                  "Heat Rejection Technology"
                ]}
                variants={["Economy (Heat Rejection 20%-30%)", "Standard (Heat Rejection 30%-40%)", "Premium (Heat Rejection 40%-50%)", "Ceramic (Heat Rejection 50%-60%)"]}
                carTypes={["Small Cars", "Hatch Back / Small Sedan", "Mid-size Sedans / Compact SUV / MUV", "SUV / MPV"]}
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
  features: string[];
  carTypes: string[];
  variants?: string[];
  warranty?: string;
  highlight?: boolean;
  onBook: (serviceName: string) => void;
}

function ServiceItem({ value, title, price, description, features, carTypes, variants, warranty, highlight = false, onBook }: ServiceItemProps) {
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
        <div className="pt-4 border-t border-white/10 space-y-6">
          {/* Features Section */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Key Features:</h4>
            <ul className="space-y-2">
              {features.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Car Types Section */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Available For:</h4>
            <div className="flex flex-wrap gap-2">
              {carTypes.map((type: string, i: number) => (
                <Badge key={i} variant="outline" className="text-xs bg-primary/10 border-primary/30 text-primary">
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          {/* Variants Section */}
          {variants && variants.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Available Variants:</h4>
              <div className="flex flex-wrap gap-2">
                {variants.map((variant: string, i: number) => (
                  <Badge key={i} className="bg-white/10 text-white border-white/20 text-xs">
                    {variant}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Warranty Section */}
          {warranty && (
            <div className="bg-primary/10 border-l-4 border-primary px-4 py-2 rounded">
              <p className="text-sm text-primary font-semibold">{warranty}</p>
            </div>
          )}

          {/* Book Button */}
          <div>
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
