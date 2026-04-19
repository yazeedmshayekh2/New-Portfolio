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
    image: '/ai-core.png',
    tags: ['Chunking', 'Retrieval', 'Evaluation', 'Latency'],
    sections: [
      {
        title: '1) Shape the Knowledge Layer',
        image: '/note-section-architecture.svg',
        imageAlt: 'Architecture blocks for RAG pipeline',
        paragraphs: [
          'Production RAG is mostly about discipline: consistent ingestion, retrieval quality checks, and strict output guardrails.',
          'Start with a chunking strategy tied to user intent. Dense technical docs often perform better with medium chunks and overlap, while FAQs can use smaller chunks without overlap.',
        ],
      },
      {
        title: '2) Retrieval and Ranking',
        image: '/note-section-workflow.svg',
        imageAlt: 'Workflow style retrieval sequence',
        paragraphs: [
          'Use hybrid retrieval (vector + keyword) and reranking to improve precision. Measure hit-rate and answer faithfulness, then tune before changing models.',
          'Keep a small eval suite with realistic prompts and expected behavior. Evaluate answers for groundedness, completeness, and latency budgets.',
        ],
      },
      {
        title: '3) Operate and Improve',
        image: '/note-section-observability.svg',
        imageAlt: 'Metrics and observability lines',
        paragraphs: [
          'Finally, add observability from day one. Track retrieval misses, hallucination signals, and token cost so iteration is guided by data.',
        ],
      },
    ],
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
    image: '/ai-core.png',
    tags: ['Observability', 'Drift', 'Costs'],
    sections: [
      {
        title: 'Define Baselines',
        image: '/note-section-observability.svg',
        imageAlt: 'Monitoring dashboard line chart',
        paragraphs: [
          'Define baseline KPIs before release: quality score, p95 latency, and cost per request.',
        ],
      },
      {
        title: 'Alert and Respond',
        image: '/note-section-workflow.svg',
        imageAlt: 'Operational workflow diagram',
        paragraphs: [
          'Track changes per deployment and set alert thresholds for major regressions.',
        ],
      },
    ],
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
    image: '/ai-core.png',
    tags: ['FastAPI', 'Testing', 'CI/CD'],
    sections: [
      {
        title: 'Extract Core Logic',
        image: '/note-section-architecture.svg',
        imageAlt: 'Architecture blocks for API layers',
        paragraphs: [
          'Move core logic into modules first, then wrap with an API layer.',
        ],
      },
      {
        title: 'Validate and Ship',
        image: '/note-section-workflow.svg',
        imageAlt: 'Workflow process for releasing APIs',
        paragraphs: [
          'Validate every input and add smoke tests for critical routes.',
        ],
      },
    ],
    body: [
      'Move core logic into modules first, then wrap with an API layer.',
      'Validate every input and add smoke tests for critical routes.',
    ],
  },
  {
    slug: 'prompt-versioning-at-scale',
    title: 'Prompt Versioning at Scale',
    excerpt: 'A practical structure for safely evolving prompts with clear rollback paths.',
    category: 'LLMs',
    readTime: '6 min read',
    publishedAt: 'Mar 2026',
    image: '/ai-core.png',
    tags: ['Prompting', 'Versioning', 'A/B Testing'],
    body: [
      'Treat prompts like code: version them, review them, and test them before shipping.',
      'Keep prompt templates with metadata that explains target model, constraints, and expected outputs.',
      'When a prompt update goes live, attach it to deployment IDs so regressions can be traced quickly.',
    ],
  },
  {
    slug: 'building-better-evals',
    title: 'Building Better Eval Suites',
    excerpt: 'How to create eval datasets that reflect user behavior and reduce noisy metrics.',
    category: 'Quality',
    readTime: '8 min read',
    publishedAt: 'Mar 2026',
    image: '/ai-core.png',
    tags: ['Evaluation', 'Datasets', 'QA'],
    body: [
      'Good eval sets include realistic edge cases, not only ideal happy-path examples.',
      'Group evals by user journey so you can spot where quality drops in a workflow.',
      'Use both automated checks and periodic human review to catch subtle quality regressions.',
    ],
  },
  {
    slug: 'streaming-ux-for-ai-chat',
    title: 'Streaming UX for AI Chat',
    excerpt: 'Patterns for responsive token streaming, cancellation, and graceful retries in chat UIs.',
    category: 'Frontend',
    readTime: '5 min read',
    publishedAt: 'Feb 2026',
    image: '/ai-core.png',
    tags: ['React', 'Streaming', 'UX'],
    body: [
      'Stream partial responses early to improve perceived performance.',
      'Add cancel controls and clear pending states to prevent user confusion.',
      'Persist draft context locally so refreshes do not wipe active conversations.',
    ],
  },
  {
    slug: 'agent-tools-safety-rails',
    title: 'Agent Tooling Safety Rails',
    excerpt: 'A lightweight approach to control tool access and reduce high-risk actions.',
    category: 'Agents',
    readTime: '7 min read',
    publishedAt: 'Feb 2026',
    image: '/ai-core.png',
    tags: ['Agents', 'Security', 'Governance'],
    body: [
      'Define strict allowlists for tools based on task type and user permissions.',
      'Require explicit confirmation for destructive actions in production environments.',
      'Log tool calls with context for auditing and post-incident analysis.',
    ],
  },
  {
    slug: 'schema-first-api-design',
    title: 'Schema-First API Design',
    excerpt: 'Why schema-first contracts speed up teams and make integrations easier to maintain.',
    category: 'Backend',
    readTime: '6 min read',
    publishedAt: 'Feb 2026',
    image: '/ai-core.png',
    tags: ['OpenAPI', 'Contracts', 'Validation'],
    body: [
      'Start by designing request and response schemas before implementing handlers.',
      'Generate client types from the schema to reduce mismatch bugs across services.',
      'Validate every request at the edge to keep domain logic focused and clean.',
    ],
  },
  {
    slug: 'feature-flags-for-ml-rollouts',
    title: 'Feature Flags for ML Rollouts',
    excerpt: 'Safe gradual rollouts for model changes with cohorts, kill switches, and monitoring.',
    category: 'Release',
    readTime: '6 min read',
    publishedAt: 'Jan 2026',
    image: '/ai-core.png',
    tags: ['Flags', 'Rollouts', 'Experimentation'],
    body: [
      'Use progressive rollout percentages to catch regressions before broad exposure.',
      'Keep instant kill switches for problematic models or prompt versions.',
      'Monitor quality, cost, and latency together to evaluate release health.',
    ],
  },
  {
    slug: 'designing-fallback-strategies',
    title: 'Designing Fallback Strategies',
    excerpt: 'Robust fallback paths for model errors, timeouts, and unavailable dependencies.',
    category: 'Reliability',
    readTime: '5 min read',
    publishedAt: 'Jan 2026',
    image: '/ai-core.png',
    tags: ['Retries', 'Timeouts', 'Resilience'],
    body: [
      'Build explicit fallback flows instead of relying on generic retry logic.',
      'Use timeout budgets per dependency and return partial useful answers when possible.',
      'Document fallback behavior so support teams can explain outcomes to users.',
    ],
  },
  {
    slug: 'vector-index-lifecycle',
    title: 'Vector Index Lifecycle',
    excerpt: 'A complete lifecycle for indexing: ingest, refresh, backfill, and deprecation.',
    category: 'Data',
    readTime: '7 min read',
    publishedAt: 'Jan 2026',
    image: '/ai-core.png',
    tags: ['Embeddings', 'Indexing', 'Pipelines'],
    body: [
      'Schedule incremental updates for fresh documents and periodic full consistency checks.',
      'Track embedding model versions so stale vectors can be identified quickly.',
      'Plan deprecation windows for old indexes to avoid breaking downstream consumers.',
    ],
  },
  {
    slug: 'cost-control-playbook',
    title: 'LLM Cost Control Playbook',
    excerpt: 'Concrete tactics for reducing token spend while preserving answer quality.',
    category: 'Ops',
    readTime: '8 min read',
    publishedAt: 'Dec 2025',
    image: '/ai-core.png',
    tags: ['Costs', 'Prompt Design', 'Caching'],
    body: [
      'Use response caching for repeated low-variance questions.',
      'Compress prompts by removing redundant context and tightening instructions.',
      'Apply model tiering so simpler tasks run on cheaper models by default.',
    ],
  },
  {
    slug: 'asyncio-vs-aiohttp',
    title: '`asyncio` vs `aiohttp`',
    excerpt: 'Differences, how they work together, and async/await best practices.',
    category: 'Python',
    readTime: '12 min read',
    publishedAt: 'May 2026',
    image: '/note-section-workflow.svg',
    tags: ['Python', 'Asyncio', 'aiohttp'],
    markdown: `
## \`asyncio\` vs \`aiohttp\`

They serve completely different purposes but work together:

### \`asyncio\` -- The Engine

\`asyncio\` is **Python's built-in async runtime**. It provides:

- **The event loop** -- the scheduler that decides which coroutine runs next
- **Coroutine primitives** -- \`async def\`, \`await\`, \`asyncio.gather()\`, \`asyncio.sleep()\`
- **Synchronization tools** -- \`Semaphore\`, \`Lock\`, \`Event\`, \`Queue\`
- **Task management** -- creating, cancelling, and waiting on tasks

It knows **nothing** about HTTP, web requests, or networking protocols. It's the foundation that everything async sits on top of.

\`\`\`python
import asyncio

async def do_something():
    await asyncio.sleep(1)       # non-blocking wait
    return "done"

async def main():
    results = await asyncio.gather(  # run concurrently
        do_something(),
        do_something(),
        do_something(),
    )

asyncio.run(main())
\`\`\`

### \`aiohttp\` -- The HTTP Client (and Server)

\`aiohttp\` is a **third-party library** that provides an async HTTP client and server, built **on top of** \`asyncio\`. It's essentially the async equivalent of \`requests\`.

- **Client side** -- make HTTP requests (GET, POST, etc.) without blocking
- **Server side** -- build async web servers (alternative to Flask/FastAPI)
- **Connection pooling** -- reuse TCP connections across requests via \`TCPConnector\`
- **Timeouts, redirects, cookies, headers** -- all the HTTP plumbing

\`\`\`python
import aiohttp

async def fetch(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()
\`\`\`

### Analogy

| Concept | Analogy |
| --- | --- |
| \`asyncio\` | The **operating system** -- schedules tasks, manages concurrency |
| \`aiohttp\` | An **application** -- uses the OS to do HTTP work |

You can use \`asyncio\` without \`aiohttp\` (e.g., for async file I/O, timers, or working with other async libraries). But you **cannot** use \`aiohttp\` without \`asyncio\` -- it depends on it.

### How They Combine in Your File

In your \`scraping_pages.py\`:

- **\`asyncio\`** provides: \`Semaphore\` (throttling), \`gather\` (run all scrapes concurrently), \`get_event_loop\` + \`run_in_executor\` (offload HTML parsing to a thread)
- **\`aiohttp\`** provides: \`ClientSession\` (make HTTP requests), \`TCPConnector\` (connection pool), \`ClientTimeout\` (request timeouts), \`ClientError\` (error handling)

In short: \`asyncio\` orchestrates *when* things run, \`aiohttp\` handles *what* runs (HTTP requests).

---

## Writing \`async\`/\`await\` Correctly in Python

### 1. The Basics

Any function that uses \`await\` **must** be declared with \`async def\`:

\`\`\`python
async def fetch_data():
    result = await some_async_operation()
    return result
\`\`\`

You can only \`await\` things that are **awaitable** (coroutines, tasks, futures). You **cannot** \`await\` a regular function:

\`\`\`python
# WRONG -- requests.get is synchronous, not awaitable
async def bad():
    result = await requests.get("<https://example.com>")

# RIGHT -- aiohttp returns an awaitable
async def good():
    async with aiohttp.ClientSession() as session:
        async with session.get("<https://example.com>") as resp:
            result = await resp.text()
\`\`\`

### 2. Running Async Code

You need an entry point to start the event loop:

\`\`\`python
import asyncio

async def main():
    data = await fetch_data()
    print(data)

# From synchronous code, kick off the loop:
asyncio.run(main())
\`\`\`

**Never** call \`asyncio.run()\` from inside an already-running loop (e.g., inside another \`async\` function). That will raise an error.

### 3. Concurrency with \`gather\`

The whole point of async is running things **concurrently**. Use \`asyncio.gather\`:

\`\`\`python
async def main():
    # These run concurrently, NOT sequentially
    a, b, c = await asyncio.gather(
        fetch_page("<https://site1.com>"),
        fetch_page("<https://site2.com>"),
        fetch_page("<https://site3.com>"),
    )
\`\`\`

Compare with the **wrong** way (runs sequentially, no benefit over sync):

\`\`\`python
async def main():
    # This defeats the purpose -- each one waits for the previous
    a = await fetch_page("<https://site1.com>")
    b = await fetch_page("<https://site2.com>")
    c = await fetch_page("<https://site3.com>")
\`\`\`

### 4. \`async with\` (Async Context Managers)

For resources that need async setup/teardown (sessions, connections):

\`\`\`python
async with aiohttp.ClientSession() as session:
    # session is open here
    async with session.get(url) as response:
        data = await response.read()
# session is automatically closed here
\`\`\`

### 5. \`async for\` (Async Iterators)

For streams of data that arrive asynchronously:

\`\`\`python
async for chunk in response.content.iter_any():
    process(chunk)
\`\`\`

### 6. Common Mistakes

| Mistake | Why It's Wrong |
| --- | --- |
| Calling \`async\` function without \`await\` | Returns a coroutine object, never executes |
| Using \`time.sleep()\` in async code | Blocks the **entire** event loop |
| Using \`requests\` in async code | Blocks the event loop (use \`aiohttp\` instead) |
| Calling \`asyncio.run()\` inside async | Can't nest event loops |

\`\`\`python
# WRONG -- blocks the whole loop for 5 seconds
async def bad():
    time.sleep(5)

# RIGHT -- yields control back to the loop
async def good():
    await asyncio.sleep(5)
\`\`\`

### 7. Mixing Sync and Async

If you **must** call a blocking/sync function from async code, offload it to a thread:

\`\`\`python
import asyncio

def slow_sync_work(data):
    # CPU-heavy or blocking I/O
    return process(data)

async def main():
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, slow_sync_work, my_data)
\`\`\`

This is exactly what your \`scraping_pages.py\` does on line 81 -- it offloads \`parse_html_content\` (CPU-bound BeautifulSoup parsing) to a thread pool so it doesn't block the event loop.

### TL;DR Rules

1. \`async def\` for any function that \`await\`s something
2. \`await\` every async call -- forgetting it means the code never runs
3. Use \`asyncio.gather()\` to run things concurrently
4. Never use blocking calls (\`time.sleep\`, \`requests\`, file I/O) inside async -- use their async equivalents or \`run_in_executor\`
5. One \`asyncio.run()\` at the top level to start everything
  `
  }
  , {
    slug: 'writing-maintainable-prompts',
    title: 'Writing Maintainable Prompts',
    excerpt: 'Prompt structure guidelines that make long-term maintenance and handoff easier.',
    category: 'Prompting',
    readTime: '5 min read',
    publishedAt: 'Dec 2025',
    image: '/note-section-architecture.svg',
    tags: ['Prompting', 'Templates', 'Documentation'],
    markdown: `
# Writing Maintainable Prompts

## Why Prompt Maintainability Matters
![Prompt architecture visual](/note-section-architecture.svg)

Most teams discover too late that prompt quality is not the hardest problem; prompt maintainability is. A prompt can perform well in week one and still become expensive to manage after several product iterations and model changes.

When prompts are written as one large paragraph, nobody knows which sentence controls tone, which one enforces formatting, and which one prevents hallucinations.

## A Production Prompt Blueprint
![Prompt workflow visual](/note-section-workflow.svg)

Use a fixed blueprint for every prompt:

- Role
- Task
- Context
- Constraints
- Output contract
- Examples

This separation helps debugging because each issue points to a specific section.

### Example Prompt Template
\`\`\`md
ROLE: You are a backend architecture assistant.
TASK: Propose an API design with trade-offs.
CONSTRAINTS:
- Do not invent unavailable services.
- Mention latency and security implications.
OUTPUT:
- Summary
- Recommended option
- Risks
\`\`\`

### Why This Structure Works
- Each block has one purpose, so edits are low risk.
- New teammates can understand intent in minutes.
- Regression debugging becomes much faster.

## Write Constraints That Survive Change
![Constraint and quality monitoring visual](/note-section-observability.svg)

Constraints should be specific and testable.

> Prefer deterministic language such as "If missing data, respond with MISSING_DATA and list required fields."

Use negative + positive constraints together: tell the model what **not** to do and what to do instead.

## Versioning and Rollouts

Version prompts with a changelog, review updates like code, and roll out gradually with feature flags.

\`\`\`txt
prompt_version: v1.4.0
change_reason: tightened output schema
rollback_target: v1.3.2
\`\`\`

### Rollout Checklist
- Run eval suite on top 20 real user prompts
- Compare quality, latency, and refusal-rate deltas
- Enable 10% traffic first, then ramp gradually
- Keep one-click rollback ready

## Team Workflow

Store templates with docs nearby, run a small eval harness before deploy, and schedule cleanup passes for outdated rules.

### Final Takeaway
Maintainable prompting is not just writing style. It is versioning discipline, clear structure, and repeatable review practice.
`,
    sections: [
      {
        title: 'Why Prompt Maintainability Matters',
        image: '/note-section-architecture.svg',
        imageAlt: 'Prompt architecture visual',
        paragraphs: [
          'Most teams discover too late that prompt quality is not the hardest problem; prompt maintainability is. A prompt can perform well in week one and still become expensive to manage after five product iterations, three model changes, and two team handoffs.',
          'When prompts are written as one large paragraph, nobody knows which sentence controls tone, which one enforces formatting, and which one prevents hallucinations. This creates brittle behavior and slows every release.',
          'A maintainable prompt is readable, modular, testable, and easy to change safely. It should be possible for someone new to the project to understand intent in minutes, not hours.',
          'Treating prompts as long-lived assets, not disposable experiments, improves consistency for users and lowers operational risk for teams.',
        ],
      },
      {
        title: 'A Production Prompt Blueprint',
        image: '/note-section-workflow.svg',
        imageAlt: 'Prompt workflow visual',
        paragraphs: [
          'Use a fixed blueprint for every prompt: role, task, context, constraints, output contract, and examples. Keeping this order stable reduces cognitive load and makes diff reviews much clearer.',
          'Role defines behavior boundaries. Task defines the exact job to complete. Context injects relevant data. Constraints define what must never happen. Output contract defines strict structure. Examples clarify edge behavior.',
          'This separation helps debugging. If answers are too verbose, inspect role and output contract. If answers are wrong, inspect context and retrieval. If answers violate policy, inspect constraints.',
          'The key is to avoid hidden logic. Every rule should live in an explicit section so future edits stay localized instead of rewriting the whole prompt.',
        ],
      },
      {
        title: 'Write Constraints That Survive Change',
        image: '/note-section-observability.svg',
        imageAlt: 'Constraint and quality monitoring visual',
        paragraphs: [
          'Constraints should be specific, testable, and ranked by priority. For example: "Never fabricate values" is stronger than "Try to be accurate."',
          'Prefer deterministic language such as "If missing data, respond with MISSING_DATA and list required fields." This creates predictable fallback behavior and cleaner analytics.',
          'Group constraints into categories: safety constraints, formatting constraints, and domain constraints. This way, legal/compliance edits do not interfere with product formatting changes.',
          'Use negative and positive constraints together. Tell the model what not to do and what to do instead. Replacement behavior is essential for stable outputs.',
        ],
      },
      {
        title: 'Make Outputs Machine-Friendly and Human-Readable',
        image: '/note-section-architecture.svg',
        imageAlt: 'Structured output visual',
        paragraphs: [
          'Output contracts should be strict enough for parsing and flexible enough for useful content. If downstream systems consume model output, define exact keys, allowed values, and optional fields.',
          'Add a short schema description inside the prompt. Even when using JSON mode, reminding the model of field intent improves consistency on ambiguous requests.',
          'Specify formatting rules explicitly: max sentence length, markdown usage, bullet limits, and citation style. Small style rules dramatically improve product coherence.',
          'When multiple audiences read the same response, define sections for each audience (e.g., executive summary + technical details). This keeps one generation useful across contexts.',
        ],
      },
      {
        title: 'Versioning, Reviews, and Safe Rollouts',
        image: '/note-section-workflow.svg',
        imageAlt: 'Version and rollout workflow visual',
        paragraphs: [
          'Version prompts with semantic labels and changelogs. Include why a change was made, expected impact, and rollback guidance. "Updated wording" is not enough context for future debugging.',
          'Review prompts like code. Require peer review on sections that affect policy, data boundaries, and output format. High-risk edits should include before/after examples.',
          'Roll out gradually with feature flags or traffic splits. Monitor quality, latency, and refusal rates for each prompt version to catch regressions early.',
          'Always keep one stable fallback version available. Prompt regressions can be subtle; quick rollback protects production reliability.',
        ],
      },
      {
        title: 'A Practical Team Workflow',
        image: '/note-section-observability.svg',
        imageAlt: 'Team workflow and monitoring visual',
        paragraphs: [
          'Store prompt templates in a dedicated folder with naming conventions by domain and task. Keep supporting docs near each template: expected behavior, test cases, and known limitations.',
          'Build a lightweight evaluation harness that runs representative prompts against current and candidate versions. Compare response quality and contract compliance automatically.',
          'Tag test cases by risk category: hallucination risk, formatting risk, safety risk, and business logic risk. This helps prioritize fixes when regressions appear.',
          'Schedule periodic prompt cleanups. Remove obsolete instructions, outdated examples, and duplicate constraints. Prompt entropy grows over time unless intentionally managed.',
          'Maintainability is a discipline. Teams that document intent, isolate sections, and validate behavior continuously can scale prompt-driven features without chaos.',
        ],
      },
    ],
    body: [
      'Split prompts into role, task, constraints, and output format sections.',
      'Keep examples short and focused so updates stay low risk.',
      'Add inline comments for non-obvious constraints to help future contributors.',
    ],
  },
];

