import { checkIns, habitHistory, habits, issues, sessions } from "../../../../data/crona-demo";
import CalendarSvg from "../components/CalendarSvg";

const today = new Date();
const date = today.toISOString().slice(0, 10);
const fixtureDate = checkIns.at(0)?.date ?? date;
const streamIssues = issues.filter((issue) => issue.streamId === 11 && issue.pinnedDaily);
const streamHabits = habits.filter((habit) => habit.streamId === 11 && habit.active);
const streamHabitIds = new Set(streamHabits.map((habit) => habit.id));
const dayHistory = habitHistory.filter(
  (entry) => entry.date === fixtureDate && streamHabitIds.has(entry.habitId),
);
const resolvedIssues = streamIssues.filter(
  (issue) => issue.status === "completed" || issue.status === "abandoned",
).length;
const issueEstimate = streamIssues.reduce(
  (total, issue) => total + (issue.estimateMinutes ?? 0),
  0,
);
const issueWorked = streamIssues.reduce(
  (total, issue) =>
    total +
    sessions
      .filter((session) => session.issueId === issue.id)
      .reduce((sum, session) => sum + (session.durationSeconds ?? 0), 0),
  0,
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
  const start = new Date(Date.UTC(value.getUTCFullYear(), 0, 1));
  return Math.ceil(((value.getTime() - start.getTime()) / 86400000 + start.getUTCDay() + 1) / 7);
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
const statusColor = (status: string) =>
  status === "completed"
    ? "var(--color-success)"
    : status === "abandoned" || status === "blocked"
      ? "var(--color-error)"
      : status === "in_progress" || status === "in_review"
        ? "var(--demo-accent)"
        : "var(--color-warning)";

export default function DailySummaryPane() {
  return (
    <g className="tui-daily-summary">
      <text className="tui-summary__title" x="194" y="94">
        Daily Dashboard
      </text>
      <text className="tui-summary__accent" x="194" y="108">
        For {displayDate} · Week {weekNumber(today)}
      </text>
      <text className="tui-summary__muted" x="194" y="122">
        Scope: All
      </text>
      <text className="tui-summary__muted" x="194" y="136">
        [,] prev [.] next [g] today
      </text>
      <text className="tui-summary__label" x="194" y="160">
        Issues
      </text>
      <text className="tui-summary__value" x="245" y="160">
        {resolvedIssues}/{streamIssues.length} resolved
      </text>
      <text className="tui-summary__muted" x="325" y="160">
        {Math.floor(issueWorked / 60)}m/{issueEstimate}m
      </text>
      <rect className="tui-summary__bar-bg" x="380" y="151" width="144" height="10" />
      {streamIssues.map((issue, index) => (
        <rect
          key={issue.id}
          x={380 + index * (144 / Math.max(streamIssues.length, 1))}
          y="151"
          width={144 / Math.max(streamIssues.length, 1)}
          height="10"
          fill={statusColor(issue.status)}
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
