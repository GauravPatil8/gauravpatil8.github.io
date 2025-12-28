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

export const projects: Project[] = [
  {
    id: "meshtron",
    title: "MeshTron: 3D Mesh Generation from Point Clouds",
    description: "End-to-end implementation of a neural pipeline for generating high-quality triangle meshes directly from unstructured point clouds.",
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
    tags: ["PyTorch", "Tranformers", "Hourglass Transformer", "Mesh Generation", "Geometric Deep Learning"],
    image: "/meshtron_demo_2.gif",
    github: "https://github.com/GauravPatil8/Nvidia-Meshtron-Pytorch",
    paper: "https://arxiv.org/abs/2412.09548v1",
    media: [{type: "video", url: "/meshtron_demo.mp4", caption: "abc"}]
  },

  {
    id: "diffusion-models",
    title: "Diffusion Models from Scratch",
    description: "Implementation of DDPM and improved sampling techniques for image generation.",
    longDescription: `Implementation of Denoising Diffusion Probabilistic Models (DDPM) and various improved sampling techniques for high-quality image generation.

## Features
- DDPM implementation following the original Ho et al. paper
- DDIM sampling for faster inference
- Classifier-free guidance support
- U-Net architecture with attention layers
- Progressive training on increasing resolutions

## Results
The model achieves competitive FID scores on CIFAR-10 and can generate diverse, high-quality samples across various domains.`,
    tags: ["Diffusion", "Generative AI"],
    image: "/placeholder.svg",
    github: "#",
  },
  {
    id: "bert-finetuning",
    title: "BERT Fine-tuning Pipeline",
    description: "Modular pipeline for fine-tuning BERT on custom NLP tasks with evaluation metrics.",
    longDescription: `A flexible and modular pipeline for fine-tuning BERT and other transformer models on various NLP tasks.

## Supported Tasks
- Text Classification (single and multi-label)
- Named Entity Recognition
- Question Answering
- Sentence Similarity

## Features
- HuggingFace Transformers integration
- Automatic hyperparameter optimization
- Comprehensive evaluation metrics
- Model export for production deployment
- Support for multiple model architectures (BERT, RoBERTa, DistilBERT)`,
    tags: ["NLP", "BERT", "HuggingFace"],
    image: "/placeholder.svg",
    github: "#",
  },
  {
    id: "gnn-library",
    title: "Graph Neural Networks Library",
    description: "Flexible GNN implementation supporting GCN, GAT, and GraphSAGE architectures.",
    longDescription: `A flexible library for Graph Neural Networks built on top of PyTorch Geometric.

## Supported Architectures
- Graph Convolutional Networks (GCN)
- Graph Attention Networks (GAT)
- GraphSAGE
- Message Passing Neural Networks (MPNN)

## Features
- Modular layer implementations
- Built-in graph datasets
- Training utilities and logging
- Visualization tools for graph embeddings
- Benchmarking scripts for standard datasets`,
    tags: ["GNN", "PyTorch Geometric"],
    image: "/placeholder.svg",
    github: "#",
  },
];
