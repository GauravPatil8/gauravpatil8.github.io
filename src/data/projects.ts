export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  github?: string;
  paper?: string;
}

export const projects: Project[] = [
  {
    id: "vision-transformer",
    title: "Vision Transformer Implementation",
    description: "PyTorch implementation of 'An Image is Worth 16x16 Words' with training pipelines and attention visualization.",
    longDescription: `A comprehensive PyTorch implementation of the Vision Transformer (ViT) architecture from the paper "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale".

## Features
- Complete ViT architecture with configurable depth, heads, and embedding dimensions
- Training pipeline with mixed precision support
- Attention map visualization tools
- Pre-trained weight loading from official checkpoints
- Support for fine-tuning on custom datasets

## Technical Details
The implementation follows the original paper closely, including patch embedding, positional encoding, and the standard transformer encoder blocks. The codebase is modular and well-documented for educational purposes.`,
    tags: ["PyTorch", "Computer Vision", "Transformers"],
    image: "/placeholder.svg",
    github: "#",
    paper: "#",
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
