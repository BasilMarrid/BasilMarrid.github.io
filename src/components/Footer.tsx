const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-serif font-bold text-lg">EY</span>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-primary-foreground">EY CPA</h3>
              <p className="text-xs text-primary-foreground/60">Certified Public Accountant</p>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            <a href="#about" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">About</a>
            <a href="#services" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Services</a>
            <a href="#experience" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Experience</a>
            <a href="#contact" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Contact</a>
          </nav>

          <p className="text-sm text-primary-foreground/60">
            © {currentYear} EY CPA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
