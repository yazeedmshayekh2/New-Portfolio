export const codingNotes = [
  {
    slug: "asyncio-vs-aiohttp",
    title: "`asyncio` vs `aiohttp`",
    excerpt:
      "Differences, how they work together, and async/await best practices.",
    category: "Python",
    readTime: "12 min read",
    publishedAt: "May 2026",
    image: "/asyncio_aiohttp.png",
    tags: ["Python", "Asyncio", "aiohttp"],
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
  `,
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
    markdown: `
## Synchronous vs Asynchronous

**Synchronous (sync)** and **asynchronous (async)** are two fundamental execution models that determine **how** and **when** tasks run in a program. The choice between them — and how it is implemented — varies significantly across programming languages.

### The core concepts

In **synchronous** code, each operation must complete before the next one begins — the thread is *blocked* while waiting. Think of a single cashier at checkout: the next customer cannot be served until the current one is done.

In **asynchronous** code, a task is *started* and the program immediately moves on to other work, handling the result later (via callbacks, promises, or \`async/await\`). The cashier takes an order, sends it to the kitchen, and serves the next customer while the first order is prepared.

### Single-threaded vs multi-threaded languages

| Language | Threading model | Async mechanism | Notes |
| --- | --- | --- | --- |
| **JavaScript** | Single-threaded | Event loop, Promises, \`async/await\` | Non-blocking I/O via the event loop |
| **Python** | Single-threaded (effectively) | \`asyncio\`, \`async/await\` | GIL limits true parallel threads; use \`multiprocessing\` for CPU tasks |
| **Java** | Multi-threaded | \`CompletableFuture\`, Virtual Threads (Java 21+) | Native OS threads; strong for CPU-bound parallel work |
| **Go** | Multi-threaded | Goroutines + channels | Lightweight, runtime-managed green threads |
| **C#** | Multi-threaded | \`async/await\`, \`Task\`, TPL | \`async/await\` does not create a new thread per \`await\` by default |
| **Rust** | Multi-threaded | \`async/await\`, Tokio runtime | Memory-safe concurrency with zero-cost abstractions |
| **Ruby** | Single-threaded (GIL) | Fibers, \`async\` gem | Similar GIL limitation to Python |
| **Node.js** | Single-threaded | Event loop (libuv) | Worker Threads for CPU work |

### How each language handles async differently

**JavaScript / Node.js** — non-blocking I/O on a single thread:

\`\`\`javascript
const data = await fetch('https://api.example.com/data');
\`\`\`

**Python** — the **GIL** means only one thread executes Python bytecode at a time. \`asyncio\` provides cooperative async for I/O-bound tasks; use \`multiprocessing\` for CPU-bound parallelism:

\`\`\`python
async def fetch_data():
    async with aiohttp.ClientSession() as session:
        response = await session.get(url)
        return await response.text()
\`\`\`

**Java / C#** — truly multi-threaded. Java 21 *Virtual Threads* are lightweight like Go goroutines. C# \`async/await\` uses a thread pool: the thread is freed while waiting, then a continuation runs when the task completes.

**Go** — **goroutines** are scheduled by Go's runtime, not one-per-OS-thread. Millions are cheap; **channels** coordinate communication.

### When to use which

- **Sync** → CPU-intensive work where strict ordering matters (math, image processing, transforms)
- **Async (single-threaded)** → High-concurrency I/O: web servers, DB queries, API calls (JS, Python \`asyncio\`)
- **Multi-threaded / multi-process** → True CPU parallelism: encoding, ML inference, scientific computing (Java, Go, C#, Rust, Python \`multiprocessing\`)

FastAPI is async-native: each request does not block others during I/O waits, which is why it scales well despite the GIL.

---

## From hardware to your code

### Layer 1: The CPU

A modern CPU has multiple **cores**; each core runs one thread at a time. **Hyperthreading** can expose two logical cores per physical core. The CPU only understands machine instructions — not Python or JavaScript.

Execution is fetch → decode → execute in a loop. **Interrupts** pause that loop when hardware events occur (keyboard, network packet, disk I/O complete). The CPU jumps to an **interrupt handler**. That is how async I/O works at the lowest level — the kernel is notified by hardware instead of the CPU polling in a busy loop.

### Layer 2: The operating system

The OS schedules **OS threads** onto cores via algorithms like Linux **CFS**. A **context switch** saves one thread's registers and loads another's. On a 12-core CPU, at most 12 threads run truly in parallel at any instant; everything else waits, blocks on I/O, or sleeps. Time-slicing creates the illusion of thousands of concurrent threads.

### Layer 3: Language runtimes

\`\`\`text
Your code
    ↓
Language runtime (event loop / GIL / goroutine scheduler)
    ↓
OS threads
    ↓
CPU cores
\`\`\`

#### JavaScript / Node.js

One OS thread runs your JS. On \`await fetch(...)\`, work is delegated to the OS (\`epoll\` on Linux, \`kqueue\` on macOS). The kernel watches the socket; the JS thread stays free. When data is ready, an interrupt fires, **libuv** queues a callback, and the **event loop** runs it on the main thread.

CPU-bound work can use libuv's **thread pool** (default 4 threads) so the event loop is not blocked.

#### Python

Real OS threads exist, but the **GIL** lets only one thread run Python bytecode at a time. \`asyncio\` is a single-threaded event loop: coroutines **voluntarily yield** at \`await\`. If a coroutine never awaits, it blocks everything.

**multiprocessing** spawns separate processes — each with its own GIL — for real multi-core CPU work (e.g. multiple Gunicorn workers).

#### Java

Threads map **1:1 to OS threads** (no GIL). Expensive at scale (~1 MB stack each). **Virtual Threads** (Java 21+) are JVM-managed and lightweight.

#### Go

**M:N scheduling**: N goroutines on M OS threads across all cores. The **G-M-P** model: **P** (processor) holds a goroutine queue. Blocking I/O parks a goroutine and reuses the OS thread for another.

#### C# / Rust

C# \`async/await\` schedules **continuations** on a **thread pool** — not necessarily the same thread after \`await\`. Rust needs an explicit runtime (e.g. **Tokio**) with a similar poll-based executor.

### Full hardware picture

| Language | OS threads | CPU use for app logic | I/O strategy |
| --- | --- | --- | --- |
| **JavaScript** | 1 main + libuv pool | ~1 core for JS | Kernel events (\`epoll\`/\`kqueue\`) |
| **Python (asyncio)** | 1 (GIL-bound) | ~1 core for Python bytecode | \`asyncio\` + kernel (\`epoll\`) |
| **Python (multiprocessing)** | Multiple processes | Full multi-core | Per-process GIL |
| **Java** | 1:1 OS threads | Full multi-core | Threads or NIO |
| **Go** | M OS threads | Full multi-core | Runtime parks goroutines on I/O |
| **C#** | Thread pool | Full multi-core | Task continuations |
| **Rust (Tokio)** | Thread pool | Full multi-core | Poll-based executor |

**FastAPI mental model:** \`asyncio\` event loop → one OS thread → kernel \`epoll\` for I/O. \`await\` on a DB call frees the thread for other requests. A CPU-heavy call **without** \`await\` freezes the entire loop.

---

## Asyncio is not threading

\`asyncio\` does **not** put tasks on another thread by default. It runs on **one thread** with cooperative scheduling — no OS context switches between coroutines; the event loop switches between coroutine frames in userspace.

\`\`\`python
import asyncio

async def task1():
    print("Task 1 start")
    await asyncio.sleep(2)   # voluntarily yields
    print("Task 1 done")

async def task2():
    print("Task 2 start")
    await asyncio.sleep(1)
    print("Task 2 done")

asyncio.run(asyncio.gather(task1(), task2()))
# Task 1 start → Task 2 start → Task 2 done → Task 1 done
\`\`\`

### When asyncio uses threads

For **blocking sync code** inside async code, use \`asyncio.to_thread()\` or \`loop.run_in_executor()\`:

\`\`\`python
async def main():
    result = await asyncio.to_thread(blocking_sync_function)
\`\`\`

Calling \`time.sleep(3)\` directly inside \`async def\` **freezes the event loop** for 3 seconds.

| Model | Analogy |
| --- | --- |
| **Sync** | One chef, one dish at a time start-to-finish |
| **asyncio** | One chef: starts dish 1, works on dish 2 while waiting, returns to dish 1 |
| **Threading** | Multiple chefs in parallel |
| **asyncio.to_thread()** | Chef hires a helper for one blocking step |

---

## Asyncio as cooperative multitasking

| Type | Who switches? | Threads? | Python |
| --- | --- | --- | --- |
| **Preemptive** | OS interrupts tasks | Yes | \`threading\` |
| **Cooperative** | Tasks yield at \`await\` | No (one thread) | \`asyncio\` |

The event loop runs one task until \`await\`, then picks the next ready task. \`asyncio.gather()\` schedules coroutines together — they **interleave**, not run in parallel on multiple cores.

\`\`\`python
async def bad_task():
    import time
    time.sleep(5)  # blocks entire loop

async def good_task():
    await asyncio.sleep(5)  # yields; others can run
\`\`\`

### Hierarchy of Python concurrency

\`\`\`text
asyncio.gather()    → Cooperative multitasking (1 thread, interleaved)
threading           → Preemptive multitasking (GIL-limited for CPU)
multiprocessing     → True parallelism (multiple processes, multiple cores)
\`\`\`

---

## Why fast Python packages use Rust

Python is slow for raw computation: interpreted bytecode, GC overhead, and the **GIL** cap CPU parallelism in pure Python threads.

**Rust** offers:

- Native machine code (near C/C++ speed)
- **Zero-cost abstractions**
- No GC — ownership at compile time
- Memory safety without segfault-prone C extensions
- True parallelism when the extension **releases the GIL**

**PyO3** + **Maturin** expose Rust functions as normal Python callables — keep orchestration in Python, hot paths in Rust.

| Package | Role | Why Rust |
| --- | --- | --- |
| **Polars** | DataFrames | Fast columnar ops vs Pandas |
| **Pydantic V2** | Validation (\`pydantic-core\`) | FastAPI uses this daily |
| **Ruff** | Linter | Milliseconds vs seconds |

Python is the architect; Rust is the construction crew. Native extensions run outside the GIL during heavy work — another reason they outperform pure Python on multi-core machines.

---

## The GIL explained

The **Global Interpreter Lock** is a mutex in **CPython** allowing **only one thread to execute Python bytecode at a time**, even on many-core hardware.

### Why it exists

CPython uses **reference counting** per object. Two threads updating the same object's count without synchronization causes **race conditions** and memory corruption. The GIL is one global lock instead of per-object locks everywhere.

> Only the thread holding the GIL runs Python bytecode at that moment.

The GIL is released periodically (~5 ms switching interval by default) and when a thread blocks on I/O — so **I/O-bound** threaded code can still make progress. **CPU-bound** Python threads do not gain true parallelism.

| Task type | GIL impact |
| --- | --- |
| **CPU-bound** | Threads do not parallelize bytecode |
| **I/O-bound** | Thread releases GIL while waiting — often fine |

**Python 3.13+** offers experimental **free-threaded** (no GIL) mode — opt-in, still maturing.

### Escaping the GIL today

- \`multiprocessing\` — separate processes, separate GILs
- Rust/C extensions — release GIL during native work
- \`asyncio\` — single-threaded I/O concurrency
- NumPy / PyTorch — heavy work in native code outside the GIL

---

## CPython and bytecode

**CPython** is the default Python implementation, written in **C**. Running \`python script.py\` uses it (vs PyPy, Jython, etc.).

### Execution pipeline

\`\`\`text
Your .py file
     ↓
1. Lexing & parsing  →  AST
     ↓
2. Compilation       →  Bytecode (.pyc)
     ↓
3. PVM execution     →  Results
\`\`\`

**AST** — tree of assignments, calls, operators. **Bytecode** — portable instructions for the **Python Virtual Machine (PVM)**, cached in \`__pycache__/\`. The PVM loop: read instruction → execute → repeat.

Inspect bytecode:

\`\`\`python
import dis

def add(a, b):
    return a + b

dis.dis(add)
# LOAD_FAST, LOAD_FAST, BINARY_OP, RETURN_VALUE
\`\`\`

Bytecode is platform-independent but **version-specific** (3.11 ≠ 3.9 instruction sets).

### Why slower than Rust or C

The PVM interprets bytecode with per-instruction overhead (C calls, type checks). Rust/C compile to **machine code** the CPU runs directly — no VM in between. That gap is why the same algorithm can be 10–75× faster in Rust, and why Rust-backed Python libraries matter for hot paths.

---

## Key takeaways

1. **Async** is about not blocking while waiting on I/O; it is not automatic multi-core parallelism in Python.
2. **asyncio** = cooperative multitasking on **one thread**; use \`to_thread\` / \`multiprocessing\` when you need threads or cores.
3. The **GIL** protects reference counting; it limits CPU parallelism in threads but I/O often still scales.
4. **CPython** runs **bytecode** on the PVM; Rust extensions skip that path for critical loops and can release the GIL.
5. As a **FastAPI** developer: keep routes async and non-blocking; never run long CPU work on the event loop without offloading.
`,
  },
];
