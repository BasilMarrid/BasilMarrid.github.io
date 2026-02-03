import { NavLink } from "@/components/NavLink";
import { ArrowRight, Award, Briefcase, GraduationCap, Phone, Mail, ChevronLeft } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const AboutHe = () => {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
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
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-gold/98 backdrop-blur-md shadow-elegant border-b border-navy/20"
            : "bg-gold/95"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <NavLink
              to="/"
              className="group flex items-center gap-2 text-navy hover:text-navy/70 transition-colors"
            >
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <span className="font-semibold text-sm sm:text-base">חזרה לעמוד הבית</span>
            </NavLink>
            <div className="flex items-center gap-3">
              <img src="./favicon.ico" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-navy font-bold tracking-wider text-sm sm:text-base">EY CPA</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 bg-gradient-hero overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

        {/* Geometric Lines */}
        <div className="absolute top-1/3 left-0 w-1/4 h-px bg-gradient-to-r from-gold/40 to-transparent" />
        <div className="absolute bottom-1/4 right-0 w-1/3 h-px bg-gradient-to-l from-gold/40 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Overline */}
            <div className="flex items-center justify-center gap-3 mb-6 opacity-0-initial animate-fade-in-up">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm">
                הצוות שלנו
              </span>
              <div className="h-px w-12 bg-gold" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary-foreground leading-tight mb-6 opacity-0-initial animate-fade-in-up delay-100">
              מקצועיות.<br />
              <span className="text-gradient-gold">מחויבות.</span><br />
              מצוינות.
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed opacity-0-initial animate-fade-in-up delay-200">
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
      <section className="py-16 sm:py-24 bg-geometric relative">
        <div className="container mx-auto px-4 sm:px-6">
          {team.map((member, index) => (
            <article
              key={member.nameEn}
              id={`member-${index}`}
              ref={setRef(`member-${index}`)}
              className={`${index > 0 ? "mt-24 sm:mt-32 pt-16 sm:pt-20 border-t border-border" : ""}`}
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start ${
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
                  <div className="relative group max-w-[280px] sm:max-w-[320px] mx-auto lg:mx-0">
                    {/* Gold frame effect */}
                    <div className="absolute -inset-2 sm:-inset-3 border-2 border-gold/30 rounded-lg transform rotate-2 group-hover:rotate-0 transition-transform duration-500" />
                    <div className="absolute -inset-2 sm:-inset-3 border-2 border-gold/20 rounded-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-500" />

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
                    <div className="absolute -bottom-3 sm:-bottom-4 right-3 sm:right-4 left-3 sm:left-4 bg-card p-3 sm:p-4 rounded-lg shadow-elegant border border-border">
                      <h3 className="text-lg sm:text-xl font-black text-foreground">{member.name}</h3>
                      <p className="text-gold font-semibold text-xs sm:text-sm mt-0.5">{member.title}</p>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div
                  className={`lg:col-span-8 pt-12 sm:pt-0 ${
                    index % 2 === 1 ? "lg:order-1 lg:pl-6" : "lg:pr-6"
                  }`}
                >
                  {/* Section number */}
                  <div className="flex items-center gap-4 mb-6 sm:mb-8">
                    <span className="text-6xl sm:text-8xl font-black text-gold/10">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-l from-gold/30 to-transparent" />
                  </div>

                  {/* Credentials */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {member.credentials.map((cred, credIndex) => (
                      <div
                        key={credIndex}
                        className="flex items-center gap-3 p-3 sm:p-4 bg-muted/50 rounded-lg border border-border"
                      >
                        <cred.icon className="w-5 h-5 text-gold flex-shrink-0" />
                        <span className="text-sm text-foreground font-medium">{cred.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bio */}
                  <div className="mb-6 sm:mb-8">
                    <h4 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                      <div className="w-1 h-6 bg-gold rounded-full" />
                      אודות
                    </h4>
                    <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                      {member.bio}
                    </p>
                  </div>

                  {/* Specialties */}
                  <div className="mb-6 sm:mb-8">
                    <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-gold rounded-full" />
                      תחומי התמחות
                    </h4>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {member.specialties.map((specialty, specIndex) => (
                        <span
                          key={specIndex}
                          className="px-4 py-2 bg-gold/10 text-gold font-semibold text-sm rounded-full border border-gold/20 hover:bg-gold/20 transition-colors"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <a
                      href={`mailto:${member.email}`}
                      className="group flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-lg hover:border-gold/50 hover:shadow-elegant transition-all duration-300"
                    >
                      <Mail className="w-5 h-5 text-gold" />
                      <span className="text-foreground font-medium text-sm">{member.email}</span>
                      <ChevronLeft className="w-4 h-4 text-muted-foreground mr-auto group-hover:-translate-x-1 transition-transform" />
                    </a>
                    <a
                      href={`tel:${member.phone}`}
                      className="group flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-lg hover:border-gold/50 hover:shadow-elegant transition-all duration-300"
                    >
                      <Phone className="w-5 h-5 text-gold" />
                      <span className="text-foreground font-medium text-sm" dir="ltr">
                        {member.phone}
                      </span>
                      <ChevronLeft className="w-4 h-4 text-muted-foreground mr-auto group-hover:-translate-x-1 transition-transform" />
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
        className="py-16 sm:py-24 bg-primary relative overflow-hidden"
      >
        {/* Decorative */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute top-20 right-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div
            className={`text-center mb-12 sm:mb-16 ${
              isVisible.values ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } transition-all duration-700`}
          >
            <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold font-semibold text-sm rounded-full mb-6">
              הערכים שלנו
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary-foreground mb-6">
              למה <span className="text-gradient-gold">לבחור בנו</span>?
            </h2>
            <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
              [כאן יבוא תיאור קצר שמסביר את היתרונות הייחודיים של המשרד]
            </p>
          </div>

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto ${
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
                className="group relative p-6 sm:p-8 bg-navy-light/20 border border-primary-foreground/10 rounded-lg hover:border-gold/30 transition-all duration-500"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className="text-5xl sm:text-6xl font-black text-gold/20 absolute top-4 left-4">
                  {value.number}
                </span>
                <div className="relative pt-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-primary-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-primary-foreground/70 leading-relaxed">
                    {value.description}
                  </p>
                </div>
                <div className="absolute bottom-0 right-0 h-1 w-0 bg-gold group-hover:w-full transition-all duration-500 rounded-br-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-background relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-6">
              מוכנים להתחיל?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              צרו קשר עוד היום לפגישת ייעוץ ראשונית ללא התחייבות
            </p>
            <NavLink
              to="/#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold hover:bg-gold-light text-navy font-bold text-lg rounded-lg transition-all duration-300 hover:shadow-gold"
            >
              <span>צור קשר</span>
              <ChevronLeft className="w-5 h-5" />
            </NavLink>
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
              <span className="text-gold-light font-medium text-sm sm:text-base tracking-wider">
                החזר מס
              </span>
            </div>
            <p className="text-primary-foreground/50 text-xs sm:text-sm text-center">
              © {new Date().getFullYear()} EY CPA. כל הזכויות שמורות.
            </p>
            <NavLink
              to="/"
              className="text-primary-foreground/60 hover:text-gold text-xs sm:text-sm transition-colors"
            >
              עמוד הבית
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutHe;
