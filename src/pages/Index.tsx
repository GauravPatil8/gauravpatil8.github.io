import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import PublicationsSection from "@/components/PublicationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>ML/AI Researcher | Academic Portfolio</title>
        <meta
          name="description"
          content="Academic portfolio showcasing machine learning and AI research, project implementations, and publications in deep learning, computer vision, and NLP."
        />
        <meta
          name="keywords"
          content="machine learning, artificial intelligence, deep learning, research, computer vision, NLP, transformers"
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <PublicationsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
