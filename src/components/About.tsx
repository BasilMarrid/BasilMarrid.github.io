import { Award, Users, Building2, TrendingUp } from "lucide-react";

const stats = [
  { icon: Award, value: "20+", label: "Years Experience" },
  { icon: Users, value: "500+", label: "Clients Served" },
  { icon: Building2, value: "100+", label: "Businesses Helped" },
  { icon: TrendingUp, value: "98%", label: "Client Retention" },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-accent font-medium text-sm tracking-wider uppercase">About Me</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
              Dedicated to Your
              <span className="text-gradient-gold block">Financial Success</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                As a certified public accountant with over two decades of experience, I've built my practice on the foundation of trust, precision, and personalized service. My approach combines deep technical expertise with a genuine understanding of each client's unique needs.
              </p>
              <p>
                Based in Israel, I serve a diverse clientele ranging from individual professionals to growing businesses. My commitment is to provide clear, actionable financial guidance that empowers my clients to make informed decisions.
              </p>
              <p>
                Whether you need comprehensive tax planning, financial statement preparation, or strategic business advisory, I bring the same level of dedication and attention to detail to every engagement.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-card p-8 rounded-2xl shadow-elegant border border-border hover:border-accent/30 transition-all duration-300 group"
              >
                <stat.icon className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <div className="font-serif text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
