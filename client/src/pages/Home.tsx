import { useState, useEffect } from "react";
import { ApplicationForm } from "@/components/ApplicationForm";
import { motion, AnimatePresence } from "framer-motion";
import { Hammer, HardHat, CheckCircle, ShieldCheck, Truck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import stock images
import heroImg1 from "@assets/stock_images/uk_construction_site_108bed2d.jpg";
import heroImg2 from "@assets/stock_images/professional_constru_2ae98649.jpg";
import heroImg3 from "@assets/stock_images/construction_machine_2ce6a12a.jpg";
import heroImg4 from "@assets/stock_images/construction_safety__b8472689.jpg";
import heroImg5 from "@assets/stock_images/construction_scaffol_d71396d7.jpg";

const heroImages = [heroImg1, heroImg2, heroImg3, heroImg4, heroImg5];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToForm = () => {
    document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <HardHat className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900">
              Kaizen<span className="text-primary">Sourcing</span>
            </span>
          </div>
          <Button onClick={scrollToForm} size="sm" className="bg-secondary hover:bg-secondary/90 text-white font-medium">
            Apply Now
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden pt-16">
        {/* Background Slider */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40 z-10" />
            <img 
              src={heroImages[currentImageIndex]} 
              alt="Construction Site" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="container relative z-20 px-4 text-center md:text-left">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-200 text-sm font-medium mb-6 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-orange-500 mr-2 animate-pulse" />
                Now Hiring Across the UK
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-display leading-tight mb-6 drop-shadow-lg"
            >
              Join the Best UK <br/>
              <span className="text-primary">Construction Jobs</span> Today!
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed font-light"
            >
              Secure your role in top UK construction projects. We offer flexible payment options including PAYE, CIS, Umbrella & Ltd Company.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Button 
                size="lg" 
                onClick={scrollToForm}
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 h-14 rounded-xl text-lg shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all"
              >
                Start Application
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 h-14 rounded-xl px-8 backdrop-blur-sm"
              >
                View Open Roles
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features / Trust Signals */}
      <section className="bg-white border-b border-gray-100 py-12 relative z-30 -mt-8 mx-4 rounded-xl shadow-xl max-w-6xl md:mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900">Fully Compliant</h3>
            <p className="text-sm text-gray-500">CIS & GDPR Certified</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
              <Truck className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-bold text-gray-900">Top Projects</h3>
            <p className="text-sm text-gray-500">Major UK Sites</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
              <Hammer className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900">Weekly Pay</h3>
            <p className="text-sm text-gray-500">Reliable & On Time</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900">Dedicated Team</h3>
            <p className="text-sm text-gray-500">24/7 Support</p>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply-form" className="py-20 md:py-32 px-4 container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-display mb-4">
            Ready to Start Working?
          </h2>
          <p className="text-lg text-gray-600">
            Complete the form below to register with Kaizen Sourcing. It only takes 5 minutes to get verified and matched with jobs.
          </p>
        </div>

        <ApplicationForm />
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="flex items-center space-x-2 mb-4 text-white">
              <HardHat className="w-6 h-6" />
              <span className="font-display font-bold text-lg">Kaizen Sourcing</span>
            </div>
            <p className="max-w-xs">
              Connecting skilled tradespeople with the UK's leading construction projects.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li>020 7123 4567</li>
              <li>jobs@kaizensourcing.co.uk</li>
              <li>123 Construction House, London</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          © {new Date().getFullYear()} Kaizen Sourcing Limited. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
