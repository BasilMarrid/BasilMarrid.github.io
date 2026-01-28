import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 border border-primary-foreground/20 rounded-full" />
        <div className="absolute bottom-20 right-20 w-96 h-96 border border-primary-foreground/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary-foreground/10 rounded-full" />
      </div>

      <div className="container mx-auto px-6 py-24 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block mb-6 px-4 py-2 bg-accent/20 rounded-full">
            <span className="text-gold-light text-sm font-medium tracking-wide">Licensed CPA • Israel</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Professional
            <span className="block text-gradient-gold">Financial Expertise</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Trusted accounting services with decades of experience. Helping businesses and individuals navigate complex financial landscapes with clarity and precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-gold-light text-accent-foreground font-semibold px-8 py-6 text-base shadow-gold transition-all duration-300"
              asChild
            >
              <a href="#contact">Get in Touch</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-base"
              asChild
            >
              <a href="#services">View Services</a>
            </Button>
          </div>
        </div>

        <a 
          href="#about" 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary-foreground/60 hover:text-primary-foreground transition-colors animate-bounce"
        >
          <ArrowDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
