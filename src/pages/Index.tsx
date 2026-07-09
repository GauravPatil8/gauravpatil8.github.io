import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ChevronLeft,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  Youtube,
} from "lucide-react";

import ProjectDetailView from "@/components/ProjectDetailView";
import { projects } from "@/data/projects";
import siteData from "@/data/site.json";
import { withBase } from "@/lib/paths";

type IconProps = {
  size?: number;
  className?: string;
};

type PointerState = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  active: number;
  targetActive: number;
};

const VectorFieldBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<PointerState>({
    x: 0.5,
    y: 0.38,
    targetX: 0.5,
    targetY: 0.38,
    active: 0,
    targetActive: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = pointerRef.current;
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let elapsed = 0;

    const resizeCanvas = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.targetX = event.clientX / Math.max(width, 1);
      pointer.targetY = event.clientY / Math.max(height, 1);
      pointer.targetActive = 1;

      if (motionQuery.matches) {
        window.requestAnimationFrame(render);
      }
    };

    const handlePointerLeave = () => {
      pointer.targetActive = 0;
    };

    const drawArrow = (
      x: number,
      y: number,
      vectorX: number,
      vectorY: number,
      magnitude: number,
      hue: number,
      influence: number,
      seed: number,
    ) => {
      const angle = Math.atan2(vectorY, vectorX);
      const length = 8 + Math.min(magnitude * 18, 18);
      const endX = x + Math.cos(angle) * length;
      const endY = y + Math.sin(angle) * length;
      const curve = Math.sin(seed * Math.PI * 2) * 2.5 + influence * 5.5;
      const controlX = (x + endX) * 0.5 - Math.sin(angle) * curve;
      const controlY = (y + endY) * 0.5 + Math.cos(angle) * curve;
      const alpha = 0.08 + Math.min(magnitude * 0.18, 0.18) + influence * 0.06;

      context.strokeStyle = `hsla(${hue}, 78%, 67%, ${alpha})`;
      context.lineWidth = 0.85 + influence * 0.45;
      context.beginPath();
      context.moveTo(x, y);
      context.quadraticCurveTo(controlX, controlY, endX, endY);
      context.stroke();

      context.beginPath();
      context.moveTo(endX, endY);
      context.lineTo(endX - Math.cos(angle - 0.55) * 4, endY - Math.sin(angle - 0.55) * 4);
      context.moveTo(endX, endY);
      context.lineTo(endX - Math.cos(angle + 0.55) * 4, endY - Math.sin(angle + 0.55) * 4);
      context.stroke();
    };

    const drawTwinkle = (x: number, y: number, hue: number, seed: number, influence: number) => {
      if (seed < 0.58) {
        return;
      }

      const shimmer = motionQuery.matches ? 0.45 : (Math.sin(elapsed * 1.2 + seed * 12) + 1) * 0.5;
      const radius = 0.7 + seed * 1.1 + influence * 0.8;
      const alpha = 0.025 + shimmer * 0.07 + influence * 0.06;

      context.fillStyle = `hsla(${hue}, 82%, 76%, ${alpha})`;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    };

    const render = () => {
      pointer.x += (pointer.targetX - pointer.x) * 0.08;
      pointer.y += (pointer.targetY - pointer.y) * 0.08;
      pointer.active += (pointer.targetActive - pointer.active) * 0.06;

      context.clearRect(0, 0, width, height);

      const spacing = width < 640 ? 46 : 54;

      for (let y = -spacing; y < height + spacing; y += spacing) {
        for (let x = -spacing; x < width + spacing; x += spacing) {
          const nx = x / Math.max(width, 1);
          const ny = y / Math.max(height, 1);
          const dx = nx - pointer.x;
          const dy = ny - pointer.y;
          const distance = Math.hypot(dx, dy) + 0.035;
          const falloff = Math.min(1 / (distance * 3.2), 2.4) * pointer.active;
          const localInfluence = Math.max(0, 1 - distance * 4.2) * pointer.active;

          const sourceX = dx / distance;
          const sourceY = dy / distance;
          const curlX = -dy / distance;
          const curlY = dx / distance;
          const waveX = Math.sin(ny * 16) * 0.18;
          const waveY = Math.cos(nx * 15) * 0.18;

          const vectorX = waveX + sourceX * (0.32 + falloff * 0.95) + curlX * (0.54 + falloff * 1.25);
          const vectorY = waveY + sourceY * (0.28 + falloff * 0.85) + curlY * (0.5 + falloff * 1.2);
          const magnitude = Math.hypot(vectorX, vectorY);
          const hue = 178 + Math.min(falloff * 54, 54);
          const jitterX = Math.sin(y * 0.014) * 2;
          const jitterY = Math.cos(x * 0.012) * 2;
          const seed = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
          const normalizedSeed = seed - Math.floor(seed);
          const drawX = x + jitterX;
          const drawY = y + jitterY;

          drawTwinkle(drawX, drawY, hue, normalizedSeed, localInfluence);
          drawArrow(
            drawX,
            drawY,
            vectorX,
            vectorY,
            magnitude + localInfluence,
            hue,
            localInfluence,
            normalizedSeed,
          );
        }
      }

      if (!motionQuery.matches) {
        elapsed += 0.01;
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    resizeCanvas();
    render();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-65 mix-blend-screen"
    />
  );
};

const HuggingFaceIcon = ({ size = 16, className }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.16" />
    <path
      d="M6.8 14.2c.1 2.3 2.3 4.1 5.2 4.1s5.1-1.8 5.2-4.1c.1-1.2-.7-2.1-1.8-2.3-.8-.1-1.7.2-2.4.8-.5.4-1.5.4-2 0-.7-.6-1.6-.9-2.4-.8-1.1.2-1.9 1.1-1.8 2.3Z"
      fill="currentColor"
    />
    <path
      d="M8.7 9.9a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4ZM15.3 9.9a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z"
      fill="currentColor"
    />
    <path
      d="M9.2 15.1c.8.8 1.7 1.2 2.8 1.2s2-.4 2.8-1.2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.4"
    />
    <path
      d="M5.4 10.7c-.6-.7-1-1.5-.9-2.3.1-.9.8-1.3 1.6-.9.6.3 1.1.9 1.4 1.6M18.6 10.7c.6-.7 1-1.5.9-2.3-.1-.9-.8-1.3-1.6-.9-.6.3-1.1.9-1.4 1.6"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.4"
    />
  </svg>
);

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>("meshtron");
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  // Determines whether sidebar+detail layout is shown
  const isDetailView = selectedProject !== null || selectedSection !== null;

  const projectTagStyles = [
    "border-cyan-300/20 bg-cyan-300/10 text-cyan-200",
    "border-green-300/20 bg-green-300/10 text-green-200",
    "border-red-300/20 bg-red-300/10 text-red-200",
    "border-violet-300/20 bg-violet-300/10 text-violet-200",
    "border-amber-300/20 bg-amber-300/10 text-amber-200",
  ];

  const socialIcons = {
    mail: Mail,
    github: Github,
    linkedin: Linkedin,
    huggingface: HuggingFaceIcon,
  };

  const highlightAuthor = (authors: string) =>
    authors.split(",").map((author, index) => {
      const trimmedAuthor = author.trim();
      const isHighlighted = trimmedAuthor === siteData.profile.name;

      return (
        <span key={`${trimmedAuthor}-${index}`}>
          {index > 0 && ", "}
          <span className={isHighlighted ? "text-foreground" : undefined}>{trimmedAuthor}</span>
        </span>
      );
    });

  const selectedProjectData = projects.find((project) => project.id === selectedProject) ?? null;
  const sectionLinks = [
    { id: "publications", label: siteData.labels.sections.publications },
    { id: "experience", label: siteData.labels.sections.experience },
    { id: "products", label: siteData.labels.sections.products },
    { id: "education", label: siteData.labels.sections.education },
  ];

  const renderSectionContent = () => {
    if (!selectedSection) {
      return null;
    }

    if (selectedSection === "publications") {
      return (
        <div className="space-y-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold text-foreground">{siteData.labels.sections.publications}</h3>
          </div>
          <div className="grid gap-4">
            {siteData.publications.map((pub, index) => (
              <div key={index} className="rounded-2xl border border-primary/10 bg-card/70 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
                <h4 className="font-medium text-foreground">{pub.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{highlightAuthor(pub.authors)}</p>
                <p className="mt-1 text-sm italic text-muted-foreground">{pub.venue}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {pub.links.arxiv && (
                    <a href={pub.links.arxiv} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-full border border-border/60 bg-secondary/70 px-2.5 py-1 text-sm text-primary transition-colors hover:border-primary/30">
                      <FileText size={14} /> {siteData.labels.actions.paper}
                    </a>
                  )}
                  {!pub.links.arxiv && (
                    <span className="flex items-center gap-1 rounded-full border border-border/60 bg-secondary/70 px-2.5 py-1 text-sm text-muted-foreground">
                      <FileText size={14} /> {siteData.labels.actions.comingSoon}
                    </span>
                  )}
                  {pub.links.code && (
                    <a href={pub.links.code} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-full border border-border/60 bg-secondary/70 px-2.5 py-1 text-sm text-primary transition-colors hover:border-primary/30">
                      <Github size={14} /> {siteData.labels.actions.code}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (selectedSection === "experience") {
      return (
        <div className="space-y-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold text-foreground">{siteData.labels.sections.experience}</h3>
          </div>
          <div className="space-y-4">
            {siteData.experience.map((job) => (
              <div key={`${job.title}-${job.company}`} className="rounded-2xl border border-primary/10 bg-card/70 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
                <div className="flex gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-xl border border-border/60 bg-background/80">
                    <img src={withBase(job.logo)} alt="Company Logo" className="h-full w-full object-contain p-1" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{job.title}</h3>
                    <p className="text-sm text-primary">{job.company}</p>
                    <p className="mb-2 text-xs text-muted-foreground">{job.date}</p>
                    <p className="text-sm text-muted-foreground">{job.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (selectedSection === "products") {
      return (
        <div className="space-y-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold text-foreground">{siteData.labels.sections.products}</h3>
          </div>
          <div className="space-y-4">
            {siteData.products.map((product) => (
              <div key={product.title} className="group flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-card/70 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] transition-all duration-300 hover:border-primary/30 sm:flex-row">
                <div className="aspect-video overflow-hidden bg-secondary/70 sm:w-64 sm:flex-shrink-0 lg:w-72">
                  <img src={withBase(product.image)} alt={product.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center p-4">
                  <h4 className="font-medium text-foreground">{product.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a href={product.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/70 px-2.5 py-1 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary" title="Watch Demo">
                      <Youtube size={14} /> {siteData.labels.actions.demo}
                    </a>
                    <a href={product.productPage} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/70 px-2.5 py-1 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary" title="Product Page">
                      <ExternalLink size={14} /> {siteData.labels.actions.buy}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-foreground">{siteData.labels.sections.education}</h3>
        </div>
        <div className="rounded-2xl border border-primary/10 bg-card/70 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
          {siteData.education.map((item) => (
            <div key={`${item.degree}-${item.school}`}>
              <h4 className="font-medium text-foreground">{item.degree}</h4>
              <p className="text-sm text-muted-foreground">{item.school}, {item.date}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ---- Sidebar rendered for both project-detail and section-detail views ---- */
  const renderSidebar = () => (
    <div className="rounded-2xl border border-primary/10 bg-card/60 p-3 lg:sticky lg:top-4">
      {/* Projects list */}
      <div className="mb-3 flex items-center justify-between gap-3 px-1">
        <h3 className="text-sm font-medium text-foreground">Projects</h3>
        <button
          type="button"
          onClick={() => {
            setSelectedProject(null);
            setSelectedSection(null);
          }}
          className="text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          View all
        </button>
      </div>

      <div className="space-y-2">
        {projects.map((project) => {
          const isActive = selectedProject === project.id && !selectedSection;

          return (
            <button
              key={project.id}
              type="button"
              onClick={() => {
                setSelectedProject(project.id);
                setSelectedSection(null);
              }}
              className={`flex w-full items-center gap-3 rounded-xl border p-2 text-left transition-all duration-200 ${isActive
                ? "border-primary/25 bg-primary/[0.07]"
                : "border-transparent bg-background/30 hover:border-primary/20 hover:bg-card"
                }`}
            >
              <div className="aspect-square h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-medium text-foreground">
                  {project.title}
                </h4>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {project.tags[0]}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Publications */}
      <div className="mt-4 border-t border-border/60 pt-3">
        <button
          type="button"
          onClick={() => setSelectedSection("publications")}
          className="mb-2 flex w-full items-center justify-between px-1"
        >
          <h3 className="text-sm font-medium text-foreground">{siteData.labels.sections.publications}</h3>
          <span className="text-xs text-primary">→</span>
        </button>
        <div className="space-y-1.5">
          {siteData.publications.map((pub, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedSection("publications")}
              className={`flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors ${
                selectedSection === "publications"
                  ? "bg-primary/10 text-foreground"
                  : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
              }`}
            >
              <span className="mt-0.5 flex-shrink-0 text-primary">•</span>
              <span className="line-clamp-2">{pub.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Work Experience */}
      <div className="mt-4 border-t border-border/60 pt-3">
        <button
          type="button"
          onClick={() => setSelectedSection("experience")}
          className="mb-2 flex w-full items-center justify-between px-1"
        >
          <h3 className="text-sm font-medium text-foreground">{siteData.labels.sections.experience}</h3>
          <span className="text-xs text-primary">→</span>
        </button>
        <div className="space-y-1.5">
          {siteData.experience.map((job) => (
            <button
              key={`${job.title}-${job.company}`}
              type="button"
              onClick={() => setSelectedSection("experience")}
              className={`flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left transition-colors ${
                selectedSection === "experience"
                  ? "bg-primary/10"
                  : "hover:bg-background/50"
              }`}
            >
              <div className="h-6 w-6 flex-shrink-0 overflow-hidden rounded border border-border/40 bg-background/80">
                <img src={withBase(job.logo)} alt="" className="h-full w-full object-contain p-0.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-foreground">{job.title}</p>
                <p className="truncate text-[10px] text-muted-foreground">{job.company}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="mt-4 border-t border-border/60 pt-3">
        <button
          type="button"
          onClick={() => setSelectedSection("products")}
          className="mb-2 flex w-full items-center justify-between px-1"
        >
          <h3 className="text-sm font-medium text-foreground">{siteData.labels.sections.products}</h3>
          <span className="text-xs text-primary">→</span>
        </button>
        <div className="space-y-1.5">
          {siteData.products.map((product) => (
            <button
              key={product.title}
              type="button"
              onClick={() => setSelectedSection("products")}
              className={`flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors ${
                selectedSection === "products"
                  ? "bg-primary/10 text-foreground"
                  : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
              }`}
            >
              <span className="mt-0.5 flex-shrink-0 text-primary">•</span>
              <span className="truncate">{product.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mt-4 border-t border-border/60 pt-3">
        <h3 className="mb-2 px-1 text-sm font-medium text-foreground">{siteData.labels.sections.education}</h3>
        <div className="space-y-1.5">
          {siteData.education.map((item) => (
            <button
              key={`${item.degree}-${item.school}`}
              type="button"
              onClick={() => setSelectedSection("education")}
              className={`flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left transition-colors ${
                selectedSection === "education"
                  ? "bg-primary/10"
                  : "hover:bg-background/50"
              }`}
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-foreground">{item.degree}</p>
                <p className="truncate text-[10px] text-muted-foreground">{item.school}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  /* ---- Main content area (right side of sidebar) ---- */
  const renderMainContent = () => {
    // If a section is selected, show section content
    if (selectedSection) {
      return (
        <div className="rounded-[1.5rem] border border-primary/10 bg-card/70 p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.04)_inset] lg:min-h-[48rem] lg:p-7">
          <div className="relative">
            <button
              type="button"
              onClick={() => setSelectedSection(null)}
              className="absolute right-0 top-0 z-10 hidden rounded-full border border-border/60 bg-background/70 px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary lg:inline-flex"
            >
              Close
            </button>
            {renderSectionContent()}
          </div>
        </div>
      );
    }

    // Otherwise show the selected project detail
    if (selectedProjectData) {
      return (
        <div className="rounded-[1.5rem] border border-primary/10 bg-card/70 p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.04)_inset] lg:min-h-[48rem] lg:p-7">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setSelectedProject(null);
                setSelectedSection(null);
              }}
              className="absolute right-0 top-0 z-10 hidden rounded-full border border-border/60 bg-background/70 px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary lg:inline-flex"
            >
              Close
            </button>
            <ProjectDetailView project={selectedProjectData} />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Helmet>
        <title>{siteData.seo.title}</title>
        <meta name="description" content={siteData.seo.description} />
      </Helmet>

      <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
        <VectorFieldBackground />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
          <header className="mb-10 rounded-lg border border-primary/10 bg-card/70 p-5 shadow-sm shadow-black/20">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-secondary md:h-28 md:w-28">
                  <img
                    src={withBase(siteData.profile.image)}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="max-w-3xl">
                  <h1 className="text-3xl md:text-4xl font-semibold leading-none text-foreground">
                    {siteData.profile.name}
                  </h1>
                  <p className="mt-2 text-primary">{siteData.profile.title}</p>
                  <p className="text-sm text-muted-foreground">{siteData.profile.affiliation}</p>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground">
                    {siteData.profile.bio}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 md:max-w-xs md:justify-end">
                {siteData.socialLinks.map((link) => {
                  const Icon = socialIcons[link.icon as keyof typeof socialIcons] ?? ExternalLink;
                  const isMailLink = link.href.startsWith("mailto:");

                  return (
                    <a
                      key={`${link.label}-${link.href}`}
                      href={link.href}
                      target={isMailLink ? undefined : "_blank"}
                      rel={isMailLink ? undefined : "noopener noreferrer"}
                      className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/70 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                    >
                      <Icon size={16} /> <span className="hidden sm:inline">{link.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </header>

          <div className="grid gap-8">
            <section>
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-2xl font-medium text-foreground">{siteData.labels.sections.projects}</h2>
              </div>

              {isDetailView ? (
                <div>
                  {/* Mobile: back button + full-width content (no sidebar) */}
                  <div className="lg:hidden">
                    <button
                      type="button"
                      onClick={() => {
                        if (selectedSection) {
                          setSelectedSection(null);
                        } else {
                          setSelectedProject(null);
                          setSelectedSection(null);
                        }
                      }}
                      className="mb-4 inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary/30 hover:text-primary"
                    >
                      <ChevronLeft size={14} />
                      Back
                    </button>
                    {renderMainContent()}
                  </div>

                  {/* Desktop: sidebar + content grid */}
                  <div className="hidden gap-5 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start">
                    {renderSidebar()}
                    {renderMainContent()}
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Projects list */}
                  <div className="space-y-3">
                    {projects.map((project) => (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => {
                          setSelectedProject(project.id);
                          setSelectedSection(null);
                        }}
                        className="flex w-full gap-4 rounded-[1.25rem] border border-transparent bg-card/60 p-3 text-left transition-all duration-200 hover:border-primary/20 hover:bg-card"
                      >
                        <div className="aspect-square h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-secondary sm:h-20 sm:w-20">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="font-medium text-foreground">{project.title}</h3>
                            <div className="flex flex-shrink-0 items-center gap-2">
                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-muted-foreground transition-colors hover:text-primary"
                                  onClick={(event) => event.stopPropagation()}
                                >
                                  <Github size={18} />
                                </a>
                              )}
                              {project.paper && (
                                <a
                                  href={project.paper}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-muted-foreground transition-colors hover:text-primary"
                                  onClick={(event) => event.stopPropagation()}
                                >
                                  <ExternalLink size={18} />
                                </a>
                              )}
                            </div>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span
                                key={tag}
                                className={`rounded-full border px-2 py-0.5 text-[11px] ${projectTagStyles[tagIndex % projectTagStyles.length]}`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Publications */}
                  <section>
                    <button
                      type="button"
                      onClick={() => setSelectedSection("publications")}
                      className="group mb-4 flex items-center gap-2 text-2xl font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {siteData.labels.sections.publications}
                      <span className="text-base text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">→</span>
                    </button>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {siteData.publications.map((pub, index) => (
                        <div key={index} className="rounded-2xl border border-primary/10 bg-card/70 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
                          <h4 className="font-medium text-foreground">{pub.title}</h4>
                          <p className="mt-2 text-sm text-muted-foreground">{highlightAuthor(pub.authors)}</p>
                          <p className="mt-1 text-sm italic text-muted-foreground">{pub.venue}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {pub.links.arxiv && (
                              <a href={pub.links.arxiv} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-full border border-border/60 bg-secondary/70 px-2.5 py-1 text-sm text-primary transition-colors hover:border-primary/30">
                                <FileText size={14} /> {siteData.labels.actions.paper}
                              </a>
                            )}
                            {!pub.links.arxiv && (
                              <span className="flex items-center gap-1 rounded-full border border-border/60 bg-secondary/70 px-2.5 py-1 text-sm text-muted-foreground">
                                <FileText size={14} /> {siteData.labels.actions.comingSoon}
                              </span>
                            )}
                            {pub.links.code && (
                              <a href={pub.links.code} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-full border border-border/60 bg-secondary/70 px-2.5 py-1 text-sm text-primary transition-colors hover:border-primary/30">
                                <Github size={14} /> {siteData.labels.actions.code}
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Work Experience */}
                  <section>
                    <button
                      type="button"
                      onClick={() => setSelectedSection("experience")}
                      className="group mb-4 flex items-center gap-2 text-2xl font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {siteData.labels.sections.experience}
                      <span className="text-base text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">→</span>
                    </button>
                    <div className="space-y-4">
                      {siteData.experience.map((job) => (
                        <div key={`${job.title}-${job.company}`} className="rounded-2xl border border-primary/10 bg-card/70 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
                          <div className="flex gap-4">
                            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-border/60 bg-background/80">
                              <img src={withBase(job.logo)} alt="Company Logo" className="h-full w-full object-contain p-1" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-foreground">{job.title}</h3>
                              <p className="text-sm text-primary">{job.company}</p>
                              <p className="mb-2 text-xs text-muted-foreground">{job.date}</p>
                              <p className="text-sm text-muted-foreground">{job.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Products */}
                  <section>
                    <button
                      type="button"
                      onClick={() => setSelectedSection("products")}
                      className="group mb-4 flex items-center gap-2 text-2xl font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {siteData.labels.sections.products}
                      <span className="text-base text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">→</span>
                    </button>
                    <div className="space-y-4">
                      {siteData.products.map((product) => (
                        <div key={product.title} className="group flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-card/70 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] transition-all duration-300 hover:border-primary/30 sm:flex-row">
                          <div className="aspect-video overflow-hidden bg-secondary/70 sm:w-64 sm:flex-shrink-0 lg:w-72">
                            <img src={withBase(product.image)} alt={product.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col justify-center p-4">
                            <h4 className="font-medium text-foreground">{product.title}</h4>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <a href={product.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/70 px-2.5 py-1 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary" title="Watch Demo">
                                <Youtube size={14} /> {siteData.labels.actions.demo}
                              </a>
                              <a href={product.productPage} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/70 px-2.5 py-1 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary" title="Product Page">
                                <ExternalLink size={14} /> {siteData.labels.actions.buy}
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Education */}
                  <section>
                    <h2 className="mb-4 text-2xl font-medium text-foreground">
                      {siteData.labels.sections.education}
                    </h2>
                    <div className="rounded-2xl border border-primary/10 bg-card/70 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
                      {siteData.education.map((item) => (
                        <div key={`${item.degree}-${item.school}`}>
                          <h4 className="font-medium text-foreground">{item.degree}</h4>
                          <p className="text-sm text-muted-foreground">{item.school}, {item.date}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}
            </section>


          </div>

          <footer className="mt-8 border-t border-primary/10 pt-8 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} {siteData.profile.name}</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Index;
