import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export interface TuiFooterAction {
  key: string;
  label: string;
}

export interface TuiPaneDefinition {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  focusable?: boolean;
}

const defaultActions = [
  { key: "v", label: "switch views" },
  { key: "?", label: "keys" },
  { key: "c", label: "change context" },
];
const rightActions = [
  { key: "K", label: "stop daemon" },
  { key: "ctrl+c", label: "quit" },
];

export const tuiLayout = {
  canvas: { width: 960, height: 540 },
  shell: {
    sidebar: { x: 10, y: 70, width: 160, height: 432 },
    header: { x: 0, y: 32, width: 960, height: 32 },
    workArea: { x: 174, y: 70, width: 780, height: 432 },
    footer: { x: 0, y: 515, width: 960, height: 25 },
  },
  nav: {
    x: 20,
    titleY: 87,
    firstHintY: 100,
    secondHintY: 110,
    startY: 135,
    textLineHeight: 13,
    groupGap: 19,
  },
  header: { y: 52, brandX: 10, repoX: 80, streamX: 180, versionX: 950 },
  footer: { x: 10, y: 522, rightMostX: 950, minActionStep: 60 },
} as const;

interface TuiContextValue {
  layout: typeof tuiLayout;
  activeView: string;
  setActiveView: (viewId: string) => void;
  getActivePane: (viewId: string) => string | undefined;
  setActivePane: (viewId: string, paneId: string) => void;
  registerView: (viewId: string, panes: TuiPaneDefinition[]) => void;
  unregisterView: (viewId: string) => void;
  getViewPanes: (viewId: string) => TuiPaneDefinition[];
  footerActionsItr: () => Generator<TuiFooterAction & { x: number; y: number }>;
  rightFooterActionsItr: () => Generator<TuiFooterAction & { x: number; y: number }>;
  setFooterActions: (actions: TuiFooterAction[]) => void;
}
const TuiContext = createContext<TuiContextValue | null>(null);

export function TuiProvider({ children }: { children: ReactNode }) {
  const [activeView, setActiveView] = useState("Daily");
  const [activePanes, setActivePanes] = useState<Record<string, string>>({
    Daily: "issues",
    Issues: "active-issues",
  });
  const [viewPanes, setViewPanes] = useState<Record<string, TuiPaneDefinition[]>>({});
  const [footerActions, setFooterActionsState] = useState(defaultActions);
  const setFooterActions = useCallback(
    (actions: TuiFooterAction[]) => setFooterActionsState(actions),
    [],
  );
  const registerView = useCallback((viewId: string, panes: TuiPaneDefinition[]) => {
    setViewPanes((current) => ({ ...current, [viewId]: panes }));
  }, []);
  const unregisterView = useCallback((viewId: string) => {
    setViewPanes((current) => {
      const next = { ...current };
      delete next[viewId];
      return next;
    });
  }, []);
  const getViewPanes = useCallback((viewId: string) => viewPanes[viewId] ?? [], [viewPanes]);
  const getActivePane = useCallback((viewId: string) => activePanes[viewId], [activePanes]);
  const setActivePane = useCallback(
    (viewId: string, paneId: string) =>
      setActivePanes((current) => ({ ...current, [viewId]: paneId })),
    [],
  );

  const footerActionsItr = useCallback(
    function* () {
      let x = tuiLayout.footer.x;
      for (const action of footerActions) {
        yield { ...action, x, y: tuiLayout.footer.y };
        x += Math.max(
          tuiLayout.footer.minActionStep,
          (action.label.length + action.key.length + 3) * 7,
        );
      }
    },
    [footerActions],
  );

  const rightFooterActionsItr = useCallback(function* () {
    let x = tuiLayout.footer.rightMostX;
    for (const action of rightActions) {
      yield { ...action, x, y: tuiLayout.footer.y };
      x -= Math.max(
        tuiLayout.footer.minActionStep,
        (action.label.length + action.key.length + 3) * 7,
      );
    }
  }, []);

  const value = useMemo(
    () => ({
      layout: tuiLayout,
      activeView,
      setActiveView,
      getActivePane,
      setActivePane,
      registerView,
      unregisterView,
      getViewPanes,
      footerActionsItr: footerActionsItr,
      rightFooterActionsItr: rightFooterActionsItr,
      setFooterActions,
    }),
    [
      activeView,
      activePanes,
      footerActionsItr,
      getActivePane,
      getViewPanes,
      registerView,
      rightFooterActionsItr,
      setActiveView,
      setActivePane,
      setFooterActions,
      unregisterView,
    ],
  );
  return <TuiContext.Provider value={value}>{children}</TuiContext.Provider>;
}

export function useTui() {
  const context = useContext(TuiContext);
  if (!context) throw new Error("useTui must be used within TuiProvider");
  return context;
}
