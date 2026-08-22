import TerminalWindow from "../../TerminalWindow";
import TuiFooter from "../../TuiFooter";
import TuiHeader from "../../TuiHeader";
import TuiNav from "../../TuiNav";
import TuiShell from "../../TuiShell";
import TuiView from "../../TuiView";
import TuiWorkArea from "../../TuiWorkArea";
import DailySummaryPane from "../../panes/DailySummaryPane";
import IssuesPane from "../../panes/IssuesPane";
import HabitsPane from "../../panes/HabitsPane";
import ViewSwitcherDialog from "../../components/ViewSwitcherDialog";
import IssuesView from "../../views/IssuesView";
import DatePickerDialog from "../../components/DatePickerDialog";
import TimerStartTypeDialog from "../../components/TimerStartTypeDialog";
import PomodoroStartDialog from "../../components/PomodoroStartDialog";
import { useTui } from "../../tui-context";
import { useEffect } from "react";
import { demoToday, activeDemoContext } from "../../../../../data/crona-demo";

const groups = [
  { label: "Dashboard", items: ["Summary", "Daily", "Rollup", "Momentum", "Wellbeing"] },
  { label: "Workspace", items: ["Issues", "Meta", "Ops"] },
  { label: "Export", items: ["Reports", "Config"] },
  { label: "System", items: ["Settings", "Alerts", "Updates", "Support"] },
  { label: "Session", items: ["History", "Habit History"] },
];

const dailyPanes = [
  { id: "summary", x: 174, y: 70, width: 780, height: 194, label: "Daily summary" },
  { id: "issues", x: 174, y: 276, width: 461, height: 226, label: "Issues" },
  { id: "habits", x: 647, y: 276, width: 307, height: 226, label: "Habits" },
];
const activeContext = activeDemoContext;

export default function OpenCronaScene({
  scene,
  command = "",
  showKeyHint = false,
  dueDates = {},
}: {
  scene: string;
  command?: string;
  showKeyHint?: boolean;
  dueDates?: Record<number, string>;
}) {
  const { setActivePane, setActiveView } = useTui();
  useEffect(() => {
    setActiveView(
      ["issues", "issue-next-1", "issue-next-2", "issue-due-action", "due-date"].includes(scene)
        ? "Issues"
        : "Daily",
    );
    if (
      ["issues", "issue-next-1", "issue-next-2", "issue-due-action", "due-date"].includes(scene)
    ) {
      setActivePane("Issues", "active-issues");
    }
  }, [scene, setActivePane, setActiveView]);

  return (
    <svg
      className="workflow-demo__scene"
      data-scene={scene}
      viewBox="0 0 960 540"
      role="img"
      aria-label="Animated Crona TUI workflow preview"
    >
      <g className="workflow-demo__prompt-window">
        <TerminalWindow title="shell — ~/Projects/crona">
          <text className="workflow-demo__prompt" x="32" y="76">
            <tspan className="workflow-demo__prompt-path">~/Projects/crona</tspan> ${" "}
            <tspan data-terminal-command>{command}</tspan>
            <tspan className="workflow-demo__cursor">▋</tspan>
          </text>
          {showKeyHint && (
            <text className="workflow-demo__key-hint" x="480" y="494" textAnchor="middle">
              [ enter ]
            </text>
          )}
        </TerminalWindow>
      </g>
      <g className="workflow-demo__tui-window">
        <TuiShell title="Crona · daily">
          <TuiNav groups={groups} />
          <TuiHeader
            repo={activeContext?.repoName ?? "-"}
            stream={activeContext?.streamName ?? "-"}
            environment="Dev"
            version="1.9.0-beta.8"
          />
          <TuiWorkArea>
            {["issues", "issue-next-1", "issue-next-2", "issue-due-action", "due-date"].includes(
              scene,
            ) ? (
              <IssuesView
                selectedIssueId={scene === "issues" ? 101 : scene === "issue-next-1" ? 102 : 104}
              />
            ) : (
              <TuiView
                viewId="Daily"
                panes={dailyPanes}
                paneContent={{
                  summary: <DailySummaryPane context={activeContext} dueDateOverrides={dueDates} />,
                  issues: (
                    <IssuesPane
                      repo={activeContext?.repoName ?? "-"}
                      stream={activeContext?.streamName ?? "-"}
                      context={activeContext}
                      dueDateOverrides={dueDates}
                      selectedIssueId={scene === "daily-updated" ? 104 : undefined}
                    />
                  ),
                  habits: <HabitsPane repo={activeContext?.repoName ?? "-"} stream={activeContext?.streamName ?? "-"} context={activeContext} />,
                }}
              />
            )}
          </TuiWorkArea>
          <TuiFooter />
          {scene === "view-switcher" && <ViewSwitcherDialog selectedKey="i" />}
          {scene === "open" && (
            <text
              className="workflow-demo__key-hint is-visible"
              x="480"
              y="494"
              textAnchor="middle"
            >
              [ v ] switch views
            </text>
          )}
          {scene === "view-switcher" && (
            <text
              className="workflow-demo__key-hint is-visible"
              x="480"
              y="494"
              textAnchor="middle"
            >
              [ i ] jump to issues
            </text>
          )}
          {(scene === "issues" || scene === "issue-due-action") && (
            <text
              className="workflow-demo__key-hint is-visible"
              x="480"
              y="494"
              textAnchor="middle"
            >
              [ d ] set due date
            </text>
          )}
          {(scene === "issue-next-1" || scene === "issue-next-2") && (
            <text
              className="workflow-demo__key-hint is-visible"
              x="480"
              y="494"
              textAnchor="middle"
            >
              [ ↓ ] next issue
            </text>
          )}
          {scene === "issue-due-action" && (
            <text
              className="workflow-demo__key-hint is-visible"
              x="480"
              y="494"
              textAnchor="middle"
            >
              [ d ] set due date
            </text>
          )}
      {scene === "due-date" && (
            <DatePickerDialog
              selectedDate={demoToday}
              visibleMonth={demoToday.slice(0, 7)}
              currentDate={demoToday}
            />
      )}
      {scene === "timer-start" && (
        <TimerStartTypeDialog issueTitle="Review habit history output" workedMinutes={12} estimateMinutes={60} />
      )}
      {scene === "pomodoro-start" && (
        <PomodoroStartDialog issueTitle="Review habit history output" workedMinutes={12} estimateMinutes={60} />
      )}
      {scene === "timer-focus" && (
        <text
          className="workflow-demo__key-hint is-visible"
          x="480"
          y="494"
          textAnchor="middle"
        >
          [ f ] focus
        </text>
      )}
      {scene === "timer-start" && (
        <text
          className="workflow-demo__key-hint is-visible"
          x="480"
          y="494"
          textAnchor="middle"
        >
          [ p ] select pomodoro
        </text>
      )}
          {scene === "due-date" && (
            <text
              className="workflow-demo__key-hint is-visible"
              x="480"
              y="494"
              textAnchor="middle"
            >
              [ enter ] choose
            </text>
          )}
        </TuiShell>
      </g>
    </svg>
  );
}
