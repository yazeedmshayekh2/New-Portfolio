export const codingNotes = [
  {
    slug: 'rag-design-patterns',
    title: 'RAG Design Patterns',
    excerpt:
      'A practical guide to chunking, retrieval, and evaluation loops that make production RAG systems reliable.',
    category: 'RAG',
    readTime: '7 min read',
    publishedAt: 'Apr 2026',
    featured: true,
    tags: ['Chunking', 'Retrieval', 'Evaluation', 'Latency'],
    body: [
      'Production RAG is mostly about discipline: consistent ingestion, retrieval quality checks, and strict output guardrails.',
      'Start with a chunking strategy tied to user intent. Dense technical docs often perform better with medium chunks and overlap, while FAQs can use smaller chunks without overlap.',
      'Use hybrid retrieval (vector + keyword) and reranking to improve precision. Measure hit-rate and answer faithfulness, then tune before changing models.',
      'Keep a small eval suite with realistic prompts and expected behavior. Evaluate answers for groundedness, completeness, and latency budgets.',
      'Finally, add observability from day one. Track retrieval misses, hallucination signals, and token cost so iteration is guided by data.',
    ],
  },
  {
    slug: 'model-monitoring-checklist',
    title: 'Model Monitoring Checklist',
    excerpt: 'A concise checklist for monitoring model quality, speed, and cost in production.',
    category: 'MLOps',
    readTime: '5 min read',
    publishedAt: 'Apr 2026',
    tags: ['Observability', 'Drift', 'Costs'],
    body: [
      'Define baseline KPIs before release: quality score, p95 latency, and cost per request.',
      'Track changes per deployment and set alert thresholds for major regressions.',
    ],
  },
  {
    slug: 'from-notebook-to-api',
    title: 'From Notebook to API',
    excerpt: 'How to turn prototype notebooks into stable APIs with tests, validation, and CI.',
    category: 'Engineering',
    readTime: '6 min read',
    publishedAt: 'Mar 2026',
    tags: ['FastAPI', 'Testing', 'CI/CD'],
    body: [
      'Move core logic into modules first, then wrap with an API layer.',
      'Validate every input and add smoke tests for critical routes.',
    ],
  },
];

