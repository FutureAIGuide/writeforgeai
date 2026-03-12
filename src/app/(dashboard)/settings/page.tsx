"use client";
import React, { useState } from "react";
import { GlowCard } from "@/components/shared/GlowCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Save, Key, Bell, CreditCard, User } from "lucide-react";

export default function SettingsPage() {
  const [name, setName] = useState("Write Forge User");
  const [email] = useState("user@writeforgeai.com");

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-wf-text">Settings</h1>
        <p className="text-sm text-wf-text-muted">Manage your account and preferences.</p>
      </div>

      <div className="max-w-2xl">
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile"><User className="mr-1.5 h-3.5 w-3.5" />Profile</TabsTrigger>
            <TabsTrigger value="api"><Key className="mr-1.5 h-3.5 w-3.5" />API Keys</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="mr-1.5 h-3.5 w-3.5" />Notifications</TabsTrigger>
            <TabsTrigger value="billing"><CreditCard className="mr-1.5 h-3.5 w-3.5" />Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-4">
            <GlowCard className="p-6">
              <div className="mb-6 flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-wf-accent text-white text-xl font-bold">WF</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                  <p className="mt-1 text-xs text-wf-text-muted">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input className="mt-1" value={email} disabled />
                </div>
                <Button><Save className="mr-2 h-4 w-4" />Save Changes</Button>
              </div>
            </GlowCard>
          </TabsContent>

          <TabsContent value="api" className="mt-4">
            <GlowCard className="p-6">
              <h3 className="mb-4 text-sm font-semibold text-wf-text">API Configuration</h3>
              <div className="space-y-4">
                <div>
                  <Label>OpenRouter API Key</Label>
                  <Input className="mt-1 font-mono" placeholder="sk-or-..." type="password" />
                  <p className="mt-1 text-xs text-wf-text-muted">Used for all AI features. Get your key at openrouter.ai</p>
                </div>
                <Separator />
                <div>
                  <Label>Supabase URL</Label>
                  <Input className="mt-1 font-mono" placeholder="https://xxx.supabase.co" />
                </div>
                <Button><Save className="mr-2 h-4 w-4" />Save API Keys</Button>
              </div>
            </GlowCard>
          </TabsContent>

          <TabsContent value="notifications" className="mt-4">
            <GlowCard className="p-6">
              <h3 className="mb-4 text-sm font-semibold text-wf-text">Notification Preferences</h3>
              <div className="space-y-3">
                {["Beta read completed", "Critique report ready", "Writing goal achieved", "Weekly summary"].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-md border border-wf-border p-3">
                    <span className="text-sm text-wf-text">{item}</span>
                    <input type="checkbox" defaultChecked className="accent-wf-accent" />
                  </div>
                ))}
              </div>
            </GlowCard>
          </TabsContent>

          <TabsContent value="billing" className="mt-4">
            <GlowCard className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-wf-text">Current Plan</h3>
                <Badge variant="secondary">Free</Badge>
              </div>
              <div className="mb-6 rounded-lg bg-wf-panel-elevated p-4">
                <p className="text-sm text-wf-text">Free Plan · 50,000 tokens/mo</p>
                <p className="mt-1 text-xs text-wf-text-muted">12,500 of 50,000 tokens used this month</p>
              </div>
              <Button className="w-full">Upgrade to Pro</Button>
            </GlowCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
