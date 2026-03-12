export type UserRole = "owner" | "admin" | "editor" | "viewer";
export type PlanType = "free" | "starter" | "pro" | "studio";
export type ProjectStatus = "active" | "archived" | "completed";
export type ChapterStatus = "draft" | "in_review" | "complete";
export type SceneStatus = "draft" | "complete";
export type CharacterRole = "protagonist" | "antagonist" | "supporting" | "minor";
export type BetaRunStatus = "pending" | "running" | "complete" | "failed";
export type SubscriptionStatus = "active" | "canceled" | "past_due" | "trialing";
export type WorkflowStatus = "draft" | "active" | "archived";

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: PlanType;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface Membership {
  id: string;
  org_id: string;
  user_id: string;
  role: UserRole;
  created_at: string;
}

export interface Project {
  id: string;
  org_id: string;
  title: string;
  description: string | null;
  genre: string | null;
  target_word_count: number | null;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
  created_by: string;
  deleted_at: string | null;
}

export interface Novel {
  id: string;
  project_id: string;
  title: string;
  synopsis: string | null;
  genre: string | null;
  target_audience: string | null;
  created_at: string;
  updated_at: string;
  created_by: string;
  deleted_at: string | null;
}

export interface Chapter {
  id: string;
  novel_id: string;
  title: string;
  order_index: number;
  status: ChapterStatus;
  word_count: number;
  content: string | null;
  created_at: string;
  updated_at: string;
  created_by: string;
  deleted_at: string | null;
}

export interface Scene {
  id: string;
  chapter_id: string;
  title: string;
  order_index: number;
  content: string | null;
  pov_character_id: string | null;
  word_count: number;
  status: SceneStatus;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface Character {
  id: string;
  novel_id: string;
  name: string;
  role: CharacterRole;
  description: string | null;
  backstory: string | null;
  motivation: string | null;
  wound: string | null;
  fear: string | null;
  secret: string | null;
  voice_profile: string | null;
  arc_stage: string | null;
  created_at: string;
  updated_at: string;
  created_by: string;
  deleted_at: string | null;
}

export interface CharacterRelationship {
  id: string;
  character_a_id: string;
  character_b_id: string;
  relationship_type: string;
  description: string | null;
  created_at: string;
}

export interface Location {
  id: string;
  novel_id: string;
  name: string;
  description: string | null;
  type: string | null;
  parent_location_id: string | null;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface LoreEntry {
  id: string;
  novel_id: string;
  category: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  created_by: string;
  deleted_at: string | null;
}

export interface Note {
  id: string;
  novel_id: string;
  title: string;
  content: string;
  type: string;
  linked_entity_id: string | null;
  linked_entity_type: string | null;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface Prompt {
  id: string;
  org_id: string;
  title: string;
  content: string;
  category: string;
  model: string;
  temperature: number;
  created_at: string;
  updated_at: string;
  created_by: string;
  deleted_at: string | null;
}

export interface PromptVersion {
  id: string;
  prompt_id: string;
  version: number;
  content: string;
  model: string;
  temperature: number;
  created_at: string;
  created_by: string;
}

export interface Workflow {
  id: string;
  org_id: string;
  novel_id: string | null;
  title: string;
  description: string | null;
  status: WorkflowStatus;
  created_at: string;
  updated_at: string;
  created_by: string;
  deleted_at: string | null;
}

export interface WorkflowNode {
  id: string;
  workflow_id: string;
  node_type: string;
  label: string;
  config: Record<string, unknown>;
  position_x: number;
  position_y: number;
  created_at: string;
}

export interface WorkflowEdge {
  id: string;
  workflow_id: string;
  source_node_id: string;
  target_node_id: string;
  label: string | null;
  created_at: string;
}

export interface BetaRun {
  id: string;
  novel_id: string;
  title: string;
  status: BetaRunStatus;
  config: BetaRunConfig;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface BetaRunConfig {
  chapters: string[];
  persona_count: number;
  focus_areas: string[];
  model: string;
}

export interface BetaPersona {
  id: string;
  beta_run_id: string;
  name: string;
  type: string;
  demographics: Record<string, unknown>;
  preferences: Record<string, unknown>;
  feedback: string | null;
  sentiment_data: SentimentDataPoint[];
  created_at: string;
}

export interface SentimentDataPoint {
  chapter: number;
  score: number;
  label: string;
}

export interface CritiqueReport {
  id: string;
  novel_id: string;
  pass_type: string;
  status: string;
  issues: CritiqueIssue[];
  summary: string | null;
  created_at: string;
  created_by: string;
}

export interface CritiqueIssue {
  id: string;
  severity: "critical" | "major" | "minor" | "suggestion";
  category: string;
  description: string;
  location: string | null;
  suggestion: string | null;
}

export interface PeerReview {
  id: string;
  novel_id: string;
  reviewer_id: string;
  content: string;
  rating: number;
  status: string;
  created_at: string;
}

export interface Asset {
  id: string;
  novel_id: string;
  name: string;
  type: string;
  url: string;
  metadata: Record<string, unknown>;
  created_at: string;
  created_by: string;
}

export interface Subscription {
  id: string;
  org_id: string;
  stripe_subscription_id: string;
  plan: PlanType;
  status: SubscriptionStatus;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

export interface UsageEvent {
  id: string;
  org_id: string;
  user_id: string;
  event_type: string;
  tokens_used: number;
  cost_cents: number;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string | number;
  section?: string;
}

export interface MetricCardData {
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: "increase" | "decrease" | "neutral";
  icon?: string;
}
