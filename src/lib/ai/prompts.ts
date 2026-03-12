export const PROMPTS = {
  betaReader: (personaType: string, chapterContent: string, focusAreas: string[]) => `
You are a ${personaType} reading a novel chapter. Provide authentic feedback from your perspective.

Focus areas: ${focusAreas.join(", ")}

Chapter content:
${chapterContent}

Provide:
1. Overall reaction (2-3 sentences)
2. Engagement rating (1-10) per scene
3. Character impressions
4. Pacing notes
5. What made you keep reading or stop
6. Emotional journey (sentiment per chapter section: -1 to 1 scale)

Format as JSON with keys: feedback, engagement_score, pacing_notes, character_impressions, sentiment_data
`,

  critiqueStructure: (content: string) => `
You are a professional developmental editor. Analyze this manuscript excerpt for structural issues.

Content:
${content}

Identify issues in these categories: Act structure, Scene order, Plot holes, Tension arcs.
For each issue provide: severity (critical/major/minor/suggestion), category, description, location, suggestion.

Return JSON: { summary, score (0-100), issues: [...] }
`,

  critiqueProse: (content: string) => `
You are a professional copy editor. Analyze this text for prose quality.

Content:
${content}

Check for: Passive voice overuse, Adverb clusters, Redundancy, Weak verbs, Show vs tell.
Return JSON: { summary, score (0-100), issues: [...] }
`,

  generateScene: (context: string, instructions: string) => `
You are a skilled fiction writer. Generate a scene based on:

Context: ${context}
Instructions: ${instructions}

Write a complete, engaging scene with vivid prose. Stay in the established tone and voice.
`,

  continueWriting: (existing: string, style: string) => `
Continue this passage naturally, matching the style and voice exactly:

Existing text:
${existing}

Style notes: ${style}

Continue writing (aim for 200-400 words):
`,
};
