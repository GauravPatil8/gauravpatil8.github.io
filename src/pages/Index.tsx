import { Helmet } from "react-helmet-async";
import { Github, Linkedin, Mail, BookOpen, FileText, ExternalLink } from "lucide-react";

const Index = () => {
  const projects = [
    {
      title: "Vision Transformer Implementation",
      description: "PyTorch implementation of 'An Image is Worth 16x16 Words' with training pipelines and attention visualization.",
      tags: ["PyTorch", "Computer Vision", "Transformers"],
      github: "#",
      paper: "#",
    },
    {
      title: "Diffusion Models from Scratch",
      description: "Implementation of DDPM and improved sampling techniques for image generation.",
      tags: ["Diffusion", "Generative AI"],
      github: "#",
    },
    {
      title: "BERT Fine-tuning Pipeline",
      description: "Modular pipeline for fine-tuning BERT on custom NLP tasks with evaluation metrics.",
      tags: ["NLP", "BERT", "HuggingFace"],
      github: "#",
    },
    {
      title: "Graph Neural Networks Library",
      description: "Flexible GNN implementation supporting GCN, GAT, and GraphSAGE architectures.",
      tags: ["GNN", "PyTorch Geometric"],
      github: "#",
    },
  ];

  const publications = [
    {
      title: "Efficient Attention Mechanisms for Long-Sequence Modeling",
      authors: "Your Name, Co-Author A, Co-Author B",
      venue: "NeurIPS 2024",
      links: { arxiv: "#", code: "#" },
    },
    {
      title: "Self-Supervised Learning for Medical Image Analysis",
      authors: "Co-Author C, Your Name, Co-Author D",
      venue: "MICCAI 2024",
      links: { arxiv: "#", code: "#" },
    },
    {
      title: "Graph Transformers for Molecular Property Prediction",
      authors: "Your Name, Co-Author E",
      venue: "ICML 2023",
      links: { arxiv: "#" },
    },
  ];

  return (
    <>
      <Helmet>
        <title>Your Name | ML/AI Researcher</title>
        <meta name="description" content="Academic portfolio showcasing machine learning and AI research projects and publications." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-6 py-16">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Your Name
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              PhD Student in Computer Science @ University
            </p>
            <p className="text-foreground leading-relaxed mb-6">
              I'm a machine learning researcher focused on deep learning, computer vision, and natural language processing. 
              My work involves implementing and extending state-of-the-art research papers.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-4">
              <a href="mailto:your@email.edu" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 text-sm">
                <Mail size={16} /> Email
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 text-sm">
                <Github size={16} /> GitHub
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 text-sm">
                <BookOpen size={16} /> Scholar
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 text-sm">
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </header>

          {/* Research Interests */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              Research Interests
            </h2>
            <ul className="list-disc list-inside text-foreground space-y-1 pl-1">
              <li>Deep Learning & Neural Network Architectures</li>
              <li>Computer Vision & Image Understanding</li>
              <li>Natural Language Processing</li>
              <li>Self-Supervised & Representation Learning</li>
            </ul>
          </section>

          {/* Publications */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              Publications
            </h2>
            <div className="space-y-6">
              {publications.map((pub, index) => (
                <div key={index}>
                  <h3 className="font-medium text-foreground">{pub.title}</h3>
                  <p className="text-sm text-muted-foreground">{pub.authors}</p>
                  <p className="text-sm text-muted-foreground italic">{pub.venue}</p>
                  <div className="flex gap-3 mt-1">
                    {pub.links.arxiv && (
                      <a href={pub.links.arxiv} className="text-sm text-primary hover:underline flex items-center gap-1">
                        <FileText size={14} /> arXiv
                      </a>
                    )}
                    {pub.links.code && (
                      <a href={pub.links.code} className="text-sm text-primary hover:underline flex items-center gap-1">
                        <Github size={14} /> Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              Projects
            </h2>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-medium text-foreground">{project.title}</h3>
                    <div className="flex gap-2 flex-shrink-0">
                      {project.github && (
                        <a href={project.github} className="text-muted-foreground hover:text-primary transition-colors">
                          <Github size={18} />
                        </a>
                      )}
                      {project.paper && (
                        <a href={project.paper} className="text-muted-foreground hover:text-primary transition-colors">
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
              Education
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground">Ph.D. in Computer Science</h3>
                <p className="text-sm text-muted-foreground">University Name, 2021 - Present</p>
              </div>
              <div>
                <h3 className="font-medium text-foreground">M.S. in Computer Science</h3>
                <p className="text-sm text-muted-foreground">University Name, 2019 - 2021</p>
              </div>
              <div>
                <h3 className="font-medium text-foreground">B.S. in Computer Science</h3>
                <p className="text-sm text-muted-foreground">University Name, 2015 - 2019</p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Your Name. Built with Lovable.</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Index;
