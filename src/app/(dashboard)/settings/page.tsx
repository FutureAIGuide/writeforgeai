"use client";
import React, { useState } from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { User, Zap, CreditCard, Shield, Bell, Sliders, Key, Trash2, Save, ChevronRight, CheckCircle2 } from "lucide-react";
import { SUPPORTED_MODELS } from "@/lib/constants";

const planLimits = {
  free: { tokens: 50000, projects: 1, betaPersonas: 2 },
  starter: { tokens: 200000, projects: 3, betaPersonas: 5 },
  pro: { tokens: 500000, projects: 5, betaPersonas: -1 },
  studio: { tokens: 2000000, projects: -1, betaPersonas: -1 },
};

export default function SettingsPage() {
  const [model, setModel] = useState("openai/gpt-4o-mini");
  const [temperature, setTemperature] = useState(0.7);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
  };

  const currentPlan = "free";
  const tokensUsed = 12500;
  const tokenLimit = planLimits[currentPlan as keyof typeof planLimits].tokens;

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-wf-text">Settings</h1>
        <p className="text-sm text-wf-text-muted">Manage your account, AI preferences, and billing.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="h-9">
          <TabsTrigger value="profile" className="text-xs gap-1"><User className="h-3.5 w-3.5" />Profile</TabsTrigger>
          <TabsTrigger value="ai" className="text-xs gap-1"><Zap className="h-3.5 w-3.5" />AI Config</TabsTrigger>
          <TabsTrigger value="billing" className="text-xs gap-1"><CreditCard className="h-3.5 w-3.5" />Billing</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs gap-1"><Bell className="h-3.5 w-3.5" />Notifications</TabsTrigger>
          <TabsTrigger value="security" className="text-xs gap-1"><Shield className="h-3.5 w-3.5" />Security</TabsTrigger>
          <TabsTrigger value="api" className="text-xs gap-1"><Key className="h-3.5 w-3.5" />API Keys</TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile" className="mt-4 space-y-4">
          <GlowCard className="p-5">
            <h3 className="mb-4 text-sm font-semibold text-wf-text">Profile Information</h3>
            <div className="flex items-start gap-6 mb-5">
              <div className="h-16 w-16 rounded-full bg-wf-accent/20 border-2 border-wf-accent/40 flex items-center justify-center text-2xl font-bold text-wf-accent shrink-0">A</div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-wf-text">Author Name</p>
                <p className="text-xs text-wf-text-muted">author@email.com</p>
                <Button size="sm" variant="outline" className="text-xs h-7 border-wf-border mt-2">Change Avatar</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { label: "Full Name", placeholder: "Your pen name or real name", defaultValue: "Author Name" },
                { label: "Email", placeholder: "you@example.com", defaultValue: "author@email.com" },
                { label: "Author Bio", placeholder: "A short author bio for your press kit", defaultValue: "" },
                { label: "Website", placeholder: "https://yoursite.com", defaultValue: "" },
              ].map(({ label, placeholder, defaultValue }) => (
                <div key={label}>
                  <label className="mb-1.5 block text-[11px] text-wf-text-muted">{label}</label>
                  <Input placeholder={placeholder} defaultValue={defaultValue} className="text-xs h-8" />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block text-[11px] text-wf-text-muted">Primary Genre</label>
              <Select defaultValue="ya-fantasy">
                <SelectTrigger className="h-8 text-xs max-w-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ya-fantasy">YA Fantasy</SelectItem>
                  <SelectItem value="adult-fantasy">Adult Fantasy</SelectItem>
                  <SelectItem value="sci-fi">Science Fiction</SelectItem>
                  <SelectItem value="literary">Literary Fiction</SelectItem>
                  <SelectItem value="thriller">Thriller</SelectItem>
                  <SelectItem value="romance">Romance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="mt-4 bg-wf-accent hover:bg-wf-accent-soft text-white text-xs h-8" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : <><Save className="h-3.5 w-3.5 mr-1.5" />Save Profile</>}
            </Button>
          </GlowCard>

          <GlowCard className="p-5">
            <h3 className="mb-3 text-sm font-semibold text-wf-text">Writing Preferences</h3>
            <div className="space-y-3">
              <div>
                <label className="mb-1.5 block text-[11px] text-wf-text-muted">Default AI Criticism Level</label>
                <div className="flex items-center gap-4">
                  <input type="range" min={1} max={5} defaultValue={3} className="flex-1 accent-orange-500" />
                  <span className="text-xs text-wf-text-muted w-20">Balanced</span>
                </div>
                <div className="flex justify-between text-[10px] text-wf-text-muted mt-1">
                  <span>Gentle</span><span>Tough Love</span>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] text-wf-text-muted">Daily Word Count Goal</label>
                <Input type="number" defaultValue={1000} className="text-xs h-8 w-32" />
              </div>
            </div>
          </GlowCard>
        </TabsContent>

        {/* AI Config */}
        <TabsContent value="ai" className="mt-4 space-y-4">
          <GlowCard className="p-5">
            <h3 className="mb-4 text-sm font-semibold text-wf-text flex items-center gap-2">
              <Zap className="h-4 w-4 text-wf-accent" /> AI Model Configuration
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-[11px] text-wf-text-muted">Default Model</label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_MODELS.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        <span>{m.name}</span>
                        <span className="ml-2 text-[10px] text-wf-text-muted">({m.provider})</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="mt-1 text-[10px] text-wf-text-muted">Used for general AI operations. Individual features may override this.</p>
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] text-wf-text-muted">Default Temperature ({temperature})</label>
                <input type="range" min={0} max={1} step={0.1} value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))} className="w-full accent-orange-500" />
                <div className="flex justify-between text-[10px] text-wf-text-muted mt-0.5">
                  <span>Precise (0)</span><span>Creative (1)</span>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] text-wf-text-muted">OpenRouter API Key</label>
                <div className="flex gap-2">
                  <Input type="password" placeholder="sk-or-v1-..." className="text-xs h-8 flex-1" />
                  <Button size="sm" className="text-xs h-8 bg-wf-accent hover:bg-wf-accent-soft text-white">Save Key</Button>
                </div>
                <p className="mt-1 text-[10px] text-wf-text-muted">Required to use AI features. <a href="#" className="text-wf-accent hover:underline">Get your API key →</a></p>
              </div>
            </div>
          </GlowCard>

          <GlowCard className="p-5">
            <h3 className="mb-3 text-sm font-semibold text-wf-text">Beta Reader Persona Settings</h3>
            <div className="space-y-2">
              {[
                { name: "Fantasy Enthusiast", active: true },
                { name: "Casual Reader", active: true },
                { name: "Romance Reader", active: true },
                { name: "Professional Critic", active: false },
                { name: "Famous Author Simulation", active: false },
                { name: "Literary Agent", active: false },
              ].map(({ name, active }) => (
                <div key={name} className="flex items-center justify-between rounded-lg border border-wf-border px-3 py-2">
                  <span className="text-xs text-wf-text">{name}</span>
                  <div className="flex items-center gap-2">
                    {active ? <CheckCircle2 className="h-3.5 w-3.5 text-wf-success" /> : <span className="h-3.5 w-3.5 rounded-full border border-wf-border" />}
                    <Badge variant="secondary" className={`text-[9px] ${active ? "text-wf-success" : "text-wf-text-muted"}`}>{active ? "Active" : "Inactive"}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="mt-4 space-y-4">
          <GlowCard className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-wf-text">Current Plan</h3>
                <p className="text-xs text-wf-text-muted">Manage your subscription and usage</p>
              </div>
              <Badge className="bg-wf-accent/20 text-wf-accent border-wf-accent/30 text-xs capitalize">{currentPlan}</Badge>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-wf-text-muted">Token Usage</span>
                <span className="text-wf-text">{tokensUsed.toLocaleString()} / {tokenLimit.toLocaleString()}</span>
              </div>
              <Progress value={(tokensUsed / tokenLimit) * 100} className="h-2" />
              <p className="mt-1 text-[10px] text-wf-text-muted">{Math.round((tokensUsed / tokenLimit) * 100)}% used this month — resets on the 1st</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "Free", price: "$0", current: true },
                { name: "Pro", price: "$29/mo", current: false },
                { name: "Studio", price: "$79/mo", current: false },
              ].map(({ name, price, current }) => (
                <div key={name} className={`rounded-xl border p-3 text-center ${current ? "border-wf-accent bg-wf-accent/5" : "border-wf-border"}`}>
                  <p className="text-sm font-bold text-wf-text">{name}</p>
                  <p className="text-xs text-wf-text-muted mb-2">{price}</p>
                  {current ? (
                    <Badge className="text-[9px] bg-wf-accent/20 text-wf-accent border-wf-accent/30">Current</Badge>
                  ) : (
                    <Button size="sm" className="w-full text-xs h-6 bg-wf-accent hover:bg-wf-accent-soft text-white">Upgrade</Button>
                  )}
                </div>
              ))}
            </div>
          </GlowCard>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="mt-4">
          <GlowCard className="p-5">
            <h3 className="mb-4 text-sm font-semibold text-wf-text">Notification Preferences</h3>
            <div className="space-y-3">
              {[
                { label: "Beta Read Complete", desc: "Notified when a beta reader run finishes", enabled: true },
                { label: "Critique Report Ready", desc: "When your critique analysis is done", enabled: true },
                { label: "Writing Streak Reminders", desc: "Daily reminders to keep your streak", enabled: false },
                { label: "Weekly Progress Summary", desc: "Word count and goal summary each week", enabled: true },
                { label: "New Feature Announcements", desc: "When new tools and features launch", enabled: false },
              ].map(({ label, desc, enabled }) => (
                <div key={label} className="flex items-center justify-between rounded-lg border border-wf-border px-3 py-2.5">
                  <div>
                    <p className="text-xs font-medium text-wf-text">{label}</p>
                    <p className="text-[10px] text-wf-text-muted">{desc}</p>
                  </div>
                  <div className={`h-5 w-9 rounded-full border-2 cursor-pointer transition-colors ${enabled ? "border-wf-accent bg-wf-accent" : "border-wf-border bg-transparent"}`}>
                    <div className={`h-3 w-3 rounded-full bg-white transition-transform mt-0.5 ${enabled ? "translate-x-4" : "translate-x-0.5"}`} />
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="mt-4 space-y-4">
          <GlowCard className="p-5">
            <h3 className="mb-4 text-sm font-semibold text-wf-text">Security</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-[11px] text-wf-text-muted">Change Password</label>
                <div className="grid grid-cols-1 gap-3 max-w-sm">
                  <Input type="password" placeholder="Current password" className="h-8 text-xs" />
                  <Input type="password" placeholder="New password" className="h-8 text-xs" />
                  <Input type="password" placeholder="Confirm new password" className="h-8 text-xs" />
                </div>
                <Button size="sm" className="mt-3 text-xs h-8 bg-wf-accent hover:bg-wf-accent-soft text-white">Update Password</Button>
              </div>
              <div className="border-t border-wf-border pt-4">
                <h4 className="text-xs font-semibold text-wf-text mb-2">Active Sessions</h4>
                <div className="rounded-lg border border-wf-border p-3 text-xs text-wf-text-muted">
                  <div className="flex justify-between">
                    <span>Current session (Chrome, macOS)</span>
                    <Badge className="text-[9px] text-wf-success bg-wf-success/10">Active Now</Badge>
                  </div>
                </div>
              </div>
              <div className="border-t border-wf-border pt-4">
                <h4 className="text-xs font-semibold text-wf-danger mb-2">Danger Zone</h4>
                <Button variant="outline" size="sm" className="text-xs h-8 border-wf-danger/50 text-wf-danger hover:bg-wf-danger/10">
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete Account
                </Button>
              </div>
            </div>
          </GlowCard>
        </TabsContent>

        {/* API Keys */}
        <TabsContent value="api" className="mt-4 space-y-4">
          <GlowCard className="p-5">
            <h3 className="mb-4 text-sm font-semibold text-wf-text flex items-center gap-2">
              <Key className="h-4 w-4 text-wf-accent" /> API Keys & Integrations
            </h3>
            <div className="space-y-4">
              {[
                { name: "OpenRouter API Key", placeholder: "sk-or-v1-...", desc: "Required for AI features", connected: false },
                { name: "Supabase URL", placeholder: "https://xxx.supabase.co", desc: "Database connection", connected: true },
                { name: "Stripe Publishable Key", placeholder: "pk_live_...", desc: "Payment processing", connected: false },
                { name: "Sentry DSN", placeholder: "https://xxx@sentry.io/xxx", desc: "Error monitoring", connected: false },
              ].map(({ name, placeholder, desc, connected }) => (
                <div key={name}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <label className="text-[11px] text-wf-text-muted">{name}</label>
                    {connected ? (
                      <Badge className="text-[9px] text-wf-success bg-wf-success/10">Connected</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[9px]">Not Connected</Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Input type="password" placeholder={placeholder} className="text-xs h-8 flex-1" />
                    <Button size="sm" className="text-xs h-8 bg-wf-panel-elevated border border-wf-border hover:border-wf-accent text-wf-text-muted">Save</Button>
                  </div>
                  <p className="mt-0.5 text-[10px] text-wf-text-muted">{desc}</p>
                </div>
              ))}
            </div>
          </GlowCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
