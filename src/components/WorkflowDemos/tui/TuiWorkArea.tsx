import { type ReactNode } from "react";
export default function TuiWorkArea({ children }: { children?: ReactNode }) {
  return (
    <g className="tui-work-area" aria-label="Crona work area">
      {children}
    </g>
  );
}
