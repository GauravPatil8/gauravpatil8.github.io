import ProjectCard from "./ProjectCard";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Vision Transformer Implementation",
      description: "Complete implementation of the 'An Image is Worth 16x16 Words' paper with custom training pipelines and visualization tools for attention maps.",
      tags: ["PyTorch", "Vision", "Transformers", "CUDA"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
      githubUrl: "#",
      demoUrl: "#",
      paperUrl: "#",
      featured: true,
    },
    {
      title: "Diffusion Models from Scratch",
      description: "Implementation of DDPM and improved sampling techniques for high-quality image generation.",
      tags: ["Diffusion", "PyTorch", "Generative AI"],
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80",
      githubUrl: "#",
      paperUrl: "#",
    },
    {
      title: "Neural Style Transfer",
      description: "Real-time style transfer using adaptive instance normalization with a custom web interface.",
      tags: ["CNN", "Style Transfer", "WebGL"],
      image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&auto=format&fit=crop&q=80",
      githubUrl: "#",
      demoUrl: "#",
    },
    {
      title: "BERT Fine-tuning Pipeline",
      description: "Modular pipeline for fine-tuning BERT on custom NLP tasks with comprehensive evaluation metrics.",
      tags: ["NLP", "BERT", "HuggingFace"],
      image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=800&auto=format&fit=crop&q=80",
      githubUrl: "#",
      paperUrl: "#",
    },
    {
      title: "Graph Neural Networks Library",
      description: "Flexible GNN implementation supporting various architectures including GCN, GAT, and GraphSAGE.",
      tags: ["GNN", "PyTorch Geometric", "Graph ML"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
      githubUrl: "#",
    },
    {
      title: "Reinforcement Learning Gym",
      description: "Collection of RL algorithms including DQN, PPO, and SAC with custom environments.",
      tags: ["RL", "OpenAI Gym", "PyTorch"],
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
      githubUrl: "#",
      demoUrl: "#",
    },
  ];

  return (
    <section id="projects" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              Projects
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Research Implementations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A curated collection of my implementations of influential ML/AI research papers, 
              along with extensions and original contributions.
            </p>
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
