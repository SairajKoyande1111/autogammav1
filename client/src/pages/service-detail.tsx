import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
import { Loader2, Calendar, CheckCircle2, ArrowRight, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { bookingFormSchema, type BookingFormData } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { getServiceBySlug, servicesData } from "@/lib/services-data";

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
  visible: { transition: { staggerChildren: 0.08 } },
} as const;

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug || "");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const { toast } = useToast();

  const recommendations = useMemo(() => {
    if (!service) return [];
    return servicesData
      .filter((s) => s.id !== service.id)
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
      <div className="pt-32 pb-20 bg-background min-h-screen">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl font-bold text-white font-sora uppercase tracking-wider mb-6">
            Service Not Found
          </h1>
          <Link href="/services">
            <button className="bg-primary text-white font-poppins font-bold h-11 px-10 uppercase tracking-widest -skew-x-6 hover:bg-primary/90 transition-colors">
              <span className="skew-x-6 inline-block">Back to Services</span>
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const isVariantService =
    service.slug === "ceramic-coating" ||
    service.slug === "windshield-coating" ||
    service.slug === "sun-control-film";

  const variantLabels: Record<string, string[]> = {
    "ceramic-coating": [
      "9H — Made in India",
      "MAFRA — Made in Italy",
      "MENZA PRO — Made in Japan",
      "KOCH CHEMIE — Made in Germany",
    ],
    "windshield-coating": ["Front Windshield Only", "All Glasses"],
    "sun-control-film": [
      "Economy (25–30% Heat Rejection)",
      "Standard (30–40% Heat Rejection)",
      "Premium (40–50% Heat Rejection)",
      "Ceramic (50–60% Heat Rejection)",
    ],
  };

  const currentVariantPricing = isVariantService
    ? service.pricing?.slice(
        selectedVariantIndex * 4,
        (selectedVariantIndex + 1) * 4
      )
    : service.pricing;

  const displayPrice = service.pricing ? service.pricing[0].price : service.price;

  return (
    <div className="bg-background min-h-screen w-full overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {service.slug === "foam-washing" ? (
            <video
              src="/attached_assets/6873163-uhd_2160_3840_25fps_1766779370222.mp4"
              autoPlay loop muted playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2071&auto=format&fit=crop"
              alt={service.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        </div>

        <div className="relative z-10 container px-4 mx-auto pb-14 pt-36">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="w-full text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white font-sora uppercase tracking-wider leading-none mb-5"
            >
              {service.title}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-white/80 font-poppins text-base md:text-lg w-full leading-relaxed mb-8"
            >
              {service.description}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 flex-wrap">
              <button
                onClick={() => setBookingOpen(true)}
                className="bg-primary text-white font-poppins font-bold uppercase tracking-widest px-8 h-12 -skew-x-6 hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <span className="skew-x-6 inline-flex items-center gap-2">
                  <Calendar size={16} /> Book Your Slot
                </span>
              </button>
              <Link href="/services">
                <button className="border border-white/30 text-white font-poppins font-bold uppercase tracking-widest px-8 h-12 -skew-x-6 hover:border-primary hover:text-primary transition-colors">
                  <span className="skew-x-6 inline-block">All Services</span>
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* LEFT: What's Included (3/5) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeInLeft}
              className="lg:col-span-3 flex flex-col gap-6 lg:border-r lg:border-white/15 lg:pr-8"
            >
              <div>
                <p className="text-primary font-poppins text-xs font-bold tracking-[0.3em] uppercase mb-2">
                  Service Breakdown
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white font-sora uppercase tracking-wider">
                  WHAT'S <span className="text-primary">INCLUDED</span>
                </h2>
                <div className="w-full h-0.5 bg-primary mt-3" />
              </div>

              <motion.ul
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {service.features.map((feature: string, i: number) => (
                  <motion.li
                    key={i}
                    variants={fadeInUp}
                    className="flex items-start gap-3 bg-white/5 border border-white/10 px-5 py-4 hover:border-primary/50 hover:bg-white/8 transition-all duration-300 group"
                  >
                    <CheckCircle2
                      className="text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                      size={18}
                    />
                    <span className="text-white font-poppins text-base leading-relaxed">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Variants for applicable services */}
              {isVariantService && service.variants && (
                <div className="mt-2">
                  <p className="text-primary font-poppins text-xs font-bold tracking-[0.3em] uppercase mb-3">
                    Select Variant
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.variants.map((v, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedVariantIndex(i)}
                        className={`text-left px-5 py-3 border font-poppins text-xs font-semibold uppercase tracking-wide transition-all duration-200 ${
                          selectedVariantIndex === i
                            ? "bg-primary border-primary text-white"
                            : "bg-white/5 border-white/10 text-white/70 hover:border-primary/50 hover:text-white"
                        }`}
                      >
                        {variantLabels[service.slug]?.[i] ?? v.split(" (")[0]}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Non-variant variants list */}
              {!isVariantService && service.variants && service.variants.length > 0 && (
                <div className="mt-2">
                  <p className="text-primary font-poppins text-xs font-bold tracking-[0.3em] uppercase mb-3">
                    Available Variants
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.variants.map((variant, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                        <span className="text-white font-poppins text-xs leading-tight">{variant}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* RIGHT: Pricing (2/5) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeInRight}
              className="lg:col-span-2 flex flex-col gap-6 lg:pl-10"
            >
              <div>
                <p className="text-primary font-poppins text-xs font-bold tracking-[0.3em] uppercase mb-2">
                  Transparent Pricing
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white font-sora uppercase tracking-wider">
                  PRICING
                </h2>
                <div className="w-full h-0.5 bg-primary mt-3" />
              </div>

              {service.pricing && service.pricing.length > 0 ? (
                <div className="flex flex-col gap-0 border border-white/10 overflow-hidden">
                  {/* Header row */}
                  <div className="grid grid-cols-2 bg-primary px-5 py-3">
                    <span className="text-white font-poppins text-xs font-bold uppercase tracking-widest">
                      Vehicle Type
                    </span>
                    <span className="text-white font-poppins text-xs font-bold uppercase tracking-widest text-right">
                      Price
                    </span>
                  </div>
                  {/* Pricing rows */}
                  {(currentVariantPricing ?? service.pricing).map((tier, i) => (
                    <motion.div
                      key={`${selectedVariantIndex}-${i}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className={`grid grid-cols-2 items-center px-5 py-4 border-b border-white/10 last:border-b-0 hover:bg-primary/10 transition-colors group ${
                        i % 2 === 0 ? "bg-white/3" : "bg-white/5"
                      }`}
                    >
                      <span className="text-white/80 font-poppins text-base group-hover:text-white transition-colors">
                        {tier.carType.split(" - ").pop()}
                      </span>
                      <span className="text-white font-sora font-bold text-xl text-right group-hover:text-primary transition-colors">
                        {tier.price}
                      </span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 px-8 py-10 text-center">
                  <p className="text-white/50 font-poppins text-xs uppercase tracking-widest mb-2">
                    Starting from
                  </p>
                  <p className="text-5xl font-bold text-white font-sora">{displayPrice}</p>
                </div>
              )}

              {/* Book CTA in sidebar */}
              <button
                onClick={() => setBookingOpen(true)}
                className="w-full bg-primary text-white font-poppins font-bold uppercase tracking-widest h-14 text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-3 -skew-x-3 mt-2"
              >
                <span className="skew-x-3 inline-flex items-center gap-3">
                  <Calendar size={18} />
                  Book This Service
                </span>
              </button>

              {service.warranty && (
                <div className="flex items-center gap-3 bg-primary/10 border border-primary/30 px-5 py-4">
                  <CheckCircle2 className="text-primary shrink-0" size={18} />
                  <p className="text-white font-poppins text-sm">
                    <span className="text-primary font-semibold">Warranty:</span>{" "}
                    {service.warranty}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── RECOMMENDED SERVICES ── */}
      <section className="py-20 bg-neutral-900">
        <div className="container px-4 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mb-12"
          >
            <motion.p
              variants={fadeInUp}
              className="text-primary font-poppins text-xs font-bold tracking-[0.3em] uppercase mb-2"
            >
              You Might Also Like
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-sora uppercase tracking-wider"
            >
              RECOMMENDED <span className="text-primary">SERVICES</span>
            </motion.h2>
            <div className="w-full h-0.5 bg-primary mt-3" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((rec, i) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/service/${rec.slug}`}>
                  <div className="group block border border-white/10 hover:border-primary/50 transition-all duration-300 hover-lift overflow-hidden cursor-pointer h-full">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={
                          rec.slug === "foam-washing"
                            ? "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=800"
                            : rec.slug === "ceramic-coating"
                            ? "https://images.unsplash.com/photo-1601362840469-51e4d8d59085?q=80&w=800"
                            : rec.slug === "detailing"
                            ? "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800"
                            : "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800"
                        }
                        alt={rec.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                    {/* Content */}
                    <div className="p-5 bg-white/3">
                      <h4 className="text-white font-sora font-bold text-sm uppercase tracking-wider mb-1 group-hover:text-primary transition-colors">
                        {rec.title}
                      </h4>
                      <p className="text-white/50 font-poppins text-xs leading-relaxed line-clamp-2 mb-4">
                        {rec.description}
                      </p>
                      <div className="flex items-center justify-between border-t border-white/10 pt-3">
                        <div>
                          <p className="text-white/40 font-poppins text-[10px] uppercase tracking-widest">From</p>
                          <p className="text-primary font-sora font-bold text-lg">
                            {rec.pricing ? rec.pricing[0].price : rec.price}
                          </p>
                        </div>
                        <div className="w-8 h-8 border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                          <ArrowRight className="text-white" size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING DIALOG ── */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-[500px] bg-black/98 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-xl font-sora font-bold text-white uppercase tracking-wider">
              Book <span className="text-primary">{service.title}</span>
            </DialogTitle>
            <div className="w-12 h-0.5 bg-primary mt-1" />
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-poppins text-xs uppercase tracking-widest">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your full name"
                        className="bg-white/5 border-white/10 text-white font-poppins focus:border-primary"
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
                      <FormLabel className="text-white font-poppins text-xs uppercase tracking-widest">
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+91 00000 00000"
                          className="bg-white/5 border-white/10 text-white font-poppins focus:border-primary"
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
                      <FormLabel className="text-white font-poppins text-xs uppercase tracking-widest">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@domain.com"
                          className="bg-white/5 border-white/10 text-white font-poppins focus:border-primary"
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
                    <FormLabel className="text-white font-poppins text-xs uppercase tracking-widest">
                      Preferred Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="bg-white/5 border-white/10 text-white font-poppins focus:border-primary"
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
                    <FormLabel className="text-white font-poppins text-xs uppercase tracking-widest">
                      Message (Optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your vehicle..."
                        className="bg-white/5 border-white/10 text-white font-poppins focus:border-primary min-h-[80px]"
                        data-testid="input-booking-message"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-primary text-white font-poppins font-bold h-12 uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              >
                {mutation.isPending ? (
                  <><Loader2 className="animate-spin" size={16} /> Submitting...</>
                ) : (
                  <><Calendar size={16} /> Confirm Booking</>
                )}
              </button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
