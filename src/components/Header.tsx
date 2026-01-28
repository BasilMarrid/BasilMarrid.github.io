import { Phone, Mail } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-lg">EY</span>
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-primary">EY CPA</h1>
              <p className="text-xs text-muted-foreground">Certified Public Accountant</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium text-foreground hover:text-accent transition-colors">About</a>
            <a href="#services" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Services</a>
            <a href="#experience" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Experience</a>
            <a href="#contact" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Contact</a>
          </nav>

          <div className="hidden lg:flex items-center gap-4 text-sm">
            <a href="tel:+972-XX-XXX-XXXX" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
              <Phone className="w-4 h-4" />
              <span>+972-XX-XXX-XXXX</span>
            </a>
            <a href="mailto:contact@eycpa.org.il" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
              <Mail className="w-4 h-4" />
              <span>contact@eycpa.org.il</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
