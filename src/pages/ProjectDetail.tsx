import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { projects, ProjectMedia } from "@/data/projects";

const MediaItem = ({ media }: { media: ProjectMedia }) => {
  if (media.type === "youtube") {
    // Extract video ID from YouTube URL
    const getYouTubeId = (url: string) => {
      const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s]+)/);
      return match ? match[1] : null;
    };
    const videoId = getYouTubeId(media.url);
    
    return (
      <div className="my-6">
        <div className="aspect-video w-full rounded-lg overflow-hidden bg-secondary">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={media.caption || "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        {media.caption && (
          <p className="text-sm text-muted-foreground mt-2 text-center italic">{media.caption}</p>
        )}
      </div>
    );
  }

  // Handle both image and gif types
  return (
    <div className="my-6">
      <div className="w-full rounded-lg overflow-hidden bg-secondary">
        <img
          src={media.url}
          alt={media.caption || "Project media"}
          className="w-full h-auto object-cover"
        />
      </div>
      {media.caption && (
        <p className="text-sm text-muted-foreground mt-2 text-center italic">{media.caption}</p>
      )}
    </div>
  );
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Project not found</h1>
          <Link to="/" className="text-primary hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | Gaurav Patil</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-6 py-16">
          {/* Back Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          {/* Project Image */}
          <div className="aspect-square w-full max-w-md mx-auto bg-secondary rounded-lg overflow-hidden mb-8">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Project Header */}
          <h1 className="text-3xl font-bold text-foreground mb-4">{project.title}</h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 bg-secondary text-secondary-foreground rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4 mb-8">
            {project.github && (
              <a
                href={project.github}
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Github size={18} />
                View on GitHub
              </a>
            )}
            {project.paper && (
              <a
                href={project.paper}
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <ExternalLink size={18} />
                Read Paper
              </a>
            )}
          </div>

          {/* Long Description */}
          <div className="prose prose-sm max-w-none">
            {project.longDescription.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-lg font-semibold text-foreground mt-8 mb-4">
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n").filter((line) => line.startsWith("- "));
                return (
                  <ul key={index} className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace("- ", "")}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Media Gallery */}
          {project.media && project.media.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h2 className="text-lg font-semibold text-foreground mb-6">Gallery</h2>
              <div className="space-y-6">
                {project.media.map((item, index) => (
                  <MediaItem key={index} media={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
