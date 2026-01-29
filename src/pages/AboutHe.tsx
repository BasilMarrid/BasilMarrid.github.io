import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";

const AboutHe = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="bg-primary py-6">
        <div className="container mx-auto px-6">
          <h1 className="text-2xl font-bold text-primary-foreground">אודות</h1>
        </div>
      </header>

      <main className="py-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">כאן המקום לתיאור קצר של החברה/המשרד</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            כאן תוכלו להכניס את התוכן בעברית המתאר את המטרות, הערכים
            והניסיון של הצוות. השאירו כאן את הטקסט הגולמי למילוי מאוחר יותר.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-8">
            טקסט נוסף: כתובת המשרד, שעות פעילות, נא להשתמש בפסקאות אלה
            כדי להכניס את המידע הרלוונטי. (החליפו טקסט זה בטקסט שלכם.)
          </p>

          <div className="flex gap-4">
            <Button asChild>
              <NavLink to="/" className="font-medium">חזרה לדף הבית</NavLink>
            </Button>
            <Button variant="outline" asChild>
              <a href="#contact" className="font-medium">יצירת קשר</a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutHe;
