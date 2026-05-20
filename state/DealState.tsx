import React, { createContext, useContext, useState } from 'react';

// Minimal state machine for the SoFi deal flow.
// Tracks whether the user has visited the SoFi website for each step. The
// secondary CTA ("I've finished signing up" / "I deposited $10") only appears
// AFTER the primary CTA fires once (which simulates returning from SoFi).
export type DealState = {
  step1VisitedSoFi: boolean;
  step2VisitedSoFi: boolean;
  markStep1Visited: () => void;
  markStep2Visited: () => void;
  reset: () => void;
};

const DealStateContext = createContext<DealState | null>(null);

export function DealStateProvider({ children }: { children: React.ReactNode }) {
  const [step1VisitedSoFi, setStep1] = useState(false);
  const [step2VisitedSoFi, setStep2] = useState(false);

  const value: DealState = {
    step1VisitedSoFi,
    step2VisitedSoFi,
    markStep1Visited: () => setStep1(true),
    markStep2Visited: () => setStep2(true),
    reset: () => { setStep1(false); setStep2(false); },
  };

  return (
    <DealStateContext.Provider value={value}>
      {children}
    </DealStateContext.Provider>
  );
}

export function useDealState(): DealState {
  const ctx = useContext(DealStateContext);
  if (!ctx) throw new Error('useDealState must be used within a DealStateProvider');
  return ctx;
}
