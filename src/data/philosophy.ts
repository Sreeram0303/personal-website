export type PhilosophyParagraph = {
  lead: string;
  emphasis: string;
};

export const philosophyParagraphs: PhilosophyParagraph[] = [
  {
    lead: "I don't just learn how a technology works. I want to understand ",
    emphasis:
      "the problem it solves, what happens underneath, and why I'd choose it over the alternatives.",
  },
  {
    lead:
      "I care about what happens beyond the happy path. Authentication, async processing, caching, observability, and failure handling aren't extras bolted on at the end — ",
    emphasis: "they're part of the system from the beginning.",
  },
];

export type PhilosophyQuestion = {
  text: string;
  emphasis?: boolean;
};

export const philosophyQuestions: PhilosophyQuestion[] = [
  { text: "What problem does it actually solve?" },
  { text: "What's happening underneath?" },
  { text: "What alternatives exist?" },
  { text: "What are the trade-offs?" },
  { text: "How does it behave under real-world load?" },
  { text: "What happens when things go wrong at 3am?", emphasis: true },
];
