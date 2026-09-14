import type { AiUseCase } from "@/lib/types";

export const aiPrinciples = ["LLMs", "Ollama", "RAG", "AI automation", "Local AI", "AI-assisted engineering"];

/** Real AI work, each tied to a concrete engineering problem. */
export const aiUseCases: AiUseCase[] = [
  {
    title: "Grounded documentation",
    context: "AnalyseImpacte · Capgemini Engineering",
    detail:
      "A deterministic AST parser extracts facts from the source code; a local LLM drafts the design-document update, and anything not grounded in the code is rejected.",
    stack: ["Ollama", "qwen2.5-coder", "AST parser"],
  },
  {
    title: "Conversational copilot",
    context: "AnalyseImpacte · Capgemini Engineering",
    detail:
      "An assistant with 4-mode intent routing, plus natural-language analytics over impact-analysis data.",
    stack: ["Local LLM", "Intent routing", "NL analytics"],
  },
  {
    title: "Semantic matching with RAG",
    context: "CareerMatch",
    detail:
      "Vector search over resumes and job postings, then 10 personalized interview questions generated per match.",
    stack: ["Qdrant", "Sentence-Transformers", "Llama 3.2"],
  },
];

/** Illustrative code window for the Applied AI section (mirrors the AnalyseImpacte approach). */
export const groundedGenerationSnippet = [
  { code: "facts = ast.parse(source_code)", comment: "deterministic" },
  { code: "draft = llm.generate(facts)", comment: "local · Ollama" },
  { code: "if not grounded(draft, facts):", comment: "" },
  { code: "    reject(draft)", comment: "no hallucinations" },
  { code: "sddd.update(draft)", comment: "traceable" },
];
