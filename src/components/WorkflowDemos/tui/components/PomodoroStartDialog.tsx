interface PomodoroStartDialogProps {
  issueTitle: string;
  workedMinutes: number;
  estimateMinutes: number;
}

export default function PomodoroStartDialog({
  issueTitle,
  workedMinutes,
  estimateMinutes,
}: PomodoroStartDialogProps) {
  return (
    <g className="tui-timer-dialog" aria-label="Pomodoro Session">
      <rect className="tui-dialog__scrim" x="0" y="32" width="960" height="508" />
      <rect className="tui-dialog__panel" x="150" y="62" width="660" height="414" />
      <text className="tui-dialog__title" x="178" y="89">Pomodoro Session</text>
      <text className="tui-dialog__item" x="178" y="115">{issueTitle}</text>
      <text className="tui-dialog__hint" x="178" y="137">Worked / Est</text>
      <text className="tui-dialog__item" x="290" y="137">worked {workedMinutes}m / est. {estimateMinutes}m</text>
      <text className="tui-dialog__hint" x="178" y="155">Total</text>
      <text className="tui-dialog__item" x="290" y="155">2h10m</text>
      <text className="tui-dialog__hint" x="178" y="173">Ends At</text>
      <text className="tui-dialog__item" x="290" y="173">17:28</text>
      <text className="tui-dialog__detail" x="178" y="200">25m Focus · 5m Short Break · 15m Long Break</text>
      <text className="tui-dialog__detail" x="178" y="217">4 cycles · long break every 4 cycles</text>
      <text className="tui-dialog__item is-selected" x="178" y="247">&gt; Focus</text>
      <text className="tui-dialog__item is-selected" x="178" y="265">25m <tspan className="tui-dialog__item">50m  90m  Custom</tspan></text>
      <text className="tui-dialog__hint" x="194" y="292">Short Break</text>
      <text className="tui-dialog__item is-selected" x="194" y="310">5m</text>
      <text className="tui-dialog__item" x="244" y="310">10m  15m  No Break  Custom</text>
      <text className="tui-dialog__hint" x="194" y="337">Long Break</text>
      <text className="tui-dialog__item is-selected" x="194" y="355">15m</text>
      <text className="tui-dialog__item" x="244" y="355">20m  30m  No Break  Custom</text>
      <text className="tui-dialog__hint" x="194" y="382">Cycles</text>
      <text className="tui-dialog__item" x="194" y="400">&gt; 4</text>
      <text className="tui-dialog__footer" x="178" y="454">[←/→] choose   [↑/↓] move   [ctrl+s] start   [esc] back</text>
    </g>
  );
}
