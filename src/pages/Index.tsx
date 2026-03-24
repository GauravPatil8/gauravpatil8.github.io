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
import { withBase } from "@/lib/paths";

const Index = () => {
  const highlightAuthor = (authors: string) =>
    authors.split(",").map((author, index) => {
      const trimmedAuthor = author.trim();
      const isHighlighted = trimmedAuthor === "Gaurav Patil";

      return (
        <span key={`${trimmedAuthor}-${index}`}>
          {index > 0 && ", "}
          <span className={isHighlighted ? "text-foreground" : undefined}>{trimmedAuthor}</span>
        </span>
      );
    });

  const publications = [
    {
      title: "Probing Image Encoder Robustness via Retrieval Consistency Under Input Perturbations",
      authors: "Gaurav Patil, Ahmad Mustapha, Dr. Ali Chehab",
      venue: "Manuscript in preparation",
      links: {
        arxiv: "",
        code: "https://github.com/Chehab-Lab/encoder-retrieval-robustness",
      },
    },
    {
      title: "Detection-Guided Multimodal Grocery Recognition",
      authors: "Gaurav Patil, Dr.Neetu Sabu, Ayaan Dwivedi, Harsh Chaudhary, Madhavan Nadar",
      venue: "Under review at ICICGR 2026",
      links: {
        arxiv: "",
        code: "https://colab.research.google.com/drive/1QuQ7e0mGrz0qiITxG3RjEIynOyoDHtRd?usp=sharing",
      },
    },
  ];

  return (
    <>
      <Helmet>
        <title>Gaurav Patil | Researcher</title>
        <meta
          name="description"
          content="Academic portfolio showcasing machine learning and AI research projects and publications."
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.1),transparent_68%)]" />

        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <aside className="lg:w-72 lg:flex-shrink-0">
              <div className="lg:sticky lg:top-16">
                <div className="mb-6">
                  <div className="mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-secondary">
                    <img
                      src={withBase("profile.jpg")}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <h1 className="text-4xl font-semibold leading-none text-foreground">Gaurav Patil</h1>
                  <p className="mt-2 text-primary">ML/DL Student Researcher</p>
                  <p className="text-sm text-muted-foreground">
                    AI &amp; Data Science @ SIES Graduate School of Technology
                  </p>
                </div>

                <p className="mb-6 text-sm leading-relaxed text-foreground">
                  Machine learning researcher and engineer working on deep learning for vision,
                  multimodal, and 3D data.
                </p>

                <div className="mb-8 flex flex-col gap-2">
                  <a
                    href="mailto:patilgauravpradeep@gmail.com"
                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Mail size={16} /> patilgauravpradeep@gmail.com
                  </a>
                  <a
                    href="https://github.com/GauravPatil8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Github size={16} /> github
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <BookOpen size={16} /> Google Scholar
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gauravpatil8/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Linkedin size={16} /> LinkedIn
                  </a>
                </div>

                <div>
                  <h2 className="mb-3 text-sm font-medium text-foreground">Research Interests</h2>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>Computer Graphics</li>
                    <li>Deep Learning</li>
                    <li>Computer Vision</li>
                    <li>Natural Language Processing</li>
                    <li>Reinforcement Learning</li>
                  </ul>
                </div>
              </div>
            </aside>

            <Tabs defaultValue="research" className="w-full">
              <TabsList className="mb-8 h-auto rounded-md border border-primary/10 bg-secondary/80 p-1">
                <TabsTrigger value="research" className="rounded-sm px-5 py-2">
                  Research &amp; Projects
                </TabsTrigger>
                <TabsTrigger value="experience" className="rounded-sm px-5 py-2">
                  Work Experience
                </TabsTrigger>
              </TabsList>

              <TabsContent value="research">
                <div className="mb-10">
                  <h3 className="mb-4 text-lg text-foreground">Publications</h3>
                  <div className="space-y-6">
                    {publications.map((pub, index) => (
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
                              <FileText size={14} /> Paper
                            </a>
                          )}
                          {!pub.links.arxiv && (
                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                              <FileText size={14} /> Coming soon
                            </span>
                          )}
                          {pub.links.code && (
                            <a
                              href={pub.links.code}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                              <Github size={14} /> Code
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-10 pt-5">
                  <h3 className="mb-4 text-lg text-foreground">Projects</h3>
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
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded border border-primary/10 bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
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

                <div className="mb-10">
                  <h3 className="mb-4 text-lg text-foreground">Products</h3>
                  <div className="grid grid-cols-1 gap-4 pl-2 sm:grid-cols-2">
                    <div className="group overflow-hidden rounded-lg bg-card">
                      <div className="aspect-video overflow-hidden bg-secondary">
                        <img
                          src={withBase("realorganiser.png")}
                          alt="Real Time Asset Organizer"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-foreground">Real Time Asset Organizer</h4>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          A productivity tool for managing and organizing digital assets in
                          real-time.
                        </p>
                        <div className="mt-3 flex gap-2">
                          <a
                            href="https://youtu.be/cXZXOYnCE6c"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded bg-secondary px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                            title="Watch Demo"
                          >
                            <Youtube size={14} /> Demo
                          </a>
                          <a
                            href="https://superhivemarket.com/products/real-time-asset-organiser"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded bg-secondary px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                            title="Product Page"
                          >
                            <ExternalLink size={14} /> Get it
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg text-foreground">Education</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground">B.E. in AI &amp; Data Science</h4>
                      <p className="text-sm text-muted-foreground">
                        SIES Graduate School of Technology, 2022 - Present
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="experience">
                <main className="min-w-0 flex-1">
                  <div className="space-y-6">
                    <h3 className="mb-4 text-lg text-foreground">Work Experience</h3>

                    <div>
                      <div className="flex gap-4">
                        <div className="h-12 w-12 overflow-hidden rounded bg-background">
                          <img
                            src={withBase("aub.png")}
                            alt="Company Logo"
                            className="h-full w-full object-contain p-1"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">Deep Learning Research Intern</h3>
                          <p className="text-sm text-primary">
                            Chehab Lab @ American University of Beirut
                          </p>
                          <p className="mb-2 text-xs text-muted-foreground">Jan 2026 - Present</p>
                          <p className="text-sm text-muted-foreground">
                            Working on 2D computer vision, assisting the team in tackling an
                            active research problem.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex gap-4">
                        <div className="h-12 w-12 overflow-hidden rounded bg-background">
                          <img
                            src={withBase("baysquare.png")}
                            alt="Company Logo"
                            className="h-full w-full object-contain p-1"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">Backend Developer Intern</h3>
                          <p className="text-sm text-primary">Baysquare Technologies</p>
                          <p className="mb-2 text-xs text-muted-foreground">Jul 2024 - Aug 2024</p>
                          <p className="text-sm text-muted-foreground">
                            Built and automated backend workflows for contract generation and
                            digital signing using Django and Python. Automated end-to-end
                            processes using cron jobs on AWS EC2 and ensured secure storage of
                            signed documents in S3.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </TabsContent>
            </Tabs>
          </div>

          <footer className="mt-8 border-t border-primary/10 pt-8 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Gaurav Patil</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Index;
