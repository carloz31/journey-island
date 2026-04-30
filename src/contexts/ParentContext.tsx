import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { parentProfile, ParentProfile, Child } from '@/data/parentData';

// Stored response per (parentId, childId | null, activityId, slideId)
export interface SlideResponse {
  slideId: string;
  data: any;
  storeAs?: 'output1' | 'output2' | 'context';
}

interface CompletionRecord {
  activityId: string;
  childId: string | null; // null = informational
  completedAt: string;
  responses: SlideResponse[];
}

interface ParentContextValue {
  profile: ParentProfile;
  selectedChildId: string;
  setSelectedChildId: (id: string) => void;
  selectedChild: Child;
  completions: CompletionRecord[];
  isCompleted: (activityId: string, childId: string | null) => boolean;
  markCompleted: (activityId: string, childId: string | null, responses: SlideResponse[]) => void;
  getResponses: (activityId: string, childId: string | null) => SlideResponse[];
}

const ParentContext = createContext<ParentContextValue | undefined>(undefined);

export const ParentProvider = ({ children }: { children: ReactNode }) => {
  const [selectedChildId, setSelectedChildId] = useState<string>(parentProfile.children[0].id);
  const [completions, setCompletions] = useState<CompletionRecord[]>([]);

  const selectedChild =
    parentProfile.children.find(c => c.id === selectedChildId) ?? parentProfile.children[0];

  const isCompleted = useCallback(
    (activityId: string, childId: string | null) =>
      completions.some(c => c.activityId === activityId && c.childId === childId),
    [completions]
  );

  const markCompleted = useCallback(
    (activityId: string, childId: string | null, responses: SlideResponse[]) => {
      setCompletions(prev => {
        const filtered = prev.filter(
          c => !(c.activityId === activityId && c.childId === childId)
        );
        return [
          ...filtered,
          { activityId, childId, completedAt: new Date().toISOString(), responses },
        ];
      });
    },
    []
  );

  const getResponses = useCallback(
    (activityId: string, childId: string | null) =>
      completions.find(c => c.activityId === activityId && c.childId === childId)?.responses ?? [],
    [completions]
  );

  return (
    <ParentContext.Provider
      value={{
        profile: parentProfile,
        selectedChildId,
        setSelectedChildId,
        selectedChild,
        completions,
        isCompleted,
        markCompleted,
        getResponses,
      }}
    >
      {children}
    </ParentContext.Provider>
  );
};

export const useParent = () => {
  const ctx = useContext(ParentContext);
  if (!ctx) throw new Error('useParent must be used within ParentProvider');
  return ctx;
};
