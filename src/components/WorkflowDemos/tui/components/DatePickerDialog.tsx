interface DatePickerDialogProps {
  title?: string;
  selectedDate: string;
  visibleMonth: string;
  currentDate: string;
  blockedDates?: string[];
  minDate?: string;
  mode?: "issue-due-date" | "general";
}

const iso = (date: Date) => date.toISOString().slice(0, 10);
const addDays = (date: Date, days: number) =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + days));

export default function DatePickerDialog({
  title = "Pick Due Date",
  selectedDate,
  visibleMonth,
  currentDate,
  blockedDates = [],
  minDate = currentDate,
  mode = "issue-due-date",
}: DatePickerDialogProps) {
  const month = new Date(`${visibleMonth}-01T00:00:00Z`);
  const firstDay = month.getUTCDay();
  const mondayOffset = (firstDay + 6) % 7;
  const gridStart = addDays(month, -mondayOffset);
  const dates = Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
  const monthLabel = month.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const selected = new Date(`${selectedDate}T00:00:00Z`);
  const selectedLabel = `${selected.toLocaleString("en-US", { weekday: "short", timeZone: "UTC" })}, ${selectedDate}`;
  const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  return (
    <g className="tui-date-picker" aria-label={title}>
      <rect className="tui-dialog__scrim" x="0" y="32" width="960" height="508" />
      <rect className="tui-date-picker__panel" x="300" y="98" width="360" height="314" />
      <text className="tui-date-picker__title" x="324" y="130">
        {title}
      </text>
      <text className="tui-date-picker__selected" x="324" y="155">
        {selectedLabel}
      </text>
      <text className="tui-date-picker__month" x="324" y="174">
        {monthLabel}
      </text>
      <g className="tui-date-picker__grid">
        {weekdays.map((day, index) => (
          <text key={day} className="tui-date-picker__weekday" x={324 + index * 42} y="204">
            {day}
          </text>
        ))}
        {dates.map((date, index) => {
          const key = iso(date);
          const outsideMonth = date.getUTCMonth() !== month.getUTCMonth();
          const isSelected = key === selectedDate;
          const isPast = mode === "issue-due-date" && key < minDate;
          const isBlocked = blockedDates.includes(key);
          const classes = [
            "tui-date-picker__date",
            outsideMonth && "is-outside",
            isPast && "is-past",
            isBlocked && "is-blocked",
            isSelected && "is-selected",
            key === currentDate && "is-current",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <text
              key={key}
              className={classes}
              x={324 + (index % 7) * 42}
              y={228 + Math.floor(index / 7) * 19}
            >
              {String(date.getUTCDate()).padStart(2, " ")}
            </text>
          );
        })}
      </g>
      <text className="tui-date-picker__footer" x="324" y="365">
        [h/j/k/l] move [,/.] month [enter] choose
      </text>
      <text className="tui-date-picker__footer" x="324" y="383">
        [c] clear [esc] back
      </text>
    </g>
  );
}
