import { useParams, Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Calendar, Check, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { bookingFormSchema, type BookingFormData } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { getServiceBySlug, servicesData } from "@/lib/services-data";
import { Card, CardContent } from "@/components/ui/card";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as const;

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as const;

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as const;

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
} as const;

export default function ServiceDetail() {
  const { slug } = useParams();
  const [location] = useLocation();
  const service = getServiceBySlug(slug || "");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const { toast } = useToast();

  const recommendations = useMemo(() => {
    if (!service) return [];
    return servicesData
      .filter(s => s.id !== service.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }, [service]);

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
          <h1 className="text-4xl font-bold text-white mb-4">
            Service Not Found
          </h1>
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
      <section className="container px-4 mx-auto max-w-7xl pt-8 md:pt-16 pb-8 md:pb-12 text-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-3xl md:text-5xl font-sora font-medium text-white uppercase tracking-tight mb-2"
        >
          {service.title}
        </motion.h1>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="inline-block bg-red-600 px-4 py-1.5 mt-2 max-w-[90vw] md:max-w-full"
        >
          <p className="text-white text-sm sm:text-base md:text-lg font-medium md:whitespace-nowrap break-words leading-tight">
            Premium deep cleaning and foam protection for a showroom finish
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
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-full min-h-[250px] sm:min-h-[300px] md:min-h-[400px] group">
              {service.slug === "foam-washing" ? (
                <video
                  src="/attached_assets/6873163-uhd_2160_3840_25fps_1766779370222.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                  preload="auto"
                  className="w-full h-[250px] sm:h-[300px] md:h-full object-cover transition-transform duration-700 group-hover:scale-110"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2071&auto=format&fit=crop"
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
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
                <li
                  key={i}
                  className="flex items-center gap-4 group p-3 bg-zinc-900/80 border-[4px] border-red-600 rounded-2xl relative"
                >
                  {/* Inner White Border */}
                  <div className="absolute inset-[2px] border-[1px] border-white rounded-[12px] pointer-events-none" />

                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center relative z-10">
                    <div className="w-5 h-5 rounded-full border-2 border-red-600 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                      <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]" />
                    </div>
                  </div>
                  <span className="text-white text-lg font-semibold leading-relaxed tracking-tight relative z-10">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* Dynamic Variant Selection Buttons */}
            {(service.slug === "ceramic-coating" || service.slug === "windshield-coating" || service.slug === "sun-control-film") && service.variants && (
              <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-[0.2em] mb-4 text-center">Select Treatment Variant</p>
                <div className="grid grid-cols-2 gap-2">
                  {service.variants.map((v, i) => (
                    <Button
                      key={v}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedVariantIndex(i)}
                      className={`h-14 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 rounded-xl px-2 ${
                        selectedVariantIndex === i
                          ? "bg-red-600 border-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] scale-105"
                          : "bg-transparent border-white/10 text-white hover:border-red-600/50"
                      }`}
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest">{v.split(" (")[0]}</span>
                      {v.includes("(") && (
                        <span className={`text-[8px] font-medium mt-1 leading-none ${selectedVariantIndex === i ? "text-white/90" : "text-white/40"}`}>
                          ({v.split("(")[1]}
                        </span>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            )}
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
            <div className="space-y-4 flex-grow relative z-10 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-zinc-900">
              {(service.slug === "ceramic-coating" || service.slug === "windshield-coating" || service.slug === "sun-control-film") ? (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-3 px-1 sticky top-0 bg-black/80 backdrop-blur-sm py-2 z-20">
                    {service.slug === "ceramic-coating" 
                      ? ["9H (2 Year Warranty - Made in India)", "MAFRA (2 Year Warranty - Made in Italy)", "MENZA PRO (2 Year Warranty - Made in Japan)", "KOCH CHEMIE (2 Year Warranty - Made in Germany)"][selectedVariantIndex]
                      : service.slug === "windshield-coating"
                      ? ["Front Windshield Only", "All Glasses Coating"][selectedVariantIndex]
                      : ["Economy Grade (Heat Rejection 25%-30%)", "Standard Grade (Heat Rejection 30%-40%)", "Premium Grade (Heat Rejection 40%-50%)", "Ceramic Grade (Heat Rejection 50%-60%)"][selectedVariantIndex]
                    }
                  </h4>
                  {service.pricing?.slice(selectedVariantIndex * 4, (selectedVariantIndex + 1) * 4).map((tier, i) => (
                    <motion.div
                      key={`${selectedVariantIndex}-${i}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between px-6 py-5 bg-zinc-900/80 rounded-2xl hover:bg-zinc-800 transition-all duration-300 group relative border-[4px] border-red-600"
                    >
                      <div className="absolute inset-[2px] border-[1px] border-white rounded-[12px] pointer-events-none" />
                      <span className="text-white text-xs uppercase font-semibold tracking-widest relative z-10 max-w-[60%]">
                        {tier.carType.split(" - ").pop()}
                      </span>
                      <span className="text-xl md:text-2xl font-semibold text-white font-sora tracking-tighter group-hover:text-red-500 transition-colors relative z-10">
                        {tier.price}
                      </span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <>
                  {service.variants && service.variants.length > 0 && (
                    <div className="mb-6 space-y-2">
                      <h4 className="text-xs font-bold text-red-500 uppercase tracking-[0.2em] mb-3 px-1 sticky top-0 bg-black/80 backdrop-blur-sm py-2 z-20">Available Variants</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {service.variants.map((variant, i) => (
                          <div key={i} className="bg-zinc-900/50 border border-white/5 rounded-xl p-3 flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
                            <span className="text-white text-[11px] font-medium tracking-wide leading-tight">{variant}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {service.pricing && service.pricing.length > 0 ? (
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-red-500 uppercase tracking-[0.2em] mb-3 px-1 sticky top-0 bg-black/80 backdrop-blur-sm py-2 z-20">Pricing Details</h4>
                      {service.pricing.map((tier, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between px-6 py-5 bg-zinc-900/80 rounded-2xl hover:bg-zinc-800 transition-all duration-300 group relative border-[4px] border-red-600"
                        >
                          <div className="absolute inset-[2px] border-[1px] border-white rounded-[12px] pointer-events-none" />
                          <span className="text-white text-xs uppercase font-semibold tracking-widest relative z-10 max-w-[60%]">
                            {tier.carType}
                          </span>
                          <span className="text-xl md:text-2xl font-semibold text-white font-sora tracking-tighter group-hover:text-red-500 transition-colors relative z-10">
                            {tier.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-4xl font-semibold text-white">{displayPrice}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom Area: Booking Button & Recommendations */}
        <div className="max-w-7xl mx-auto w-full pb-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-md mx-auto w-full mb-20"
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
                <span className="text-white/20 hover:text-red-500 text-[10px] uppercase tracking-[0.3em] cursor-pointer transition-all duration-300 font-bold font-orbitron">
                  View All Premium Services
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Recommended Services */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="space-y-12"
          >
            <div className="flex items-center gap-6">
              <div className="h-px flex-grow bg-white/10" />
              <h3 className="text-[20px] font-sora font-bold text-red-600 uppercase tracking-[0.5em] whitespace-nowrap">Recommended For You</h3>
              <div className="h-px flex-grow bg-white/10" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {recommendations.map((rec, i) => (
                <Link key={rec.id} href={`/service/${rec.slug}`}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="cursor-pointer group h-full"
                  >
                    <Card className="bg-zinc-900/40 border-white/5 overflow-hidden hover:border-red-600/30 transition-all duration-500 h-full flex flex-col shadow-2xl">
                      <CardContent className="p-0 flex flex-col h-full">
                        <div className="aspect-[4/3] overflow-hidden relative">
                          <img
                            src={rec.slug === "foam-washing" 
                              ? "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=2071&auto=format&fit=crop"
                              : rec.slug === "ceramic-coating"
                              ? "https://images.unsplash.com/photo-1601362840469-51e4d8d59085?q=80&w=2071&auto=format&fit=crop"
                              : rec.slug === "detailing"
                              ? "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2071&auto=format&fit=crop"
                              : "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop"
                            }
                            alt={rec.title}
                            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
                          <div className="absolute bottom-4 left-4">
                             <Badge className="bg-red-600 text-white border-none text-[8px] font-bold font-orbitron">PREMIUM</Badge>
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-transparent to-black/40">
                          <h4 className="text-white font-sora font-bold text-[20px] uppercase tracking-widest mb-3 group-hover:text-red-600 transition-colors leading-tight">
                            {rec.title}
                          </h4>
                          <p className="text-white/40 text-[14px] font-sora font-medium leading-relaxed mb-6 line-clamp-3">
                            {rec.description}
                          </p>
                          <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-[12px] text-white/30 uppercase tracking-tighter font-sora font-bold">Starting at</span>
                              <span className="text-red-600 text-[20px] font-sora font-bold tracking-tighter">
                                {rec.pricing ? rec.pricing[0].price : rec.price}
                              </span>
                            </div>
                            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
                              <ArrowRight className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
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
                    <FormLabel className="text-white font-medium">
                      Your Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Full Name"
                        className="bg-white/5 border-white/10 text-white"
                        data-testid="input-booking-name"
                        {...field}
                      />
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
                      <FormLabel className="text-white font-medium">
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+91 00000 00000"
                          className="bg-white/5 border-white/10 text-white"
                          data-testid="input-booking-phone"
                          {...field}
                        />
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
                      <FormLabel className="text-white font-medium">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@domain.com"
                          className="bg-white/5 border-white/10 text-white"
                          data-testid="input-booking-email"
                          {...field}
                        />
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
                    <FormLabel className="text-white font-medium">
                      Preferred Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="bg-white/5 border-white/10 text-white"
                        data-testid="input-booking-date"
                        {...field}
                      />
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
                    <FormLabel className="text-white font-medium">
                      Additional Notes (Optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any specific requirements..."
                        className="bg-white/5 border-white/10 min-h-[80px] text-white"
                        data-testid="input-booking-message"
                        {...field}
                      />
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
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />{" "}
                    Submitting...
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
