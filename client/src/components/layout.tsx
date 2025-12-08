import { Link, useLocation, useRoute } from "wouter";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin, Phone, Mail, ChevronRight, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import futuristicCarImage from "@assets/futuristic-racing-car-isolated-on-transparent-background-png-r_1765005692951.png";
import autoGammaLogo from "@assets/image_1765169951823.png";

interface SmokeParticle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  velocityX: number;
  velocityY: number;
}

interface StopSmokeParticle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  velocityX: number;
  velocityY: number;
}

function XIcon({ className, size = 14 }: { className?: string; size?: number }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      className={className}
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TireSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" stroke="#333" strokeWidth="4" fill="#1a1a1a" />
      <circle cx="50" cy="50" r="42" stroke="#444" strokeWidth="2" fill="#222" />
      <circle cx="50" cy="50" r="20" fill="#2a2a2a" stroke="#555" strokeWidth="2" />
      <circle cx="50" cy="50" r="8" fill="#666" />
      <circle cx="50" cy="50" r="4" fill="#888" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 50 50)`}>
          <rect x="48" y="22" width="4" height="16" fill="#444" rx="1" />
          <polygon points="50,6 46,18 54,18" fill="#333" />
        </g>
      ))}
      {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((angle, i) => (
        <line 
          key={`spoke-${i}`} 
          x1="50" y1="50" 
          x2={50 + 16 * Math.cos((angle * Math.PI) / 180)} 
          y2={50 + 16 * Math.sin((angle * Math.PI) / 180)} 
          stroke="#555" 
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [carX, setCarX] = useState(0);
  const [tireRotation, setTireRotation] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [smokeParticles, setSmokeParticles] = useState<SmokeParticle[]>([]);
  const [stopSmokeParticles, setStopSmokeParticles] = useState<StopSmokeParticle[]>([]);
  const [isMoving, setIsMoving] = useState(false);
  const [justStopped, setJustStopped] = useState(false);
  const prevScrollY = useRef(0);
  const smokeIdRef = useRef(0);
  const stopSmokeIdRef = useRef(0);
  const movingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const maxScroll = docHeight - windowHeight;
      const progress = maxScroll > 0 ? currentScrollY / maxScroll : 0;
      setScrollProgress(progress);
      
      const scrollDelta = currentScrollY - prevScrollY.current;
      
      setTireRotation(prev => prev + scrollDelta * 0.8);
      
      const carWidth = window.innerWidth < 768 ? 160 : 280;
      const maxCarX = window.innerWidth - carWidth;
      
      setCarX(prev => {
        const newX = prev + scrollDelta * 0.6;
        return Math.max(0, Math.min(maxCarX, newX));
      });
      
      if (Math.abs(scrollDelta) > 0) {
        setIsMoving(true);
        setJustStopped(false);
        if (movingTimeoutRef.current) {
          clearTimeout(movingTimeoutRef.current);
        }
        movingTimeoutRef.current = setTimeout(() => {
          setIsMoving(false);
          setJustStopped(true);
          
          const burstParticles: StopSmokeParticle[] = [];
          for (let i = 0; i < 6; i++) {
            burstParticles.push({
              id: stopSmokeIdRef.current++,
              x: Math.random() * 40 - 20,
              y: Math.random() * 25 - 12,
              opacity: 0.5 + Math.random() * 0.2,
              scale: 0.6 + Math.random() * 0.8,
              velocityX: -2 - Math.random() * 3,
              velocityY: (Math.random() - 0.5) * 2,
            });
          }
          setStopSmokeParticles(burstParticles);
          
          setTimeout(() => setJustStopped(false), 1500);
        }, 150);
        
        if (Math.abs(scrollDelta) > 2) {
          const particleCount = Math.min(2, Math.floor(Math.abs(scrollDelta) / 5));
          const newParticles: SmokeParticle[] = [];
          
          for (let i = 0; i < particleCount; i++) {
            newParticles.push({
              id: smokeIdRef.current++,
              x: Math.random() * 20 - 10,
              y: Math.random() * 15 - 7,
              opacity: 0.4 + Math.random() * 0.2,
              scale: 0.5 + Math.random() * 0.4,
              velocityX: -2 - Math.random() * 2,
              velocityY: (Math.random() - 0.5) * 1.5,
            });
          }
          setSmokeParticles(prev => [...prev.slice(-15), ...newParticles]);
        }
      }
      
      prevScrollY.current = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (movingTimeoutRef.current) {
        clearTimeout(movingTimeoutRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (smokeParticles.length === 0) return;
    
    const fadeInterval = setInterval(() => {
      setSmokeParticles(prev => 
        prev
          .map(p => ({ 
            ...p, 
            opacity: p.opacity - 0.03,
            scale: p.scale + 0.15,
            x: p.x + p.velocityX,
            y: p.y + p.velocityY,
            velocityX: p.velocityX * 0.95,
            velocityY: p.velocityY * 0.95,
          }))
          .filter(p => p.opacity > 0)
      );
    }, 40);
    
    return () => clearInterval(fadeInterval);
  }, [smokeParticles.length > 0]);

  useEffect(() => {
    if (stopSmokeParticles.length === 0) return;
    
    const fadeInterval = setInterval(() => {
      setStopSmokeParticles(prev => 
        prev
          .map(p => ({ 
            ...p, 
            opacity: p.opacity - 0.02,
            scale: p.scale + 0.2,
            x: p.x + p.velocityX,
            y: p.y + p.velocityY,
            velocityX: p.velocityX * 0.92,
            velocityY: p.velocityY * 0.92,
          }))
          .filter(p => p.opacity > 0)
      );
    }, 40);
    
    return () => clearInterval(fadeInterval);
  }, [stopSmokeParticles.length > 0]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "PPF", href: "/ppf" },
    { name: "Blogs", href: "/blogs" },
    { name: "Careers", href: "/careers" },
    { name: "Warranty", href: "/warranty" },
  ];

  const handleBookNow = () => {
    setIsMobileMenuOpen(false);
    if (location !== "/") {
      setLocation("/");
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      {/* Custom SVG Tire Scrollbar */}
      <div className="fixed right-2 md:right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center h-[40vh] md:h-[60vh] pointer-events-none">
        <div className="relative h-full w-1 bg-white/10 rounded-full">
          <div 
            className="absolute left-1/2 w-10 h-10 md:w-14 md:h-14"
            style={{ 
              top: `${scrollProgress * 100}%`,
              transform: `translateX(-50%) translateY(-50%) rotate(${tireRotation}deg)`,
              filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.4))'
            }}
          >
            <TireSVG className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Moving Car on Scroll with Smoke Exhaust - Positioned at bottom */}
      <div 
        className="fixed z-30 pointer-events-none block"
        style={{ 
          transform: `translateX(${carX}px)`,
          left: 0,
          bottom: '-30px',
          transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
        }}
      >
        <div className="relative">
          {/* Stop Smoke Burst Particles - From rear (left side after flip) */}
          <div className="absolute left-0 top-1/2" style={{ transform: 'translateY(-30%)' }}>
            {stopSmokeParticles.map((particle) => (
              <div
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  left: `${particle.x}px`,
                  top: `${particle.y}px`,
                  width: `${30 * particle.scale}px`,
                  height: `${30 * particle.scale}px`,
                  opacity: particle.opacity,
                  background: `radial-gradient(circle, rgba(0, 255, 255, ${particle.opacity * 0.6}) 0%, rgba(0, 200, 200, ${particle.opacity * 0.4}) 30%, rgba(0, 150, 150, ${particle.opacity * 0.2}) 60%, transparent 100%)`,
                  transform: 'translate(-50%, -50%)',
                  filter: 'blur(3px)',
                  boxShadow: `0 0 ${10 * particle.scale}px rgba(0, 255, 255, ${particle.opacity * 0.2})`
                }}
              />
            ))}
          </div>

          {/* Regular Smoke Exhaust Particles - From rear (left side after flip) */}
          <div className="absolute left-4 top-1/2" style={{ transform: 'translateY(-30%)' }}>
            {smokeParticles.map((particle) => (
              <div
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  left: `${particle.x}px`,
                  top: `${particle.y}px`,
                  width: `${20 * particle.scale}px`,
                  height: `${20 * particle.scale}px`,
                  opacity: particle.opacity,
                  background: `radial-gradient(circle, rgba(0, 255, 255, ${particle.opacity * 0.5}) 0%, rgba(0, 200, 200, ${particle.opacity * 0.3}) 40%, rgba(0, 150, 150, ${particle.opacity * 0.1}) 70%, transparent 100%)`,
                  transform: 'translate(-50%, -50%)',
                  filter: 'blur(2px)',
                  boxShadow: `0 0 ${6 * particle.scale}px rgba(0, 255, 255, ${particle.opacity * 0.15})`
                }}
              />
            ))}
          </div>
          
          {/* Continuous smoke trail effect while moving - Behind car rear bumper */}
          {isMoving && (
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-16 h-8"
              style={{
                left: '-60px',
                background: 'linear-gradient(to left, rgba(0, 200, 200, 0.25), rgba(0, 150, 150, 0.1), transparent)',
                filter: 'blur(8px)',
                opacity: 0.4,
              }}
            />
          )}

          {/* Brake smoke effect when stopping - Behind rear bumper */}
          {justStopped && (
            <div 
              className="absolute bottom-4 w-16 h-6 animate-pulse"
              style={{
                left: '-40px',
                background: 'radial-gradient(ellipse at center, rgba(0, 255, 255, 0.3), transparent 70%)',
                filter: 'blur(6px)',
              }}
            />
          )}
          
          {/* Ground Reflection/Glow - Cyan to match car */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-72 h-12 bg-gradient-to-t from-cyan-400/40 to-transparent blur-2xl opacity-60" />
          
          {/* Car headlight glow - Cyan on right (front after flip) */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-20 h-10 bg-gradient-to-r from-transparent to-cyan-400/40 blur-xl opacity-60" />
          
          {/* Car Image - Futuristic car flipped to face right */}
          <img 
            src={futuristicCarImage} 
            alt="Futuristic Racing Car" 
            className="w-[160px] md:w-[280px] h-auto object-contain"
            style={{ 
              transform: 'scaleX(-1)',
              filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.6)) drop-shadow(0 0 20px rgba(0, 255, 255, 0.3))'
            }}
          />
        </div>
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Top Bar - Contact & Social */}
        <div className={`transition-all duration-300 ${isScrolled ? "bg-black" : "bg-black/80"}`}>
          <div className="max-w-[1400px] mx-auto px-6 py-1.5 flex justify-between items-center">
            {/* Contact Info */}
            <div className="hidden md:flex items-center gap-5 text-white">
              <a href="mailto:info@autogamma.in" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Mail size={16} className="text-white" />
                <span className="text-white font-medium">info@autogamma.in</span>
              </a>
              <span className="text-white/50">|</span>
              <a href="tel:+919226882024" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Phone size={16} className="text-white" />
                <span className="text-white font-medium">+91 92268 82024</span>
              </a>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Facebook">
                <Facebook size={16} className="text-black" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="X">
                <XIcon size={16} className="text-black" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Instagram">
                <Instagram size={16} className="text-black" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="YouTube">
                <Youtube size={16} className="text-black" />
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className={`transition-all duration-300 ${
          isScrolled ? "bg-black/95 backdrop-blur-md border-b border-white/10" : "bg-black/60 backdrop-blur-sm"
        }`}>
          <div className="max-w-[1400px] mx-auto px-6 py-2 flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="cursor-pointer shrink-0">
              <img 
                src={autoGammaLogo} 
                alt="Auto Gamma" 
                className="h-9 md:h-10 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="relative group cursor-pointer py-2"
                >
                  <span className="text-base font-semibold tracking-wide transition-colors text-white">
                    {link.name}
                  </span>
                  {/* Sliding red underline on hover */}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-out ${
                    location === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}></span>
                </Link>
              ))}
            </nav>

            {/* Service Enquiry Button */}
            <div className="hidden lg:block">
              <Button 
                onClick={handleBookNow} 
                className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-2.5 uppercase tracking-wide"
              >
                Service Enquiry
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 pt-32 px-4 lg:hidden flex flex-col gap-6 items-center"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="relative group text-xl font-medium text-white cursor-pointer py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-out ${
                  location === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
            ))}
            <Button className="bg-primary w-full max-w-xs mt-4" onClick={handleBookNow}>
              Service Enquiry
            </Button>
            
            {/* Mobile Contact Info */}
            <div className="mt-6 text-center text-white/80 text-sm space-y-2">
              <a href="mailto:info@autogamma.in" className="flex items-center justify-center gap-2">
                <Mail size={14} />
                <span>info@autogamma.in</span>
              </a>
              <a href="tel:+919226882024" className="flex items-center justify-center gap-2">
                <Phone size={14} />
                <span>+91 92268 82024</span>
              </a>
            </div>
            
            {/* Mobile Social Icons */}
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:opacity-80 transition-opacity">
                <Facebook size={18} className="text-black" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:opacity-80 transition-opacity">
                <XIcon size={18} className="text-black" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:opacity-80 transition-opacity">
                <Instagram size={18} className="text-black" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:opacity-80 transition-opacity">
                <Youtube size={18} className="text-black" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow pt-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand Column */}
            <div className="space-y-6">
              <img 
                src={autoGammaLogo} 
                alt="Auto Gamma" 
                className="h-8 w-auto object-contain"
              />
              <p className="text-muted-foreground italic leading-relaxed">
                "The realm of automotive luxury and the transformative power of precision detailing, where every detail matters."
              </p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-orbitron font-bold text-white">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group cursor-pointer">
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform text-primary" />
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform text-primary" />
                    Download Brochure
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-lg font-orbitron font-bold text-white">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="text-primary shrink-0 mt-1" size={18} />
                  <span>Shop no. 16 & 17, Shreeji Parasio, Beside Tulsi Aangan Soc., Prasad Hotel Road, Badlapur, Maharashtra - 421503</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="text-primary shrink-0" size={18} />
                  <a href="tel:+919226882024" className="hover:text-white">+91 92268 82024</a>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="text-primary shrink-0" size={18} />
                  <a href="mailto:info@autogamma.in" className="hover:text-white">info@autogamma.in</a>
                </li>
              </ul>
            </div>

            {/* Directions */}
            <div className="space-y-6">
              <h4 className="text-lg font-orbitron font-bold text-white">Find Us</h4>
              <div className="rounded-lg overflow-hidden h-32 border border-white/10">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.123456789!2d73.2585!3d19.1665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA5JzU5LjQiTiA3M8KwMTUnMzAuNiJF!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Auto Gamma Location"
                />
              </div>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Shop+no.+16+%26+17+Shreeji+Parasio+Beside+Tulsi+Aangan+Soc+Prasad+Hotel+Road+Badlapur+Maharashtra+421503"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold">
                  <MapPin className="mr-2 h-4 w-4" /> GET DIRECTIONS
                </Button>
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Auto Gamma. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
