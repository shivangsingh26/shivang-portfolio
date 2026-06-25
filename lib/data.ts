export const profile = {
  name: "Shivang Singh",
  firstName: "Shivang",
  lastName: "Singh",
  role: "AI Engineer",
  company: "Publicis Sapient",
  location: "Bengaluru, India",
  email: "ssnfs26@gmail.com",
  phone: "+91 78987 55326",
  github: "shivangsingh26",
  linkedin: "shivangsingh26",
  tagline: "Building production GenAI systems that ship.",
  longTagline:
    "AI Engineer focused on building and scaling GenAI systems in production — where latency, token limits, retries, and failure modes matter as much as model quality.",
  summary:
    "I design and operate LLM pipelines that handle real traffic. At Publicis Sapient I lead Bodhi Atomize — a multimodal GenAI platform that turns images, videos, and GIFs into structured signals for enterprise clients like Eli Lilly. Previously shipped object detection and defect detection systems improving accuracy and inference speed at scale.",
  highlights: [
    "Production GenAI · LLM Infrastructure",
    "Multimodal CV + LLM pipelines",
    "FastAPI · Kubernetes · KEDA · Redis",
    "Gemini 2.5 Pro · GPT-5 · Claude Sonnet 4.6",
  ],
};

export const stats = [
  { value: "95%", label: "Manual analysis time cut" },
  { value: "10K+", label: "Assets processed for Eli Lilly" },
  { value: "1K+", label: "Concurrent requests handled" },
  { value: "1.21%", label: "EER on biometric thesis" },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  bullets: string[];
  stack?: string[];
};

export const experiences: Experience[] = [
  {
    company: "Publicis Sapient",
    role: "AI Engineer · Senior Associate Data Science L1",
    period: "Jun 2025 — Present",
    location: "Bengaluru, India",
    current: true,
    bullets: [
      "Architected Bodhi Atomize — production multimodal GenAI platform cutting marketing asset analysis from hours to ~2 min per asset (95% reduction) across 10,000+ assets for Eli Lilly. Outputs 50+ structured JSON signals per asset.",
      "Engineered multi-stage LLM inference pipelines with Gemini 2.5 Pro and Pydantic-validated structured outputs. Implemented token budgeting, exponential-backoff retry, and backpressure control to sustain production throughput under rate limits.",
      "Integrated YOLO and PaddleOCR into LLM workflows, extracting 50+ typed visual components (text, characters, emotions, branding) per asset. Established LLM evaluation with DeepEval (LLM-as-judge, G-Eval).",
      "Built FastAPI microservices with Redis (caching + task queuing) and Celery. Deployed on Kubernetes with KEDA autoscaling to sustain 1,000+ concurrent requests under burst traffic with low latency.",
    ],
    stack: ["Gemini 2.5 Pro", "FastAPI", "Pydantic", "YOLO", "PaddleOCR", "Redis", "Celery", "Kubernetes", "KEDA", "DeepEval"],
  },
  {
    company: "Lincode Vision Labs",
    role: "Data Science Intern → Trainee",
    period: "Oct 2024 — Jun 2025",
    location: "Bengaluru, India",
    bullets: [
      "Integrated RF-DETR into production pipelines — 1.8× faster inference and +7% mAP50 improvement over YOLOv8 baseline on industrial defect detection.",
      "Curated and preprocessed 30,000+ industrial images through targeted augmentation and annotation QA pipelines, lifting defect detection accuracy by 10%.",
    ],
    stack: ["RF-DETR", "YOLOv8", "PyTorch", "OpenCV"],
  },
  {
    company: "Omdena",
    role: "Junior Machine Learning Engineer",
    period: "May 2024 — Aug 2024",
    location: "Remote",
    bullets: [
      "Led the supervised modelling team predicting urban farming zones in Milan using geospatial data.",
      "Engineered XGBoost model achieving 93.68% accuracy. Conducted EDA on 106,000 rows with Geopandas.",
      "Implemented real-time predictions, optimising data handling and model efficiency.",
    ],
    stack: ["XGBoost", "Geopandas", "Python"],
  },
  {
    company: "Epoch · IIIT SriCity",
    role: "Domain Lead — Computer Vision",
    period: "Jan 2024 — May 2024",
    location: "Sri City",
    bullets: ["Led the Computer Vision domain for the campus AI/ML club. Mentored juniors, ran workshops, organized hackathons."],
  },
  {
    company: "Matrix · IIIT SriCity",
    role: "Co-Lead",
    period: "Oct 2023 — May 2024",
    location: "Sri City",
    bullets: ["Co-led campus tech club. Organized events, hosted talks, fostered project-driven learning."],
  },
];

