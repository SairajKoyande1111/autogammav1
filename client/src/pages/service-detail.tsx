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
    <div className="pt-24 pb-12 bg-black min-h-screen flex flex-col font-sora text-[16px]">
      {/* Centered Header */}
      <section className="container px-4 mx-auto max-w-7xl pt-16 pb-12 text-center">
        <motion.h1 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-sora font-medium text-white uppercase tracking-tight mb-2"
        >
          {service.title}
        </motion.h1>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="inline-block bg-red-600 px-4 py-1.5 mt-2"
        >
          <p className="text-white text-lg font-medium whitespace-nowrap">
            Premium deep cleaning and foam protection for a showroom finish.
          </p>
        </motion.div>
      </section>

      <section className="container px-4 mx-auto max-w-7xl flex-grow flex flex-col">
        {/* Main Content Area - 3 Vertical Cards side by side */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch mb-12 flex-grow min-h-[500px]">
          {/* Column 1: Image */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInLeft}
            className="flex-1 min-w-0"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-full min-h-[400px] group">
              <img 
                src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2071&auto=format&fit=crop" 
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
            </div>
          </motion.div>

          {/* Column 2: What's Included */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex-1 bg-gradient-to-br from-zinc-900/80 to-black border border-white/20 rounded-3xl p-8 flex flex-col shadow-[0_0_50px_-12px_rgba(255,0,0,0.15)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-3xl -mr-16 -mt-16 rounded-full" />
            <h2 className="text-xl font-sora font-semibold text-white mb-8 uppercase tracking-[0.2em] border-b border-white/20 pb-4 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-red-600 rounded-full block" />
              What's Included
            </h2>
            <ul className="space-y-6 flex-grow relative z-10">
              {service.features.map((feature: string, i: number) => (
                <li key={i} className="flex items-center gap-4 group p-3 bg-zinc-900/80 border-[4px] border-red-600 rounded-2xl relative">
                  {/* Inner White Border */}
                  <div className="absolute inset-[2px] border-[1px] border-white rounded-[12px] pointer-events-none" />
                  
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center relative z-10">
                    <div className="w-5 h-5 rounded-full border-2 border-red-600 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                      <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]" />
                    </div>
                  </div>
                  <span className="text-white text-lg font-semibold leading-relaxed tracking-tight relative z-10">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Pricing */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInRight}
            className="flex-1 bg-gradient-to-br from-zinc-900/80 to-black border border-white/20 rounded-3xl p-8 flex flex-col shadow-[0_0_50px_-12px_rgba(255,0,0,0.15)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-3xl -mr-16 -mt-16 rounded-full" />
            <h3 className="text-xl font-sora font-semibold text-white mb-8 uppercase tracking-[0.2em] border-b border-white/20 pb-4 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-red-600 rounded-full block" />
              Pricing
            </h3>
            <div className="space-y-4 flex-grow relative z-10">
              {service.pricing && service.pricing.length > 0 ? (
                service.pricing.map((tier, i) => (
                  <div 
                    key={i}
                    className="flex items-center justify-between px-6 py-5 bg-zinc-900/80 rounded-2xl hover:bg-zinc-800 transition-all duration-300 group relative border-[4px] border-red-600"
                  >
                    {/* Inner White Border */}
                    <div className="absolute inset-[2px] border-[1px] border-white rounded-[12px] pointer-events-none" />
                    
                    <span className="text-white text-sm uppercase font-semibold tracking-widest relative z-10">{tier.carType}</span>
                    <span className="text-3xl font-semibold text-white font-sora tracking-tighter group-hover:text-red-500 transition-colors relative z-10">
                      {tier.price}
                    </span>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-4xl font-semibold text-white">{displayPrice}</p>
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
          className="max-w-md mx-auto w-full pb-8"
        >
          <Button 
            onClick={() => setBookingOpen(true)}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold h-14 px-8 rounded-2xl text-lg transition-all hover:scale-[1.05] active:scale-[0.95] shadow-[0_0_30px_-5px_rgba(220,38,38,0.4)] uppercase tracking-[0.2em]"
          >
            <Calendar className="mr-3 h-5 w-5" />
            BOOK YOUR SLOT
          </Button>
          <div className="mt-4 text-center">
            <Link href="/services">
              <span className="text-white/20 hover:text-red-500 text-[10px] uppercase tracking-[0.3em] cursor-pointer transition-all duration-300 font-bold">
                View All Premium Services
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
