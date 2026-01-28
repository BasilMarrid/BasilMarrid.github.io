import { FileText, Calculator, PieChart, Briefcase, Scale, LineChart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const services = [
  {
    icon: Calculator,
    title: "Tax Planning & Preparation",
    description: "Strategic tax planning and accurate preparation for individuals and businesses. Minimize liabilities while ensuring full compliance.",
  },
  {
    icon: FileText,
    title: "Financial Statements",
    description: "Comprehensive preparation and review of financial statements. Clear reporting that meets regulatory standards and stakeholder needs.",
  },
  {
    icon: Briefcase,
    title: "Business Advisory",
    description: "Strategic guidance for business decisions, growth planning, and operational efficiency. Partner with you for long-term success.",
  },
  {
    icon: PieChart,
    title: "Bookkeeping Services",
    description: "Accurate and timely bookkeeping to keep your financial records organized and up-to-date throughout the year.",
  },
  {
    icon: Scale,
    title: "Audit & Assurance",
    description: "Independent audit services providing stakeholders with confidence in your financial reporting accuracy.",
  },
  {
    icon: LineChart,
    title: "Financial Analysis",
    description: "In-depth financial analysis to identify trends, opportunities, and areas for improvement in your business performance.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-medium text-sm tracking-wider uppercase">Services</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
            Comprehensive
            <span className="text-gradient-gold"> Financial Services</span>
          </h2>
          <p className="text-muted-foreground">
            A full range of accounting and advisory services tailored to meet your specific needs, 
            delivered with professionalism and attention to detail.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group border-border hover:border-accent/30 hover:shadow-elegant transition-all duration-300 bg-background"
            >
              <CardHeader className="p-8">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                  <service.icon className="w-7 h-7 text-accent" />
                </div>
                <CardTitle className="font-serif text-xl mb-3 text-foreground">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
