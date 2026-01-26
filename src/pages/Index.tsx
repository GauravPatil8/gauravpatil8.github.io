import { Helmet } from "react-helmet-async";
import { Github, Linkedin, Mail, BookOpen, FileText, ExternalLink, Youtube, ShoppingBag } from "lucide-react";
import { projects } from "@/data/projects";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const Index = () => {
  const publications = [
    {
      title: "Detection-Guided Multimodal Grocery Recognition",
      authors: "Gaurav Patil, Dr.Neetu Sabu, Ayaan Dwivedi, Harsh Chaudhary, Madhavan Nadar",
      venue: "ICICGR 2026",
      links: { arxiv: "/comingsoon", code: "https://colab.research.google.com/drive/1QuQ7e0mGrz0qiITxG3RjEIynOyoDHtRd?usp=sharing" },
    },
  ];

  return (
    <>
      <Helmet>
        <title>Gaurav Patil | ML/AI Researcher</title>
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
                {/* bio */}
                <p className="text-sm text-foreground leading-relaxed mb-6">
                  Machine learning researcher and engineer working on deep learning for vision,
                  multimodal, and 3D data.
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
                    <li>Computer Graphics</li>
                    <li>Deep Learning</li>
                    <li>Computer Vision</li>
                    <li>Natural Language Processing</li>
                    <li>Reinforcement Learning</li>
                  </ul>
                </div>
              </div>
            </aside>

            {/* Right Column - Content with Tabs */}
            <main className="flex-1 min-w-0">
              <Tabs defaultValue="research" className="w-full">
                <TabsList className="mb-8">
                  <TabsTrigger value="research">Research & Projects</TabsTrigger>
                  <TabsTrigger value="experience">Work Experience</TabsTrigger>
                </TabsList>

                {/* Research & Projects Tab */}
                <TabsContent value="research">
                  {/* Publications */}
                  <div className="mb-10">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Publications
                    </h3>
                    <div className="space-y-6">
                      {publications.map((pub, index) => (
                        <div key={index}>
                          <h4 className="font-medium text-foreground">{pub.title}</h4>
                          <p className="text-sm text-muted-foreground">
                          <span className="font-mediumx text-foreground">
                            {pub.authors.split(",")[0]}
                          </span>
                          {pub.authors.split(",").slice(1).length > 0 && (
                            <>,{pub.authors.split(",").slice(1).join(",")}</>
                          )}
                        </p>
                          <p className="text-sm text-muted-foreground italic">{pub.venue}</p>
                          <div className="flex gap-3 mt-1">
                            {pub.links.arxiv && (
                              <a href={pub.links.arxiv} className="text-sm text-primary hover:underline flex items-center gap-1">
                                <FileText size={14} /> Paper
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
                  </div>
                  
                  {/* Projects */}
                  <div className="mb-10">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Projects
                    </h3>
                    <div className="space-y-6">
                      {projects.map((project, index) => (
                        <div key={index} className="flex gap-4">
                          {/* Project Image - Square Thumbnail */}
                          <div className="w-20 h-20 flex-shrink-0 rounded bg-secondary overflow-hidden aspect-square">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Project Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <h4 className="font-medium text-foreground">{project.title}</h4>
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
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Products */}
                  <div className="mb-10">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Products
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border border-border rounded-lg overflow-hidden bg-card group">
                        {/* Rectangle Thumbnail (16:9) */}
                        <div className="aspect-video bg-secondary overflow-hidden">
                          <img 
                            src="/placeholder.svg" 
                            alt="Real Time Asset Organizer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        {/* Content */}
                        <div className="p-4">
                          <h4 className="font-medium text-foreground">Real Time Asset Organizer</h4>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            A productivity tool for managing and organizing digital assets in real-time. Streamline your workflow with instant file tracking and categorization.
                          </p>
                          <div className="flex gap-2 mt-3">
                            <a 
                              href="#" 
                              className="inline-flex items-center gap-1.5 text-sm px-2 py-1 rounded bg-secondary text-muted-foreground hover:text-primary transition-colors"
                              title="Watch Demo"
                            >
                              <Youtube size={14} /> Demo
                            </a>
                            <a 
                              href="#" 
                              className="inline-flex items-center gap-1.5 text-sm px-2 py-1 rounded bg-secondary text-muted-foreground hover:text-primary transition-colors"
                              title="Product Page"
                            >
                              <ExternalLink size={14} /> Get it
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Education
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-foreground">B.E. in AI & Data Science</h4>
                        <p className="text-sm text-muted-foreground">SIES Graduate School of Technology, 2022 - Present</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Work Experience Tab */}
                <TabsContent value="experience">
                  
                  <div className="space-y-6">
                    

                      {/* Current */}
                      <div className="border-l-2 border-secondary pl-4">
                        <div className="flex gap-4">

                        <div className="w-12 h-12  rounded  overflow-hidden">
                            <img 
                              src="/aub.png" 
                              alt="Company Logo"
                              className="w-full h-full object-contain p-1"
                            />
                          </div>
                          <div className=" flex-1">

                          <h3 className="font-medium text-foreground">
                            Deep Learning Researcher
                          </h3>
                          <p className="text-sm text-primary">
                            American University of Beirut
                          </p>
                          <p className="text-xs text-muted-foreground mb-2">
                            Jan 2025 – Present
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Conducting research in deep learning with a focus on representation
                            learning and model behavior in vision-based systems. Working on
                            experimental pipelines involving large-scale training, embedding
                            analysis, and evaluation of learned feature spaces. Actively exploring
                            modern architectures and research methodologies, with emphasis on
                            reproducibility, empirical analysis, and research-driven implementation.
                          </p>
                          </div>
                        </div>

                    </div>

                    {/* Previous */}
                    <div className="border-l-2 border-secondary pl-4">

                    <div className="flex gap-4">
                    <div className="w-12 h-12 overflow-hidden">
                        <img 
                          src="/baysquare.png" 
                          alt="Company Logo"
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <div className="flex-1">

                      <h3 className="font-medium text-foreground">
                        Backend Developer Intern
                      </h3>
                      <p className="text-sm text-primary">
                        Baysquare Technologies
                      </p>
                      <p className="text-xs text-muted-foreground mb-2">
                        Jul 2024 – Aug 2024
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Built and automated backend workflows for contract generation and
                        digital signing using Django and Python. Integrated MySQL-based data
                        pipelines with the DocuSign API to generate, send, and track contracts.
                        Automated end-to-end processes using cron jobs on AWS EC2 and ensured
                        secure storage of signed documents in S3. Collaborated via GitHub in a
                        production codebase with a focus on reliability and maintainability.
                      </p>
                      </div>
                    </div>
                    </div>
                  </div>
                </TabsContent>

              </Tabs>

              {/* Footer */}
              <footer className="pt-8 mt-8 border-t border-border text-sm text-muted-foreground">
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
