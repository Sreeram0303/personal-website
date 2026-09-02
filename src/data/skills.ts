export type SkillGroup = {
  label: string;
  description: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Backend & APIs",
    description: "The systems layer behind the intelligence.",
    items: ["Python", "Java", "FastAPI", "REST APIs", "SQLAlchemy", "PostgreSQL", "Redis", "SSE"],
  },
  {
    label: "AI Systems",
    description: "Where models become useful software.",
    items: ["LLMs", "RAG", "LangChain", "LangGraph", "MCP", "FastMCP", "A2A", "HITL"],
  },
  {
    label: "Infrastructure & Engineering",
    description: "How ideas become reliable, deployable systems.",
    items: ["Docker", "Git", "GitHub Actions", "pytest"],
  },
  {
    label: "ML Foundations",
    description: "The foundation underneath the AI layer.",
    items: [
      "Machine Learning",
      "Deep Learning",
      "TensorFlow",
      "scikit-learn",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Plotly",
    ],
  },
  {
    label: "Frontend",
    description: "Enough to take an idea all the way to the interface.",
    items: ["HTML", "CSS", "JavaScript", "React"],
  },
];
