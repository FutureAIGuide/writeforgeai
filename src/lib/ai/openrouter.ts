import type { AIGenerateRequest, AIGenerateResponse } from "@/types/ai";

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

export async function generateCompletion(
  request: AIGenerateRequest
): Promise<AIGenerateResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY ?? "";

  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL ?? "https://writeforgeai.com",
      "X-Title": "Write Forge AI",
    },
    body: JSON.stringify({
      model: request.model,
      messages: request.messages,
      temperature: request.temperature ?? 0.7,
      max_tokens: request.max_tokens ?? 2048,
      stream: request.stream ?? false,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
  }

  const data = await response.json();

  return {
    id: data.id,
    content: data.choices[0]?.message?.content ?? "",
    model: data.model,
    usage: data.usage ?? { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
  };
}

export async function* streamCompletion(
  request: AIGenerateRequest
): AsyncGenerator<string> {
  const apiKey = process.env.OPENROUTER_API_KEY ?? "";

  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL ?? "https://writeforgeai.com",
      "X-Title": "Write Forge AI",
    },
    body: JSON.stringify({ ...request, stream: true }),
  });

  if (!response.ok || !response.body) {
    throw new Error(`OpenRouter stream error: ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

    for (const line of lines) {
      const data = line.slice(6);
      if (data === "[DONE]") return;
      try {
        const parsed = JSON.parse(data);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) yield content;
      } catch {
        // skip malformed chunks
      }
    }
  }
}
