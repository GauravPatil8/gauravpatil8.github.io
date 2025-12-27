import { FileText, ExternalLink, Quote } from "lucide-react";
import { Button } from "./ui/button";

const PublicationsSection = () => {
  const publications = [
    {
      title: "Efficient Attention Mechanisms for Long-Sequence Modeling",
      authors: "Your Name, Co-Author A, Co-Author B",
      venue: "NeurIPS 2024",
      year: "2024",
      abstract: "We propose a novel sparse attention mechanism that reduces computational complexity while maintaining model performance on long sequences.",
      citations: 42,
      arxivUrl: "#",
      codeUrl: "#",
    },
    {
      title: "Self-Supervised Learning for Medical Image Analysis",
      authors: "Co-Author C, Your Name, Co-Author D",
      venue: "MICCAI 2024",
      year: "2024",
      abstract: "A contrastive learning framework specifically designed for medical imaging that achieves state-of-the-art results with limited labeled data.",
      citations: 28,
      arxivUrl: "#",
      codeUrl: "#",
    },
    {
      title: "Graph Transformers for Molecular Property Prediction",
      authors: "Your Name, Co-Author E",
      venue: "ICML 2023",
      year: "2023",
      abstract: "Combining graph neural networks with transformer architectures for improved molecular representation learning.",
      citations: 89,
      arxivUrl: "#",
      codeUrl: "#",
    },
  ];

  return (
    <section id="publications" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              Publications
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Academic Work
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Selected publications from peer-reviewed conferences and journals 
              in machine learning and artificial intelligence.
            </p>
          </div>

          {/* Publications list */}
          <div className="space-y-6">
            {publications.map((pub, index) => (
              <article
                key={index}
                className="group p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="text-primary" size={24} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-display text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {pub.title}
                      </h3>
                      <span className="flex-shrink-0 px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
                        {pub.venue}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-3">
                      {pub.authors}
                    </p>
                    
                    <p className="text-muted-foreground/80 text-sm leading-relaxed mb-4">
                      {pub.abstract}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Quote size={14} />
                        <span>{pub.citations} citations</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <a
                          href={pub.arxivUrl}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1"
                        >
                          <ExternalLink size={14} />
                          arXiv
                        </a>
                        <Button variant="subtle" size="sm">
                          View Code
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* View all link */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All Publications
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
