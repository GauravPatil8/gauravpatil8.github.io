import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  BookOpen,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  Youtube,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from "@/data/projects";
import siteData from "@/data/site.json";
import { withBase } from "@/lib/paths";

type ResearchLogStatus = "Working on" | "Worked on" | "Currently reading" | "Read";

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
  const [showAllResearchLog, setShowAllResearchLog] = useState(false);

  const statusStyles: Record<ResearchLogStatus, string> = {
    "Working on": "border-cyan-300/25 bg-cyan-300/10 text-cyan-200",
    "Worked on": "border-green-300/25 bg-green-300/10 text-green-200",
    "Currently reading": "border-violet-300/20 bg-violet-300/10 text-violet-200",
    Read: "border-red-300/20 bg-red-300/10 text-red-200",
  };

  const statusDotStyles: Record<ResearchLogStatus, string> = {
    "Working on": "bg-cyan-300",
    "Worked on": "bg-green-300",
    "Currently reading": "bg-violet-300",
    Read: "bg-red-300",
  };

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
    book: BookOpen,
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

  const researchLog = siteData.researchLog as {
    status: ResearchLogStatus;
    date: string;
    title: string;
    note: string;
  }[];

  const visibleResearchLog = showAllResearchLog ? researchLog : researchLog.slice(0, 2);
  const hasMoreResearchLog = researchLog.length > 2;

  return (
    <>
      <Helmet>
        <title>{siteData.seo.title}</title>
        <meta name="description" content={siteData.seo.description} />
      </Helmet>

      <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
        <VectorFieldBackground />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-8 xl:gap-9">
            <aside className="lg:w-60 lg:flex-shrink-0 xl:w-64">
              <div className="lg:sticky lg:top-16">
                <div className="mb-6">
                  <div className="mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-secondary">
                    <img
                      src={withBase(siteData.profile.image)}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <h1 className="text-4xl font-semibold leading-none text-foreground">
                    {siteData.profile.name}
                  </h1>
                  <p className="mt-2 text-primary">{siteData.profile.title}</p>
                  <p className="text-sm text-muted-foreground">{siteData.profile.affiliation}</p>
                </div>

                <p className="mb-6 text-sm leading-relaxed text-foreground">{siteData.profile.bio}</p>

                <div className="mb-8 flex flex-col gap-2">
                  {siteData.socialLinks.map((link) => {
                    const Icon = socialIcons[link.icon as keyof typeof socialIcons] ?? ExternalLink;
                    const isMailLink = link.href.startsWith("mailto:");

                    return (
                      <a
                        key={`${link.label}-${link.href}`}
                        href={link.href}
                        target={isMailLink ? undefined : "_blank"}
                        rel={isMailLink ? undefined : "noopener noreferrer"}
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        <Icon size={16} /> {link.label}
                      </a>
                    );
                  })}
                </div>

                {/* <div>
                  <h2 className="mb-3 text-sm font-medium text-foreground">
                    {siteData.labels.sections.researchInterests}
                  </h2>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {siteData.researchInterests.map((interest) => (
                      <li key={interest}>{interest}</li>
                    ))}
                  </ul>
                </div> */}
              </div>
            </aside>

            <Tabs defaultValue="research" className="min-w-0 flex-[1_1_44rem]">
              <TabsList className="mb-8 grid h-auto w-full grid-cols-3 rounded-md border border-primary/10 bg-secondary/80 p-1 shadow-sm shadow-black/20">
                <TabsTrigger
                  value="research"
                  className="h-auto w-full whitespace-normal px-2 py-2 text-center text-xs leading-tight sm:px-5 sm:text-sm"
                >
                  {siteData.labels.tabs.research}
                </TabsTrigger>
                <TabsTrigger
                  value="experience"
                  className="h-auto w-full whitespace-normal px-2 py-2 text-center text-xs leading-tight sm:px-5 sm:text-sm"
                >
                  {siteData.labels.tabs.experience}
                </TabsTrigger>
                <TabsTrigger
                  value="product"
                  className="h-auto w-full whitespace-normal px-2 py-2 text-center text-xs leading-tight sm:px-5 sm:text-sm"
                >
                  {siteData.labels.tabs.product}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="product">
                <div className="mb-10">
                  <h3 className="mb-4 text-lg text-foreground">{siteData.labels.sections.products}</h3>
                  <div className="grid grid-cols-1 gap-4 pl-2 sm:grid-cols-2">
                    {siteData.products.map((product) => (
                    <div key={product.title} className="group overflow-hidden rounded-lg bg-card">
                      <div className="aspect-video overflow-hidden bg-secondary">
                        <img
                          src={withBase(product.image)}
                          alt={product.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-foreground">{product.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                        <div className="mt-3 flex gap-2">
                          <a
                            href={product.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded bg-secondary px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                            title="Watch Demo"
                          >
                            <Youtube size={14} /> {siteData.labels.actions.demo}
                          </a>
                          <a
                            href={product.productPage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded bg-secondary px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                            title="Product Page"
                          >
                            <ExternalLink size={14} /> {siteData.labels.actions.buy}
                          </a>
                        </div>
                      </div>
                    </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="research">
                <div className="mb-10">
                  <h3 className="mb-4 text-lg text-foreground">
                    {siteData.labels.sections.publications}
                  </h3>
                  <div className="space-y-6">
                    {siteData.publications.map((pub, index) => (
                      <div key={index}>
                        <h4 className="font-medium text-foreground">{pub.title}</h4>
                        <p className="text-sm text-muted-foreground">{highlightAuthor(pub.authors)}</p>
                        <p className="text-sm italic text-muted-foreground">{pub.venue}</p>
                        <div className="mt-2 flex flex-wrap gap-4">
                          {pub.links.arxiv && (
                            <a
                              href={pub.links.arxiv}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                              <FileText size={14} /> {siteData.labels.actions.paper}
                            </a>
                          )}
                          {!pub.links.arxiv && (
                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                              <FileText size={14} /> {siteData.labels.actions.comingSoon}
                            </span>
                          )}
                          {pub.links.code && (
                            <a
                              href={pub.links.code}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                              <Github size={14} /> {siteData.labels.actions.code}
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-10 pt-5">
                  <h3 className="mb-4 text-lg text-foreground">{siteData.labels.sections.projects}</h3>
                  <div className="space-y-6">
                    {projects.map((project, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="aspect-square h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-secondary">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <h4 className="font-medium text-foreground">{project.title}</h4>
                            <div className="flex flex-shrink-0 items-center gap-2">
                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-muted-foreground transition-colors hover:text-primary"
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
                                >
                                  <ExternalLink size={18} />
                                </a>
                              )}
                            </div>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {project.tags.map((tag, tagIndex) => (
                              <span
                                key={tag}
                                className={`rounded border px-2 py-0.5 text-xs ${projectTagStyles[tagIndex % projectTagStyles.length]}`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg text-foreground">{siteData.labels.sections.education}</h3>
                  <div className="space-y-4">
                    <div>
                      {siteData.education.map((item) => (
                        <div key={`${item.degree}-${item.school}`}>
                          <h4 className="font-medium text-foreground">{item.degree}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.school}, {item.date}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="experience">
                <main className="min-w-0 flex-1">
                  <div className="space-y-6">
                    <h3 className="mb-4 text-lg text-foreground">
                      {siteData.labels.sections.experience}
                    </h3>

                    {siteData.experience.map((job) => (
                    <div key={`${job.title}-${job.company}`}>
                      <div className="flex gap-4">
                        <div className="h-12 w-12 overflow-hidden rounded bg-background">
                          <img
                            src={withBase(job.logo)}
                            alt="Company Logo"
                            className="h-full w-full object-contain p-1"
                          />
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
                </main>
              </TabsContent>
            </Tabs>

            <aside className="hidden lg:w-64 lg:flex-shrink-0 xl:w-[17rem]">
              <div className="rounded-lg border border-primary/10 bg-card/70 p-5 shadow-sm shadow-black/20 lg:sticky lg:top-16">
                <div className="mb-5 flex items-start justify-between gap-3 border-b border-border/70 pb-4">
                  <div>
                    <h3 className="flex items-center gap-2 text-lg text-foreground">
                      <BookOpen className="h-4 w-4 text-primary" aria-hidden="true" />
                      {siteData.labels.sections.researchLog}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">Recent work and reading notes</p>
                  </div>
                  <span className="rounded border border-primary/15 bg-primary/10 px-2 py-0.5 text-xs text-primary">
                    {researchLog.length}
                  </span>
                </div>

                <div className="space-y-5 border-l border-border/80 pl-4">
                  {visibleResearchLog.map((item) => (
                    <div key={`${item.status}-${item.title}`} className="relative">
                      <span
                        className={`absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-card ${statusDotStyles[item.status]}`}
                      />
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full border px-2 py-0.5 text-xs ${statusStyles[item.status]}`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="mb-1 text-xs uppercase text-muted-foreground">{item.date}</p>
                      <h4 className="text-sm font-medium leading-snug text-foreground">{item.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
                    </div>
                  ))}
                </div>
                {hasMoreResearchLog && (
                  <button
                    type="button"
                    onClick={() => setShowAllResearchLog((isShowing) => !isShowing)}
                    className="mt-5 w-full rounded-md border border-primary/15 bg-secondary/60 px-3 py-2 text-sm text-primary transition-colors hover:border-primary/30 hover:bg-secondary hover:text-foreground"
                  >
                    {showAllResearchLog
                      ? siteData.labels.actions.showLess
                      : `Show ${researchLog.length - 2} ${siteData.labels.actions.showMoreSuffix}`}
                  </button>
                )}
              </div>
            </aside>
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
