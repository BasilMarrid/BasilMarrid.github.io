import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { ArrowRight } from "lucide-react";

const AboutHe = () => {
  return (
    <div className="min-h-screen bg-background relative" dir="rtl">
      <header className="bg-primary py-8 relative">
        <div className="container mx-auto px-6">
          <NavLink
            to="/"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-primary text-white rounded-full hover:bg-primary/80 transition-colors"
          >
            <ArrowRight className="w-6 h-6" />
          </NavLink>
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
        </div>
      </main>
    </div>
  );
};

export default AboutHe;
