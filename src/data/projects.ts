import { withBase } from "@/lib/paths";

export interface ProjectMedia {
  type: "image" | "youtube" | "gif" | "video";
  url: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  github?: string;
  paper?: string;
  media?: ProjectMedia[];
}

const asset = (fileName: string) => withBase(fileName);

export const projects: Project[] = [

  {
    id: "meshtron",
    title: "Nvidia MeshTron: 3D Mesh Generation from Point Clouds",
    description:
      "End-to-end implementation of a neural pipeline for generating high-quality triangle meshes directly from unstructured point clouds.",
    longDescription: `MeshTron is a research-focused implementation inspired by NVIDIA’s Meshtron approach, aimed at converting raw 3D point clouds into coherent, watertight triangle meshes using deep learning.

The project explores how neural networks can learn geometric structure, surface continuity, and topology from unordered point samples, bridging the gap between point-based representations and mesh-based 3D assets used in real-time graphics, simulation, and animation pipelines.

## Features
- End-to-end neural pipeline for point cloud to mesh reconstruction
- Learned surface representation with explicit vertex and face prediction
- Custom PyTorch training loop with geometry-aware loss functions
- Support for synthetic datasets (cubes, tori, parametric shapes) for controlled experiments
- Mesh quality evaluation using geometric metrics (surface smoothness, edge consistency)
- Modular architecture designed for experimentation with different encoders and decoders

## Technical Details
The system takes an unstructured point cloud as input and encodes it using a permutation-invariant network inspired by PointNet-style architectures. The latent representation is then decoded into explicit mesh primitives, predicting vertex positions and mesh connectivity in a structured manner.

Special care is taken to handle challenges unique to mesh generation, such as maintaining consistent topology, avoiding self-intersections, and producing animation-friendly geometry. The implementation emphasizes clarity and research extensibility, making it suitable for further exploration into retopology, geometric deep learning, and neural surface reconstruction.

This project serves both as a learning-driven reimplementation of modern neural mesh generation techniques and as a foundation for future work in AI-assisted 3D content creation.`,
    tags: [
      "PyTorch",
      "Transformers",
      "Hourglass Transformer",
      "Mesh Generation",
      "Geometric Deep Learning",
    ],
    image: asset("meshtron_gif.gif"),
    github: "https://github.com/GauravPatil8/Nvidia-Meshtron-Pytorch",
    paper: "https://arxiv.org/abs/2412.09548v1",
  },

  // =========================
  // Resume Projects
  // =========================
    {
    id: "multimodal-grocery-recognition",
    title: "Multimodal Grocery Product Recognition",
    description:
      "Detection-guided multimodal system combining vision and OCR text for fine-grained retail product recognition.",
    longDescription: `A multimodal recognition pipeline designed for dense retail grocery images containing multiple products.

The system combines YOLO-based object detection with multimodal classification by fusing visual embeddings from ResNet-50 and OCR text embeddings from DistilBERT. Synthetic multi-product scenes were generated to benchmark multiple YOLO variants, identifying YOLOv12n as the best trade-off between accuracy and efficiency.

## Key Contributions
- Detection-guided multimodal recognition pipeline
- Fusion of visual and textual embeddings
- Custom dataloaders and evaluation tools
- Achieved 87% Top-1 accuracy on fine-grained product recognition`,
    tags: ["Multimodal AI", "YOLO", "ResNet", "DistilBERT", "PyTorch"],
    image: asset("multimodel_grocery.png"),
    github: "https://colab.research.google.com/drive/1QuQ7e0mGrz0qiITxG3RjEIynOyoDHtRd?usp=sharing",
  },

  {
    id: "pointnet-classification",
    title: "3D Point Cloud Classification with PointNet",
    description:
      "PyTorch implementation of PointNet for 3D object classification with real-time inference support.",
    longDescription: `This project is a full PyTorch implementation of the original PointNet architecture for 3D point cloud classification.

The model was trained and evaluated on the ModelNet10 dataset, achieving 92% classification accuracy. The pipeline includes data normalization, augmentation, batching, and efficient GPU training. A Streamlit-based interface enables real-time inference and visualization of point cloud predictions.

## Highlights
- Faithful reproduction of the PointNet paper architecture
- End-to-end training and evaluation pipeline
- Real-time inference with interactive visualization
- Deep dive into permutation invariance and point-based representations`,
    tags: ["PyTorch", "PointNet", "3D Deep Learning", "Point Clouds"],
    image: asset("pointnet.png"),
    github: "https://github.com/GauravPatil8/Pointnet-unofficial_implementation",
  },

{
  id: "scam-sniffer",
  title: "Scam Sniffer: Fake Job Post Detection",
  description:
    "Machine learning classifier for detecting fraudulent job postings on professional platforms.",
  longDescription: `Scam Sniffer is a machine learning project focused on identifying fake and scam job postings using structured job listing features.

The system uses an XGBoost classifier trained on curated job post data to distinguish legitimate listings from fraudulent ones. Multiple models were evaluated, with XGBoost achieving the best performance in terms of accuracy and F1 score.

## Highlights
- Feature engineering for structured job post data
- Model benchmarking across multiple classifiers
- Strong accuracy and F1 score compared to baselines
- Practical application in online safety and fraud detection`,
  tags: ["Machine Learning", "XGBoost", "Fraud Detection", "Python"],
  image: asset("scam_sniffer.png"),
  github: "https://github.com/GauravPatil8/Scam_Sniffer",
}


//   {
//     id: "sentinel",
//     title: "Sentinel: Secure Document Sharing & Printing",
//     description:
//       "Privacy-first platform for encrypted document sharing and secure print retrieval using expiring links.",
//     longDescription: `Sentinel is a secure document sharing and printing system designed with privacy as a core principle.

// It enables users to share encrypted documents using unique, time-limited links, allowing even unregistered print shops to retrieve files securely without account creation. The system supports REST and WebSocket APIs for real-time updates and includes a management dashboard for print shops.

// ## Features
// - Encrypted file sharing with automatic expiration
// - Secure REST and WebSocket APIs
// - Accountless but authenticated print retrieval
// - Real-time status updates using Socket.io`,
//     tags: ["Node.js", "Express", "MongoDB", "Security", "Socket.io"],
//     image: "/placeholder.svg",
//     github: "#",
//   },

// //   {
// //     id: "real-time-asset-organizer",
// //     title: "Real-time Asset Organizer for Blender",
// //     description:
// //       "Commercial Blender add-on for automating asset organization using customizable folder presets.",
// //     longDescription: `A productivity-focused Blender add-on that automates asset organization through user-defined folder templates and presets.

// // The tool integrates directly into Blender’s UI and streamlines asset management for artists and designers. It has been released commercially on Blender Market and achieved early sales traction.

// // ## Highlights
// // - Deep integration with Blender Python API
// // - Customizable folder templates and presets
// // - Persistent storage using SQLite/JSON
// // - Commercially released product`,
// //     tags: ["Python", "Blender API", "Tooling", "Productivity"],
// //     image: "/placeholder.svg",
// //     github: "#",
// //   },

// //   {
// //     id: "url-shortener",
// //     title: "URL Shortener with Analytics",
// //     description:
// //       "Backend service for URL shortening, redirection, and usage analytics.",
// //     longDescription: `A backend-focused project implementing a URL shortener service with support for link redirection and basic analytics.

// // Built using Node.js, Express, and MongoDB, the service exposes REST APIs for link creation and tracking, with full endpoint testing using Postman.

// // ## Features
// // - Short link generation and redirection
// // - MongoDB-backed persistence
// // - Analytics-ready data model
// // - Fully tested REST API`,
// //     tags: ["Node.js", "Express", "MongoDB", "Backend"],
// //     image: "/placeholder.svg",
// //     github: "#",
// //   },
];
