"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, BookOpen, Eye, Brain, Wand2, ArrowRight, Star, CheckCircle2, GitBranch, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  { icon: Eye, label: "AI Beta Reader Engine", description: "Simulate target audience readers who react emotionally, detect pacing issues, and uncover plot holes before publication.", accent: true },
  { icon: Brain, label: "Critic Engine", description: "Multi-pass professional editing: developmental, line, voice, plot logic, and commercial viability — powered by advanced AI." },
  { icon: BookOpen, label: "Manuscript Workspace", description: "Cinematic writing environment with pacing detection, show-don't-tell analysis, chapter navigation, and real-time health scoring." },
  { icon: GitBranch, label: "Workflow Builder", description: "Design custom AI pipelines — from idea to published draft — with a visual drag-and-drop workflow canvas." },
  { icon: Users, label: "Character Studio", description: "Build deep characters with arc tracking, relationship maps, voice profiling, and an interactive Story Codex knowledge graph." },
  { icon: Globe, label: "Worldbuilding System", description: "Construct entire fictional universes with locations, lore, timelines, magic systems, cultures, and an auto-compiled world bible." },
];

const personas = [
  { name: "Fantasy Enthusiast", emoji: "⚔️", note: "The worldbuilding is exceptional. The magic system feels entirely fresh." },
  { name: "Casual Reader", emoji: "📖", note: "I found myself rooting for Elara from page one. The tension is real." },
  { name: "Professional Critic", emoji: "🎓", note: "Second act sags in chapters 9–12. Introduce a ticking clock to maintain momentum." },
  { name: "Romance Reader", emoji: "💫", note: "The slow-burn between Elara and Kayn is the highlight. I need book two." },
];

