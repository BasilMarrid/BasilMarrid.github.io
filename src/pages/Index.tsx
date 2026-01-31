import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
const Index = () => {
  const currentYear = new Date().getFullYear();
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    } catch (error) {
      alert("שגיאה בשליחת הטופס. אנא נסה שוב.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary py-6">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="./favicon.ico" alt="Logo" className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold text-primary-foreground">EY CPA</h1>
                <p className="text-sm text-primary-foreground/70">החזר מס</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <NavLink
                to="/about"
                className="inline-block px-3 py-2 text-lg font-medium text-primary-foreground/80 hover:text-accent transition-colors"
              >
                מי אנחנו?
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
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            יצירת קשר
          </h3>
          <div className="max-w-sm mx-auto space-y-4">
            <a 
              href="tel:+972-XX-XXX-XXXX"
              className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:border-accent/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Phone className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">טלפון</p>
                <p className="font-medium text-foreground" dir="ltr">+972-54-945-2800</p>
              </div>
            </a>

            <a 
              href="mailto:contact@eycpa.org.il"
              className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:border-accent/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Mail className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">דוא"ל</p>
                <p className="font-medium text-foreground">contact@eycpa.org.il</p>
              </div>
            </a>

            <div className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <MapPin className="w-4 h-4 text-accent" />
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
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
           או השאר פרטים ונחזור אליך בהקדם
          </h3>
          <div className="max-w-sm mx-auto">
            {isSubmitted ? (
              <div className="text-center p-6 bg-green-100 border border-green-300 rounded-lg" dir="rtl">
                <h4 className="text-lg font-semibold text-green-800">תודה!</h4>
                <p className="text-green-700">הפרטים נשלחו בהצלחה. נחזור אליך בקרוב.</p>
                <Button onClick={() => setIsSubmitted(false)} className="mt-4">
                  שלח פרטים נוספים
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
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
                    dir="rtl"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  שלח
                </Button>
              </form>
            )}
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
