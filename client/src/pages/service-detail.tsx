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
    <div className="min-h-screen pt-20 pb-10 bg-black overflow-hidden flex flex-col">
      {/* Hero & Main Content Combined View */}
      <section className="container px-4 mx-auto flex-1 flex flex-col justify-center max-w-7xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="w-full"
        >
          {/* Centered Header with proper padding to avoid cropping */}
          <motion.div variants={fadeInUp} className="text-center mb-8 pt-12">
            <motion.h1 
              className="text-5xl md:text-7xl font-sora font-bold text-white tracking-tighter uppercase leading-tight py-6 px-4"
            >
              {service.title}
            </motion.h1>
            <motion.p className="text-lg text-white/60 font-light max-w-2xl mx-auto mt-4 px-4">
              {service.description}
            </motion.p>
          </motion.div>
          
          {/* Central Visual & Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Features */}
            <motion.div 
              variants={fadeInLeft}
              className="lg:col-span-3 flex flex-col justify-center"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full">
                <p className="text-[10px] text-white/40 font-bold tracking-[0.2em] uppercase mb-4">INCLUSIONS</p>
                <ul className="space-y-4">
                  {service.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <div className="mt-1 flex-shrink-0">
                        <Check className="w-4 h-4 text-white/80" />
                      </div>
                      <span className="text-white/70 text-sm font-medium leading-tight group-hover:text-white transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Center: Hero Image */}
            <motion.div 
              variants={fadeInUp}
              className="lg:col-span-6"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[4/3] lg:aspect-square shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2071&auto=format&fit=crop" 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                
                {/* Overlay Action */}
                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <Button 
                    onClick={() => setBookingOpen(true)}
                    className="bg-white text-black hover:bg-zinc-200 font-bold h-12 px-8 rounded-full shadow-xl transition-transform active:scale-95"
                  >
                    BOOK YOUR SLOT
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Right: Pricing & Meta */}
            <motion.div 
              variants={fadeInRight}
              className="lg:col-span-3 flex flex-col gap-4"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex-1">
                <p className="text-[10px] text-white/40 font-bold tracking-[0.2em] uppercase mb-4">INVESTMENT</p>
                <div className="space-y-3">
                  {service.pricing?.map((tier, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <span className="text-white/60 text-xs">{tier.carType}</span>
                      <span className="text-white font-bold font-sora">{tier.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {service.warranty && (
                <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
                  <p className="text-[10px] text-white/40 font-bold tracking-[0.2em] uppercase mb-1">PROTECTION</p>
                  <p className="text-white font-semibold text-sm">{service.warranty}</p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-[500px] bg-black/95 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-sora font-semibold text-white uppercase">
              Book <span className="text-white/50">{service.title}</span>
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/70 font-medium">Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" className="bg-white/5 border-white/10 text-white" {...field} />
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
                      <FormLabel className="text-white/70 font-medium">Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 00000 00000" className="bg-white/5 border-white/10 text-white" {...field} />
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
                      <FormLabel className="text-white/70 font-medium">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@domain.com" className="bg-white/5 border-white/10 text-white" {...field} />
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
                    <FormLabel className="text-white/70 font-medium">Preferred Date</FormLabel>
                    <FormControl>
                      <Input type="date" className="bg-white/5 border-white/10 text-white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-white text-black hover:bg-zinc-200 font-bold h-12 uppercase tracking-widest"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
