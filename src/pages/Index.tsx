import { Phone, Mail, MapPin, ArrowLeft, CheckCircle2, Shield, Clock, TrendingUp, Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useRef } from "react";

const Index = () => {
  const currentYear = new Date().getFullYear();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const observerRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    Object.values(observerRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xzdgopvv", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        alert("שגיאה בשליחת הטופס. נסה שוב.");
      }
    } catch {
      alert("שגיאה בשליחת הטופס. נסה שוב.");
    }
  };

  const setRef = (id: string) => (el: HTMLElement | null) => {
    observerRefs.current[id] = el;
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden" dir="rtl">
      {/* Header */}
      <header className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-primary/98 backdrop-blur-md shadow-lg" : "bg-primary/95 backdrop-blur-sm"
      } border-b border-gold/20`}>
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl" />
                <img src="./favicon.ico" alt="Logo" className="relative w-10 h-10 sm:w-14 sm:h-14" />
              </div>
              <p className="text-sm sm:text-lg font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-gold-light">החזר מס</p>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <NavLink
                to="/about"
                className="group relative px-4 py-2 text-sm font-semibold text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <span className="relative z-10">מי אנחנו?</span>
                <span className="absolute bottom-0 right-0 h-0.5 w-0 bg-gold group-hover:w-full transition-all duration-300" />
              </NavLink>
              <a
                href="#contact"
                className="px-5 py-2.5 bg-gold hover:bg-gold-light text-navy font-bold text-sm rounded transition-all duration-300 hover:shadow-gold"
              >
                צור קשר
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 -ml-2 text-primary-foreground hover:text-gold transition-colors"
              aria-label="תפריט"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-navy/95 backdrop-blur-lg md:hidden transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMobileMenu}
      >
        <div
          className={`absolute top-20 right-0 left-0 p-6 transition-all duration-300 ${
            mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="flex flex-col gap-2">
            <NavLink
              to="/about"
              onClick={closeMobileMenu}
              className="flex items-center justify-between p-4 bg-navy-light/30 rounded-xl text-lg font-semibold text-primary-foreground hover:bg-navy-light/50 transition-colors active:scale-[0.98]"
            >
              <span>מי אנחנו?</span>
              <ArrowLeft className="w-5 h-5 text-gold" />
            </NavLink>
            <a
              href="#contact"
              onClick={closeMobileMenu}
              className="flex items-center justify-between p-4 bg-gold/20 rounded-xl text-lg font-semibold text-gold hover:bg-gold/30 transition-colors active:scale-[0.98]"
            >
              <span>צור קשר</span>
              <Phone className="w-5 h-5" />
            </a>
          </nav>

          {/* Quick Contact in Mobile Menu */}
          <div className="mt-8 pt-6 border-t border-primary-foreground/10">
            <p className="text-sm text-primary-foreground/60 mb-4">התקשר עכשיו</p>
            <a
              href="tel:+972549452800"
              className="flex items-center gap-4 p-4 bg-gold text-navy rounded-xl font-bold text-lg active:scale-[0.98] transition-transform"
            >
              <Phone className="w-6 h-6" />
              <span dir="ltr">054-945-2800</span>
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[100svh] bg-gradient-hero clip-diagonal-mobile sm:clip-diagonal overflow-hidden">
        {/* Decorative elements - reduced on mobile */}
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute top-20 left-5 sm:left-10 w-40 sm:w-72 h-40 sm:h-72 bg-gold/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 right-10 sm:right-20 w-52 sm:w-96 h-52 sm:h-96 bg-gold/10 rounded-full blur-3xl animate-float delay-300" />

        {/* Geometric accent lines - hidden on very small screens */}
        <div className="hidden sm:block absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="hidden sm:block absolute bottom-1/3 right-0 w-1/4 h-px bg-gradient-to-l from-transparent via-gold/30 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 pt-28 sm:pt-40 pb-24 sm:pb-32 relative z-10">
          <div className="max-w-4xl mr-0 ml-auto">
            {/* Overline */}
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6 opacity-0-initial animate-fade-in-up">
              <div className="h-px w-8 sm:w-12 bg-gold" />
              <span className="text-gold font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-xs sm:text-sm">מומחים בהחזרי מס</span>
            </div>

            {/* Main headline - responsive sizing */}
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-primary-foreground leading-[1] sm:leading-[0.95] mb-3 sm:mb-6 opacity-0-initial animate-fade-in-up delay-100">
              הכסף שלך
              <br />
              <span className="text-gradient-gold">מחכה לך</span>
            </h2>

            {/* Subheadline */}
            <p className="text-base sm:text-xl md:text-2xl text-primary-foreground/70 max-w-xl mb-6 sm:mb-10 leading-relaxed opacity-0-initial animate-fade-in-up delay-200">
              ניסיון של למעלה מ-5 שנים בליווי עסקים ולקוחות פרטיים.
              נמקסם את ההחזר שלך בצורה מקצועית ואמינה.
            </p>

            {/* CTA Buttons - stacked on mobile */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 opacity-0-initial animate-fade-in-up delay-300">
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 bg-gold text-navy font-bold text-base sm:text-lg rounded-xl sm:rounded overflow-hidden transition-all duration-300 hover:shadow-gold active:scale-[0.98]"
              >
                <span className="relative z-10">בדוק זכאות להחזר</span>
                <ArrowLeft className="relative z-10 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gold-light translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </a>
              <a
                href="tel:+972549452800"
                className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-base sm:text-lg rounded-xl sm:rounded hover:border-gold hover:text-gold transition-all duration-300 active:scale-[0.98]"
              >
                <Phone className="w-5 h-5" />
                <span dir="ltr">054-945-2800</span>
              </a>
            </div>

            {/* Trust indicators - horizontal scroll on mobile */}
            <div className="mt-8 sm:mt-14 pt-5 sm:pt-8 border-t border-primary-foreground/10 opacity-0-initial animate-fade-in-up delay-400">
              <div className="flex sm:flex-wrap items-center gap-4 sm:gap-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
                <div className="flex items-center gap-2 text-primary-foreground/60 whitespace-nowrap">
                  <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5 text-gold flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">ללא עלות ראשונית</span>
                </div>
                <div className="flex items-center gap-2 text-primary-foreground/60 whitespace-nowrap">
                  <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-gold flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">סודיות מוחלטת</span>
                </div>
                <div className="flex items-center gap-2 text-primary-foreground/60 whitespace-nowrap">
                  <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-gold flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">מענה תוך 24 שעות</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator - hidden on mobile */}
        <div className="hidden sm:flex absolute bottom-24 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-primary-foreground/40">
          <span className="text-xs tracking-widest uppercase">גלול למטה</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* Stats Section */}
      <section
        id="stats"
        ref={setRef("stats")}
        className="relative -mt-16 sm:-mt-20 z-20 pb-12 sm:pb-20"
      >
        <div className="container mx-auto px-4 sm:px-6">
          {/* Vertical on mobile, grid on desktop */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 ${isVisible.stats ? "opacity-100" : "opacity-0"} transition-all duration-700`}>
            {[
              { number: "5+", label: "שנות ניסיון", icon: TrendingUp },
              { number: "₪M+", label: "הוחזרו ללקוחות", icon: Sparkles },
              { number: "100%", label: "שביעות רצון", icon: CheckCircle2 },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="group relative bg-card rounded-xl sm:rounded-lg p-5 sm:p-8 shadow-elegant border border-border hover:border-gold/30 transition-all duration-500"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 bg-gold/5 rounded-bl-full" />
                <div className="flex items-center gap-4 sm:block">
                  <stat.icon className="w-6 sm:w-8 h-6 sm:h-8 text-gold sm:mb-4 flex-shrink-0" />
                  <div>
                    <div className="text-2xl sm:text-4xl md:text-5xl font-black text-navy mb-0.5 sm:mb-2">{stat.number}</div>
                    <div className="text-sm sm:text-base text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        ref={setRef("services")}
        className="py-16 sm:py-24 bg-geometric relative"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`max-w-3xl mx-auto text-center mb-10 sm:mb-16 ${isVisible.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
            <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-gold/10 text-gold font-semibold text-xs sm:text-sm rounded-full mb-4 sm:mb-6">השירותים שלנו</span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-4 sm:mb-6">
              פתרונות מס <span className="text-gradient-gold">מקיפים</span>
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
              אנו מציעים מגוון רחב של שירותי החזרי מס ללקוחות פרטיים ועסקיים
            </p>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto ${isVisible.services ? "opacity-100" : "opacity-0"} transition-all duration-700 delay-200`}>
            {[
              { title: "החזרי מס לשכירים", desc: "בדיקת זכאות והגשת בקשות להחזר מס עבור עובדים שכירים" },
              { title: "החזרי מס לעצמאים", desc: "ליווי מקצועי לעצמאים ובעלי עסקים קטנים" },
              { title: "תכנון מס", desc: "ייעוץ ותכנון מס חכם לחיסכון מקסימלי" },
              { title: "ייצוג מול רשויות", desc: "ייצוג מלא מול רשות המיסים בכל שלב" },
            ].map((service, index) => (
              <div
                key={service.title}
                className="group relative p-5 sm:p-8 bg-card rounded-xl sm:rounded-lg border border-border hover:border-gold/50 hover:shadow-elegant transition-all duration-500 active:scale-[0.99]"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 right-0 h-1 w-0 bg-gold group-hover:w-full transition-all duration-500 rounded-tr-xl sm:rounded-tr-lg" />
                <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">{service.title}</h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={setRef("contact")}
        className="py-16 sm:py-24 bg-primary relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute top-20 right-5 sm:right-10 w-40 sm:w-64 h-40 sm:h-64 bg-gold/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className={`text-center mb-10 sm:mb-16 ${isVisible.contact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
            <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-gold/20 text-gold font-semibold text-xs sm:text-sm rounded-full mb-4 sm:mb-6">צור קשר</span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary-foreground mb-4 sm:mb-6">
              בואו <span className="text-gradient-gold">נדבר</span>
            </h3>
            <p className="text-base sm:text-lg text-primary-foreground/70 max-w-xl mx-auto px-4 sm:px-0">
              השאירו פרטים ונחזור אליכם תוך 24 שעות עם הערכה ראשונית
            </p>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto ${isVisible.contact ? "opacity-100" : "opacity-0"} transition-all duration-700 delay-200`}>
            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <h4 className="text-xl sm:text-2xl font-bold text-primary-foreground mb-4 sm:mb-8 text-center lg:text-right">פרטי התקשרות</h4>

              <a
                href="tel:+972549452800"
                className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-navy-light/30 border border-primary-foreground/10 rounded-xl sm:rounded-lg hover:border-gold/50 hover:bg-navy-light/50 transition-all duration-300 active:scale-[0.98]"
              >
                <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-gold/20 flex items-center justify-center group-hover:animate-pulse-gold flex-shrink-0">
                  <Phone className="w-5 sm:w-6 h-5 sm:h-6 text-gold" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-primary-foreground/60 mb-0.5 sm:mb-1">טלפון</p>
                  <p className="text-lg sm:text-xl font-bold text-primary-foreground truncate" dir="ltr">054-945-2800</p>
                </div>
              </a>

              <a
                href="mailto:contact@eycpa.org.il"
                className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-navy-light/30 border border-primary-foreground/10 rounded-xl sm:rounded-lg hover:border-gold/50 hover:bg-navy-light/50 transition-all duration-300 active:scale-[0.98]"
              >
                <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-gold/20 flex items-center justify-center group-hover:animate-pulse-gold flex-shrink-0">
                  <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-gold" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-primary-foreground/60 mb-0.5 sm:mb-1">דוא"ל</p>
                  <p className="text-lg sm:text-xl font-bold text-primary-foreground truncate">contact@eycpa.org.il</p>
                </div>
              </a>

              <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-navy-light/30 border border-primary-foreground/10 rounded-xl sm:rounded-lg">
                <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-gold" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-primary-foreground/60 mb-0.5 sm:mb-1">מיקום</p>
                  <p className="text-lg sm:text-xl font-bold text-primary-foreground">ישראל</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-xl sm:rounded-lg p-5 sm:p-8 shadow-elegant order-1 lg:order-2">
              <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6 text-center lg:text-right">השאר פרטים</h4>

              {isSubmitted ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-scale-in">
                    <CheckCircle2 className="w-8 sm:w-10 h-8 sm:h-10 text-green-600" />
                  </div>
                  <h5 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">תודה רבה!</h5>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">הפרטים נשלחו בהצלחה. נחזור אליך בקרוב.</p>
                  <Button onClick={() => setIsSubmitted(false)} variant="outline" className="h-11 sm:h-10">
                    שלח פרטים נוספים
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-foreground font-semibold text-sm sm:text-base">שם מלא</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="הכנס את שמך המלא"
                      required
                      className="mt-1.5 sm:mt-2 h-12 sm:h-12 bg-background border-border focus:border-gold focus:ring-gold text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground font-semibold text-sm sm:text-base">דוא"ל</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder='הכנס את כתובת הדוא"ל שלך'
                      required
                      className="mt-1.5 sm:mt-2 h-12 sm:h-12 bg-background border-border focus:border-gold focus:ring-gold text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-foreground font-semibold text-sm sm:text-base">טלפון</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="הכנס את מספר הטלפון שלך"
                      required
                      dir="rtl"
                      className="mt-1.5 sm:mt-2 h-12 sm:h-12 bg-background border-border focus:border-gold focus:ring-gold text-base placeholder:text-right"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 sm:h-12 bg-gold hover:bg-gold-light text-navy font-bold text-base sm:text-lg transition-all duration-300 hover:shadow-gold active:scale-[0.98] rounded-xl sm:rounded"
                  >
                    שלח פרטים
                  </Button>
                  <p className="text-[11px] sm:text-xs text-muted-foreground text-center">
                    המידע שלך מאובטח ולא יועבר לצד שלישי
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-8 sm:py-12 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:justify-between">
            <div className="flex items-center gap-3">
              <img src="./favicon.ico" alt="Logo" className="w-8 sm:w-10 h-8 sm:h-10 opacity-80" />
              <span className="text-gold-light font-medium text-sm sm:text-base tracking-wider">החזר מס</span>
            </div>
            <p className="text-primary-foreground/50 text-xs sm:text-sm text-center">
              © {currentYear} EY CPA. כל הזכויות שמורות.
            </p>
            <NavLink
              to="/about"
              className="text-primary-foreground/60 hover:text-gold text-xs sm:text-sm transition-colors"
            >
              מי אנחנו?
            </NavLink>
          </div>
        </div>
      </footer>

      {/* Floating CTA - Mobile Only */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-navy via-navy/95 to-transparent md:hidden transition-all duration-300 ${
        scrolled ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}>
        <a
          href="tel:+972549452800"
          className="flex items-center justify-center gap-3 w-full py-4 bg-gold text-navy font-bold text-lg rounded-xl shadow-gold active:scale-[0.98] transition-transform"
        >
          <Phone className="w-5 h-5" />
          <span>התקשר עכשיו</span>
        </a>
      </div>
    </div>
  );
};

export default Index;