export type CaseStudy = {
  problem: string;
  role?: string;
  approach: { title: string; detail: string }[];
  architecture?: string[];
  results: { value: string; label: string }[];
  links?: { label: string; href: string }[];
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  metric: { value: string; label: string };
  stack: string[];
  github?: string;
  highlight?: boolean;
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "dossier",
    name: "Dossier",
    tagline: "Quality-first agentic job-search SaaS",
    description:
      "8-agent autonomous pipeline (Persona Builder, Job Discovery, Watchlist, Company Intel, Gap Analysis, Market Intel, Resume Agent, Referral Finder) that finds, scores, researches, and surfaces roles most worth your time. Profile-driven scoring across 79 hand-picked companies, pre-LLM rule filter drops ~60% of jobs at zero cost, Claude generates ATS-optimised LaTeX resumes via 3-pass self-evaluation (Sonnet tailor → Haiku critic → Sonnet revise). M2+ wraps the CLI in a Next.js 16 + FastAPI + Clerk multi-user SaaS with credits, SSE progress, and async worker.",
    metric: { value: "~$0.04", label: "per pipeline run" },
    stack: [
      "Python 3.12",
      "GPT-5.4-mini",
      "Claude Sonnet 4.6",
      "Claude Haiku 4.5",
      "FastAPI",
      "Next.js 16",
      "Clerk",
      "Tavily",
      "SSE",
      "SQLite",
      "LaTeX",
    ],
    github: "https://github.com/shivangsingh26/dossier",
    highlight: true,
    caseStudy: {
      role: "Solo build · 2026",
      problem:
        "Job search is high-effort and low-signal: hundreds of listings, most irrelevant, and tailoring a resume per role eats hours. I wanted a system that finds, scores, and researches roles autonomously — then produces an ATS-ready resume — for cents per run, not dollars.",
      approach: [
        {
          title: "8-agent autonomous pipeline",
          detail:
            "Persona Builder, Job Discovery, Watchlist, Company Intel, Gap Analysis, Market Intel, Resume Agent and Referral Finder — each a bounded agent with typed inputs and outputs, composed into one run.",
        },
        {
          title: "Cost-first model routing",
          detail:
            "A pre-LLM rule filter drops ~60% of jobs at zero cost before any model call. Cheap models triage; expensive models only finish the shortlist — keeping a full run near $0.04.",
        },
        {
          title: "3-pass self-evaluating resumes",
          detail:
            "Claude Sonnet tailors → Haiku critiques → Sonnet revises, emitting ATS-optimised LaTeX. A self-evaluation loop replaces one-shot generation.",
        },
        {
          title: "CLI → multi-user SaaS",
          detail:
            "M2+ wraps the pipeline in Next.js 16 + FastAPI + Clerk with credits, SSE progress streaming and an async worker for concurrent runs.",
        },
      ],
      architecture: [
        "Profile + persona",
        "Rule filter (−60% at $0)",
        "Scored discovery · 79 cos",
        "Company + market intel",
        "3-pass LaTeX resume",
        "SSE → live UI",
      ],
      results: [
        { value: "~$0.04", label: "per full pipeline run" },
        { value: "79", label: "companies hand-scored" },
        { value: "~60%", label: "jobs dropped pre-LLM at $0" },
        { value: "3-pass", label: "self-evaluating resume gen" },
      ],
      links: [{ label: "GitHub", href: "https://github.com/shivangsingh26/dossier" }],
    },
  },
  {
    slug: "fedfv-cv",
    name: "FedFV-CV",
    tagline: "Federated Deep Learning for Biometric Auth",
    description:
      "Federated deep learning framework for finger-vein biometric authentication using MobileNetV2. Engineered custom FedWPR aggregation on 122,600 images across 5 clients, outperforming FedAvg benchmarks. B.Tech Thesis, IIIT SriCity.",
    metric: { value: "1.21%", label: "EER" },
    stack: ["PyTorch", "MobileNetV2", "Federated Learning"],
    github: "https://github.com/shivangsingh26",
    caseStudy: {
      role: "B.Tech Thesis · IIIT SriCity",
      problem:
        "Finger-vein biometrics are sensitive — centralising raw vein images to train a model is a privacy risk. The goal: train an accurate authenticator without the raw data ever leaving each client.",
      approach: [
        {
          title: "Privacy-preserving federated training",
          detail:
            "MobileNetV2 trained across 5 clients over 122,600 images. Only model updates are shared; raw vein images never leave the device.",
        },
        {
          title: "Custom FedWPR aggregation",
          detail:
            "A weighted-performance aggregation scheme that outperformed the FedAvg baseline on non-IID client splits, where naive averaging degrades.",
        },
      ],
      results: [
        { value: "1.21%", label: "Equal Error Rate" },
        { value: "122.6K", label: "images · 5 clients" },
        { value: "> FedAvg", label: "on EER benchmark" },
      ],
      links: [{ label: "GitHub", href: "https://github.com/shivangsingh26" }],
    },
  },
  {
    slug: "slack-agent",
    name: "slackAgent",
    tagline: "AI-Powered Slack Bot with RAG",
    description:
      "Scalable FastAPI backend with LlamaIndex + ChromaDB semantic search over 20+ documents. Cut query response time by 40% and served 50+ daily queries via Slack API with end-to-end automation through n8n.",
    metric: { value: "40%", label: "response time cut" },
    stack: ["FastAPI", "LlamaIndex", "ChromaDB", "OpenAI", "n8n"],
    github: "https://github.com/shivangsingh26",
    caseStudy: {
      problem:
        "Teams ask the same questions that are buried across 20+ documents. The aim: answer them inside Slack, grounded in those docs, fast enough to feel native.",
      approach: [
        {
          title: "RAG over team docs",
          detail:
            "LlamaIndex + ChromaDB semantic search across 20+ documents, served behind a FastAPI backend with grounded, citable answers.",
        },
        {
          title: "Slack-native + automated",
          detail:
            "End-to-end automation via n8n; answers are delivered in-channel through the Slack API with no manual steps.",
        },
      ],
      results: [
        { value: "40%", label: "faster responses" },
        { value: "50+", label: "daily queries served" },
        { value: "20+", label: "documents indexed" },
      ],
      links: [{ label: "GitHub", href: "https://github.com/shivangsingh26" }],
    },
  },
  {
    slug: "rag-qa-aws",
    name: "RAG-QA on AWS",
    tagline: "Retrieval-Augmented QA, fully CI/CD",
    description:
      "Retrieval-augmented QA system using LangChain, FAISS, and AWS Bedrock (LLAMA 3.1-70B). Deployed to AWS ECR + App Runner via Docker with full CI/CD through GitHub Actions.",
    metric: { value: "70B", label: "params served" },
    stack: ["LangChain", "FAISS", "AWS Bedrock", "LLAMA 3.1-70B", "Docker", "GitHub Actions"],
    github: "https://github.com/shivangsingh26",
    caseStudy: {
      problem:
        "Stand up a retrieval-augmented QA service on a 70B model that's reproducible and deployable — not a notebook demo that dies when the kernel restarts.",
      approach: [
        {
          title: "LangChain + FAISS retrieval",
          detail:
            "Vector retrieval over a document corpus feeds AWS Bedrock LLAMA 3.1-70B, grounding answers in source context.",
        },
        {
          title: "Push-to-deploy CI/CD",
          detail:
            "Dockerised and shipped to AWS ECR + App Runner through GitHub Actions — every push produces a reproducible deploy.",
        },
      ],
      results: [
        { value: "70B", label: "params (LLAMA 3.1)" },
        { value: "CI/CD", label: "ECR + App Runner" },
        { value: "Docker", label: "reproducible deploys" },
      ],
      links: [{ label: "GitHub", href: "https://github.com/shivangsingh26" }],
    },
  },
];

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const skills = {
  "LLM & GenAI": [
    "Gemini 2.5 Pro",
    "GPT-5 / GPT-4o",
    "Claude Sonnet 4.6",
    "LangChain",
    "LangGraph",
    "LlamaIndex",
    "RAG",
    "Pydantic",
    "Prompt Engineering",
    "DeepEval",
  ],
  "Computer Vision": ["YOLO", "RF-DETR", "PaddleOCR", "OpenCV", "MobileNetV2"],
  "MLOps & Backend": ["FastAPI", "Docker", "Kubernetes", "KEDA", "Redis", "Celery", "MLflow"],
  "Cloud & Infra": ["GCP", "AWS Bedrock", "AWS ECR", "App Runner", "Azure", "GitHub Actions", "ChromaDB", "FAISS"],
  "Programming & ML": ["Python", "PyTorch", "scikit-learn", "pandas", "NumPy", "SQL"],
};

export const certifications = [
  "Google Cloud Computing Foundations: Data, ML, AI",
  "Google Cloud Computing Foundations: Cloud Fundamentals",
  "Google Cloud Computing Foundations: Infrastructure",
  "Kaggle Pandas Certification",
  "Stanford Unsupervised Machine Learning",
];

export const education = {
  school: "Indian Institute of Information Technology, SriCity",
  degree: "B.Tech, Computer Science & Engineering",
  period: "Dec 2021 — May 2025",
  cgpa: "8.09 / 10",
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;
