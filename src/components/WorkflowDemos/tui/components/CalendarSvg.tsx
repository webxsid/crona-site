interface CalendarProps {
  year: number;
  month: number;
  currentDate?: string;
  selectedDate?: string;
  selectedRange?: { start: string; end: string };
  currentWeek?: { start: string; end: string };
  x: number;
  y: number;
}

const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const iso = (date: Date) => date.toISOString().slice(0, 10);
const addDays = (date: Date, days: number) =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + days));
const isoWeekNumber = (value: string) => {
  const date = new Date(`${value}T12:00:00Z`);
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

export default function CalendarSvg({
  year,
  month,
  currentDate,
  selectedDate,
  selectedRange,
  currentWeek,
  x,
  y,
}: CalendarProps) {
  const first = new Date(Date.UTC(year, month - 1, 1));
  const start = addDays(first, -first.getUTCDay());
  const cells = Array.from({ length: 42 }, (_, index) => addDays(start, index));
  const rangeStart = selectedRange ? Date.parse(selectedRange.start) : 0;
  const rangeEnd = selectedRange ? Date.parse(selectedRange.end) : 0;
  return (
    <g className="tui-calendar" aria-label={`${year}-${String(month).padStart(2, "0")} calendar`}>
      <text className="tui-calendar__title" x={x} y={y}>
        {new Date(Date.UTC(year, month - 1, 1)).toLocaleString("en-US", {
          month: "long",
          timeZone: "UTC",
        })}{" "}
        {year}
      </text>
      <text className="tui-calendar__meta" x={x} y={y + 14}>
        Week {currentDate ? isoWeekNumber(currentDate) : "-"} Today{" "}
        {currentDate ? new Date(`${currentDate}T12:00:00Z`).getUTCDate() : "-"} Wk{" "}
        {currentDate ? isoWeekNumber(currentDate) : "-"}
      </text>
      <g className="tui-calendar__grid">
        {weekdayLabels.map((label, index) => (
          <text key={label} className="tui-calendar__weekday" x={x + index * 24} y={y + 29}>
            {label}
          </text>
        ))}
        {cells.map((date, index) => {
          const key = iso(date);
          const inMonth = date.getUTCMonth() === month - 1;
          const inWeek = currentWeek && key >= currentWeek.start && key <= currentWeek.end;
          const inRange =
            selectedRange && Date.parse(key) >= rangeStart && Date.parse(key) <= rangeEnd;
          const classes = [
            "tui-calendar__date",
            !inMonth && "is-outside",
            inWeek && "is-current-week",
            inRange && "is-selected-range",
            key === currentDate && "is-current",
            key === selectedDate && "is-selected",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <text
              key={key}
              className={classes}
              x={x + (index % 7) * 24}
              y={y + 44 + Math.floor(index / 7) * 14}
            >
              {String(date.getUTCDate()).padStart(2, " ")}
            </text>
          );
        })}
      </g>
    </g>
  );
}
