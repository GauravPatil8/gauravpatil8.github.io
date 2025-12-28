import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Github, Linkedin, Mail, BookOpen, FileText, ExternalLink, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

const Index = () => {
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
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* Left Column - About Me (Sticky) */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="lg:sticky lg:top-16">
                {/* Profile */}
                <div className="mb-6">
                  <div className="w-32 h-32 rounded-full bg-secondary overflow-hidden mb-4">
                    <img 
                      src="/profile.jpg" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h1 className="text-2xl font-bold text-foreground">Gaurav Patil</h1>
                  <p className="text-muted-foreground mt-1">Undergrad Student</p>
                  <p className="text-sm text-muted-foreground">AI & Data Science @ SIES Graduate School of Technology</p>
                </div>

                {/* Bio */}
                <p className="text-sm text-foreground leading-relaxed mb-6">
                  Machine learning researcher focused on deep learning, computer vision, and NLP. 
                  I implement and extend state-of-the-art research papers.
                </p>

                {/* Social Links */}
                <div className="flex flex-col gap-2 mb-8">
                  <a href="mailto:patilgauravpradeep@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <Mail size={16} /> patilgauravpradeep@gmail.com
                  </a>
                  <a href="https://github.com/GauravPatil8" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <Github size={16} /> github.com
                  </a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <BookOpen size={16} /> Google Scholar
                  </a>
                  <a href="https://www.linkedin.com/in/gauravpatil8/" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <Linkedin size={16} /> LinkedIn
                  </a>
                </div>

                {/* Research Interests */}
                <div>
                  <h2 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
                    Research Interests
                  </h2>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Deep Learning</li>
                    <li>Computer Vision</li>
                    <li>Natural Language Processing</li>
                    <li>Self-Supervised Learning</li>
                  </ul>
                </div>
              </div>
            </aside>

            {/* Right Column - Work */}
            <main className="flex-1 min-w-0">
              {/* Publications */}
              {/* <section className="mb-12">
                <h2 className="text-xl font-semibold text-foreground mb-6 pb-2 border-b border-border">
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
              </section> */}

              {/* Projects */}
              <section className="mb-12">
                <h2 className="text-xl font-semibold text-foreground mb-6 pb-2 border-b border-border">
                  Projects
                </h2>
                <div className="space-y-6">
                  {projects.map((project, index) => (
                    <div key={index} className="flex gap-4">
                      {/* Project Image */}
                      <div className="w-20 h-20 flex-shrink-0 rounded bg-secondary overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Project Content */}
                      <div className="flex-1 min-w-0">
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
                        <Link
                          to={`/project/${project.id}`}
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
                        >
                          More Info <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section className="mb-12">
                <h2 className="text-xl font-semibold text-foreground mb-6 pb-2 border-b border-border">
                  Education
                </h2>
                <div className="space-y-4">
                  {/* <div>
                    <h3 className="font-medium text-foreground">Ph.D. in Computer Science</h3>
                    <p className="text-sm text-muted-foreground">University Name, 2021 - Present</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">M.S. in Computer Science</h3>
                    <p className="text-sm text-muted-foreground">University Name, 2019 - 2021</p>
                  </div> */}
                  <div>
                    <h3 className="font-medium text-foreground">B.E. in AI & Data Science</h3>
                    <p className="text-sm text-muted-foreground">SIES Graduate School of Technology, 2022 - Present</p>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <footer className="pt-8 border-t border-border text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} Gaurav Patil</p>
              </footer>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
