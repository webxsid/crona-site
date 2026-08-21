import { useTui } from "./tui-context";
export default function TuiHeader({
  repo,
  stream,
  version,
}: {
  repo: string;
  stream: string;
  environment?: string;
  version: string;
}) {
  const {
    layout: { header },
  } = useTui();
  return (
    <g className="tui-header">
      <text className="tui-header__brand" x={header.brandX} y={header.y}>
        [ CRONA ]
      </text>
      <text className="tui-header__context" x={header.repoX} y={header.y}>
        repo: <tspan>{repo}</tspan>
      </text>
      <text className="tui-header__context" x={header.streamX} y={header.y}>
        stream: <tspan>{stream}</tspan>
      </text>
      <text className="tui-header__version" x={header.versionX} y={header.y} textAnchor="end">
        version: <tspan>{version}</tspan>
      </text>
    </g>
  );
}
