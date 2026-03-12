export const APP_NAME = "Write Forge AI";
export const APP_TAGLINE = "Your AI-powered writing co-pilot";

export const PLANS = {
  free: { name: "Free", tokens: 50_000, price: 0 },
  starter: { name: "Starter", tokens: 500_000, price: 1900 },
  pro: { name: "Pro", tokens: 2_000_000, price: 4900 },
  studio: { name: "Studio", tokens: 10_000_000, price: 14900 },
};

export const AI_MODELS = [
  { id: "openai/gpt-4o", name: "GPT-4o", provider: "OpenAI" },
  { id: "openai/gpt-4o-mini", name: "GPT-4o Mini", provider: "OpenAI" },
  { id: "anthropic/claude-3.5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic" },
  { id: "anthropic/claude-3-haiku", name: "Claude 3 Haiku", provider: "Anthropic" },
  { id: "mistralai/mistral-large", name: "Mistral Large", provider: "Mistral" },
];

export const BETA_PERSONA_TYPES = [
  "Genre Enthusiast",
  "Casual Reader",
  "Literary Critic",
  "Young Adult",
  "Academic",
  "Book Club Member",
  "Sensitivity Reader",
];

export const CRITIQUE_PASS_TYPES = [
  { id: "structure", label: "Structure" },
  { id: "prose", label: "Prose Style" },
  { id: "character", label: "Character Depth" },
  { id: "pacing", label: "Pacing" },
  { id: "dialogue", label: "Dialogue" },
];

export const NAV_SECTIONS = [
  {
    section: "Core",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
      { label: "Manuscript", href: "/manuscript", icon: "BookOpen" },
      { label: "Workflow", href: "/workflow", icon: "GitBranch" },
    ],
  },
  {
    section: "Story",
    items: [
      { label: "Characters", href: "/characters", icon: "Users" },
      { label: "Worldbuilding", href: "/worldbuilding", icon: "Globe" },
      { label: "Research", href: "/research", icon: "Search" },
      { label: "Prompts", href: "/prompts", icon: "Wand2" },
    ],
  },
  {
    section: "Analysis",
    items: [
      { label: "Beta Reader", href: "/beta-reader", icon: "Eye" },
      { label: "Critic", href: "/critic", icon: "MessageSquare" },
      { label: "Analytics", href: "/analytics", icon: "BarChart2" },
    ],
  },
  {
    section: "Publishing",
    items: [
      { label: "Media Studio", href: "/media-studio", icon: "Image" },
      { label: "Author Suite", href: "/author-suite", icon: "Award" },
      { label: "Release Strategy", href: "/release-strategy", icon: "Rocket" },
    ],
  },
  {
    section: "Account",
    items: [
      { label: "Settings", href: "/settings", icon: "Settings" },
    ],
  },
];
