import { demoToday, issuesDueForDate, sessions, type DemoContext } from "../../../../data/crona-demo";
import { useTui } from "../tui-context";
import { issueStatusColor } from "../issue-status";
const duration = (issueId: number) =>
  Math.round(
    sessions
      .filter((session) => session.issueId === issueId)
      .reduce((total, session) => total + (session.durationSeconds ?? 0), 0) / 60,
  );

export default function IssuesPane({
  repo,
  stream,
  viewId = "Daily",
  dueDateOverrides = {},
  selectedIssueId,
  context,
}: {
  repo: string;
  stream: string;
  viewId?: string;
  dueDateOverrides?: Record<number, string>;
  selectedIssueId?: number;
  context?: DemoContext;
}) {
  const { getActivePane } = useTui();
  const isActive = getActivePane(viewId) === "issues";
  const dailyIssues = issuesDueForDate(demoToday, context, dueDateOverrides);
  return (
    <g className="tui-issues-pane">
      <text className="tui-issues__title" x="190" y="296">
        Tasks [1]
      </text>
      <text className="tui-issues__muted" x="190" y="310">
        Scope: {repo === "-" && stream === "-" ? "All contexts" : `${repo} / ${stream}`}
      </text>
      {isActive && (
        <text className="tui-issues__muted" x="190" y="324">
          [a] add [f] focus [m] log [e] edit
        </text>
      )}
      {dailyIssues.map((issue, index) => {
        const y = (isActive ? 354 : 324) + index * 42;
        const dueDate = dueDateOverrides[issue.id] ?? issue.todoForDate;
        return (
          <g key={issue.id}>
            <text className="tui-issues__issue" x="190" y={y} fill={issueStatusColor(issue.status)}>
              {issue.id === selectedIssueId || (!selectedIssueId && index === 0) ? "▶" : " "}{" "}
              {issue.title}{" "}
              {dueDate && <tspan className="tui-issues__issue-meta">[on {dueDate}]</tspan>}
            </text>
            <text className="tui-issues__detail" x="202" y={y + 15}>
              Work &gt; {issue.streamName} | {duration(issue.id)}m / {issue.estimateMinutes ?? 0}m |{" "}
              {issue.status}
            </text>
            {index < dailyIssues.length - 1 && (
              <line className="tui-issues__divider" x1="190" y1={y + 27} x2="619" y2={y + 27} />
            )}
          </g>
        );
      })}
    </g>
  );
}
