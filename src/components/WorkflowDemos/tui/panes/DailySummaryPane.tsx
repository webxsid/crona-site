import { activeDemoContext, checkIns, demoToday, habitHistory, habitsDueForDate, issuesDueForDate, sessions, type DemoContext } from "../../../../data/crona-demo";
import CalendarSvg from "../components/CalendarSvg";
import { issueStatusColor } from "../issue-status";

const today = new Date();
const date = today.toISOString().slice(0, 10);
const fixtureDate = demoToday;
const streamHabits = habitsDueForDate(demoToday, activeDemoContext);
const streamHabitIds = new Set(streamHabits.map((habit) => habit.id));
const dayHistory = habitHistory.filter(
  (entry) => entry.date === fixtureDate && streamHabitIds.has(entry.habitId),
);
const completedHabits = dayHistory.filter((entry) => entry.status === "completed").length;
const failedHabits = dayHistory.filter((entry) => entry.status === "failed").length;
const pendingHabits = Math.max(streamHabits.length - completedHabits - failedHabits, 0);
const habitBarWidth = 144;
const habitBarSegmentWidth = (count: number) =>
  count > 0 ? Math.max((count / Math.max(streamHabits.length, 1)) * habitBarWidth, 1) : 0;
const habitTarget = streamHabits.reduce((total, habit) => total + (habit.targetMinutes ?? 0), 0);
const habitWorked = dayHistory.reduce((total, entry) => total + (entry.durationMinutes ?? 0), 0);
const checkIn = checkIns.find((entry) => entry.date === fixtureDate);
const weekNumber = (value: Date) => {
  const date = new Date(value);
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};
const weekStart = new Date(
  Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - today.getUTCDay()),
);
const weekEnd = new Date(
  Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - today.getUTCDay() + 6),
);
const displayDate = today.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});
export default function DailySummaryPane({
  context: _context,
  dueDateOverrides = {},
}: {
  context?: DemoContext;
  dueDateOverrides?: Record<number, string>;
}) {
  const visibleIssues = issuesDueForDate(demoToday, activeDemoContext, dueDateOverrides);
  const resolvedIssues = visibleIssues.filter(
    (issue) => issue.status === "done" || issue.status === "abandoned",
  ).length;
  const issueEstimate = visibleIssues.reduce(
    (total, issue) => total + (issue.estimateMinutes ?? 0),
    0,
  );
  const issueWorked = visibleIssues.reduce(
    (total, issue) =>
      total +
      sessions
        .filter((session) => session.issueId === issue.id)
        .reduce((sum, session) => sum + (session.durationSeconds ?? 0), 0),
    0,
  );
  const issueBarSegmentWidth = 144 / Math.max(visibleIssues.length, 1);
  return (
    <g className="tui-daily-summary">
      <text className="tui-summary__title" x="194" y="94">
        Daily Dashboard
      </text>
      <text className="tui-summary__accent" x="194" y="108">
        For {displayDate} · Week {weekNumber(today)}
      </text>
      <text className="tui-summary__muted" x="194" y="122">
        Scope: {activeDemoContext ? `${activeDemoContext.repoName} / ${activeDemoContext.streamName}` : "All contexts"}
      </text>
      <text className="tui-summary__muted" x="194" y="136">
        [,] prev [.] next [g] today
      </text>
      <text className="tui-summary__label" x="194" y="160">
        Issues
      </text>
      <text className="tui-summary__value" x="245" y="160">
        {resolvedIssues}/{visibleIssues.length} resolved
      </text>
      <text className="tui-summary__muted" x="325" y="160">
        {Math.floor(issueWorked / 60)}m/{issueEstimate}m
      </text>
      <rect className="tui-summary__bar-bg" x="380" y="151" width="144" height="10" />
      {visibleIssues.map((issue, index) => (
        <rect
          key={issue.id}
          x={380 + index * issueBarSegmentWidth}
          y="151"
          width={issueBarSegmentWidth}
          height="10"
          fill={issueStatusColor(issue.status)}
        />
      ))}
      <text className="tui-summary__muted" x="194" y="173">
        done {resolvedIssues}
      </text>
      <text className="tui-summary__label" x="194" y="194">
        Habits
      </text>
      <text className="tui-summary__value" x="245" y="194">
        {completedHabits}/{streamHabits.length} completed
      </text>
      <text className="tui-summary__muted" x="330" y="194">
        {habitWorked}m/{habitTarget}m
      </text>
      <rect className="tui-summary__bar-bg" x="380" y="186" width="144" height="10" />
      <rect
        className="tui-summary__bar tui-summary__bar--habit-completed"
        x="380"
        y="186"
        width={habitBarSegmentWidth(completedHabits)}
        height="10"
      />
      <rect
        className="tui-summary__bar tui-summary__bar--habit-failed"
        x={380 + habitBarSegmentWidth(completedHabits)}
        y="186"
        width={habitBarSegmentWidth(failedHabits)}
        height="10"
      />
      <rect
        className="tui-summary__bar tui-summary__bar--habit-pending"
        x={380 + habitBarSegmentWidth(completedHabits) + habitBarSegmentWidth(failedHabits)}
        y="186"
        width={habitBarSegmentWidth(pendingHabits)}
        height="10"
      />
      <text className="tui-summary__muted" x="194" y="208">
        failed {failedHabits} remaining {pendingHabits}
      </text>
      <text className="tui-summary__label" x="194" y="230">
        Signals
      </text>
      <text className="tui-summary__muted" x="194" y="245">
        <tspan className="tui-summary__label">Energy</tspan> today {checkIn?.energy ?? "—"}/5 |{" "}
        <tspan className="tui-summary__label">Mood</tspan> today {checkIn?.mood ?? "—"}/5 |{" "}
        <tspan className="tui-summary__label">Sleep</tspan> today {checkIn?.sleepHours ?? "—"}h
      </text>
      <CalendarSvg
        x={780}
        y={110}
        year={today.getUTCFullYear()}
        month={today.getUTCMonth() + 1}
        currentDate={date}
        currentWeek={{
          start: weekStart.toISOString().slice(0, 10),
          end: weekEnd.toISOString().slice(0, 10),
        }}
      />
    </g>
  );
}
