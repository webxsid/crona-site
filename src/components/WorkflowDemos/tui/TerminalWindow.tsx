import { type ReactNode } from "react";
import { useTui } from "./tui-context";
export default function TerminalWindow({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  const {
    layout: { canvas },
  } = useTui();
  return (
    <g className="terminal-window" aria-label={title}>
      <rect className="workflow-demo__canvas" width={canvas.width} height={canvas.height} rx="3" />
      <rect className="workflow-demo__window-bar" width={canvas.width} height="32" />
      <rect className="workflow-demo__window-border" width={canvas.width} height={canvas.height} />
      <circle className="workflow-demo__light workflow-demo__light--red" cx="19" cy="16" r="5" />
      <circle className="workflow-demo__light workflow-demo__light--yellow" cx="33" cy="16" r="5" />
      <circle className="workflow-demo__light workflow-demo__light--green" cx="47" cy="16" r="5" />
      <text className="workflow-demo__window-title" x="68" y="20">
        {title}
      </text>
      {children}
    </g>
  );
}
