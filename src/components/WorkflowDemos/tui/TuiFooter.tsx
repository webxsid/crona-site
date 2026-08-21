import { useTui } from "./tui-context";
export default function TuiFooter() {
  const { footerActionsItr, rightFooterActionsItr } = useTui();
  return (
    <g className="tui-footer">
      {
        <g>
          {Array.from(footerActionsItr()).map((a) => (
            <text className="tui-footer__action" key={a.key} x={a.x} y={a.y}>
              [{a.key}] {a.label}
            </text>
          ))}
        </g>
      }
      {
        <g>
          {Array.from(rightFooterActionsItr()).map((a) => (
            <text
              className="tui-footer__action tui-footer__action--right"
              key={a.key}
              x={a.x}
              y={a.y}
              textAnchor="end"
            >
              [{a.key}] {a.label}
            </text>
          ))}
        </g>
      }
    </g>
  );
}
