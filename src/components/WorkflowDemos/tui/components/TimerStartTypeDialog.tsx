interface TimerStartTypeDialogProps {
  issueTitle: string;
  workedMinutes: number;
  estimateMinutes: number;
}

export default function TimerStartTypeDialog({
  issueTitle,
  workedMinutes,
  estimateMinutes,
}: TimerStartTypeDialogProps) {
  return (
    <g className="tui-timer-dialog" aria-label="Start Timer">
      <rect className="tui-dialog__scrim" x="0" y="32" width="960" height="508" />
      <rect className="tui-dialog__panel" x="210" y="126" width="540" height="220" />
      <text className="tui-dialog__title" x="230" y="153">Start Timer</text>
      <text className="tui-dialog__item" x="230" y="180">{issueTitle}</text>
      <text className="tui-dialog__hint" x="230" y="203">Worked / Est</text>
      <text className="tui-dialog__item" x="342" y="203">worked {workedMinutes}m / est. {estimateMinutes}m</text>
      <text className="tui-dialog__item is-selected" x="230" y="228">▶ [s] Stopwatch</text>
      <text className="tui-dialog__item" x="230" y="246">  [p] Pomodoro</text>
      <text className="tui-dialog__item" x="230" y="264">  [t] Timer</text>
      <text className="tui-dialog__detail" x="230" y="289">Start an open-ended focus session.</text>
      <text className="tui-dialog__footer" x="230" y="328">[↑/↓] move   [enter] choose   [esc] cancel</text>
    </g>
  );
}
