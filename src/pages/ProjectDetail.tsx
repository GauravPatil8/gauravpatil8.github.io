import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

import { ProjectMedia, projects } from "@/data/projects";
import siteData from "@/data/site.json";
import { withBase } from "@/lib/paths";

const projectTagStyles = [
  "border-cyan-300/20 bg-cyan-300/10 text-cyan-200",
  "border-green-300/20 bg-green-300/10 text-green-200",
  "border-red-300/20 bg-red-300/10 text-red-200",
  "border-violet-300/20 bg-violet-300/10 text-violet-200",
  "border-amber-300/20 bg-amber-300/10 text-amber-200",
];

const MediaItem = ({ media }: { media: ProjectMedia }) => {
  if (media.type === "youtube") {
    const getYouTubeId = (url: string) => {
      const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s]+)/);
      return match ? match[1] : null;
    };
    const videoId = getYouTubeId(media.url);

    return (
      <div className="my-6">
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-secondary">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={media.caption || "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
        {media.caption && (
          <p className="mt-2 text-center text-sm italic text-muted-foreground">{media.caption}</p>
        )}
      </div>
    );
  }

  if (media.type === "video") {
    return (
      <div className="my-6">
        <div className="w-full overflow-hidden rounded-lg bg-secondary">
          <video src={withBase(media.url)} controls className="h-auto w-full">
            {siteData.projectDetail.videoFallback}
          </video>
        </div>
        {media.caption && (
          <p className="mt-2 text-center text-sm italic text-muted-foreground">{media.caption}</p>
        )}
      </div>
    );
  }

  return (
    <div className="my-6">
      <div className="w-full overflow-hidden rounded-lg bg-secondary">
        <img
          src={withBase(media.url)}
          alt={media.caption || "Project media"}
          className="h-auto w-full object-cover"
        />
      </div>
      {media.caption && (
        <p className="mt-2 text-center text-sm italic text-muted-foreground">{media.caption}</p>
      )}
    </div>
  );
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">
            {siteData.projectDetail.notFoundTitle}
          </h1>
          <Link to="/" className="text-primary hover:underline">
            {siteData.projectDetail.backLabel}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {project.title} | {siteData.projectDetail.titleSuffix}
        </title>
        <meta name="description" content={project.description} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft size={16} />
            {siteData.projectDetail.backLabel}
          </Link>

          <h1 className="mb-4 text-3xl font-bold text-foreground">{project.title}</h1>

          <div className="mx-auto mb-8 aspect-square w-full max-w-md overflow-hidden rounded-lg bg-secondary">
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tag}
                className={`rounded border px-3 py-1 text-sm ${projectTagStyles[tagIndex % projectTagStyles.length]}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mb-8 flex gap-4">
            {project.github && (
              <a
                href={project.github}
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Github size={18} />
                {siteData.projectDetail.githubLabel}
              </a>
            )}
            {project.paper && (
              <a
                href={project.paper}
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <ExternalLink size={18} />
                {siteData.projectDetail.paperLabel}
              </a>
            )}
            {!project.paper && (
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <ExternalLink size={18} />
                {siteData.projectDetail.comingSoonLabel}
              </span>
            )}
          </div>

          <div className="prose prose-sm max-w-none">
            {project.longDescription.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="mb-4 mt-8 text-lg font-semibold text-foreground">
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n").filter((line) => line.startsWith("- "));
                return (
                  <ul key={index} className="mb-4 list-inside list-disc space-y-1 text-muted-foreground">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item.replace("- ", "")}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="mb-4 leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {project.media && project.media.length > 0 && (
            <div className="mt-12 border-t border-border pt-8">
              <h2 className="mb-6 text-lg font-semibold text-foreground">
                {siteData.projectDetail.galleryTitle}
              </h2>
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
