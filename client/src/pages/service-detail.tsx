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
    <div className="pt-24 pb-12 bg-black min-h-screen flex flex-col items-center justify-center">
      <section className="container px-4 mx-auto max-w-7xl">
        {/* Main Content Area - 3 Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch mb-8">
          {/* Column 1: Image */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInLeft}
            className="flex-1 min-w-0"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-full aspect-[4/3] lg:aspect-auto">
              <img 
                src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2071&auto=format&fit=crop" 
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h1 className="text-2xl md:text-3xl font-sora font-bold text-white uppercase tracking-tight leading-none">
                  {service.title}
                </h1>
              </div>
            </div>
          </motion.div>

          {/* Column 2: What's Included */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col"
          >
            <h2 className="text-xs font-sora font-bold text-white/40 mb-4 uppercase tracking-[0.2em] border-b border-white/10 pb-2">What's Included</h2>
            <ul className="space-y-4 flex-grow">
              {service.features.map((feature: string, i: number) => (
                <li key={i} className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-white/80 text-sm font-medium leading-tight">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Pricing */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInRight}
            className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col"
          >
            <h3 className="text-xs font-sora font-bold text-white/40 mb-4 uppercase tracking-[0.2em] border-b border-white/10 pb-2">Pricing</h3>
            <div className="space-y-3 flex-grow">
              {service.pricing && service.pricing.length > 0 ? (
                service.pricing.map((tier, i) => (
                  <div 
                    key={i}
                    className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all group"
                  >
                    <span className="text-white/60 text-[10px] uppercase font-bold tracking-wider group-hover:text-white transition-colors">{tier.carType}</span>
                    <span className="text-xl font-bold text-white font-sora">{tier.price}</span>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-3xl font-bold text-white">{displayPrice}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom Area: Booking Button */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-md mx-auto"
        >
          <Button 
            onClick={() => setBookingOpen(true)}
            className="w-full bg-white hover:bg-zinc-200 text-black font-bold h-16 px-10 rounded-2xl text-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl uppercase tracking-[0.2em]"
          >
            <Calendar className="mr-2 h-6 w-6" />
            BOOK YOUR SLOT
          </Button>
          <div className="mt-4 text-center">
            <Link href="/services">
              <span className="text-white/30 hover:text-white text-xs uppercase tracking-widest cursor-pointer transition-colors font-medium">
                View All Detailing Services
              </span>
            </Link>
          </div>
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