const plans = [
  { name: "Free", price: "$0", features: ["1 Project", "50K tokens/mo", "Beta Reader (2 personas)", "Manuscript Editor"], cta: "Get Started" },
  { name: "Pro", price: "$29", features: ["5 Projects", "500K tokens/mo", "Beta Reader (unlimited)", "Critic Engine", "Workflow Builder", "Priority Support"], cta: "Start Free Trial", highlighted: true },
  { name: "Studio", price: "$79", features: ["Unlimited Projects", "2M tokens/mo", "All Pro features", "Team Collaboration", "Custom AI Personas", "White-glove Onboarding"], cta: "Contact Sales" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-wf-bg text-wf-text overflow-x-hidden">
      <nav className="fixed top-0 z-50 w-full border-b border-wf-border bg-wf-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-wf-accent shadow-[0_0_16px_rgba(255,106,0,0.5)]">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold">Write Forge AI</span>
          </div>
          <div className="hidden items-center gap-6 md:flex text-sm text-wf-text-muted">
            <a href="#features" className="hover:text-wf-text transition-colors">Features</a>
            <a href="#beta-reader" className="hover:text-wf-text transition-colors">Beta Reader</a>
            <a href="#pricing" className="hover:text-wf-text transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-wf-text-muted hover:text-wf-text">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="bg-wf-accent hover:bg-wf-accent-soft text-white shadow-[0_0_12px_rgba(255,106,0,0.4)]">Start Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-14">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,106,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,106,0,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-wf-accent/5 blur-[120px]" />
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <Badge className="mb-6 inline-flex items-center gap-1.5 border border-wf-accent/30 bg-wf-accent/10 text-wf-accent px-3 py-1 text-xs">
            <Star className="h-3 w-3" /> Now in Early Access — Join 2,400+ Authors
          </Badge>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            The AI Operating System<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-wf-accent to-wf-accent-soft">for Serious Writers</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-wf-text-muted leading-relaxed">
            Write Forge AI is a complete creative environment where novelists plan, write, analyze, and test their manuscripts — powered by the most advanced AI Beta Reader Engine available.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 bg-wf-accent hover:bg-wf-accent-soft text-white px-8 shadow-[0_0_24px_rgba(255,106,0,0.4)]">
                Start Writing Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#beta-reader">
              <Button size="lg" variant="outline" className="gap-2 border-wf-border text-wf-text-muted hover:border-wf-accent hover:text-wf-accent px-8">
                <Eye className="h-4 w-4" /> See Beta Reader Demo
              </Button>
            </a>
          </div>
          <p className="mt-4 text-xs text-wf-text-muted">No credit card required · Free tier includes 50K AI tokens</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 60, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, delay: 0.3 }} className="relative z-10 mx-auto mt-20 w-full max-w-6xl px-6">
          <div className="overflow-hidden rounded-2xl border border-wf-border bg-wf-panel shadow-[0_40px_80px_rgba(0,0,0,0.8)] ring-1 ring-wf-accent/10">
            <div className="flex h-10 items-center gap-2 border-b border-wf-border bg-wf-panel-elevated px-4">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
              <div className="ml-4 flex gap-4 text-[11px] text-wf-text-muted">
                <span>Dashboard</span><span>My Novel</span>
                <span className="border-b border-wf-accent text-wf-accent">Manuscript</span>
                <span>Beta Reader</span>
              </div>
            </div>
            <div className="flex h-80 overflow-hidden">
              <div className="w-48 shrink-0 border-r border-wf-border bg-wf-panel p-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-wf-text-muted">Chapter Navigator</p>
                {["Ch 1: The Ember Gate", "Ch 2: Ashenveil", "Ch 3: The Binding", "Ch 4: Council", "Ch 5: The Shift"].map((ch, i) => (
                  <div key={ch} className={`mb-1 flex items-center gap-2 rounded px-2 py-1.5 text-xs ${i === 0 ? "bg-wf-accent/15 text-wf-accent" : "text-wf-text-muted"}`}>
                    <div className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-wf-accent" : "bg-wf-border"}`} />{ch}
                  </div>
                ))}
              </div>
              <div className="flex-1 overflow-hidden p-6 font-mono text-sm text-wf-text/80 leading-relaxed">
                <h3 className="mb-3 text-base font-bold text-wf-text">Chapter 1: The Ember Gate</h3>
                <p className="mb-2">The city of Ashenveil had not seen rain in forty days, and Elara Voss counted every one of them.</p>
                <p className="mb-2 rounded bg-wf-warning/10 border-l-2 border-wf-warning px-2 text-[12px]">⚡ Pacing Detection: Scene dragging in Para 3 — consider trimming or adding tension</p>
                <p className="mb-2">She stood at the edge of the crumbling aqueduct, the desert wind pulling strands of copper hair across her face.</p>
                <p className="text-wf-text-muted">Below, in the lower city, the mage-fires still burned — orange and stubborn, like embers that refused to die.</p>
              </div>
              <div className="w-56 shrink-0 border-l border-wf-border bg-wf-panel-elevated p-3 text-[11px]">
                <p className="font-semibold text-wf-text mb-1">Inspector Panel</p>
                <p className="text-wf-text-muted text-[10px] mb-3">Real-time manuscript analysis</p>
                <div className="space-y-2">
                  {[{ label: "Pacing", value: "Slow in Para 3", color: "text-wf-warning" }, { label: "Show-Don't-Tell", value: "Dialogue expository", color: "text-blue-400" }, { label: "Health Score", value: "78/100", color: "text-wf-success" }].map(({ label, value, color }) => (
                    <div key={label} className="rounded-md bg-wf-panel p-2">
                      <p className="text-wf-text-muted">{label}</p>
                      <p className={`font-medium ${color}`}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-32">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Everything a novelist needs</h2>
          <p className="mt-4 text-wf-text-muted">From first idea to final draft — the complete creative toolkit.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, label, description, accent }) => (
            <motion.div key={label} whileHover={{ scale: 1.02 }} className={`rounded-2xl border p-6 transition-all ${accent ? "border-wf-accent/40 bg-wf-accent/5 shadow-[0_0_24px_rgba(255,106,0,0.1)]" : "border-wf-border bg-wf-panel hover:border-wf-accent/40"}`}>
              <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${accent ? "bg-wf-accent text-white shadow-[0_0_16px_rgba(255,106,0,0.4)]" : "bg-wf-panel-elevated text-wf-accent"}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-sm font-semibold text-wf-text">{label}{accent && <Badge className="ml-2 text-[10px] bg-wf-accent/20 text-wf-accent border-wf-accent/30">Core Feature</Badge>}</h3>
              <p className="text-xs text-wf-text-muted leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="beta-reader" className="relative py-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-wf-accent/3 to-transparent" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <Badge className="mb-4 border-wf-accent/30 bg-wf-accent/10 text-wf-accent">AI Beta Reader Engine</Badge>
            <h2 className="text-3xl font-bold md:text-4xl">Your manuscript. Tested by AI readers.</h2>
            <p className="mt-4 max-w-2xl mx-auto text-wf-text-muted">Run your chapters through simulated reader personas — each with unique tastes, emotional reactions, and genre expectations.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {personas.map(({ name, emoji, note }) => (
              <motion.div key={name} whileHover={{ y: -4 }} className="rounded-2xl border border-wf-border bg-wf-panel p-5 hover:border-wf-accent/40 hover:shadow-[0_0_20px_rgba(255,106,0,0.1)] transition-all">
                <div className="mb-3 text-2xl">{emoji}</div>
                <h3 className="mb-2 text-sm font-semibold text-wf-text">{name}</h3>
                <p className="text-xs text-wf-text-muted leading-relaxed italic">&ldquo;{note}&rdquo;</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 bg-wf-accent hover:bg-wf-accent-soft text-white px-8 shadow-[0_0_24px_rgba(255,106,0,0.4)]">
                Try Beta Reader Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-32">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Simple, writer-friendly pricing</h2>
          <p className="mt-4 text-wf-text-muted">No hidden fees. Cancel anytime.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {plans.map(({ name, price, features: planFeatures, cta, highlighted }) => (
            <div key={name} className={`rounded-2xl border p-7 ${highlighted ? "border-wf-accent bg-wf-accent/5 shadow-[0_0_40px_rgba(255,106,0,0.15)] ring-1 ring-wf-accent/20" : "border-wf-border bg-wf-panel"}`}>
              {highlighted && <Badge className="mb-4 text-[10px] bg-wf-accent/20 text-wf-accent border-wf-accent/30">Most Popular</Badge>}
              <h3 className="text-lg font-bold text-wf-text">{name}</h3>
              <div className="my-3 flex items-end gap-1">
                <span className="text-4xl font-bold text-wf-text">{price}</span>
                {price !== "$0" && <span className="mb-1 text-sm text-wf-text-muted">/month</span>}
              </div>
              <ul className="mb-6 space-y-2">
                {planFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-wf-text-muted">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-wf-success" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard">
                <Button className={`w-full ${highlighted ? "bg-wf-accent hover:bg-wf-accent-soft text-white" : "border-wf-border bg-transparent text-wf-text"}`} variant={highlighted ? "default" : "outline"}>{cta}</Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-wf-accent/8 blur-[100px]" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl mb-4">Your story deserves AI-grade feedback</h2>
          <p className="text-wf-text-muted mb-8">Join thousands of authors who use Write Forge AI to write better, faster, and with more confidence.</p>
          <Link href="/dashboard">
            <Button size="lg" className="gap-2 bg-wf-accent hover:bg-wf-accent-soft text-white px-10 py-6 text-base shadow-[0_0_32px_rgba(255,106,0,0.5)]">
              <Wand2 className="h-5 w-5" /> Start Writing — It&apos;s Free
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-wf-border py-10 text-center text-xs text-wf-text-muted">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-wf-accent"><Zap className="h-3.5 w-3.5 text-white" /></div>
          <span className="font-semibold text-wf-text">Write Forge AI</span>
        </div>
        <p>© {new Date().getFullYear()} Write Forge AI. Built for storytellers.</p>
      </footer>
    </div>
  );
}
