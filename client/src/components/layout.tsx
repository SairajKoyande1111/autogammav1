import { Link, useLocation, useRoute } from "wouter";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin, Phone, Mail, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import autoGammaLogo from "@assets/image_1765169951823.png";
import facebookIcon from "@assets/facebook_1766217005798.png";
import instagramIcon from "@assets/—Pngtree—instagram_icon_instagram_logo_vector_3584852_1766216113430.png";
import youtubeIcon from "@assets/youtube_1766216255122.png";

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
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      prevScrollY.current = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about" },
    { 
      name: "SERVICES", 
      href: "/services",
      submenu: [
        { name: "FOAM WASHING", href: "/services" },
        { name: "PREMIUM WASHING", href: "/services" },
        { name: "INTERIOR CLEANING", href: "/services" },
        { name: "INTERIOR STEAM CLEANING", href: "/services" },
        { name: "LEATHER TREATMENT", href: "/services" },
        { name: "DETAILING", href: "/services" },
        { name: "PAINT SEALANT COATING(TEFLON)", href: "/services" },
        { name: "CERAMIC COATING", href: "/services" },
        { name: "CORROSION TREATMENT", href: "/services" },
        { name: "WINDSHIELD COATING", href: "/services" },
        { name: "SUN CONTROL FILM", href: "/services" },
        { name: "PAINT PROTECTION FILM", href: "/ppf" },
      ]
    },
    { name: "BLOGS", href: "/blogs" },
    { name: "CAREERS", href: "/careers" },
    { name: "WARRANTY", href: "/warranty" },
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


      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Top Bar - Contact & Social */}
        <div className="bg-black">
          <div className="max-w-[1400px] mx-auto px-6 py-1.5 flex justify-between items-center">
            {/* Contact Info */}
            <div className="hidden md:flex items-center gap-4 text-white text-sm font-medium">
              <a href="mailto:info@autogamma.in" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail size={16} className="text-white" />
                <span>info@autogamma.in</span>
              </a>
              <span className="text-white">|</span>
              <a href="tel:+919226882024" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone size={16} className="text-white" />
                <span>+91 92268 82024</span>
              </a>
            </div>
            
            {/* Social Media Icons */}
            <div className="hidden md:flex items-center gap-5">
              <a href="#" className="w-7 h-7 flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Facebook">
                <img src={facebookIcon} alt="Facebook" className="w-full h-full object-contain" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Instagram">
                <img src={instagramIcon} alt="Instagram" className="w-full h-full object-contain" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="YouTube">
                <img src={youtubeIcon} alt="YouTube" className="w-full h-full object-contain" />
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="bg-black border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-6 py-2.5 flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="cursor-pointer shrink-0">
              <img 
                src={autoGammaLogo} 
                alt="Auto Gamma" 
                className="h-10 md:h-11 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link 
                    href={link.href}
                    className="relative group cursor-pointer py-3 flex items-center gap-1"
                  >
                    <span className="text-base font-semibold tracking-wide transition-colors text-white font-poppins">
                      {link.name}
                    </span>
                    {link.submenu && <ChevronDown size={14} className="text-white" />}
                  </Link>
                  {/* Sliding red underline on hover */}
                  <span className={`absolute bottom-0 left-0 h-1 bg-primary transition-all duration-300 ease-out ${
                    location === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}></span>
                  
                  {/* Services Dropdown */}
                  {link.submenu && (
                    <div className="absolute left-0 mt-0 w-56 bg-black border border-white/20 rounded-sm shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 group-hover:mt-2 z-50">
                      {link.submenu.map((item) => (
                        <Link 
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-3 text-sm font-medium text-white hover:bg-primary/20 hover:text-primary border-b border-white/10 last:border-b-0 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Service Enquiry Button */}
            <div className="hidden lg:block">
              <Button 
                onClick={handleBookNow} 
                className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-2.5 uppercase tracking-wider text-sm font-poppins -skew-x-12"
              >
                SERVICE ENQUIRY
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
                className="relative group text-lg font-bold text-white cursor-pointer py-2 font-poppins"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-1 bg-primary transition-all duration-300 ease-out ${
                  location === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
            ))}
            <Button className="bg-primary w-full max-w-xs mt-6 font-bold text-white font-poppins uppercase" onClick={handleBookNow}>
              SERVICE ENQUIRY
            </Button>
            
            {/* Mobile Contact Info */}
            <div className="mt-8 text-center text-white/80 text-sm space-y-3 font-poppins">
              <a href="mailto:info@autogamma.in" className="flex items-center justify-center gap-2 font-medium uppercase">
                <Mail size={14} />
                <span>INFO@AUTOGAMMA.IN</span>
              </a>
              <a href="tel:+919226882024" className="flex items-center justify-center gap-2 font-medium">
                <Phone size={14} />
                <span>+91 92268 82024</span>
              </a>
            </div>
            
            {/* Mobile Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="w-9 h-9 flex items-center justify-center hover:opacity-80 transition-opacity">
                <img src={facebookIcon} alt="Facebook" className="w-full h-full object-contain" />
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center hover:opacity-80 transition-opacity">
                <img src={instagramIcon} alt="Instagram" className="w-full h-full object-contain" />
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center hover:opacity-80 transition-opacity">
                <img src={youtubeIcon} alt="YouTube" className="w-full h-full object-contain" />
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
                "THE REALM OF AUTOMOTIVE LUXURY AND THE TRANSFORMATIVE POWER OF PRECISION DETAILING, WHERE EVERY DETAIL MATTERS."
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity">
                  <img src={facebookIcon} alt="Facebook" className="w-full h-full object-contain" />
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity">
                  <img src={instagramIcon} alt="Instagram" className="w-full h-full object-contain" />
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity">
                  <img src={youtubeIcon} alt="YouTube" className="w-full h-full object-contain" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-poppins font-bold text-white uppercase">QUICK LINKS</h4>
              <ul className="space-y-3">
                {navLinks.filter(link => !link.submenu).map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group cursor-pointer font-poppins text-sm">
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
              <h4 className="text-lg font-poppins font-bold text-white uppercase">CONTACT US</h4>
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
              <h4 className="text-lg font-poppins font-bold text-white uppercase">FIND US</h4>
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
                <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold font-poppins uppercase">
                  <MapPin className="mr-2 h-4 w-4" /> GET DIRECTIONS
                </Button>
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground font-poppins">
            <p>© {new Date().getFullYear()} AUTO GAMMA. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6 uppercase text-xs font-medium">
              <a href="#" className="hover:text-white">PRIVACY POLICY</a>
              <a href="#" className="hover:text-white">TERMS OF SERVICE</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
