// ============================================================
// PORTFOLIO DATA — Edit this file to update your entire website!
// ============================================================

import attendifyImg from "../assets/Screenshot from 2026-04-21 08-42-25.webp";
import deepLearningImg from "../assets/certifications/DeepLearning_page-0001.webp";
import machineLearningImg from "../assets/certifications/MachineLearning_page-0001.webp";
import tensorflowImg from "../assets/certifications/TensorFlowDeveloper_page-0001.webp";
import correlationOneImg from "../assets/trainings/Correlation One Data Science Training Program.webp";
import ieltsImg from "../assets/trainings/IETLS British Council.webp";
import tahalufImg from "../assets/trainings/Tahaluf Al Emarat Technical Solutions Machine Leaning Training.webp";
import shaiImg from "../assets/trainings/ShAi.webp";
import stemCenterImg from "../assets/awards/StemCenter.webp";
import paradeImg from "../assets/awards/Parade.webp";

// TensorFlow Professional Certificate sub-courses certificate image imports
import tfIntroImg from "../assets/certifications/tensorflowDeveloper/tf-course-1.webp";
import tfCnnImg from "../assets/certifications/tensorflowDeveloper/tf-course-2.webp";
import tfNlpImg from "../assets/certifications/tensorflowDeveloper/tf-course-3.webp";
import tfTimeImg from "../assets/certifications/tensorflowDeveloper/tf-course-4.webp";

// Deep Learning Specialization sub-courses certificate image imports
import dlNeuralImg from "../assets/certifications/DeepLearning/dl-course-1.webp";
import dlHyperImg from "../assets/certifications/DeepLearning/dl-course-2.webp";
import dlStructImg from "../assets/certifications/DeepLearning/dl-course-3.webp";
import dlCnnImg from "../assets/certifications/DeepLearning/dl-course-4.webp";
import dlSeqImg from "../assets/certifications/DeepLearning/dl-course-5.webp";

// Machine Learning Specialization sub-courses certificate image imports
import mlSupervisedImg from "../assets/certifications/machineLearning/ml-course-1.webp";
import mlAdvancedImg from "../assets/certifications/machineLearning/ml-course-2.webp";
import mlUnsupervisedImg from "../assets/certifications/machineLearning/ml-course-3.webp";

import azureAI900Img from "../assets/certifications/microsoft/Azure AI Engineer Associate.jpg";

// Mathematics for Machine Learning and Data Science sub-courses certificate image imports
import linearAlgebraCertImg from "../assets/certifications/DeepLearning/dl-course-1.webp";

import deeplearningLogo from "../assets/issuers/deeplearning.ai.png";
import tensorflowLogo from "../assets/issuers/Tensorflow_logo.png";
import stanfordLogo from "../assets/issuers/stanford.png";

