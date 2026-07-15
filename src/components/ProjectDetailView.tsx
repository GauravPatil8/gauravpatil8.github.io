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

const parseInlineMarkdown = (text: string): React.ReactNode => {
  const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g;
  const parts = text.split(regex);
  if (parts.length === 1) return text;

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={i} className="rounded bg-muted/60 border border-border/20 px-1 py-0.5 font-mono text-[11px] text-foreground">
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith("[") && part.includes("](")) {
          const match = part.match(/\[(.*?)\]\((.*?)\)/);
          if (match) {
            const [, linkText, url] = match;
            const isFile = url.startsWith("file://");
            const formattedUrl = isFile ? url.replace(/\\/g, "/") : url;
            return (
              <a
                key={i}
                href={formattedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium inline-flex items-center gap-0.5"
              >
                {linkText}
              </a>
            );
          }
        }
        return part;
      })}
    </>
  );
};

const MarkdownText = ({ text }: { text: string }) => {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  
  let currentBlockType: "paragraph" | "list" | "code" | "blockquote" | null = null;
  let currentBlockLines: string[] = [];
  
  const flushBlock = (key: string | number) => {
    if (currentBlockLines.length === 0) return;
    
    if (currentBlockType === "code") {
      const codeContent = currentBlockLines.join("\n");
      elements.push(
        <pre key={key} className="my-4 overflow-x-auto rounded-xl border border-border/40 bg-muted/30 p-4 font-mono text-[11px] leading-relaxed text-foreground">
          <code>{codeContent}</code>
        </pre>
      );
    } else if (currentBlockType === "list") {
      elements.push(
        <ul key={key} className="my-3 list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
          {currentBlockLines.map((line, idx) => {
            const content = line.trim().replace(/^[-*]\s+/, "");
            return (
              <li key={idx} className="leading-relaxed">
                {parseInlineMarkdown(content)}
              </li>
            );
          })}
        </ul>
      );
    } else if (currentBlockType === "blockquote") {
      elements.push(
        <blockquote key={key} className="my-4 border-l-4 border-primary/45 pl-4 py-1 italic text-muted-foreground bg-muted/20 rounded-r-lg">
          {currentBlockLines.map((line, idx) => {
            const content = line.trim().replace(/^>\s?/, "");
            return (
              <p key={idx} className="my-1.5 leading-relaxed">
                {parseInlineMarkdown(content)}
              </p>
            );
          })}
        </blockquote>
      );
    } else if (currentBlockType === "paragraph") {
      currentBlockLines.forEach((line, idx) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return;
        
        if (trimmedLine.startsWith("### ")) {
          elements.push(
            <h3 key={`${key}-${idx}`} className="mt-5 mb-2 text-base font-semibold tracking-tight text-foreground">
              {parseInlineMarkdown(trimmedLine.slice(4))}
            </h3>
          );
        } else if (trimmedLine.startsWith("#### ")) {
          elements.push(
            <h4 key={`${key}-${idx}`} className="mt-4 mb-2 text-sm font-semibold tracking-tight text-foreground">
              {parseInlineMarkdown(trimmedLine.slice(5))}
            </h4>
          );
        } else if (trimmedLine.startsWith("$$") && trimmedLine.endsWith("$$")) {
          elements.push(
            <div key={`${key}-${idx}`} className="my-4 text-center font-serif text-sm text-foreground bg-muted/10 py-2 rounded-lg overflow-x-auto">
              {trimmedLine.slice(2, -2)}
            </div>
          );
        } else {
          elements.push(
            <p key={`${key}-${idx}`} className="mb-3 leading-relaxed text-sm text-muted-foreground">
              {parseInlineMarkdown(line)}
            </p>
          );
        }
      });
    }
    
    currentBlockLines = [];
    currentBlockType = null;
  };
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (trimmed.startsWith("```")) {
      if (currentBlockType === "code") {
        flushBlock(i);
      } else {
        flushBlock(i);
        currentBlockType = "code";
      }
      continue;
    }
    
    if (currentBlockType === "code") {
      currentBlockLines.push(line);
      continue;
    }
    
    if (trimmed === "") {
      flushBlock(i);
      continue;
    }
    
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (currentBlockType !== "list") {
        flushBlock(i);
        currentBlockType = "list";
      }
      currentBlockLines.push(line);
      continue;
    }
    
    if (trimmed.startsWith(">")) {
      if (currentBlockType !== "blockquote") {
        flushBlock(i);
        currentBlockType = "blockquote";
      }
      currentBlockLines.push(line);
      continue;
    }
    
    if (currentBlockType !== "paragraph") {
      flushBlock(i);
      currentBlockType = "paragraph";
    }
    currentBlockLines.push(line);
  }
  
  flushBlock("final");
  
  return <div className="space-y-1">{elements}</div>;
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

  // Extract overview section content
  const overviewSection = project.sections[0];
  const overviewParagraphs = overviewSection ? overviewSection.content : [];

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

          </div>

          {/* Overview preview */}
          <div className="mt-6 border-t border-border/30 pt-4">
            {overviewParagraphs.map((item, index) => {
              if (typeof item === "string") {
                return <MarkdownText key={index} text={item} />;
              } else if (item && typeof item === "object") {
                if (item.type === "image") {
                  return (
                    <div key={index} className="my-3">
                      <div className="w-full overflow-hidden rounded-lg border border-border/60 bg-secondary">
                        <img src={withBase(item.url)} alt={item.caption || ""} className="h-auto w-full object-cover" />
                      </div>
                      {item.caption && (
                        <p className="mt-1 text-center text-[11px] italic text-muted-foreground">{item.caption}</p>
                      )}
                    </div>
                  );
                }
              }
              return null;
            })}
            {project.sections && project.sections.length > 1 && (
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
            {/(\.mp4|\.webm)$/i.test(project.image) ? (
              <video
                src={project.image}
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
            )}
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
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  });

  // Dynamic pages for the remaining details
  if (project.sections && project.sections.length > 1) {
    project.sections.slice(1).forEach((section) => {
      pages.push({
        label: section.title,
        content: (
          <div className="h-full overflow-y-auto prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground">
            <h2 className="text-xl font-bold tracking-tight text-foreground mb-4 border-b border-border/30 pb-2">{section.title}</h2>
            {section.content.map((item, index) => {
              if (typeof item === "string") {
                return <MarkdownText key={index} text={item} />;
              } else if (item && typeof item === "object") {
                if (item.type === "image") {
                  return (
                    <div key={index} className="my-4">
                      <div className="w-full overflow-hidden rounded-xl border border-border/60 bg-secondary">
                        <img
                          src={withBase(item.url)}
                          alt={item.caption || "Explaining diagram"}
                          className="h-auto w-full object-cover"
                        />
                      </div>
                      {item.caption && (
                        <p className="mt-2 text-center text-xs italic text-muted-foreground">{item.caption}</p>
                      )}
                    </div>
                  );
                } else if (item.type === "video") {
                  return (
                    <div key={index} className="my-4">
                      <div className="w-full overflow-hidden rounded-xl border border-border/60 bg-secondary">
                        <video src={withBase(item.url)} controls className="h-auto w-full">
                          {siteData.projectDetail.videoFallback}
                        </video>
                      </div>
                      {item.caption && (
                        <p className="mt-2 text-center text-xs italic text-muted-foreground">{item.caption}</p>
                      )}
                    </div>
                  );
                }
              }
              return null;
            })}
          </div>
        ),
      });
    });
  }

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
    <div className="flex w-full flex-col flex-1 min-h-0" style={{ minHeight: "32rem" }}>
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

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-[12rem] xs:max-w-[16rem] sm:max-w-none">
          {pages.map((page, index) => (
            <button
              key={page.label}
              type="button"
              onClick={() => setCurrentPage(index)}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap ${index === safeCurrentPage
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <span className="hidden sm:inline">{page.label}</span>
              <span className="inline sm:hidden">{index + 1}</span>
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

