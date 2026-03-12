export type AIModel =
  | "openai/gpt-4o"
  | "openai/gpt-4o-mini"
  | "anthropic/claude-3.5-sonnet"
  | "anthropic/claude-3-haiku"
  | "mistralai/mistral-large";

export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIGenerateRequest {
  model: AIModel;
  messages: AIMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface AIGenerateResponse {
  id: string;
  content: string;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface BetaReadRequest {
  novel_id: string;
  chapters: string[];
  persona_types: string[];
  focus_areas: string[];
  model: AIModel;
}

export interface BetaReadResult {
  persona_name: string;
  persona_type: string;
  feedback: string;
  sentiment_data: Array<{ chapter: number; score: number; label: string }>;
  engagement_score: number;
  pacing_notes: string;
  character_impressions: Record<string, string>;
}

export interface CritiqueRequest {
  novel_id: string;
  pass_type: "structure" | "prose" | "character" | "pacing" | "dialogue";
  content: string;
  model: AIModel;
}

export interface CritiqueResult {
  pass_type: string;
  summary: string;
  issues: Array<{
    id: string;
    severity: "critical" | "major" | "minor" | "suggestion";
    category: string;
    description: string;
    location: string | null;
    suggestion: string | null;
  }>;
  score: number;
}
