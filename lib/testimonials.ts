/**
 * Replace these placeholders with real LinkedIn recommendations.
 * Source: linkedin.com/in/shivangsingh26/details/recommendations/
 *
 * Tips:
 *  - Keep quote ~50-200 chars (one strong line beats two mediocre ones)
 *  - "role" = their role AT THE TIME they wrote the rec
 *  - "context" = how they know you (manager, peer, client, mentor)
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  context: "manager" | "peer" | "client" | "mentor" | "report";
  linkedin?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Shivang treats production AI like a first-class engineering problem — not a research demo. His pipelines actually survive real traffic.",
    name: "[Replace with real name]",
    role: "Tech Lead",
    company: "Publicis Sapient",
    context: "manager",
  },
  {
    quote:
      "One of the few engineers who can hold both the model intuition and the infrastructure tradeoffs in his head at the same time. Rare combo.",
    name: "[Replace with real name]",
    role: "Senior ML Engineer",
    company: "Lincode Vision Labs",
    context: "peer",
  },
  {
    quote:
      "He delivered Bodhi Atomize end-to-end — from prompt design to KEDA autoscaling. The kind of person you want building the AI layer of your product.",
    name: "[Replace with real name]",
    role: "Engineering Manager",
    company: "Publicis Sapient",
    context: "manager",
  },
];
