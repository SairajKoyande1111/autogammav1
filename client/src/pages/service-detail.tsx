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
    <div className="pt-24 pb-20 bg-black">
      {/* Hero Section */}
      <section className="container px-4 mx-auto mb-16 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-8xl font-sora font-bold text-white mb-8 tracking-tight"
          >
            {service.title}
          </motion.h1>
          
          {/* Main Image */}
          <motion.div 
            variants={fadeInUp}
            className="relative rounded-2xl overflow-hidden mb-12 border border-white/10 aspect-[21/9] shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2071&auto=format&fit=crop" 
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>

          <motion.p variants={fadeInUp} className="text-2xl text-white/80 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            {service.description}
          </motion.p>
          
          <motion.div variants={fadeInUp}>
            <Button 
              onClick={() => setBookingOpen(true)}
              className="bg-white hover:bg-white/90 text-black font-bold h-14 px-10 rounded-full text-lg transition-transform hover:scale-105 active:scale-95 shadow-xl"
              data-testid="button-book-service"
            >
              <Calendar className="mr-2 h-6 w-6" />
              BOOK YOUR SLOT
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits & Features Grid */}
      <section className="container px-4 mx-auto max-w-6xl mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Features - Modern Minimal Card */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 shadow-inner"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-8">
              <span className="text-white text-xs font-bold tracking-widest uppercase">PREMIUM BENEFITS</span>
            </div>
            <h2 className="text-3xl font-sora font-semibold text-white mb-8">What's Included</h2>
            <ul className="grid grid-cols-1 gap-6">
              {service.features.map((feature: string, i: number) => (
                <li key={i} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-white/90 text-lg font-medium tracking-wide">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Pricing - Elevated Glassmorphism */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            className="relative"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">
              <h3 className="text-3xl font-sora font-semibold text-white mb-10 text-center">Transparent Pricing</h3>
              
              {service.pricing && service.pricing.length > 0 ? (
                <div className="space-y-4">
                  {service.pricing.map((tier, i) => (
                    <div 
                      key={i}
                      className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                      data-testid={`pricing-tier-${i}`}
                    >
                      <span className="text-white/80 font-medium group-hover:text-white transition-colors">{tier.carType}</span>
                      <span className="text-3xl font-bold text-white font-sora">{tier.price}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 bg-white/10 border border-white/20 rounded-2xl text-center">
                  <p className="text-4xl font-bold text-white">{displayPrice}</p>
                </div>
              )}

              {/* Extras Section */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex flex-col gap-6">
                  {service.warranty && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-white/50 font-bold tracking-widest uppercase">WARRANTY</p>
                        <p className="text-white font-semibold">{service.warranty}</p>
                      </div>
                    </div>
                  )}
                  
                  {service.variants && service.variants.length > 0 && (
                    <div>
                      <p className="text-xs text-white/50 font-bold tracking-widest uppercase mb-3">AVAILABLE VARIANTS</p>
                      <div className="flex flex-wrap gap-2">
                        {service.variants.map((variant: string, i: number) => (
                          <Badge key={i} className="bg-white/10 text-white hover:bg-white hover:text-black border-none px-4 py-1.5 rounded-full transition-colors">
                            {variant}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="container px-4 mx-auto max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="bg-gradient-to-r from-zinc-900 to-black rounded-[2rem] p-12 text-center border border-white/10"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl font-sora font-bold text-white mb-6">
            Ready for a Showroom Shine?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-white/60 mb-10 max-w-xl mx-auto">
            Book your professional foam wash today and give your vehicle the care it deserves.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              onClick={() => setBookingOpen(true)}
              className="bg-white text-black hover:bg-zinc-200 font-bold h-14 px-12 rounded-full text-lg"
            >
              BOOK NOW
            </Button>
            <Link href="/services">
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 h-14 px-12 rounded-full font-bold text-lg">
                EXPLORE ALL
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-[500px] bg-black/95 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-sora font-semibold text-white uppercase">
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
                    <FormLabel className="text-white font-medium">Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" className="bg-white/5 border-white/10 text-white" data-testid="input-booking-name" {...field} />
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
                      <FormLabel className="text-white font-medium">Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 00000 00000" className="bg-white/5 border-white/10 text-white" data-testid="input-booking-phone" {...field} />
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
                      <FormLabel className="text-white font-medium">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@domain.com" className="bg-white/5 border-white/10 text-white" data-testid="input-booking-email" {...field} />
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
                    <FormLabel className="text-white font-medium">Preferred Date</FormLabel>
                    <FormControl>
                      <Input type="date" className="bg-white/5 border-white/10 text-white" data-testid="input-booking-date" {...field} />
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
                    <FormLabel className="text-white font-medium">Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any specific requirements..." className="bg-white/5 border-white/10 min-h-[80px] text-white" data-testid="input-booking-message" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-12 uppercase tracking-widest"
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
