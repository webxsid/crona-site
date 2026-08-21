import { type ReactNode } from "react";
import TerminalWindow from "./TerminalWindow";
import { useTui } from "./tui-context";
export default function TuiShell({ title, children }: { title: string; children?: ReactNode }) {
  const {
    layout: { shell },
  } = useTui();
  return (
    <g className="tui-shell">
      <TerminalWindow title={title}>
        <rect
          className="tui-shell__sidebar-frame"
          x={shell.sidebar.x}
          y={shell.sidebar.y}
          width={shell.sidebar.width}
          height={shell.sidebar.height}
        />
        <rect
          className="tui-shell__header-frame"
          x={shell.header.x}
          y={shell.header.y}
          width={shell.header.width}
          height={shell.header.height}
        />
        <rect
          className="tui-shell__work-frame"
          x={shell.workArea.x}
          y={shell.workArea.y}
          width={shell.workArea.width}
          height={shell.workArea.height}
        />
        {children}
      </TerminalWindow>
    </g>
  );
}
