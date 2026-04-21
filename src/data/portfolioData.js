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
    cvLink: "/Yazeed_Mshayekh_CV.pdf", // CV file in /public folder
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
      longDescription: "This project addresses the inefficiencies in manual attendance tracking by providing a real-time, highly accurate facial recognition system. By integrating YOLOv9 for robust face detection and ResNet-50 for precise identification, the system performs reliably under various lighting conditions. You can add more paragraphs like this to detail your architecture, challenges faced, and the ultimate impact of your work.",
      tech: ["YOLOv9", "ResNet-50", "Flask", "Python", "Modified Version of Siamese-Network", "MongoDB"],
      github: "https://github.com/yazeedmshayekh2/Attendify",
      demo: "",
      caseStudyUrl: "https://github.com/yazeedmshayekh2/Attendify/blob/main/Paper/Attendify__Automated_Attendance_System_Using_Tri_Architecture_Fusion_for_Facial_Recognition_ARXIV.pdf",
      image: "/images/projects/screenshot-2026-04-21.png",
      theme: "vision",
      icon: "camera",
    },
    {
      name: "CoreReports",
      category: "AI Agents",
      subtitle: "Automated Dynamic Reporting System",
      longDescription:
        "CoreReports Insurance AI Assistant is a sophisticated multi-agent AI system designed for autonomous insurance data analysis and intelligent report generation. Built on CrewAI Flows with a modern FastAPI backend, it orchestrates multiple AI crews through a flow-based pipeline — classifying user questions, detecting entities, generating optimized SQL queries, and producing interactive visual reports. The system leverages Google Gemini 3 Flash as its primary LLM with fallback support for Groq, Cerebras, and OpenAI models.",
      tech: ["CrewAI", "Chart.js", "FastApi", "Postgres", "Oracle", "OpenTelemtry", "LangCache", "Grafana", "Prometheus", "Loki", "Tempo", "Phoenix/Arize AI tracing", "Prometheus", "Multi-Agent AI System", "Admin Dashboard", "Real-Time Streaming (SSE)", "Natural Language to SQL", "Human-in-the-Loop", "Azure AD Authentication", "Dynamic Report Generation "],
      github: "",
      image:
        "",
      theme: "analytics",
      icon: "chart",
    },
    {
      name: "SilentVoice",
      category: "NLP",
      subtitle: "Real-time American Sign Language Translation",
      description:
        "Built real-time ASL-to-text translation using Transformer and Conformer architectures, deployed via Gradio for live gesture recognition.",
      longDescription: 
        "Since Our Problem is to translate videos (sequence of frames) into sentences (sequence of words and characters), which is a seq2seq problem, so we have to use a state-of-art models like Transformers which is much better than LSTM, CRNN, or RNN.",
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
      credentialUrl: "https://coursera.org/share/99018ab69b3a2fc2365d55f32e18c542",
      image: "/images/certifications/deep-learning.jpg",
      highlights: ["Neural Networks", "CNNs", "Sequence Models", "Transfer Learning", "Natural Language Processing"],
      theme: "ai",
    },
    {
      name: "Machine Learning Specialization",
      issuer: "DeepLearning.AI",
      issuedOn: "2024",
      credentialUrl: "https://coursera.org/share/5654efead2d7a35cd0b64a017ea30d56",
      image: "/images/certifications/machine-learning.jpg",
      highlights: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Predictive Modeling", "Feature Engineering"],
      theme: "ml",
    },
    {
      name: "Mathematics for Machine Learning and Data Science",
      issuer: "Deep Learning.AI",
      issuedOn: "2025",
      credentialUrl: "https://www.coursera.org/specializations/mathematics-machine-learning",
      highlights: ["Machine Learning", "Calculus", "Linear Algebra", "Probability & Statistics", "Mathematics"],
      theme: "math",
    },
    {
      name: "TensorFlow Professional Certification",
      issuer: "DeepLearning.AI",
      issuedOn: "2025",
      credentialUrl: "https://coursera.org/share/a3d7c3dfa5bcf2a76c25c44363de29a2",
      image: "/images/certifications/tensorflow-developer.jpg",
      highlights: ["Model Evaluation", "Computer Vision", "Keras & Tensorflow", "Time Series & Forcasting"],
      theme: "engineering",
    },
    {
      name: "LangChain for LLM Application Development | Mini-Course",
      issuer: "DeepLearning.AI",
      issuedOn: "2024",
      credentialUrl: "https://learn.deeplearning.ai/accomplishments/981b13f2-32f0-4663-9c97-8b2a6524b52d?usp=sharing",
      highlights: ["AI Frameworks", "Agents", "Chatbots", "Generative Models", "Prompt Engineering", "RAG"],
      theme: "engineering",
    },
    {
      name: "LangChain Chat with Your Data | Mini-Course",
      issuer: "DeepLearning.AI",
      issuedOn: "2024",
      credentialUrl: "https://learn.deeplearning.ai/accomplishments/aebd0772-ab89-4e25-8d9f-02c9b52bd817?usp=sharing",
      highlights: ["Computer Vision", "Document Processing", "Embeddings", "RAG", "Vector Databases"],
      theme: "engineering",
    },
    {
      name: "Advanced Data Analytics Program | Training",
      issuer: "Correlation One",
      issuedOn: "2025",
      highlights: ["Data Analysis", "Excel", "SQL", "Data Visualiztion", "Tableau"],
      image: "/images/trainings/correlation-one-data-science.jpg",
      theme: "engineering",
    },
    {
      name: "IELTS | Training",
      issuer: "British Council",
      issuedOn: "2025",
      highlights: ["English"],
      image: "/images/trainings/ielts-british-council.jpeg",
      theme: "engineering",
    },
    {
      name: "Machine Learning | Training",
      issuer: "Tahaluf Al Emarat Technical Solutions",
      issuedOn: "2025",
      highlights: ["Linear Algebra", "Bagging & Boosting", "Data Proprocessing", "Statistics & Probabilities", "Machine Learning"],
      image: "/images/trainings/tahaluf-ml-training.png",
      theme: "engineering",
    },

    {
      name: "Artificial Intelligence | Training",
      issuer: "SHAI Club",
      issuedOn: "2023",
      highlights: ["Machine Learning Basics"],
      image: "/images/trainings/shai.jpg",
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
      image: "/images/awards/stem-center.jpg",
      theme: "gold",
    },
    {
      title: "First Place",
      description: "The 11th National Technology Parade 2024",
      event: "National Technology Parade",
      date: "2024",
      awardUrl: "",
      image: "/images/awards/parade.jpeg",
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
