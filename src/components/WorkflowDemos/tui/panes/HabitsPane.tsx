import { demoToday, habitHistory, habits } from "../../../../data/crona-demo";
import { useTui } from "../tui-context";

const fixtureDate = demoToday;
const statusColor = (status?: string) =>
  status === "completed"
    ? "var(--color-success)"
    : status === "failed"
      ? "var(--color-error)"
      : "var(--color-warning)";
const statusMark = (status?: string) =>
  status === "completed" ? "[x]" : status === "failed" ? "[!]" : "[ ]";
const duration = (minutes?: number) =>
  minutes && minutes >= 60 ? `${minutes / 60}h` : `${minutes ?? 0}m`;

export default function HabitsPane({ repo, stream }: { repo: string; stream: string }) {
  const { getActivePane } = useTui();
  const isActive = getActivePane("Daily") === "habits";
  const dueHabits = habits.filter((habit) => habit.streamId === 11 && habit.active);
  const entries = new Map(
    habitHistory
      .filter(
        (entry) =>
          entry.date === fixtureDate && dueHabits.some((habit) => habit.id === entry.habitId),
      )
      .map((entry) => [entry.habitId, entry]),
  );
  const remaining = dueHabits.filter(
    (habit) => entries.get(habit.id)?.status !== "completed",
  ).length;
  return (
    <g className="tui-habits-pane">
      <text className="tui-habits__title" x="663" y="296">
        Habits Due [{remaining}]
      </text>
      <text className="tui-habits__muted" x="663" y="310">
        Scope: {repo} / {stream}
      </text>
      {isActive && (
        <text className="tui-habits__muted" x="663" y="324">
          [a] create [m] log [F] fail [e] edit
        </text>
      )}
      {dueHabits.map((habit, index) => {
        const entry = entries.get(habit.id);
        const y = (isActive ? 342 : 326) + index * 16;
        return (
          <text
            key={habit.id}
            className="tui-habits__item"
            x="675"
            y={y}
            fill={statusColor(entry?.status)}
          >
            {statusMark(entry?.status)} {habit.name}
            <tspan className="tui-habits__duration"> {duration(habit.targetMinutes)}</tspan>
          </text>
        );
      })}
    </g>
  );
}
