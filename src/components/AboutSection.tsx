import { Brain, Code2, Sparkles, GraduationCap } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    {
      icon: Brain,
      title: "Research Focus",
      description: "Deep learning architectures, neural network optimization, and representation learning.",
    },
    {
      icon: Code2,
      title: "Implementation",
      description: "Translating cutting-edge papers into production-ready code with PyTorch and TensorFlow.",
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Extending existing methods with novel approaches to push state-of-the-art boundaries.",
    },
    {
      icon: GraduationCap,
      title: "Education",
      description: "Ph.D. candidate in Computer Science with focus on Machine Learning.",
    },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              About Me
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Bridging Theory & Practice
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              I specialize in implementing complex research papers and developing 
              novel machine learning solutions that push the boundaries of what's possible.
            </p>
          </div>

          {/* Highlights grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="text-primary" size={24} />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border">
            {[
              { value: "15+", label: "Research Papers" },
              { value: "30+", label: "Projects" },
              { value: "5K+", label: "GitHub Stars" },
              { value: "10+", label: "Publications" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {value}
                </div>
                <div className="text-muted-foreground text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
