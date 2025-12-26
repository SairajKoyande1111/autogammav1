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
    <div className="min-h-screen pt-24 pb-8 bg-black overflow-hidden flex items-center">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Header - Centered with proper padding */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-sora font-bold text-white tracking-tight uppercase py-2">
            {service.title}
          </h1>
          <p className="text-sm text-white/40 font-light max-w-xl mx-auto">
            {service.description}
          </p>
        </motion.div>

        {/* Main Horizontal Content View */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Left: Image Card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInLeft}
            className="flex-1 rounded-3xl overflow-hidden border border-white/10 aspect-video lg:aspect-auto shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2071&auto=format&fit=crop" 
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right: Features & Pricing Column */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInRight}
            className="lg:w-[450px] flex flex-col gap-6"
          >
            {/* Features Card */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full mb-4 w-fit">
                <span className="text-white text-[10px] font-bold tracking-widest uppercase">INCLUSIONS</span>
              </div>
              <h2 className="text-2xl font-sora font-semibold text-white mb-4">What's Included</h2>
              <ul className="space-y-3">
                {service.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-white/60 flex-shrink-0" />
                    <span className="text-white/80 text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Card */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl flex-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-sora font-semibold text-white">Pricing</h3>
                {service.warranty && (
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{service.warranty}</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {service.pricing?.map((tier, i) => (
                  <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-[10px] text-white/40 font-bold uppercase mb-1 truncate">{tier.carType}</p>
                    <p className="text-lg font-bold font-sora text-white">{tier.price}</p>
                  </div>
                ))}
              </div>
              
              {/* Action Button at the bottom of the column */}
              <Button 
                onClick={() => setBookingOpen(true)}
                className="w-full mt-6 bg-white text-black hover:bg-zinc-200 font-bold h-12 rounded-2xl shadow-xl transition-all active:scale-95"
              >
                BOOK YOUR SLOT
              </Button>
            </div>
          </motion.div>
        </div>
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
