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
      { label: "Peer Review", href: "/peer-review", icon: "Users" },
      { label: "Analytics", href: "/analytics", icon: "BarChart2" },
    ],
  },
  {
    section: "Productivity",
    items: [
      { label: "My Flow", href: "/my-flow", icon: "Timer" },
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

// Alias used by Settings page
export const SUPPORTED_MODELS = AI_MODELS;

export const BETA_PERSONA_TYPES_EXTENDED = [
  { id: "genre_enthusiast", label: "Genre Enthusiast", emoji: "⚔️", desc: "Deep fan of your specific genre — knows every trope" },
  { id: "casual_reader", label: "Casual Reader", emoji: "📖", desc: "Reads for enjoyment, skips slow parts" },
  { id: "literary_critic", label: "Literary Critic", emoji: "🎓", desc: "Evaluates craft, voice, and literary merit" },
  { id: "romance_reader", label: "Romance Reader", emoji: "💫", desc: "Focused on emotional arcs and relationships" },
  { id: "ya_reader", label: "YA Reader", emoji: "⭐", desc: "Teenager who loves fast-paced, relatable protagonists" },
  { id: "professional_editor", label: "Professional Editor", emoji: "✍️", desc: "Industry professional with commercial lens" },
  { id: "book_club", label: "Book Club Member", emoji: "📚", desc: "Discussion-focused, looks for themes and questions" },
  { id: "famous_author", label: "Famous Author Simulation", emoji: "🖊️", desc: "Mimics a famous author in your genre" },
  { id: "literary_agent", label: "Literary Agent", emoji: "🏢", desc: "Commercial viability and marketability focus" },
  { id: "sensitivity_reader", label: "Sensitivity Reader", emoji: "🤝", desc: "Evaluates representation and cultural accuracy" },
];

export const LORE_CATEGORIES = [
  { id: "magic_system", label: "Magic System" },
  { id: "location", label: "Location" },
  { id: "faction", label: "Faction" },
  { id: "history", label: "History" },
  { id: "culture", label: "Culture" },
  { id: "technology", label: "Technology" },
  { id: "religion", label: "Religion / Mythology" },
  { id: "language", label: "Language" },
  { id: "creature", label: "Creatures & Beasts" },
  { id: "artifact", label: "Artifacts & Items" },
];
