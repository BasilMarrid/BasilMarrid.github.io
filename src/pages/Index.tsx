import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
            
            <div className="flex items-center gap-4">
              <NavLink
                to="/about"
                className="inline-block text-primary-foreground/80 hover:text-accent transition-colors"
              >
                אודות
              </NavLink>
            </div>
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
                <p className="font-medium text-foreground" dir="ltr">+972-54-945-2800</p>
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

      {/* Contact Form */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-foreground text-center mb-10">
            השאר פרטים
          </h3>
          <div className="max-w-md mx-auto">
            <form
              action="https://formspree.io/f/xzdgopvv"
              method="POST"
              className="space-y-6"
              dir="rtl"
            >
              <div>
                <Label htmlFor="name">שם מלא</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="הכנס את שמך המלא"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">דוא"ל</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder='הכנס את כתובת הדוא"ל שלך'
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">טלפון</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="הכנס את מספר הטלפון שלך"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                שלח
              </Button>
            </form>
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
