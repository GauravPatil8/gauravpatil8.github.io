import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  paperUrl?: string;
  featured?: boolean;
}

const ProjectCard = ({
  title,
  description,
  tags,
  image,
  githubUrl,
  demoUrl,
  paperUrl,
  featured = false,
}: ProjectCardProps) => {
  return (
    <div
      className={`group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        
        {featured && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <ArrowUpRight className="text-muted-foreground group-hover:text-primary transition-colors duration-300 flex-shrink-0" size={20} />
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          {githubUrl && (
            <a
              href={githubUrl}
              className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-300"
              aria-label="View on GitHub"
            >
              <Github size={18} />
            </a>
          )}
          {demoUrl && (
            <a
              href={demoUrl}
              className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-300"
              aria-label="View Demo"
            >
              <ExternalLink size={18} />
            </a>
          )}
          {paperUrl && (
            <Button variant="subtle" size="sm" className="ml-auto">
              Read Paper
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
