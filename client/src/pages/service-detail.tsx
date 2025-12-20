import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
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
import { Loader2, Calendar, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { bookingFormSchema, type BookingFormData } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { getServiceBySlug } from "@/lib/services-data";

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

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug || "");
  const [bookingOpen, setBookingOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: service?.title || "",
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

  const onSubmit = (data: BookingFormData) => {
    mutation.mutate(data);
  };

  if (!service) {
    return (
      <div className="pt-24 pb-20">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
          <Link href="/services">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Back to Services
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get the lowest price for the header
  const displayPrice = service.pricing 
    ? service.pricing[0].price 
    : service.price;

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="container px-4 mx-auto mb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-5xl"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-orbitron font-bold text-white mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {service.title}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-6">
            {service.description}
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Button 
              onClick={() => setBookingOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white font-bold h-12 px-8 uppercase tracking-widest"
              data-testid="button-book-service"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Now
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Content Grid - Features and Pricing */}
      <section className="container px-4 mx-auto max-w-5xl mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Features */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInLeft}
          >
            <div className="bg-white/5 border border-white/10 rounded-lg p-8 h-full">
              <h2 className="text-2xl font-orbitron font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>KEY FEATURES</h2>
              <ul className="space-y-4">
                {service.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground text-base" style={{ fontFamily: 'Poppins, sans-serif' }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Column - Pricing Tiers */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInRight}
            className="space-y-4"
          >
            <div className="bg-white/5 border border-white/10 rounded-lg p-8">
              <h3 className="text-2xl font-orbitron font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>PRICING BY CAR TYPE</h3>
              
              {service.pricing && service.pricing.length > 0 ? (
                <div className="space-y-3">
                  {service.pricing.map((tier, i) => (
                    <div 
                      key={i}
                      className="flex items-center justify-between p-4 bg-primary/10 border border-primary/30 rounded-md hover:bg-primary/20 transition-colors"
                      data-testid={`pricing-tier-${i}`}
                    >
                      <span className="text-muted-foreground font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>{tier.carType}</span>
                      <span className="text-2xl font-bold text-primary" style={{ fontFamily: 'Poppins, sans-serif' }}>{tier.price}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-primary/10 border border-primary/30 rounded-md">
                  <p className="text-2xl font-bold text-primary" style={{ fontFamily: 'Poppins, sans-serif' }}>{displayPrice}</p>
                </div>
              )}
            </div>

            {/* Warranty */}
            {service.warranty && (
              <div className="bg-primary/20 border-2 border-primary rounded-lg p-6">
                <h3 className="text-lg font-orbitron font-bold text-primary mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>WARRANTY</h3>
                <p className="text-white font-semibold text-base" style={{ fontFamily: 'Poppins, sans-serif' }}>{service.warranty}</p>
              </div>
            )}

            {/* Variants */}
            {service.variants && service.variants.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-orbitron font-bold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>VARIANTS</h3>
                <div className="flex flex-wrap gap-2">
                  {service.variants.map((variant: string, i: number) => (
                    <Badge key={i} className="bg-primary text-white text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {variant}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 mx-auto max-w-5xl text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-orbitron font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Ready to Book This Service?
          </motion.h2>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setBookingOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white font-bold h-12 px-8 uppercase tracking-widest"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Now
            </Button>
            <Link href="/services">
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 h-12 px-8 uppercase tracking-widest">
                View All Services
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-[500px] bg-black/95 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-orbitron text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Book <span className="text-primary">{service.title}</span>
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{ fontFamily: 'Poppins, sans-serif' }}>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" className="bg-white/5 border-white/10" style={{ fontFamily: 'Poppins, sans-serif' }} data-testid="input-booking-name" {...field} />
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
                      <FormLabel style={{ fontFamily: 'Poppins, sans-serif' }}>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 00000 00000" className="bg-white/5 border-white/10" style={{ fontFamily: 'Poppins, sans-serif' }} data-testid="input-booking-phone" {...field} />
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
                      <FormLabel style={{ fontFamily: 'Poppins, sans-serif' }}>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@domain.com" className="bg-white/5 border-white/10" style={{ fontFamily: 'Poppins, sans-serif' }} data-testid="input-booking-email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{ fontFamily: 'Poppins, sans-serif' }}>Preferred Date</FormLabel>
                    <FormControl>
                      <Input type="date" className="bg-white/5 border-white/10" style={{ fontFamily: 'Poppins, sans-serif' }} data-testid="input-booking-date" {...field} />
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
                    <FormLabel style={{ fontFamily: 'Poppins, sans-serif' }}>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any specific requirements..." className="bg-white/5 border-white/10 min-h-[80px]" style={{ fontFamily: 'Poppins, sans-serif' }} data-testid="input-booking-message" {...field} />
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
