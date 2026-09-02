export type CaseStudy = {
  slug: string;
  name: string;
  tagline: string;
  stack: string[];
  problem: string;
  whyItMatters: string;
  architecture: string;
  role: string;
  decisions: string[];
  challenges: string;
  outcome: string;
  learnings: string;
  links?: { label: string; url: string }[];
  repoUrl?: string;
};

export const projects: CaseStudy[] = [
  {
    slug: "ai-invoice-auditor",
    name: "AI Invoice Auditor",
    tagline: "A distributed multi-agent system that audits enterprise invoices end to end.",
    stack: [
      "LangGraph",
      "LangChain",
      "Google ADK",
      "A2A",
      "RAG",
      "ChromaDB",
      "FAISS",
      "AWS Bedrock",
      "Hugging Face",
      "Ollama",
      "Langfuse",
      "FastAPI",
    ],
    problem:
      "Enterprise invoice auditing means cross-referencing documents against business rules, compliance policy, and ERP data — by hand, across formats and languages. It's slow, error-prone, and doesn't scale with volume.",
    whyItMatters:
      "This is the difference between 'ask an LLM about an invoice' and building a reliable workflow around the model: extraction, validation, translation, and compliance checks all have to compose correctly, with a human able to intervene when the system isn't confident.",
    architecture:
      "A distributed multi-agent A2A (agent-to-agent) system. Dedicated agent services handle discrete stages of the pipeline — folder monitoring and ingestion, PDF/document processing, structured extraction, translation, business-rule validation, and reporting — orchestrated by LangGraph workflows that communicate across services rather than a single monolithic chain. RAG over ChromaDB and Google ADK supply enterprise data for retrieval and compliance validation; several retrieval strategies (FAISS, Chroma, MMR, MultiVectorRetriever) were evaluated for extraction and lookup quality.",
    role:
      "Architected the distributed agent system: the A2A communication design, the persistent workflow state for human-in-the-loop execution, and the observability layer used to trace execution across agents.",
    decisions: [
      "LangGraph over a single prompt chain — the pipeline has real branch points (validation failure, low-confidence extraction) that need cyclic, stateful control flow, not a linear pass.",
      "Dedicated agent services communicating over A2A instead of one large orchestrator — isolates failure domains and lets each stage (extraction, translation, validation) evolve independently.",
      "Persistent workflow state specifically to support human-in-the-loop — a paused, resumable state was non-negotiable for audit workflows where a human has to approve edge cases.",
      "Multiple retrieval strategies evaluated (FAISS, Chroma, MMR, MultiVectorRetriever) rather than defaulting to one, since extraction accuracy and compliance-document retrieval have different retrieval-quality needs.",
    ],
    challenges:
      "Diagnosing failures in a distributed agent system is harder than in a single service — a bad outcome could originate in extraction, retrieval, or a downstream validation agent. Observability (via Langfuse) was built in specifically to trace execution across agent boundaries and pin down latency and failure points rather than guessing.",
    outcome:
      "A working, auditable multi-agent pipeline with traceable execution, human-in-the-loop checkpoints for low-confidence cases, and measurably improved reliability of the automated compliance checks.",
    learnings:
      "Reliability in agentic systems comes from state and observability design, not from a smarter prompt. The moment a workflow spans multiple services, tracing execution stops being optional.",
  },
  {
    slug: "taskmanager",
    name: "TaskManager",
    tagline: "A secure, asynchronous task-management API built like it has to survive production.",
    stack: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Redis", "Docker", "GitHub Actions"],
    repoUrl: "https://github.com/Sreeram0303/TaskManager",
    problem:
      "Most portfolio backend projects stop at CRUD. I wanted to build the parts that only show up once something is actually exposed to real users: auth that can't be trivially replayed, real-time sync across devices, and a deploy pipeline.",
    whyItMatters:
      "It's the clearest demonstration of production-oriented backend thinking — the things that separate 'an API that works' from 'an API you'd trust in production.'",
    architecture:
      "FastAPI + PostgreSQL via SQLAlchemy for the core data layer, Redis for caching and pub/sub. JWT authentication with refresh-token rotation and reuse detection, CSRF protection, rate limiting, and role-based access control sit in front of the API. Real-time multi-device sync is handled with Redis Pub/Sub fanning out to Server-Sent Events. Services are containerized with Docker Compose and CI runs through GitHub Actions.",
    role: "Sole engineer — design, implementation, and CI setup.",
    decisions: [
      "Refresh-token rotation with reuse detection instead of long-lived static refresh tokens — a stolen, reused token gets flagged and the session chain revoked, rather than silently trusting it.",
      "Server-Sent Events over WebSockets for multi-device sync — the data flow is server-to-client push, and SSE keeps the transport simpler than a bidirectional socket for a use case that doesn't need it.",
      "Cache-aside on Redis rather than write-through — reads dominate the access pattern, so caching on read miss keeps Postgres as the single source of truth without added write complexity.",
    ],
    challenges:
      "Getting refresh-token rotation correct without locking legitimate users out on token races (two tabs refreshing concurrently) took the most iteration — the reuse-detection logic has to distinguish an actual replay attack from a benign race.",
    outcome:
      "A fully containerized API with automated CI, real-time sync working across simulated multiple devices, and auth hardened against the common token-replay failure mode.",
    learnings:
      "Auth is where 'it works in the demo' and 'it's actually secure' diverge the most — most of the real engineering was in the token lifecycle, not the CRUD routes.",
  },
  {
    slug: "langgraph-sql-agent",
    name: "LangGraph SQL Agent",
    tagline: "A natural-language SQL assistant that checks and corrects its own queries.",
    stack: ["LangGraph", "LangChain", "Gemini AI", "SQLite"],
    repoUrl: "https://github.com/Sreeram0303/SQL-Agent",
    problem:
      "Natural-language-to-SQL tools are prone to two failure modes: generating queries that are wrong, and generating queries that are unsafe. A single-shot generation step can't catch either.",
    whyItMatters:
      "It's a small, legible example of the pattern I care about in agentic systems generally: don't trust a single model call — build a loop that validates and corrects itself before anything executes.",
    architecture:
      "A stateful LangGraph workflow: schema inspection, query generation, a validation step, controlled execution, and a cyclic self-correction loop that routes invalid queries back through generation with the validation error as context, instead of failing outright.",
    role: "Sole engineer.",
    decisions: [
      "Cyclic graph over a linear chain specifically to support self-correction — a failed validation needs to feed back into generation, which a straight-line pipeline can't express.",
      "Restricted DML operations as a safety guardrail — the assistant can query but is deliberately boxed out of mutating the database, since NL-to-SQL correctness on writes isn't reliable enough to trust unsupervised.",
    ],
    challenges:
      "Tuning when to stop retrying — an unbounded self-correction loop can spin on a genuinely unanswerable question, so the graph needed a bounded retry count with a clear failure exit.",
    outcome:
      "A working assistant that catches and repairs a meaningful share of its own generation errors before execution, with DML operations blocked outright.",
    learnings:
      "Guardrails and self-correction aren't in tension — restricting what the agent is allowed to do makes it safe to let it retry aggressively on what it is allowed to do.",
  },
  {
    slug: "servicenow-intelligence-platform",
    name: "ServiceNow Operational Intelligence Platform",
    tagline: "A live analytics platform with a natural-language chart-exploration layer on top.",
    stack: ["Dash", "Plotly", "Gemini AI", "ServiceNow API"],
    repoUrl: "https://github.com/Sreeram0303/snow-insights-dashboard",
    problem:
      "ServiceNow incident data is rich but not exploratory-friendly out of the box — getting to KPI, SLA aging, or MTTR views usually means someone builds the specific report you need, when you need it.",
    whyItMatters:
      "It pairs a conventional operational dashboard with a natural-language exploration layer, which meant solving a real security problem: letting an LLM generate visualization code without letting it touch anything it shouldn't.",
    architecture:
      "A Dash/Plotly analytics platform integrating ServiceNow incident data into KPI, SLA aging, MTTR, and lifecycle dashboards. A Gemini-powered module lets users ask for charts in natural language; it generates Plotly code from schema-only context (never raw data) and runs it under restricted Python execution.",
    role: "Sole engineer.",
    decisions: [
      "Schema-only context for the LLM instead of passing raw data — the model only needs field names and types to write correct Plotly code, and it meaningfully shrinks what could go wrong or leak.",
      "Restricted execution sandbox for LLM-generated code rather than trusting output directly — generated code is still generated code, and it runs accordingly.",
    ],
    challenges:
      "Balancing how much freedom to give the generated code against the sandbox constraints — too restrictive and common chart requests fail; too permissive and it isn't actually a sandbox.",
    outcome:
      "A live operational dashboard plus a natural-language chart layer that generates and safely executes real Plotly visualizations on demand.",
    learnings:
      "Letting an LLM generate executable code is a security problem before it's a UX problem — schema-only context and sandboxing aren't optional add-ons, they're the feature.",
  },
];
