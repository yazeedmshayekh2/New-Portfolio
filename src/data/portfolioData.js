// ============================================================
// PORTFOLIO DATA — Edit this file to update your entire website!
// ============================================================

export const portfolioData = {
  // ─── HERO SECTION ───────────────────────────────────────────
  hero: {
    name: "Yazeed Mshayekh",
    title: "AI Engineer",
    taglines: [
      "AI Developer",
      "AI Engineer"
    ],
    summary:
      "AI Developer with hands-on experience developing end-to-end machine learning applications. Specialized in Natural Language Processing (RAG and AI Agents) and Computer Vision, leveraging Python, web frameworks, and a set of other Python frameworks to build intelligent systems. Committed to deploying cutting-edge AI models as scalable, real-world solutions.",
    socials: {
      github: "https://github.com/yazeedmshayekh2",
      linkedin: "https://www.linkedin.com/in/yazeedmshayekh/",
      email: "yazeedmshayekh.work@gmail.com",
    },
    cvLink: "/New-Portfolio/Yazeed_Mshayekh_CV.pdf", // CV file in /public folder
  },

  // ─── ABOUT / STATS SECTION ─────────────────────────────────
  about: {
    description:
      "I'm Yazeed, an AI Developer based in Amman, Jordan. I specialize in building intelligent systems using cutting-edge AI and machine learning technologies. From facial recognition to insurance policy analysis, I turn complex AI models into practical, scalable solutions that make a real impact.",
    stats: [
      { number: "9+", label: "Projects Completed" },
      { number: "4", label: "Certifications" },
      { number: "2", label: "Awards Won" },
      { number: "3.61", label: "GPA / 4.00" },
    ],
  },

  // ─── EXPERIENCE SECTION ─────────────────────────────────────
  experience: [
    {
      type: "work",
      title: "Entry-level AI Engineer",
      company: "Barzan – Doha Insurance Group",
      location: "On-site",
      date: "May 2025 – Present",
      description: [
        "Developed Agentic-Based AI systems for document processing and multilingual support using different LLMs, and RAG to ensure high accuracy in insurance workflows.",
        "Built and deployed secure web apps using FastAPI and Docker, implementing Langsmith and Grafana to actively monitor model performance and system health, while using Langcache for keeping the high performance and low cost in production.",
      ],
    },
    {
      type: "training",
      title: "Data Science Training Program",
      company: "Tahaluf Al Emarat Technical Solutions LLC",
      location: "Remote",
      date: "September 2024 – February 2025",
      description: [
        "Completed an intensive 36-week Data Science program, strengthening Linear Algebra and Probability foundations while applying Pandas, NumPy, and TensorFlow to complex data problems.",
      ],
    },
    {
      type: "training",
      title: "Tech For Jobs Fellowship – Data Analytics Training",
      company: "Correlation One",
      location: "Remote",
      date: "October 2024 – January 2025",
      description: [
        "Completed an 18-week Data Analytics training, solving real-world business cases using Python, SQL, and Excel, while building dynamic Tableau dashboards for actionable insights.",
      ],
    },
  ],

  // ─── EDUCATION SECTION ──────────────────────────────────────
  education: {
    degree: "Bachelor's Degree in Data Science",
    university: "University of Jordan",
    location: "Amman, Jordan",
    period: "2020 – 2024",
    gpa: "3.61 / 4.00 – Very Good",
  },

  // ─── PROJECTS SECTION ──────────────────────────────────────
  projects: [
    {
      name: "Attendify",
      category: "Computer Vision",
      subtitle: "Automated Attendance System",
      description:
        "Achieved 99.7% facial recognition accuracy using YOLOv9 and ResNet-50, deployed via Flask with a responsive web frontend.",
      tech: ["YOLOv9", "ResNet-50", "Flask", "Python"],
      github: "https://github.com/yazeedmshayekh2",
      demo: "",
      caseStudyUrl: "",
      image:
        "https://images.unsplash.com/photo-1526378722445-4b2f9f6d5f66?auto=format&fit=crop&w=1200&q=80",
      theme: "vision",
      icon: "camera",
    },
    {
      name: "CoreReports",
      category: "AI Agents",
      subtitle: "Automated Dynamic Reporting System",
      description:
        "Automated dynamic reporting AI-powered system using CrewAI and Chart.js to replace manual Tableau workflows, optimizing performance with LangCache and Grafana.",
      tech: ["CrewAI", "Chart.js", "LangCache", "Grafana"],
      github: "https://github.com/yazeedmshayekh2",
      image:
        "https://images.unsplash.com/photo-1551281044-8b1d3f3f5f4b?auto=format&fit=crop&w=1200&q=80",
      theme: "analytics",
      icon: "chart",
    },
    {
      name: "SilentVoice",
      category: "NLP",
      subtitle: "Real-time American Sign Language Translation",
      description:
        "Built real-time ASL-to-text translation using Transformer and Conformer architectures, deployed via Gradio for live gesture recognition.",
      tech: ["Transformer", "Conformer", "Gradio", "MediaPipe"],
      github: "https://github.com/yazeedmshayekh2/Continuous-American-Sign-Language-Translation",
      theme: "nlp",
      icon: "hand",
    },
    {
      name: "Prometheus",
      category: "NLP",
      subtitle: "AI-Powered Insurance Policy Analysis System",
      description:
        "Developed a secure RAG insurance assistant using Qdrant and Multi-Query Retrieval, built with FastAPI and Guardrails for policy analysis.",
      tech: ["RAG", "Qdrant", "FastAPI", "Guardrails"],
      github: "https://github.com/yazeedmshayekh2/Exodus",
      icon: "shield",
    },
    {
      name: "Rover",
      category: "VLM",
      subtitle: "OCR System",
      description:
        "Built a structured OCR system using Qwen2.5-VL to extract data from IDs and receipts, featuring a customizable Flask backend.",
      tech: ["Qwen2.5-VL", "Flask", "OCR", "Python"],
      github: "https://github.com/yazeedmshayekh2/Rover",
      icon: "scan",
    },
    {
      name: "Odyssey",
      category: "Computer Vision",
      subtitle: "Car Damage Detection System",
      description:
        "Engineered a car damage detection system using Mask R-CNN and Few-Shot ResNet18 for precise multi-label classification.",
      tech: ["Mask R-CNN", "ResNet18", "Few-Shot Learning", "Python"],
      github: "https://github.com/yazeedmshayekh2/Odyssey",
      icon: "car",
    },
    {
      name: "Mini-RAG",
      category: "NLP",
      subtitle: "Lightweight RAG Pipeline",
      description:
        "Built a minimal yet powerful Retrieval-Augmented Generation system from scratch, demonstrating core RAG architecture with efficient document retrieval and LLM integration.",
      tech: ["RAG", "LangChain", "Vector DB", "Python"],
      github: "https://github.com/yazeedmshayekh2/Mini-RAG",
      icon: "brain",
    },
    {
      name: "LoreWeaver",
      category: "VLM",
      subtitle: "Multimodal Novel Generation LLM",
      description:
        "A novel generation system powered by Mistral-7B multimodal LLM, capable of creating rich narrative content with visual understanding.",
      tech: ["Mistral-7B", "Multimodal LLM", "Fine-Tuning", "Python"],
      github: "https://github.com/yazeedmshayekh2/LoreWeaver",
      icon: "book",
    },
    {
      name: "Dialect Classifier",
      category: "NLP",
      subtitle: "Arabic Dialect Identification",
      description:
        "Machine learning model for identifying and classifying Arabic dialects from text, applying NLP techniques to regional language variations.",
      tech: ["NLP", "Classification", "Arabic NLP", "Python"],
      github: "https://github.com/yazeedmshayekh2/Dialect_Classifier",
      icon: "language",
    },
  ],

  // ─── SKILLS SECTION ────────────────────────────────────────
  skills: [
    {
      category: "Generative AI & LLMs",
      icon: "brain",
      items: [
        "AI Agents",
        "RAG",
        "Fine-Tuning",
        "VLMs",
        "LangChain",
        "CrewAI",
        "LangSmith",
        "Guardrails",
        "Prompt Engineering",
      ],
    },
    {
      category: "Data Science & ML",
      icon: "data",
      items: [
        "TensorFlow",
        "Predictive Modeling",
        "OCR",
        "MLFlow",
        "Data Preprocessing",
        "Quarto",
        "Tableau",
      ],
    },
    {
      category: "Python Development",
      icon: "code",
      items: [
        "FastAPI",
        "Asyncio",
        "Pydantic",
        "Selenium",
        "BeautifulSoup4",
        "SerpAPI",
      ],
    },
    {
      category: "Databases",
      icon: "database",
      items: [
        "Qdrant (Vector DB)",
        "MongoDB",
        "Redis (Langcache)",
        "PostgreSQL",
      ],
    },
    {
      category: "Programming Languages",
      icon: "terminal",
      items: ["Python", "SQL (Oracle DB)", "HTML", "CSS", "JavaScript"],
    },
    {
      category: "DevOps & MLOps",
      icon: "devops",
      items: [
        "Docker",
        "Docker-Compose",
        "Grafana",
        "Prometheus",
        "Loki",
        "Tempo",
        "Git/GitHub",
        "Ubuntu",
      ],
    },
  ],

  // ─── CERTIFICATIONS SECTION ─────────────────────────────────
  certifications: [
    {
      name: "Deep Learning Specialization",
      issuer: "DeepLearning.AI & Stanford University",
      issuedOn: "2024",
      credentialUrl: "https://www.coursera.org/specializations/deep-learning",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Neural Networks", "CNNs", "Sequence Models"],
      theme: "ai",
    },
    {
      name: "Machine Learning Specialization",
      issuer: "DeepLearning.AI",
      issuedOn: "2024",
      credentialUrl: "https://www.coursera.org/specializations/machine-learning-introduction",
      highlights: ["Supervised Learning", "Unsupervised Learning", "Best Practices"],
      theme: "ml",
    },
    {
      name: "Mathematics for Machine Learning",
      issuer: "Imperial College London",
      issuedOn: "2023",
      credentialUrl: "https://www.coursera.org/specializations/mathematics-machine-learning",
      highlights: ["Linear Algebra", "Multivariate Calculus"],
      theme: "math",
    },
    {
      name: "TensorFlow Professional Certification",
      issuer: "DeepLearning.AI",
      issuedOn: "2025",
      credentialUrl: "https://www.tensorflow.org/certificate",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
      highlights: ["Model Deployment", "Computer Vision"],
      theme: "engineering",
    },
  ],

  // ─── ACHIEVEMENTS SECTION ──────────────────────────────────
  achievements: [
    {
      title: "First Place",
      description:
        "Organized by the STEAM Center in collaboration with Arab Robotics Association",
      event: "Innovation Competition",
      date: "2024",
      awardUrl: "",
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
      theme: "gold",
    },
    {
      title: "First Place",
      description: "The 11th National Technology Parade 2024",
      event: "National Technology Parade",
      date: "2024",
      awardUrl: "",
      theme: "winner",
    },
  ],

  // ─── LANGUAGES SECTION ─────────────────────────────────────
  languages: [
    { name: "Arabic", level: "Native – Mother Tongue" },
    { name: "English", level: "Very Good" },
  ],

  // ─── CONTACT SECTION ───────────────────────────────────────
  contact: {
    email: "yazeedmshayekh.work@gmail.com",
    phone: "+962-79-973-6382",
    location: "Amman, Jordan",
  },

  // ─── CURRENTLY LEARNING ────────────────────────────────────
  currentlyLearning: [
    {
      name: "Azure AI-900",
      fullName: "Microsoft Azure AI Fundamentals",
      status: "In Progress",
      icon: "☁️",
      description: "Foundational knowledge of AI and machine learning concepts on Microsoft Azure.",
    },
    {
      name: "Azure AI-102",
      fullName: "Microsoft Azure AI Engineer Associate",
      status: "Upcoming",
      icon: "🤖",
      description: "Designing and implementing AI solutions using Azure Cognitive Services and Azure AI.",
    },
  ],

  // ─── YOUTUBE PLAYLISTS (Currently Watching) ────────────────
  youtubePlaylists: [
    {
      title: "mini-RAG | From Notebooks to PRODUCTION",
      channel: "YouTube Playlist",
      url: "https://www.youtube.com/playlist?list=PLvLvlVqNQGHCUR2p0b8a0QpVjDUg50wQj",
      description: "End-to-end RAG pipeline development from prototyping to production deployment.",
      icon: "🚀",
    },
    {
      title: "Qdrant Essentials Course",
      channel: "Qdrant",
      url: "https://www.youtube.com/playlist?list=PL9IXkWSmb36_ykIQC30xk6aNKF8dlVkAy",
      description: "Core concepts of Qdrant vector database for building similarity search and AI applications.",
      icon: "🔷",
    },
  ],
};
