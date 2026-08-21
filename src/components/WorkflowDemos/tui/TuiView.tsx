import { useEffect, type ReactNode } from "react";
import { useTui, type TuiPaneDefinition } from "./tui-context";

interface Props {
  viewId: string;
  panes: TuiPaneDefinition[];
  paneContent?: Record<string, ReactNode>;
}

export default function TuiView({ viewId, panes, paneContent = {} }: Props) {
  const { activeView, registerView, unregisterView, getViewPanes, getActivePane, setActivePane } =
    useTui();

  useEffect(() => {
    registerView(viewId, panes);
    return () => unregisterView(viewId);
  }, [panes, registerView, unregisterView, viewId]);

  if (activeView !== viewId) return null;

  const activePanes = getViewPanes(viewId);
  return (
    <g className="tui-view" aria-label={`${viewId} view`}>
      {activePanes.map((pane) => (
        <g
          key={pane.id}
          className={`tui-view__pane${getActivePane(viewId) === pane.id ? " is-active" : ""}`}
          aria-label={pane.label ?? pane.id}
          onClick={() => pane.focusable !== false && setActivePane(viewId, pane.id)}
        >
          <rect
            className="tui-view__pane-frame"
            x={pane.x}
            y={pane.y}
            width={pane.width}
            height={pane.height}
          />
          {paneContent[pane.id]}
        </g>
      ))}
    </g>
  );
}
