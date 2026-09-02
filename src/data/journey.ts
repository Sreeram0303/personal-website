export type JourneyStop = {
  id: string;
  marker: string;
  title: string;
  period: string;
  description: string;
  link?: { label: string; url: string };
  current?: boolean;
  aspirational?: boolean;
};

export const journey: JourneyStop[] = [
  {
    id: "graduation",
    marker: "01",
    title: "Graduated — VIT Chennai",
    period: "The Foundation",
    description:
      "B.Tech in Computer Science, specialization in AI & Robotics. GPA 9.11. Four years of CS fundamentals, machine learning, and robotics — the base camp everything else launches from.",
  },
  {
    id: "research-intern",
    marker: "02",
    title: "Research Intern — VIT",
    period: "2023",
    description:
      "Fine-tuned an EfficientNetV2B0 model for rice leaf disease recognition and co-authored a published IEEE paper on the results. First real exposure to rigorous ML evaluation.",
    link: { label: "Read the IEEE paper", url: "https://ieeexplore.ieee.org/document/10722610" },
  },
  {
    id: "logicalat",
    marker: "03",
    title: "Software Development Intern — LogicalAt",
    period: "2023",
    description:
      "Applied Linear Regression, KNN, Ridge, Lasso, and MultiOutput Regressors to industrial color manufacturing, with PCA-driven feature engineering against real operational constraints.",
  },
  {
    id: "infosys",
    marker: "04",
    title: "Specialist Programmer — Infosys",
    period: "2025 — Present",
    description:
      "Extending a telecom order-fallout automation platform, then architecting a distributed multi-agent A2A system — LangGraph, RAG, ChromaDB, human-in-the-loop execution.",
    current: true,
  },
  {
    id: "next",
    marker: "X",
    title: "Something Big",
    period: "Next",
    description:
      "There's more I want to build, more I want to learn, and somewhere bigger I want to be.",
    aspirational: true,
  },
];
