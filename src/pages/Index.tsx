import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
const Index = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary py-6">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xl">EY</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-foreground">EY CPA</h1>
                <p className="text-sm text-primary-foreground/70">רואה חשבון מוסמך</p>
              </div>
            </div>
            
            <a 
              href="tel:+972-XX-XXX-XXXX" 
              className="hidden md:flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+972-54-945-2800</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            שירות החזר מס מקצועי ואמין
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            ניסיון של למעלה מ 5 שנים בליווי עסקים ולקוחות פרטיים
          </p>
          <Button 
            size="lg"
            className="bg-accent hover:bg-gold-light text-accent-foreground font-semibold px-8"
            asChild
          >
            <a href="#contact">צור קשר</a>
          </Button>
        </div>
      </section>

      {/* Service */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-3xl font-bold text-foreground mb-6">השירות שלנו</h3>
            <div className="bg-card border border-border rounded-lg p-8 hover:border-accent/50 transition-colors">
              <p className="text-xl font-medium text-foreground">החזרי מס</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-foreground mb-6">אודות</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              רואה חשבון מוסמך עם ניסיון רב בתחום. מספק שירות אישי ומקצועי 
              לעסקים קטנים ובינוניים ולקוחות פרטיים.
            </p>
            <p className="text-muted-foreground leading-relaxed">
            המשרד מתמחה בהחזרי מס
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-foreground text-center mb-10">
            יצירת קשר
          </h3>
          <div className="max-w-md mx-auto space-y-6">
            <a 
              href="tel:+972-XX-XXX-XXXX"
              className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-accent/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">טלפון</p>
                <p className="font-medium text-foreground">+972-XX-XXX-XXXX</p>
              </div>
            </a>

            <a 
              href="mailto:contact@eycpa.org.il"
              className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-accent/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">דוא"ל</p>
                <p className="font-medium text-foreground">contact@eycpa.org.il</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">מיקום</p>
                <p className="font-medium text-foreground">ישראל</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-primary-foreground/70">
            © {currentYear} EY CPA. כל הזכויות שמורות.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