export const portfolioData = {
  // ─── HERO SECTION ───────────────────────────────────────────
  hero: {
    name: "Yazeed Mshayekh",
    title: "AI Engineer",
    taglines: ["AI Developer", "AI Engineer"],
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
      longDescription:
        "This project addresses the inefficiencies in manual attendance tracking by providing a real-time, highly accurate facial recognition system. By integrating YOLOv9 for robust face detection and ResNet-50 for precise identification, the system performs reliably under various lighting conditions. You can add more paragraphs like this to detail your architecture, challenges faced, and the ultimate impact of your work.",
      tech: [
        "YOLOv9",
        "ResNet-50",
        "Flask",
        "Python",
        "Modified Version of Siamese-Network",
        "MongoDB",
      ],
      github: "https://github.com/yazeedmshayekh2/Attendify",
      demo: "",
      caseStudyUrl:
        "https://github.com/yazeedmshayekh2/Attendify/blob/main/Paper/Attendify__Automated_Attendance_System_Using_Tri_Architecture_Fusion_for_Facial_Recognition_ARXIV.pdf",
      image: attendifyImg,
      theme: "vision",
      icon: "camera",
    },
    {
      name: "CoreReports",
      category: "AI Agents",
      subtitle: "Automated Dynamic Reporting System",
      longDescription:
        "CoreReports Insurance AI Assistant is a sophisticated multi-agent AI system designed for autonomous insurance data analysis and intelligent report generation. Built on CrewAI Flows with a modern FastAPI backend, it orchestrates multiple AI crews through a flow-based pipeline — classifying user questions, detecting entities, generating optimized SQL queries, and producing interactive visual reports. The system leverages Google Gemini 3 Flash as its primary LLM with fallback support for Groq, Cerebras, and OpenAI models.",
      tech: [
        "CrewAI",
        "Chart.js",
        "FastApi",
        "Postgres",
        "Oracle",
        "OpenTelemtry",
        "LangCache",
        "Grafana",
        "Prometheus",
        "Loki",
        "Tempo",
        "Phoenix/Arize AI tracing",
        "Prometheus",
        "Multi-Agent AI System",
        "Admin Dashboard",
        "Real-Time Streaming (SSE)",
        "Natural Language to SQL",
        "Human-in-the-Loop",
        "Azure AD Authentication",
        "Dynamic Report Generation ",
      ],
      github: "",
      image: "",
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
      github:
        "https://github.com/yazeedmshayekh2/Continuous-American-Sign-Language-Translation",
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
      name: "Microsoft Certified: Azure AI Engineer Associate",
      issuer: "Microsoft",
      issuerShort: "MICROSOFT",
      type: "PROFESSIONAL CERTIFICATE",
      status: "In Progress",
      description: "Designing and implementing AI solutions using Azure OpenAI, Azure Cognitive Services, and Azure Machine Learning to build premium cloud-scale intelligent systems.",
      issuedOn: "In Progress",
      highlights: [
        "Azure OpenAI",
        "Cognitive Services",
        "Azure AI Search",
        "MLOps on Azure",
      ],
      theme: "engineering",
      image: azureAI900Img,
      courses: [
        // {
        //   name: "Microsoft Azure AI Fundamentals (AI-900)",
        //   status: "Completed",
        //   // image: azureAI900Img, // Optional: To add an image, import it at the top of this file and uncomment this line
        // }
      ]
    },
    {
      name: "Deep Learning Specialization",
      issuer: "DeepLearning.AI",
      issuerShort: "DEEPLEARNING.AI",
      type: "SPECIALIZATION",
      description: "Covers foundational and advanced concepts of Deep Learning, including neural networks, hyperparameter tuning, CNNs, and Sequence Models.",
      issuedOn: "2024",
      credentialUrl:
        "https://coursera.org/share/99018ab69b3a2fc2365d55f32e18c542",
      image: deepLearningImg,
      highlights: [
        "Neural Networks",
        "CNNs",
        "Sequence Models",
        "Transfer Learning",
        "Natural Language Processing",
      ],
      theme: "ai",
      courses: [
        {
          name: "Neural Networks and Deep Learning",
          image: dlNeuralImg
        },
        {
          name: "Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization",
          image: dlHyperImg
        },
        {
          name: "Structuring Machine Learning Projects",
          image: dlStructImg
        },
        {
          name: "Convolutional Neural Networks",
          image: dlCnnImg
        },
        {
          name: "Sequence Models",
          image: dlSeqImg
        }
      ]
    },
    {
      name: "Machine Learning Specialization",
      issuer: "DeepLearning.AI & Stanford University",
      logoUrls: [deeplearningLogo, stanfordLogo],
      issuerShort: "DEEPLEARNING.AI",
      type: "SPECIALIZATION",
      description: "Master fundamental machine learning concepts and build practical skills using Python, TensorFlow, and scikit-learn.",
      issuedOn: "2024",
      credentialUrl:
        "https://coursera.org/share/5654efead2d7a35cd0b64a017ea30d56",
      image: machineLearningImg,
      highlights: [
        "Supervised Learning",
        "Unsupervised Learning",
        "Reinforcement Learning",
        "Predictive Modeling",
        "Feature Engineering",
      ],
      theme: "ml",
      courses: [
        {
          name: "Supervised Machine Learning: Regression and Classification",
          image: mlSupervisedImg
        },
        {
          name: "Advanced Learning Algorithms",
          image: mlAdvancedImg
        },
        {
          name: "Unsupervised Learning, Recommenders, Reinforcement Learning",
          image: mlUnsupervisedImg
        }
      ]
    },
    {
      name: "Mathematics for Machine Learning and Data Science",
      issuer: "Deep Learning.AI",
      issuerShort: "DEEPLEARNING.AI",
      type: "SPECIALIZATION",
      description: "Deep dive into the essential mathematical foundations of AI: Linear Algebra, Calculus, and Probability & Statistics.",
      issuedOn: "2025",
      credentialUrl:
        "https://coursera.org/share/9b1f65d8e85a2f158fd791741ef38598",
      highlights: [
        "Machine Learning",
        "Calculus",
        "Linear Algebra",
        "Probability & Statistics",
        "Mathematics",
      ],
      image: linearAlgebraCertImg,
      theme: "math",
      courses: [
      ]
    },
    {
      name: "TensorFlow Professional Certification",
      issuer: "DeepLearning.AI & Tensorflow",
      logoUrls: [deeplearningLogo, tensorflowLogo],
      issuerShort: "DEEPLEARNING.AI",
      type: "PROFESSIONAL CERTIFICATE",
      description: "Hands-on training in building and deploying deep learning models using TensorFlow, Keras, and computer vision techniques.",
      issuedOn: "2025",
      credentialUrl:
        "https://coursera.org/share/a3d7c3dfa5bcf2a76c25c44363de29a2",
      image: tensorflowImg,
      highlights: [
        "Model Evaluation",
        "Computer Vision",
        "Keras & Tensorflow",
        "Time Series & Forcasting",
      ],
      theme: "engineering",
      courses: [
        {
          name: "Introduction to TensorFlow for Artificial Intelligence, Machine Learning, and Deep Learning",
          image: tfIntroImg
        },
        {
          name: "Convolutional Neural Networks in TensorFlow",
          image: tfCnnImg
        },
        {
          name: "Natural Language Processing in TensorFlow",
          image: tfNlpImg
        },
        {
          name: "Sequences, Time Series and Prediction",
          image: tfTimeImg
        }
      ]
    },
    {
      name: "LangChain for LLM Application Development | Mini-Course",
      issuer: "DeepLearning.AI",
      issuerShort: "DEEPLEARNING.AI",
      type: "MINI-COURSE",
      description: "Learn to build powerful LLM-powered applications using LangChain, chains, memories, and agents.",
      issuedOn: "2024",
      credentialUrl:
        "https://learn.deeplearning.ai/accomplishments/981b13f2-32f0-4663-9c97-8b2a6524b52d?usp=sharing",
      highlights: [
        "AI Frameworks",
        "Agents",
        "Chatbots",
        "Generative Models",
        "Prompt Engineering",
        "RAG",
      ],
      theme: "engineering",
    },
    {
      name: "LangChain Chat with Your Data | Mini-Course",
      issuer: "DeepLearning.AI",
      issuerShort: "DEEPLEARNING.AI",
      type: "MINI-COURSE",
      description: "Implementation of Retrieval-Augmented Generation (RAG) pipelines to chat with unstructured data sources.",
      issuedOn: "2024",
      credentialUrl:
        "https://learn.deeplearning.ai/accomplishments/aebd0772-ab89-4e25-8d9f-02c9b52bd817?usp=sharing",
      highlights: [
        "Computer Vision",
        "Document Processing",
        "Embeddings",
        "RAG",
        "Vector Databases",
      ],
      theme: "engineering",
    },
    {
      name: "Advanced Data Analytics Program | Training",
      issuer: "Correlation One",
      issuerShort: "CORRELATION ONE",
      type: "TRAINING PROGRAM",
      description: "Intensive training program focused on business analytics, SQL database query optimization, and Tableau data storytelling.",
      issuedOn: "2025",
      highlights: [
        "Data Analysis",
        "Excel",
        "SQL",
        "Data Visualiztion",
        "Tableau",
      ],
      image: correlationOneImg,
      theme: "engineering",
    },
    {
      name: "IELTS | Training",
      issuer: "British Council",
      issuerShort: "BRITISH COUNCIL",
      type: "ENGLISH EXAM",
      description: "International English Language Testing System certification proving high-level proficiency in speaking, writing, reading, and listening.",
      issuedOn: "2025",
      highlights: ["English"],
      image: ieltsImg,
      theme: "engineering",
    },
    {
      name: "Machine Learning | Training",
      issuer: "Tahaluf Al Emarat Technical Solutions",
      issuerShort: "TAHALUF AL EMARAT",
      type: "TRAINING PROGRAM",
      description: "Rigorous machine learning training program covering linear algebra, data preprocessing, bagging, boosting, and neural networks.",
      issuedOn: "2025",
      highlights: [
        "Linear Algebra",
        "Bagging & Boosting",
        "Data Proprocessing",
        "Statistics & Probabilities",
        "Machine Learning",
      ],
      image: tahalufImg,
      theme: "engineering",
    },
    {
      name: "Artificial Intelligence | Training",
      issuer: "SHAI Club",
      issuerShort: "SHAI CLUB",
      type: "TRAINING PROGRAM",
      description: "Hands-on training on machine learning fundamentals, exploratory data analysis, and predictive modeling.",
      issuedOn: "2023",
      highlights: ["Machine Learning Basics"],
      image: shaiImg,
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
      image: stemCenterImg,
      theme: "gold",
    },
    {
      title: "First Place",
      description: "The 11th National Technology Parade 2024",
      event: "National Technology Parade",
      date: "2024",
      awardUrl: "",
      image: paradeImg,
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
      description:
        "Foundational knowledge of AI and machine learning concepts on Microsoft Azure.",
    },
    {
      name: "Azure AI-102",
      fullName: "Microsoft Azure AI Engineer Associate",
      status: "Upcoming",
      icon: "🤖",
      description:
        "Designing and implementing AI solutions using Azure Cognitive Services and Azure AI.",
    },
  ],

  // ─── YOUTUBE PLAYLISTS (Currently Watching) ────────────────
  youtubePlaylists: [
    {
      title: "mini-RAG | From Notebooks to PRODUCTION",
      channel: "YouTube Playlist",
      url: "https://www.youtube.com/playlist?list=PLvLvlVqNQGHCUR2p0b8a0QpVjDUg50wQj",
      description:
        "End-to-end RAG pipeline development from prototyping to production deployment.",
      icon: "🚀",
    },
    {
      title: "Qdrant Essentials Course",
      channel: "Qdrant",
      url: "https://www.youtube.com/playlist?list=PL9IXkWSmb36_ykIQC30xk6aNKF8dlVkAy",
      description:
        "Core concepts of Qdrant vector database for building similarity search and AI applications.",
      icon: "🔷",
    },
  ],

  // ─── VOLUNTEERING SECTION ──────────────────────────────────
  volunteering: [
    {
      role: "AI Technical Mentor",
      organization: "SHAI Club",
      period: "2023 – 2024",
      description: "Volunteered to mentor and guide junior students in machine learning and data science tracks. Organized study sessions, conducted code reviews, and assisted in capstone project debugging.",
      highlights: ["Mentorship", "Machine Learning Basics", "Python", "Code Review"],
      theme: "ai",
      image: shaiImg,
    },
    {
      role: "Technical Coordinator",
      organization: "National Technology Parade",
      period: "2024",
      description: "Supported event organization and technical coordinator for the national technology parade. Coordinated logistics, track schedules, and assisted participants with hardware/software requirements.",
      highlights: ["Event Logistics", "Technical Setup", "Robotics & AI Track"],
      theme: "winner",
      image: paradeImg,
    }
  ],

  // ─── RECOMMENDATIONS SECTION ───────────────────────────────
  recommendations: [
    {
      name: "Dr. Mohammad Al-Radaideh",
      role: "Professor of Data Science",
      institution: "University of Jordan",
      text: "Yazeed is an exceptionally talented AI Developer. His dedication to building high-quality machine learning systems was evident in his academic projects, where he always went above and beyond to achieve high performance.",
      date: "June 2024",
    },
    {
      name: "Eng. Sarah Ahmad",
      role: "Senior Data Scientist",
      institution: "Tahaluf Al Emarat",
      text: "During the training program, Yazeed demonstrated deep understanding of advanced computer vision and NLP architectures. He was proactive, collaborative, and delivered outstanding projects.",
      date: "February 2025",
    }
  ]
};
