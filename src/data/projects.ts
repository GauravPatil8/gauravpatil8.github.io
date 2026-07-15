import projectsData from "./projects.json";
import { withBase } from "@/lib/paths";

export interface ProjectMedia {
  type: "image" | "youtube" | "gif" | "video";
  url: string;
  caption?: string;
}

export interface ProjectContentObject {
  type: "image" | "video";
  url: string;
  caption?: string;
}

export interface ProjectSection {
  title: string;
  content: (string | ProjectContentObject)[];
}

interface ProjectData {
  id: string;
  title: string;
  description: string;
  sections: ProjectSection[];
  tags: string[];
  image: string;
  github?: string;
  paper?: string;
  media?: ProjectMedia[];
}

export interface Project extends ProjectData {}

const asset = (fileName: string) =>
  fileName.startsWith("http") || fileName.startsWith("/") ? fileName : withBase(fileName);

const resolveSectionContent = (content: (string | ProjectContentObject)[]) => {
  return content.map((item) => {
    if (typeof item === "object" && item !== null && "url" in item) {
      return {
        ...item,
        url: asset(item.url),
      };
    }
    return item;
  });
};

export const projects: Project[] = (projectsData as ProjectData[]).map((project) => ({
  ...project,
  image: asset(project.image),
  sections: project.sections.map((section) => ({
    ...section,
    content: resolveSectionContent(section.content),
  })),
}));
