import { Phone, Mail, MapPin, Clock, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+972-XX-XXX-XXXX",
    href: "tel:+972-XX-XXX-XXXX",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@eycpa.org.il",
    href: "mailto:contact@eycpa.org.il",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Israel",
    href: null,
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Sun-Thu: 9:00 - 18:00",
    href: null,
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-accent font-medium text-sm tracking-wider uppercase">Contact</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
              Let's Start a
              <span className="text-gradient-gold"> Conversation</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Ready to take control of your finances? I'm here to help. Reach out to schedule a consultation 
              and discover how professional accounting services can benefit you or your business.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    {info.href ? (
                      <a 
                        href={info.href}
                        className="font-medium text-foreground hover:text-accent transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-medium text-foreground">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Connect with me</p>
              <div className="flex gap-3">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent/10 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-accent" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gradient-hero p-10 rounded-2xl shadow-elegant">
            <h3 className="font-serif text-2xl font-bold text-primary-foreground mb-4">
              Schedule a Free Consultation
            </h3>
            <p className="text-primary-foreground/80 mb-8">
              Get personalized advice tailored to your financial situation. No obligation, just valuable insights.
            </p>
            
            <div className="space-y-4">
              <Button 
                size="lg"
                className="w-full bg-accent hover:bg-gold-light text-accent-foreground font-semibold py-6 shadow-gold"
                asChild
              >
                <a href="mailto:contact@eycpa.org.il?subject=Consultation Request">
                  <Mail className="w-5 h-5 mr-2" />
                  Email for Consultation
                </a>
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 py-6"
                asChild
              >
                <a href="tel:+972-XX-XXX-XXXX">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
