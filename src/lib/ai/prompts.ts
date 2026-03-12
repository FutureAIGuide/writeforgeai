// ─────────────────────────────────────────────────
// Write Forge AI — Prompt Templates
// All prompts return structured JSON unless noted.
// ─────────────────────────────────────────────────

export const PROMPTS = {
  // ─── Beta Reader ───────────────────────────────
  betaReader: (personaType: string, chapterContent: string, focusAreas: string[]) => `
You are simulating the experience of a real reader: ${personaType}.

Read the following chapter excerpt and respond with a detailed, authentic reader reaction.

CHAPTER CONTENT:
${chapterContent.slice(0, 8000)}

FOCUS AREAS: ${focusAreas.join(", ")}

Respond ONLY with valid JSON matching this exact schema:
{
  "engagement_score": 0.0-1.0,
  "emotional_reaction": "string — one honest sentence about how you felt",
  "favorite_moment": "string — the best moment and why",
  "confusion_points": ["array of specific moments that confused you"],
  "boring_moments": ["array of scenes where interest dropped"],
  "pacing_feedback": "string — honest pacing assessment",
  "character_engagement": { "character_name": "reaction string" },
  "plot_questions": ["questions you have after reading"],
  "would_continue": true/false,
  "would_recommend": true/false,
  "overall_feedback": "string — 2-3 sentence overall reaction",
  "sentiment_data": [{"chapter": 1, "score": 0.0-1.0, "label": "string"}]
}`,

  // ─── Famous Author Critique ─────────────────────
  famousAuthorCritique: (authorName: string, genre: string, content: string) => `
You are channeling the literary voice and perspective of ${authorName}. Write feedback as if ${authorName} were personally reading this manuscript.

Consider ${authorName}'s known preferences: craft, tone, structure, and what they've said publicly about storytelling.

MANUSCRIPT EXCERPT:
${content.slice(0, 6000)}

Respond as ${authorName} would. Be specific, insightful, and authentic to their known voice. Include:
1. What they would admire
2. What they would critique
3. A specific craft suggestion in their style
4. Their overall assessment

Return as JSON:
{
  "perspective": "${authorName}'s voice description",
  "admires": ["list of specific things they'd praise"],
  "critique": ["list of specific issues they'd raise"],
  "craft_suggestion": "detailed suggestion in their voice",
  "overall_verdict": "their assessment in their voice",
  "inspiration_quote": "a relevant quote from ${authorName} that applies here"
}`,

  // ─── Critique: Structure ───────────────────────
  critiqueStructure: (content: string) => `
You are a senior developmental editor with 20 years of experience at major publishing houses.

Analyze this manuscript excerpt for structural issues:
${content.slice(0, 10000)}

Return ONLY valid JSON:
{
  "score": 0-100,
  "summary": "2-3 sentence editorial summary",
  "issues": [
    {
      "id": "unique-id",
      "severity": "critical|major|minor|suggestion",
      "category": "Structure|Pacing|Plot|Character|Setting|Theme",
      "description": "detailed description of the issue",
      "location": "approximate location in text",
      "suggestion": "specific actionable fix"
    }
  ],
  "strengths": ["list of what works well"],
  "act_structure_notes": "assessment of three-act structure",
  "tension_arc": "assessment of tension and stakes escalation"
}`,

  // ─── Critique: Prose ───────────────────────────
  critiqueProse: (content: string) => `
You are a line editor specializing in literary fiction and commercial genre fiction.

Perform a detailed prose analysis of this text:
${content.slice(0, 10000)}

Return ONLY valid JSON:
{
  "score": 0-100,
  "summary": "overall prose assessment",
  "issues": [
    {
      "id": "unique-id",
      "severity": "critical|major|minor|suggestion",
      "category": "Prose|Voice|Dialogue|POV|Style|Grammar",
      "description": "specific issue description",
      "location": "approximate location",
      "suggestion": "concrete improvement"
    }
  ],
  "voice_consistency": "assessment",
  "dialogue_quality": "assessment",
  "show_dont_tell_ratio": "percentage and examples",
  "adverb_overuse": "count and examples",
  "passive_voice_instances": "count and examples",
  "reading_level": "grade level estimate",
  "strengths": ["list of prose strengths"]
}`,

  // ─── Character Analysis ────────────────────────
  characterAnalysis: (characterData: string, manuscriptExcerpt: string) => `
You are a character development expert and story consultant.

CHARACTER PROFILE:
${characterData}

MANUSCRIPT EXCERPTS FEATURING THIS CHARACTER:
${manuscriptExcerpt.slice(0, 6000)}

Analyze the character and return ONLY valid JSON:
{
  "consistency_score": 0-100,
  "arc_assessment": "description of character arc",
  "contradictions": ["list of any behavioral inconsistencies"],
  "voice_distinctiveness": "how distinct is their voice 1-10",
  "motivation_clarity": "how clear are their motivations",
  "growth_indicators": ["moments of character growth"],
  "suggestions": ["specific improvement suggestions"],
  "relationship_dynamics": "assessment of their relationships",
  "interview_questions": ["5 questions to flesh out backstory"]
}`,

  // ─── World Consistency Check ───────────────────
  worldConsistencyCheck: (loreData: string, manuscriptExcerpt: string) => `
You are a continuity editor specializing in speculative fiction.

WORLD LORE DATA:
${loreData.slice(0, 4000)}

MANUSCRIPT EXCERPT:
${manuscriptExcerpt.slice(0, 6000)}

Check for lore consistency and return ONLY valid JSON:
{
  "consistency_score": 0-100,
  "violations": [
    {
      "type": "factual|timeline|magic_system|geography|culture",
      "description": "what was violated",
      "location": "where in the text",
      "lore_reference": "what the lore says",
      "suggestion": "how to fix it"
    }
  ],
  "unanswered_questions": ["lore questions the manuscript raises but doesn't answer"],
  "world_strengths": ["what's working well"],
  "suggested_lore_additions": ["lore entries that would strengthen the world"]
}`,

  // ─── Pacing Analysis ──────────────────────────
  pacingAnalysis: (content: string) => `
You are a pacing specialist. Analyze the following manuscript for pacing issues.

CONTENT:
${content.slice(0, 8000)}

Return ONLY valid JSON:
{
  "overall_pacing": "fast|medium|slow|uneven",
  "pacing_score": 0-100,
  "slow_sections": [{"location": "string", "reason": "string", "fix": "string"}],
  "rushed_sections": [{"location": "string", "reason": "string", "fix": "string"}],
  "tension_points": [{"location": "string", "score": 0.0-1.0, "label": "string"}],
  "scene_by_scene": [{"scene": "string", "pacing": "fast|medium|slow", "engagement": 0.0-1.0}],
  "chapter_summary": "overall pacing assessment",
  "recommendations": ["specific pacing improvements"]
}`,

  // ─── Show Don't Tell ──────────────────────────
  showDontTell: (content: string) => `
Analyze this text for show-don't-tell violations.

TEXT:
${content.slice(0, 6000)}

Return ONLY valid JSON:
{
  "score": 0-100,
  "violations": [
    {
      "original": "the telling text",
      "issue": "what emotion/action is being told instead of shown",
      "suggested_rewrite": "a showing version"
    }
  ],
  "telling_percentage": "estimated %",
  "strong_showing_examples": ["good examples already in the text"]
}`,

  // ─── Research Assistant ────────────────────────
  researchQuery: (query: string, genre: string, novelContext: string) => `
You are an expert research assistant helping a fiction writer.

NOVEL CONTEXT: ${novelContext}
GENRE: ${genre}
RESEARCH QUERY: ${query}

Provide accurate, relevant research for a fiction writer. Focus on:
- Historical/factual accuracy
- Details that would make fiction more authentic
- Common misconceptions to avoid
- Sensory and atmospheric details useful for writing

Return ONLY valid JSON:
{
  "summary": "concise answer to the research question",
  "key_facts": ["array of important facts"],
  "story_details": ["specific details useful for writing scenes"],
  "common_misconceptions": ["things writers often get wrong"],
  "sensory_details": ["smells, sounds, textures, visuals relevant to the topic"],
  "expert_perspective": "what a real expert in this field would say",
  "citations": ["suggested real-world sources to verify"],
  "follow_up_questions": ["related questions to deepen research"]
}`,

  // ─── Marketing Copy ───────────────────────────
  generateBlurb: (title: string, genre: string, synopsis: string, targetAudience: string) => `
You are a marketing copywriter specializing in book publishing.

BOOK: ${title}
GENRE: ${genre}
SYNOPSIS: ${synopsis}
TARGET AUDIENCE: ${targetAudience}

Generate compelling marketing copy. Return ONLY valid JSON:
{
  "back_cover_blurb": "150-word compelling back cover description",
  "short_pitch": "one sentence hook (under 30 words)",
  "elevator_pitch": "3-sentence pitch for agents/publishers",
  "tagline_options": ["5 tagline options"],
  "comp_titles": ["3 comparable published titles with brief explanation"],
  "target_keywords": ["SEO and discovery keywords"],
  "amazon_categories": ["suggested Amazon categories"],
  "social_media_hook": "tweet-length hook for social media"
}`,

  // ─── Query Letter ─────────────────────────────
  generateQueryLetter: (title: string, genre: string, wordCount: number, synopsis: string, authorBio: string) => `
You are a literary agent writing a query letter on behalf of an author.

TITLE: ${title}
GENRE: ${genre}
WORD COUNT: ${wordCount}
SYNOPSIS: ${synopsis}
AUTHOR BIO: ${authorBio}

Generate a professional query letter following industry standards.

Return ONLY valid JSON:
{
  "query_letter": "full query letter text",
  "opening_hook": "the opening hook sentence",
  "personalization_tip": "how to personalize for specific agents",
  "common_mistakes": ["query letter mistakes to avoid"],
  "synopsis_one_paragraph": "one-paragraph synopsis"
}`,

  // ─── AI Workflow Magic Wand ────────────────────
  generateWorkflow: (novelDescription: string, currentStage: string, goals: string[]) => `
You are an AI writing process architect.

NOVEL: ${novelDescription}
CURRENT STAGE: ${currentStage}
GOALS: ${goals.join(", ")}

Design an optimal AI-assisted writing workflow.

Return ONLY valid JSON:
{
  "workflow_title": "string",
  "description": "string",
  "nodes": [
    {
      "id": "string",
      "node_type": "idea|research|character|outline|draft|critic|beta_reader|marketing",
      "label": "string",
      "description": "string",
      "config": {
        "model": "string",
        "temperature": 0.0-1.0,
        "prompt_hint": "string"
      },
      "position_x": 0,
      "position_y": 0
    }
  ],
  "edges": [
    {"source": "node_id", "target": "node_id", "label": "string"}
  ],
  "estimated_time": "string",
  "tips": ["string"]
}`,

  // ─── Sentiment Analysis ────────────────────────
  sentimentAnalysis: (content: string) => `
Perform a detailed emotional sentiment analysis of this creative writing.

CONTENT:
${content.slice(0, 8000)}

Return ONLY valid JSON:
{
  "overall_sentiment": "positive|negative|neutral|mixed",
  "emotional_tone": "string",
  "tension_level": 0.0-1.0,
  "hope_score": 0.0-1.0,
  "fear_score": 0.0-1.0,
  "joy_score": 0.0-1.0,
  "sadness_score": 0.0-1.0,
  "anger_score": 0.0-1.0,
  "scene_emotions": [{"scene": "string", "dominant_emotion": "string", "score": 0.0-1.0}],
  "emotional_arc": "description of emotional journey",
  "reader_impact": "predicted emotional impact on readers"
}`,
};
