import { Phone, Mail, MapPin, ArrowLeft, CheckCircle2, Shield, Clock, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useRef } from "react";

const Index = () => {
  const currentYear = new Date().getFullYear();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
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
        alert("שגיאה בשליחת הטופס. אנא נסה שוב.");
      }
    } catch {
      alert("שגיאה בשליחת הטופס. אנא נסה שוב.");
    }
  };

  const setRef = (id: string) => (el: HTMLElement | null) => {
    observerRefs.current[id] = el;
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden" dir="rtl">
      {/* Header */}
      <header className="fixed top-0 right-0 left-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-gold/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl" />
                <img src="./favicon.ico" alt="Logo" className="relative w-14 h-14" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-primary-foreground">
                  EY <span className="text-gradient-gold">CPA</span>
                </h1>
                <p className="text-xs font-medium tracking-[0.3em] uppercase text-gold-light">החזר מס</p>
              </div>
            </div>

            <nav className="flex items-center gap-6">
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
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-hero clip-diagonal overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-float delay-300" />

        {/* Geometric accent lines */}
        <div className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute bottom-1/3 right-0 w-1/4 h-px bg-gradient-to-l from-transparent via-gold/30 to-transparent" />

        <div className="container mx-auto px-6 pt-40 pb-32 relative z-10">
          <div className="max-w-4xl mr-0 ml-auto">
            {/* Overline */}
            <div className="flex items-center gap-3 mb-8 opacity-0-initial animate-fade-in-up">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold font-semibold tracking-[0.2em] uppercase text-sm">מומחים בהחזרי מס</span>
            </div>

            {/* Main headline */}
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary-foreground leading-[0.95] mb-8 opacity-0-initial animate-fade-in-up delay-100">
              הכסף שלך
              <br />
              <span className="text-gradient-gold">מחכה לך</span>
            </h2>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-primary-foreground/70 max-w-xl mb-12 leading-relaxed opacity-0-initial animate-fade-in-up delay-200">
              ניסיון של למעלה מ-5 שנים בליווי עסקים ולקוחות פרטיים.
              נמקסם את ההחזר שלך בצורה מקצועית ואמינה.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 opacity-0-initial animate-fade-in-up delay-300">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gold text-navy font-bold text-lg rounded overflow-hidden transition-all duration-300 hover:shadow-gold"
              >
                <span className="relative z-10">בדוק זכאות להחזר</span>
                <ArrowLeft className="relative z-10 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gold-light translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </a>
              <a
                href="tel:+972549452800"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-lg rounded hover:border-gold hover:text-gold transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                <span dir="ltr">054-945-2800</span>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-8 mt-16 pt-8 border-t border-primary-foreground/10 opacity-0-initial animate-fade-in-up delay-400">
              <div className="flex items-center gap-2 text-primary-foreground/60">
                <CheckCircle2 className="w-5 h-5 text-gold" />
                <span className="text-sm font-medium">ללא עלות ראשונית</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/60">
                <Shield className="w-5 h-5 text-gold" />
                <span className="text-sm font-medium">סודיות מוחלטת</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/60">
                <Clock className="w-5 h-5 text-gold" />
                <span className="text-sm font-medium">מענה תוך 24 שעות</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-foreground/40">
          <span className="text-xs tracking-widest uppercase">גלול למטה</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* Stats Section */}
      <section
        id="stats"
        ref={setRef("stats")}
        className="relative -mt-20 z-20 pb-20"
      >
        <div className="container mx-auto px-6">
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isVisible.stats ? "opacity-100" : "opacity-0"} transition-all duration-700`}>
            {[
              { number: "5+", label: "שנות ניסיון", icon: TrendingUp },
              { number: "₪M+", label: "הוחזרו ללקוחות", icon: Sparkles },
              { number: "100%", label: "שביעות רצון", icon: CheckCircle2 },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="group relative bg-card rounded-lg p-8 shadow-elegant border border-border hover:border-gold/30 transition-all duration-500"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gold/5 rounded-bl-full" />
                <stat.icon className="w-8 h-8 text-gold mb-4" />
                <div className="text-4xl md:text-5xl font-black text-navy mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        ref={setRef("services")}
        className="py-24 bg-geometric relative"
      >
        <div className="container mx-auto px-6">
          <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
            <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold font-semibold text-sm rounded-full mb-6">השירותים שלנו</span>
            <h3 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              פתרונות מס <span className="text-gradient-gold">מקיפים</span>
            </h3>
            <p className="text-lg text-muted-foreground">
              אנו מציעים מגוון רחב של שירותי החזרי מס ללקוחות פרטיים ועסקיים
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto ${isVisible.services ? "opacity-100" : "opacity-0"} transition-all duration-700 delay-200`}>
            {[
              { title: "החזרי מס לשכירים", desc: "בדיקת זכאות והגשת בקשות להחזר מס עבור עובדים שכירים" },
              { title: "החזרי מס לעצמאים", desc: "ליווי מקצועי לעצמאים ובעלי עסקים קטנים" },
              { title: "תכנון מס", desc: "ייעוץ ותכנון מס חכם לחיסכון מקסימלי" },
              { title: "ייצוג מול רשויות", desc: "ייצוג מלא מול רשות המיסים בכל שלב" },
            ].map((service, index) => (
              <div
                key={service.title}
                className="group relative p-8 bg-card rounded-lg border border-border hover:border-gold/50 hover:shadow-elegant transition-all duration-500"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 right-0 h-1 w-0 bg-gold group-hover:w-full transition-all duration-500 rounded-tr-lg" />
                <h4 className="text-xl font-bold text-foreground mb-3">{service.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={setRef("contact")}
        className="py-24 bg-primary relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute top-20 right-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <div className={`text-center mb-16 ${isVisible.contact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
            <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold font-semibold text-sm rounded-full mb-6">צור קשר</span>
            <h3 className="text-4xl md:text-5xl font-black text-primary-foreground mb-6">
              בואו <span className="text-gradient-gold">נדבר</span>
            </h3>
            <p className="text-lg text-primary-foreground/70 max-w-xl mx-auto">
              השאירו פרטים ונחזור אליכם תוך 24 שעות עם הערכה ראשונית
            </p>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto ${isVisible.contact ? "opacity-100" : "opacity-0"} transition-all duration-700 delay-200`}>
            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-primary-foreground mb-8">פרטי התקשרות</h4>

              <a
                href="tel:+972549452800"
                className="group flex items-center gap-4 p-5 bg-navy-light/30 border border-primary-foreground/10 rounded-lg hover:border-gold/50 hover:bg-navy-light/50 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center group-hover:animate-pulse-gold">
                  <Phone className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60 mb-1">טלפון</p>
                  <p className="text-xl font-bold text-primary-foreground" dir="ltr">054-945-2800</p>
                </div>
              </a>

              <a
                href="mailto:contact@eycpa.org.il"
                className="group flex items-center gap-4 p-5 bg-navy-light/30 border border-primary-foreground/10 rounded-lg hover:border-gold/50 hover:bg-navy-light/50 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center group-hover:animate-pulse-gold">
                  <Mail className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60 mb-1">דוא"ל</p>
                  <p className="text-xl font-bold text-primary-foreground">contact@eycpa.org.il</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-5 bg-navy-light/30 border border-primary-foreground/10 rounded-lg">
                <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60 mb-1">מיקום</p>
                  <p className="text-xl font-bold text-primary-foreground">ישראל</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-lg p-8 shadow-elegant">
              <h4 className="text-2xl font-bold text-foreground mb-6">השאר פרטים</h4>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-scale-in">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h5 className="text-2xl font-bold text-foreground mb-3">תודה רבה!</h5>
                  <p className="text-muted-foreground mb-6">הפרטים נשלחו בהצלחה. נחזור אליך בקרוב.</p>
                  <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    שלח פרטים נוספים
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-foreground font-semibold">שם מלא</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="הכנס את שמך המלא"
                      required
                      className="mt-2 h-12 bg-background border-border focus:border-gold focus:ring-gold"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground font-semibold">דוא"ל</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder='הכנס את כתובת הדוא"ל שלך'
                      required
                      className="mt-2 h-12 bg-background border-border focus:border-gold focus:ring-gold"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-foreground font-semibold">טלפון</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="הכנס את מספר הטלפון שלך"
                      required
                      className="mt-2 h-12 bg-background border-border focus:border-gold focus:ring-gold"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gold hover:bg-gold-light text-navy font-bold text-lg transition-all duration-300 hover:shadow-gold"
                  >
                    שלח פרטים
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    המידע שלך מאובטח ולא יועבר לצד שלישי
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-12 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="./favicon.ico" alt="Logo" className="w-10 h-10 opacity-80" />
              <span className="text-primary-foreground/60 font-medium">EY CPA</span>
            </div>
            <p className="text-primary-foreground/50 text-sm">
              © {currentYear} EY CPA. כל הזכויות שמורות.
            </p>
            <NavLink
              to="/about"
              className="text-primary-foreground/60 hover:text-gold text-sm transition-colors"
            >
              מי אנחנו?
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
