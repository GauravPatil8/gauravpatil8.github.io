import projectsData from "./projects.json";
import { withBase } from "@/lib/paths";

export interface ProjectMedia {
  type: "image" | "youtube" | "gif" | "video";
  url: string;
  caption?: string;
}

interface ProjectData {
  id: string;
  title: string;
  description: string;
  longDescription: string[];
  tags: string[];
  image: string;
  github?: string;
  paper?: string;
  media?: ProjectMedia[];
}

export interface Project extends Omit<ProjectData, "longDescription"> {
  longDescription: string;
}

const asset = (fileName: string) =>
  fileName.startsWith("http") || fileName.startsWith("/") ? fileName : withBase(fileName);

export const projects: Project[] = (projectsData as ProjectData[]).map((project) => ({
  ...project,
  image: asset(project.image),
  longDescription: project.longDescription.join("\n\n"),
}));
