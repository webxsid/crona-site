import { activeDemoContext, demoToday, issueMatchesContext, issues, sessions } from "../../../../data/crona-demo";
import { useTui, type TuiPaneDefinition } from "../tui-context";
import TuiView from "../TuiView";
import { issueStatusColor } from "../issue-status";

const issuePanes: TuiPaneDefinition[] = [
  { id: "open", x: 174, y: 70, width: 386, height: 58, label: "Open", focusable: false },
  { id: "closed", x: 568, y: 70, width: 386, height: 58, label: "Closed", focusable: false },
  { id: "due", x: 174, y: 136, width: 386, height: 58, label: "Due", focusable: false },
  { id: "estimate", x: 568, y: 136, width: 386, height: 58, label: "Estimate", focusable: false },
  { id: "active-issues", x: 174, y: 202, width: 780, height: 180, label: "Active Issues" },
  { id: "completed-issues", x: 174, y: 390, width: 780, height: 112, label: "Completed Issues" },
];

const scopedIssues = issues.filter((issue) => issueMatchesContext(issue, activeDemoContext));
const activeIssues = scopedIssues.filter((issue) => !["done", "abandoned"].includes(issue.status));
const completedIssues = scopedIssues.filter((issue) => ["done", "abandoned"].includes(issue.status));
const minutesWorked = (issueId: number) =>
  Math.round(
    sessions
      .filter((session) => session.issueId === issueId)
      .reduce((total, session) => total + (session.durationSeconds ?? 0), 0) / 60,
  );
const truncate = (value: string, length: number) =>
  value.length > length ? `${value.slice(0, length - 1)}…` : value;

const issueColumns = {
  issue: 204,
  status: 570,
  estimate: 666,
  worked: 720,
  repo: 790,
  stream: 875,
};
function SummaryCard({
  label,
  value,
  hint,
  x,
  y,
  color,
}: {
  label: string;
  value: string;
  hint: string;
  x: number;
  y: number;
  color: string;
}) {
  return (
    <g>
      <rect className="tui-issues-view__card" x={x} y={y} width="386" height="58" stroke={color} />
      <text className="tui-issues-view__card-label" x={x + 10} y={y + 17}>
        {label}
      </text>
      <text className="tui-issues-view__card-value" x={x + 10} y={y + 33} fill={color}>
        {value}
      </text>
      <text className="tui-issues-view__card-hint" x={x + 10} y={y + 49}>
        {hint}
      </text>
    </g>
  );
}

function IssueList({
  completed,
  selectedIssueId,
}: {
  completed: boolean;
  selectedIssueId?: number;
}) {
  const { getActivePane } = useTui();
  const activePane = getActivePane("Issues");
  const list = completed ? completedIssues : activeIssues;
  const isActive = activePane === (completed ? "completed-issues" : "active-issues");
  const title = completed ? "Completed Issues [2]" : "Active Issues [1]";
  const subtitle = completed ? "Done and abandoned, ready to revisit" : "Due work and open issues";
  const y = completed ? 406 : 218;
  return (
    <g className="tui-issues-view__list">
      <text className="tui-issues-view__title" x="184" y={y}>
        {title}
      </text>
      <text className="tui-issues-view__scope" x="184" y={y + 14}>
        Scope: All
      </text>
      <text className="tui-issues-view__hint" x="184" y={y + 29}>
        {subtitle}
      </text>
      {isActive && !completed && (
        <g className="tui-issues-view__actions">
          <text x="184" y={y + 44}>
            [enter] open issue details [s] set status [d] set due date [P] pin [f] start focus
          </text>
          <text x="184" y={y + 56}>
            [m] log work [e/D] edit/delete
          </text>
        </g>
      )}
      <g
        className="tui-issues-view__columns"
        transform={`translate(0 ${y + (isActive && !completed ? 70 : 44)})`}
      >
        <text x={issueColumns.issue}>Issue</text>
        <text x={issueColumns.status}>Status</text>
        <text x={issueColumns.estimate}>Est.</text>
        <text x={issueColumns.worked}>Worked</text>
        <text x={issueColumns.repo}>Repo</text>
        <text x={issueColumns.stream}>Stream</text>
      </g>
      {list.slice(0, completed ? 4 : 4).map((issue, index) => {
        const rowY = y + (isActive && !completed ? 86 : 60) + index * 14;
        const status = issue.status;
        const isSelected =
          isActive && (selectedIssueId ? issue.id === selectedIssueId : index === 0);
        const due = issue.todoForDate ? ` [on ${issue.todoForDate}]` : "";
        return (
          <g key={issue.id}>
            <text
              className="tui-issues-view__row"
              x="184"
              y={rowY}
              style={{ fill: issueStatusColor(issue.status) }}
            >
              {isSelected ? "▶ " : "  "}
              {truncate(`${issue.title}${due}`, 66)}
              <tspan x={issueColumns.status}>{status}</tspan>
              <tspan x={issueColumns.estimate}>
                {issue.estimateMinutes
                  ? `${Math.floor(issue.estimateMinutes / 60) || issue.estimateMinutes}h`
                  : "-"}
              </tspan>
              <tspan x={issueColumns.worked}>{minutesWorked(issue.id)}m</tspan>
              <tspan x={issueColumns.repo}>{truncate(issue.repoName ?? "-", 12)}</tspan>
              <tspan x={issueColumns.stream}>{truncate(issue.streamName ?? "-", 12)}</tspan>
            </text>
          </g>
        );
      })}
      {completed && (
        <text className="tui-issues-view__ellipsis" x="184" y="492">
          ...
        </text>
      )}
    </g>
  );
}

export default function IssuesView({
  selectedIssueId = activeIssues[0]?.id,
}: {
  selectedIssueId?: number;
}) {
  const open = issues.filter((issue) => !["done", "abandoned"].includes(issue.status));
  const closed = issues.filter((issue) => ["done", "abandoned"].includes(issue.status));
  const todayDue = open.filter((issue) => issue.todoForDate === demoToday).length;
  const overdue = open.filter((issue) => issue.todoForDate && issue.todoForDate < demoToday).length;
  const estimated = open.reduce((total, issue) => total + (issue.estimateMinutes ?? 0), 0);
  return (
    <TuiView
      viewId="Issues"
      panes={issuePanes}
      paneContent={{
        open: (
          <SummaryCard
            label="Open"
            value={`open ${open.length}  in progress ${open.filter((i) => i.status === "in_progress").length}  blocked 0`}
            hint="active workload"
            x={174}
            y={70}
            color="var(--color-warning)"
          />
        ),
        closed: (
          <SummaryCard
            label="Closed"
        value={`done ${closed.filter((i) => i.status === "done").length}  abandoned ${closed.filter((i) => i.status === "abandoned").length}`}
            hint="done + abandoned"
            x={568}
            y={70}
            color="var(--demo-accent)"
          />
        ),
        due: (
          <SummaryCard
            label="Due"
            value={`today ${todayDue}  overdue ${overdue}`}
            hint="today vs overdue"
            x={174}
            y={136}
            color="var(--color-success)"
          />
        ),
        estimate: (
          <SummaryCard
            label="Estimate"
            value={`estimated ${Math.floor(estimated / 60)}h  scoped ${open.length}`}
            hint="current issue load"
            x={568}
            y={136}
            color="#c49bea"
          />
        ),
        "active-issues": <IssueList completed={false} selectedIssueId={selectedIssueId} />,
        "completed-issues": <IssueList completed selectedIssueId={selectedIssueId} />,
      }}
    />
  );
}
