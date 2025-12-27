import { ArrowDown, Github, Linkedin, Mail, BookOpen } from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: BookOpen, href: "#", label: "Google Scholar" },
    { icon: Mail, href: "#contact", label: "Email" },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      
      <div className="container mx-auto px-6 pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-up opacity-0">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Open to Research Collaborations</span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 animate-fade-up opacity-0 stagger-1">
            Machine Learning
            <br />
            <span className="text-gradient">Researcher</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up opacity-0 stagger-2 font-body leading-relaxed">
            Exploring the frontiers of artificial intelligence through deep learning, 
            computer vision, and natural language processing. Passionate about 
            implementing and extending state-of-the-art research papers.
          </p>

          {/* Research interests tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 animate-fade-up opacity-0 stagger-3">
            {["Deep Learning", "Computer Vision", "NLP", "Transformers", "GANs"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-sm rounded-full bg-muted/50 text-muted-foreground border border-border/50 hover:border-primary/50 hover:text-primary transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up opacity-0 stagger-4">
            <Button variant="hero" size="lg">
              View Projects
            </Button>
            <Button variant="outline" size="lg">
              Read Publications
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 animate-fade-up opacity-0 stagger-5">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="text-muted-foreground" size={24} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
