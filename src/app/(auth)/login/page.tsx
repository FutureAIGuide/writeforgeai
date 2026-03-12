"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlowCard } from "@/components/shared/GlowCard";
import { Zap, Github, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-wf-bg p-4">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-wf-accent/5 blur-3xl" />
      </div>

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-wf-accent shadow-[0_0_24px_rgba(255,106,0,0.4)]">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-wf-text">Write Forge AI</h1>
          <p className="mt-1 text-sm text-wf-text-muted">Your AI-powered writing co-pilot</p>
        </div>

        <GlowCard className="p-6">
          <h2 className="mb-1 text-lg font-semibold text-wf-text">Sign in</h2>
          <p className="mb-5 text-sm text-wf-text-muted">Enter your email for a magic link</p>

          <form onSubmit={handleMagicLink} className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              <Mail className="mr-2 h-4 w-4" />
              {isLoading ? "Sending…" : "Send Magic Link"}
            </Button>
          </form>

          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-wf-border" />
            <span className="text-xs text-wf-text-muted">or continue with</span>
            <div className="h-px flex-1 bg-wf-border" />
          </div>

          <Button variant="outline" className="w-full">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </GlowCard>

        <p className="mt-4 text-center text-xs text-wf-text-muted">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
