"use client";
import { useState, useEffect } from "react";

interface SubscriptionState {
  plan: string;
  tokensUsed: number;
  tokenLimit: number;
  isLoading: boolean;
}

export function useSubscription(): SubscriptionState {
  const [state, setState] = useState<SubscriptionState>({
    plan: "free",
    tokensUsed: 12500,
    tokenLimit: 50000,
    isLoading: false,
  });

  useEffect(() => {
    // In production, fetch from /api/subscription
    setState((prev) => ({ ...prev, isLoading: false }));
  }, []);

  return state;
}
