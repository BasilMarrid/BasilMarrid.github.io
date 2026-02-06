import { NavLink } from "@/components/NavLink";
import { Menu, X, ArrowLeft, Award, Briefcase, GraduationCap, Phone, Mail, ChevronLeft } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const AboutHe = () => {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      setScrolled(window.scrollY > 50);
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

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    observerRefs.current[id] = el;
  };

  const team = [
    {
      name: "יוסף דאוד",
      nameEn: "Yousef Dawood",
      title: "[תפקיד / תואר מקצועי]",
      image: "./yousef.jpg",
      credentials: [
        { icon: GraduationCap, text: "[השכלה אקדמית]" },
        { icon: Award, text: "[הסמכות מקצועיות]" },
        { icon: Briefcase, text: "[שנות ניסיון]" },
      ],
      bio: "[כאן יבוא תיאור קצר על יוסף דאוד - הרקע המקצועי שלו, תחומי ההתמחות, הניסיון שצבר, והגישה הייחודית שלו לעבודה מול לקוחות. ניתן להרחיב על הישגים מרשימים, פרויקטים בולטים, או ערכים מקצועיים שמנחים את עבודתו.]",
      specialties: ["[התמחות 1]", "[התמחות 2]", "[התמחות 3]"],
      email: "[email@example.com]",
      phone: "[XXX-XXX-XXXX]",
    },
    {
      name: "[שם רואה החשבון השני]",
      nameEn: "[Second Accountant Name]",
      title: "[תפקיד / תואר מקצועי]",
      image: "./placeholder.svg",
      credentials: [
        { icon: GraduationCap, text: "[השכלה אקדמית]" },
        { icon: Award, text: "[הסמכות מקצועיות]" },
        { icon: Briefcase, text: "[שנות ניסיון]" },
      ],
      bio: "[כאן יבוא תיאור קצר על רואה החשבון השני - הרקע המקצועי שלו/ה, תחומי ההתמחות, הניסיון שצבר/ה, והגישה הייחודית שלו/ה לעבודה מול לקוחות. ניתן להרחיב על הישגים מרשימים, פרויקטים בולטים, או ערכים מקצועיים שמנחים את עבודתו/ה.]",
      specialties: ["[התמחות 1]", "[התמחות 2]", "[התמחות 3]"],
      email: "[email@example.com]",
      phone: "[XXX-XXX-XXXX]",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden" dir="rtl">
      {/* Header */}
      <header className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-primary/98 backdrop-blur-md shadow-lg" : "bg-primary/95 backdrop-blur-sm"
      } border-b border-gold/20`}>
        <div className="container mx-auto px-4 sm:px-6 2xl:px-8 py-3 sm:py-4 2xl:py-6">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="flex items-center gap-3 sm:gap-4 2xl:gap-5">
              <div className="relative">
                <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl 2xl:blur-2xl" />
                <img src="./favicon.ico" alt="Logo" className="relative w-10 h-10 sm:w-14 sm:h-14 2xl:w-16 2xl:h-16" />
              </div>
              <p className="text-sm sm:text-lg 2xl:text-xl font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-gold-light">החזר מס</p>
            </NavLink>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 2xl:gap-8">
              <NavLink
                to="/"
                className="group relative px-4 py-2 2xl:px-5 2xl:py-3 text-sm 2xl:text-base font-semibold text-primary-foreground hover:text-gold transition-colors"
              >
                <span className="relative z-10">ראשי</span>
                <span className="absolute bottom-0 right-0 h-0.5 w-0 bg-gold group-hover:w-full transition-all duration-300" />
              </NavLink>
              <NavLink
                to="/about"
                className="group relative px-4 py-2 2xl:px-5 2xl:py-3 text-sm 2xl:text-base font-semibold text-primary-foreground hover:text-gold transition-colors"
              >
                <span className="relative z-10">מי אנחנו?</span>
                <span className="absolute bottom-0 right-0 h-0.5 w-0 bg-gold group-hover:w-full transition-all duration-300" />
              </NavLink>
              <NavLink
                to="/#contact"
                className="px-5 py-2.5 2xl:px-6 2xl:py-3 border border-primary-foreground/30 text-primary-foreground font-bold text-sm 2xl:text-base rounded hover:bg-primary-foreground hover:text-navy transition-all duration-300"
              >
                צור קשר
              </NavLink>
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
              to="/"
              onClick={closeMobileMenu}
              className="flex items-center justify-between p-4 bg-navy-light/30 rounded-xl text-lg font-semibold text-primary-foreground hover:bg-navy-light/50 transition-colors active:scale-[0.98]"
            >
              <span>ראשי</span>
              <ArrowLeft className="w-5 h-5 text-gold" />
            </NavLink>
            <NavLink
              to="/#contact"
              onClick={closeMobileMenu}
              className="flex items-center justify-between p-4 bg-gold/20 rounded-xl text-lg font-semibold text-gold hover:bg-gold/30 transition-colors active:scale-[0.98]"
            >
              <span>צור קשר</span>
              <Phone className="w-5 h-5" />
            </NavLink>
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
      <section className="relative pt-24 sm:pt-32 2xl:pt-40 pb-16 sm:pb-24 2xl:pb-32 bg-gradient-hero overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute top-20 left-10 2xl:left-16 w-64 2xl:w-80 h-64 2xl:h-80 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 2xl:right-32 w-96 2xl:w-[500px] h-96 2xl:h-[500px] bg-gold/10 rounded-full blur-3xl" />

        {/* Geometric Lines */}
        <div className="absolute top-1/3 left-0 w-1/4 h-px bg-gradient-to-r from-gold/40 to-transparent" />
        <div className="absolute bottom-1/4 right-0 w-1/3 h-px bg-gradient-to-l from-gold/40 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 2xl:px-8 relative z-10">
          <div className="max-w-4xl 2xl:max-w-5xl mx-auto text-center">
            {/* Overline */}
            <div className="flex items-center justify-center gap-3 2xl:gap-4 mb-6 2xl:mb-8 opacity-0-initial animate-fade-in-up">
              <div className="h-px w-12 2xl:w-16 bg-gold" />
              <span className="text-gold font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm 2xl:text-base">
                הצוות שלנו
              </span>
              <div className="h-px w-12 2xl:w-16 bg-gold" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-black text-primary-foreground leading-tight mb-6 2xl:mb-8 opacity-0-initial animate-fade-in-up delay-100">
              מקצועיות.<br />
              <span className="text-gradient-gold">מחויבות.</span><br />
              מצוינות.
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl 2xl:text-2xl text-primary-foreground/70 max-w-2xl 2xl:max-w-3xl mx-auto leading-relaxed opacity-0-initial animate-fade-in-up delay-200">
              [כאן יבוא תיאור קצר של המשרד - הפילוסופיה, הגישה לעבודה, והמחויבות ללקוחות.
              משפט או שניים שמבטאים את הערכים המרכזיים של הצוות.]
            </p>
          </div>
        </div>

        {/* Bottom Curve */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24">
          <svg
            viewBox="0 0 1440 96"
            fill="none"
            className="absolute bottom-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 96L1440 96L1440 0C1440 0 1080 96 720 96C360 96 0 0 0 0L0 96Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-24 2xl:py-32 bg-geometric relative">
        <div className="container mx-auto px-4 sm:px-6 2xl:px-8">
          {team.map((member, index) => (
            <article
              key={member.nameEn}
              id={`member-${index}`}
              ref={setRef(`member-${index}`)}
              className={`${index > 0 ? "mt-24 sm:mt-32 2xl:mt-40 pt-16 sm:pt-20 2xl:pt-24 border-t border-border" : ""}`}
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 2xl:gap-16 items-start ${
                  isVisible[`member-${index}`]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                } transition-all duration-1000`}
              >
                {/* Image Column - Alternating sides */}
                <div
                  className={`lg:col-span-4 ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <div className="relative group max-w-[280px] sm:max-w-[320px] 2xl:max-w-[380px] mx-auto lg:mx-0">
                    {/* Gold frame effect */}
                    <div className="absolute -inset-2 sm:-inset-3 2xl:-inset-4 border-2 border-gold/30 rounded-lg transform rotate-2 group-hover:rotate-0 transition-transform duration-500" />
                    <div className="absolute -inset-2 sm:-inset-3 2xl:-inset-4 border-2 border-gold/20 rounded-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-500" />

                    {/* Image container */}
                    <div className="relative overflow-hidden rounded-lg shadow-elegant">
                      <div className="aspect-[3/4] bg-muted">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                        />
                      </div>

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Floating name tag */}
                    <div className="absolute -bottom-3 sm:-bottom-4 2xl:-bottom-5 right-3 sm:right-4 2xl:right-5 left-3 sm:left-4 2xl:left-5 bg-card p-3 sm:p-4 2xl:p-5 rounded-lg shadow-elegant border border-border">
                      <h3 className="text-lg sm:text-xl 2xl:text-2xl font-black text-foreground">{member.name}</h3>
                      <p className="text-gold font-semibold text-xs sm:text-sm 2xl:text-base mt-0.5">{member.title}</p>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div
                  className={`lg:col-span-8 pt-12 sm:pt-0 ${
                    index % 2 === 1 ? "lg:order-1 lg:pl-6 2xl:pl-8" : "lg:pr-6 2xl:pr-8"
                  }`}
                >
                  {/* Section number */}
                  <div className="flex items-center gap-4 2xl:gap-6 mb-6 sm:mb-8 2xl:mb-10">
                    <span className="text-6xl sm:text-8xl 2xl:text-9xl font-black text-gold/10">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-l from-gold/30 to-transparent" />
                  </div>

                  {/* Credentials */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 2xl:gap-5 mb-6 sm:mb-8 2xl:mb-10">
                    {member.credentials.map((cred, credIndex) => (
                      <div
                        key={credIndex}
                        className="flex items-center gap-3 2xl:gap-4 p-3 sm:p-4 2xl:p-5 bg-muted/50 rounded-lg border border-border"
                      >
                        <cred.icon className="w-5 h-5 2xl:w-6 2xl:h-6 text-gold flex-shrink-0" />
                        <span className="text-sm 2xl:text-base text-foreground font-medium">{cred.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bio */}
                  <div className="mb-6 sm:mb-8 2xl:mb-10">
                    <h4 className="text-lg 2xl:text-xl font-bold text-foreground mb-3 2xl:mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 2xl:h-7 bg-gold rounded-full" />
                      אודות
                    </h4>
                    <p className="text-muted-foreground leading-relaxed text-base sm:text-lg 2xl:text-xl">
                      {member.bio}
                    </p>
                  </div>

                  {/* Specialties */}
                  <div className="mb-6 sm:mb-8 2xl:mb-10">
                    <h4 className="text-lg 2xl:text-xl font-bold text-foreground mb-4 2xl:mb-5 flex items-center gap-2">
                      <div className="w-1 h-6 2xl:h-7 bg-gold rounded-full" />
                      תחומי התמחות
                    </h4>
                    <div className="flex flex-wrap gap-2 sm:gap-3 2xl:gap-4">
                      {member.specialties.map((specialty, specIndex) => (
                        <span
                          key={specIndex}
                          className="px-4 py-2 2xl:px-5 2xl:py-2.5 bg-gold/10 text-gold font-semibold text-sm 2xl:text-base rounded-full border border-gold/20 hover:bg-gold/20 transition-colors"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 2xl:gap-5">
                    <a
                      href={`mailto:${member.email}`}
                      className="group flex items-center gap-3 2xl:gap-4 px-5 py-3 2xl:px-6 2xl:py-4 bg-card border border-border rounded-lg hover:border-gold/50 hover:shadow-elegant transition-all duration-300"
                    >
                      <Mail className="w-5 h-5 2xl:w-6 2xl:h-6 text-gold" />
                      <span className="text-foreground font-medium text-sm 2xl:text-base">{member.email}</span>
                      <ChevronLeft className="w-4 h-4 2xl:w-5 2xl:h-5 text-muted-foreground mr-auto group-hover:-translate-x-1 transition-transform" />
                    </a>
                    <a
                      href={`tel:${member.phone}`}
                      className="group flex items-center gap-3 2xl:gap-4 px-5 py-3 2xl:px-6 2xl:py-4 bg-card border border-border rounded-lg hover:border-gold/50 hover:shadow-elegant transition-all duration-300"
                    >
                      <Phone className="w-5 h-5 2xl:w-6 2xl:h-6 text-gold" />
                      <span className="text-foreground font-medium text-sm 2xl:text-base" dir="ltr">
                        {member.phone}
                      </span>
                      <ChevronLeft className="w-4 h-4 2xl:w-5 2xl:h-5 text-muted-foreground mr-auto group-hover:-translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section
        id="values"
        ref={setRef("values")}
        className="py-16 sm:py-24 2xl:py-32 bg-primary relative overflow-hidden"
      >
        {/* Decorative */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute top-20 right-10 2xl:right-16 w-64 2xl:w-80 h-64 2xl:h-80 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 2xl:left-16 w-48 2xl:w-64 h-48 2xl:h-64 bg-gold/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 2xl:px-8 relative z-10">
          <div
            className={`text-center mb-12 sm:mb-16 2xl:mb-20 ${
              isVisible.values ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } transition-all duration-700`}
          >
            <span className="inline-block px-4 py-1.5 2xl:px-5 2xl:py-2 bg-gold/20 text-gold font-semibold text-sm 2xl:text-base rounded-full mb-6 2xl:mb-8">
              הערכים שלנו
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-black text-primary-foreground mb-6 2xl:mb-8">
              למה <span className="text-gradient-gold">לבחור בנו</span>?
            </h2>
            <p className="text-lg 2xl:text-xl text-primary-foreground/70 max-w-2xl 2xl:max-w-3xl mx-auto">
              [כאן יבוא תיאור קצר שמסביר את היתרונות הייחודיים של המשרד]
            </p>
          </div>

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 2xl:gap-10 max-w-5xl 2xl:max-w-7xl mx-auto ${
              isVisible.values ? "opacity-100" : "opacity-0"
            } transition-all duration-700 delay-200`}
          >
            {[
              {
                number: "01",
                title: "[ערך 1]",
                description: "[תיאור קצר של הערך הראשון - למה זה חשוב ללקוחות ואיך זה משפיע על העבודה]",
              },
              {
                number: "02",
                title: "[ערך 2]",
                description: "[תיאור קצר של הערך השני - למה זה חשוב ללקוחות ואיך זה משפיע על העבודה]",
              },
              {
                number: "03",
                title: "[ערך 3]",
                description: "[תיאור קצר של הערך השלישי - למה זה חשוב ללקוחות ואיך זה משפיע על העבודה]",
              },
            ].map((value, index) => (
              <div
                key={value.number}
                className="group relative p-6 sm:p-8 2xl:p-10 bg-navy-light/20 border border-primary-foreground/10 rounded-lg 2xl:rounded-2xl hover:border-gold/30 transition-all duration-500"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className="text-5xl sm:text-6xl 2xl:text-7xl font-black text-gold/20 absolute top-4 2xl:top-6 left-4 2xl:left-6">
                  {value.number}
                </span>
                <div className="relative pt-8 2xl:pt-10">
                  <h3 className="text-xl sm:text-2xl 2xl:text-3xl font-bold text-primary-foreground mb-3 2xl:mb-4">
                    {value.title}
                  </h3>
                  <p className="text-primary-foreground/70 leading-relaxed text-base 2xl:text-lg">
                    {value.description}
                  </p>
                </div>
                <div className="absolute bottom-0 right-0 h-1 w-0 bg-gold group-hover:w-full transition-all duration-500 rounded-br-lg 2xl:rounded-br-2xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 2xl:py-28 bg-background relative">
        <div className="container mx-auto px-4 sm:px-6 2xl:px-8">
          <div className="max-w-3xl 2xl:max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl 2xl:text-5xl font-black text-foreground mb-6 2xl:mb-8">
              מוכנים להתחיל?
            </h2>
            <p className="text-lg 2xl:text-xl text-muted-foreground mb-8 2xl:mb-10">
              צרו קשר עוד היום לפגישת ייעוץ ראשונית ללא התחייבות
            </p>
            <NavLink
              to="/#contact"
              className="inline-flex items-center gap-3 2xl:gap-4 px-8 py-4 2xl:px-10 2xl:py-5 bg-gold hover:bg-gold-light text-navy font-bold text-lg 2xl:text-xl rounded-lg transition-all duration-300 hover:shadow-gold"
            >
              <span>צור קשר</span>
              <ChevronLeft className="w-5 h-5 2xl:w-6 2xl:h-6" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-8 sm:py-12 2xl:py-16 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 2xl:px-8">
          <div className="flex flex-col items-center gap-4 sm:gap-6 2xl:gap-8 md:flex-row md:justify-between">
            <NavLink
              to="/"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({top: 0, behavior: 'smooth'});
                }
              }}
              className="flex items-center gap-3 2xl:gap-4 hover:opacity-80 transition-opacity"
            >
              <img src="./favicon.ico" alt="Logo" className="w-8 sm:w-10 2xl:w-12 h-8 sm:h-10 2xl:h-12 opacity-80" />
              <span className="text-gold-light font-medium text-sm sm:text-base 2xl:text-lg tracking-wider">
                החזר מס
              </span>
            </NavLink>
            <p className="text-primary-foreground/50 text-xs sm:text-sm 2xl:text-base text-center">
              © {new Date().getFullYear()} EY CPA. כל הזכויות שמורות.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutHe;
