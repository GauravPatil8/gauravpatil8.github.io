import { useState } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

import { Project, ProjectMedia } from "@/data/projects";
import siteData from "@/data/site.json";
import { withBase } from "@/lib/paths";

const projectTagStyles = [
  "border-foreground/20 bg-foreground/5 text-foreground/70",
  "border-foreground/20 bg-foreground/5 text-foreground/70",
  "border-foreground/20 bg-foreground/5 text-foreground/70",
  "border-foreground/20 bg-foreground/5 text-foreground/70",
  "border-foreground/20 bg-foreground/5 text-foreground/70",
];

const MediaItem = ({ media }: { media: ProjectMedia }) => {
  if (media.type === "youtube") {
    const getYouTubeId = (url: string) => {
      const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s]+)/);
      return match ? match[1] : null;
    };
    const videoId = getYouTubeId(media.url);

    return (
      <div className="my-4">
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-border/60 bg-secondary">
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
      <div className="my-4">
        <div className="w-full overflow-hidden rounded-xl border border-border/60 bg-secondary">
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
    <div className="my-4">
      <div className="w-full overflow-hidden rounded-xl border border-border/60 bg-secondary">
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

type ProjectDetailViewProps = {
  project: Project;
  showBackLink?: boolean;
  backLabel?: string;
  backHref?: string;
};

const ProjectDetailView = ({
  project,
  showBackLink = false,
  backLabel = siteData.projectDetail.backLabel,
  backHref = "/",
}: ProjectDetailViewProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Extract first 2 paragraphs for the overview preview
  const longDescParagraphs = project.longDescription.split("\n\n");
  const overviewParagraphs = longDescParagraphs.slice(0, 2);

  // Build pages dynamically
  const pages: { label: string; content: React.ReactNode }[] = [];

  // Page 1: Overview — side-by-side layout with small image + overview text
  pages.push({
    label: "Overview",
    content: (
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">
            {siteData.labels.sections.projects}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">{project.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tag}
                className={`rounded-full border px-2.5 py-0.5 text-xs ${projectTagStyles[tagIndex % projectTagStyles.length]}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:underline"
              >
                <Github size={16} />
                {siteData.projectDetail.githubLabel}
              </a>
            )}
            {project.paper && (
              <a
                href={project.paper}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:underline"
              >
                <ExternalLink size={16} />
                {siteData.projectDetail.paperLabel}
              </a>
            )}
            {!project.paper && (
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <ExternalLink size={16} />
                {siteData.projectDetail.comingSoonLabel}
              </span>
            )}
          </div>

          {/* Overview preview from long description */}
          <div className="mt-6 border-t border-border/30 pt-4">
            {overviewParagraphs.map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h3 key={index} className="mb-2 text-sm font-semibold text-foreground">
                    {paragraph.replace("## ", "")}
                  </h3>
                );
              }
              return (
                <p key={index} className="mb-2 text-sm leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              );
            })}
            {longDescParagraphs.length > 2 && (
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className="mt-1 text-xs font-medium text-primary transition-colors hover:underline"
              >
                Read more →
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/70">
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          </div>

          <div className="rounded-2xl border border-border/60 bg-card/70 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Snapshot
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start justify-between gap-3">
                <span>Focus</span>
                <span className="text-right text-foreground">{project.tags[0] || "Research"}</span>
              </li>
              <li className="flex items-start justify-between gap-3">
                <span>Type</span>
                <span className="text-right text-foreground">ML / Research project</span>
              </li>
              <li className="flex items-start justify-between gap-3">
                <span>Links</span>
                <span className="text-right text-foreground">
                  {project.github ? "Code" : "Private"}
                  {project.paper ? " · Paper" : ""}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  });

  // Page 2: In-depth — long description
  pages.push({
    label: "In-depth",
    content: (
      <div className="h-full overflow-y-auto prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground">
        {longDescParagraphs.map((paragraph, index) => {
          if (paragraph.startsWith("## ")) {
            return (
              <h3 key={index} className="mb-3 mt-6 text-base font-semibold text-foreground first:mt-0">
                {paragraph.replace("## ", "")}
              </h3>
            );
          }
          if (paragraph.startsWith("- ")) {
            const items = paragraph.split("\n").filter((line) => line.startsWith("- "));
            return (
              <ul key={index} className="mb-3 list-inside list-disc space-y-1">
                {items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item.replace("- ", "")}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={index} className="mb-3 leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </div>
    ),
  });

  // Page 3: Gallery — only if media exists
  if (project.media && project.media.length > 0) {
    pages.push({
      label: "Gallery",
      content: (
        <div className="h-full overflow-y-auto">
          <h3 className="mb-4 text-lg font-semibold text-foreground">{siteData.projectDetail.galleryTitle}</h3>
          <div className="space-y-4">
            {project.media.map((item, index) => (
              <MediaItem key={`${item.url}-${index}`} media={item} />
            ))}
          </div>
        </div>
      ),
    });
  }

  const safeCurrentPage = Math.min(currentPage, pages.length - 1);

  return (
    <div className="flex w-full flex-col" style={{ minHeight: "32rem" }}>
      {showBackLink && (
        <a
          href={backHref}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <span aria-hidden="true">←</span>
          {backLabel}
        </a>
      )}

      {/* Scrollable content area — takes all available space */}
      <div className="flex-1 overflow-y-auto">
        {pages[safeCurrentPage].content}
      </div>

      {/* Pagination nav — always pinned at bottom */}
      <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-3">
        <button
          type="button"
          onClick={() => setCurrentPage(Math.max(0, safeCurrentPage - 1))}
          disabled={safeCurrentPage === 0}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary/30 hover:text-primary disabled:opacity-30 disabled:hover:border-border/60 disabled:hover:text-foreground"
        >
          <ChevronLeft size={14} />
          <span className="hidden sm:inline">Prev</span>
        </button>

        <div className="flex items-center gap-1.5">
          {pages.map((page, index) => (
            <button
              key={page.label}
              type="button"
              onClick={() => setCurrentPage(index)}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${index === safeCurrentPage
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {page.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setCurrentPage(Math.min(pages.length - 1, safeCurrentPage + 1))}
          disabled={safeCurrentPage === pages.length - 1}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary/30 hover:text-primary disabled:opacity-30 disabled:hover:border-border/60 disabled:hover:text-foreground"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default ProjectDetailView;

