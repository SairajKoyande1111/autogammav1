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
    <div className="min-h-screen pt-24 pb-12 bg-black">
      <div className="container px-4 mx-auto max-w-6xl">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-sora font-bold text-white tracking-tight uppercase py-4">
            {service.title}
          </h1>
          <p className="text-lg text-white/60 font-light max-w-2xl mx-auto">
            {service.description}
          </p>
        </motion.div>

        {/* Top Grid: Image Left, Features Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
            className="rounded-3xl overflow-hidden border border-white/10 aspect-video lg:aspect-square shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2071&auto=format&fit=crop" 
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Features Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 lg:p-10 flex flex-col justify-center shadow-xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full mb-6 w-fit">
              <span className="text-white text-[10px] font-bold tracking-widest uppercase">PREMIUM BENEFITS</span>
            </div>
            <h2 className="text-3xl font-sora font-semibold text-white mb-6">What's Included</h2>
            <ul className="grid grid-cols-1 gap-4">
              {service.features.map((feature: string, i: number) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-white/80 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Pricing Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 lg:p-10 mb-8 shadow-xl"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <h3 className="text-3xl font-sora font-semibold text-white">Pricing by Car Type</h3>
            {service.warranty && (
              <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl">
                <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">WARRANTY</span>
                <span className="text-white font-semibold text-sm">{service.warranty}</span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.pricing?.map((tier, i) => (
              <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center group hover:bg-white hover:text-black transition-all duration-300">
                <p className="text-xs font-bold tracking-wider uppercase mb-2 group-hover:text-black/60 transition-colors text-white/40">{tier.carType}</p>
                <p className="text-2xl font-bold font-sora">{tier.price}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Book Slot Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-gradient-to-r from-zinc-900 to-black rounded-3xl p-10 lg:p-12 text-center border border-white/10 shadow-2xl"
        >
          <h2 className="text-4xl font-sora font-bold text-white mb-4 uppercase">Ready to Book?</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Experience the ultimate showroom shine for your vehicle. Fast, professional, and reliable.
          </p>
          <Button 
            onClick={() => setBookingOpen(true)}
            className="bg-white text-black hover:bg-zinc-200 font-bold h-14 px-12 rounded-full text-lg shadow-xl"
          >
            BOOK YOUR SLOT
          </Button>
        </motion.div>
      </div>

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
