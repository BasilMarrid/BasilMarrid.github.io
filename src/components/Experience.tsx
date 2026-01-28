const experiences = [
  {
    period: "2015 - Present",
    title: "Independent CPA Practice",
    company: "EY CPA",
    description: "Running my own practice serving diverse clients including SMBs, startups, and individual professionals with comprehensive accounting services.",
  },
  {
    period: "2008 - 2015",
    title: "Senior Accountant",
    company: "Leading Accounting Firm",
    description: "Managed complex audit engagements and provided advisory services to mid-market clients across various industries.",
  },
  {
    period: "2003 - 2008",
    title: "Staff Accountant",
    company: "Public Accounting Practice",
    description: "Developed foundational expertise in tax preparation, bookkeeping, and financial statement analysis.",
  },
];

const qualifications = [
  "Certified Public Accountant (CPA) - Israel",
  "Bachelor's Degree in Accounting",
  "Member of Institute of CPAs in Israel",
  "Continuous Professional Education",
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-medium text-sm tracking-wider uppercase">Experience</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
            Professional
            <span className="text-gradient-gold"> Background</span>
          </h2>
          <p className="text-muted-foreground">
            A proven track record of delivering excellence in accounting and financial services.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Timeline */}
          <div className="space-y-8">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-6">Career Journey</h3>
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-accent/30 pb-8 last:pb-0">
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-accent" />
                <span className="text-sm text-accent font-medium">{exp.period}</span>
                <h4 className="font-serif text-xl font-bold text-foreground mt-1">{exp.title}</h4>
                <p className="text-muted-foreground font-medium mb-2">{exp.company}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Qualifications */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-6">Qualifications & Certifications</h3>
            <div className="bg-card p-8 rounded-2xl shadow-elegant border border-border">
              <ul className="space-y-4">
                {qualifications.map((qual, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-foreground">{qual}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="font-serif text-lg font-bold text-foreground mb-4">Areas of Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {["Tax Law", "Corporate Finance", "IFRS", "Financial Reporting", "Business Valuation", "Due Diligence"].map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
