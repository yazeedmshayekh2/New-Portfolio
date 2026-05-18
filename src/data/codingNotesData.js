import etlVsEltMarkdown from "./etl-vs-elt.md?raw";
import asyncioVsAiohttpMarkdown from "./asyncio-vs-aiohttp.md?raw";
import syncAsyncConcurrencyDeepDiveMarkdown from "./sync-async-concurrency-deep-dive.md?raw";

export const codingNotes = [
  {
    slug: "asyncio-vs-aiohttp",
    title: "`asyncio` vs `aiohttp`",
    excerpt:
      "Differences, how they work together, and async/await best practices.",
    category: "Python",
    readTime: "12 min read",
    publishedAt: "May 2026",
    image: "/asyncio_vs_aiohttp.png",
    tags: ["Python", "Asyncio", "aiohttp"],
    markdown: asyncioVsAiohttpMarkdown,
  },
  {
    slug: "sync-async-concurrency-deep-dive",
    title: "Sync vs Async, Concurrency & CPython",
    excerpt:
      "Execution models across languages, hardware layers, asyncio cooperative multitasking, the GIL, bytecode, and why Rust powers fast Python packages.",
    category: "Python",
    readTime: "35 min read",
    publishedAt: "May 2026",
    image: "/sync_vs_async.png",
    tags: ["Python", "Async", "Concurrency", "GIL", "CPython", "Rust"],
    markdown: syncAsyncConcurrencyDeepDiveMarkdown,
  },
  {
    slug: "etl-vs-elt-data-engineering-guide",
    title: "ETL vs ELT",
    excerpt:
      "ETL vs ELT, data types, warehouse tiers, hands-on Python/PostgreSQL/dbt/Airflow path, dbt concepts, and a real-world modern data stack walkthrough.",
    category: "Data Engineering",
    readTime: "55 min read",
    publishedAt: "May 2026",
    image: "/etl_vs_elt.png",
    tags: [
      "ETL",
      "ELT",
      "dbt",
      "PostgreSQL",
      "Snowflake",
      "Airflow",
      "Data Warehouse",
      "Python",
    ],
    markdown: etlVsEltMarkdown,
  },
];
