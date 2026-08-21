const views = [
  ["a", "Away", "Protected-mode shell when away or rest mode is active."],
  ["g", "Summary", "Read-only day snapshot with context, signals, and streaks."],
  ["d", "Daily", "Daily dashboard with planned issues and habits."],
  ["r", "Rollup", "Range summaries and drill-down day details."],
  ["w", "Wellbeing", "Check-ins, burnout signals, and trends."],
  ["u", "Momentum", "Custom momentum cards with bucket progress graphs."],
  ["p", "Reports", "Generated report and export browser."],
  ["c", "Config", "Export assets, templates, and renderer tools."],
  ["i", "Issues", "Primary workspace issue list."],
  ["m", "Meta", "Repos, streams, issues, and habits by hierarchy."],
  ["o", "Ops", "Recent operation log."],
  ["s", "Settings", "Core settings and danger actions."],
  ["l", "Alerts", "Notification, sound, and alert backend settings."],
  ["t", "Updates", "Release notes, update checks, and install status."],
  ["h", "Support", "Bug reporting, bundles, and GitHub links."],
  ["y", "History", "Session history and past focus work."],
  ["n", "Session", "Active session view while a timer is running."],
] as const;

export default function ViewSwitcherDialog({ selectedKey = "i" }: { selectedKey?: string }) {
  const selected = views.find(([key]) => key === selectedKey) ?? views[0];
  return (
    <g className="tui-dialog tui-view-switcher" aria-label="Jump To View">
      <rect className="tui-dialog__scrim" x="0" y="32" width="960" height="508" />
      <rect className="tui-dialog__panel" x="152" y="78" width="656" height="390" />
      <text className="tui-dialog__title" x="176" y="106">
        Jump To View
      </text>
      <text className="tui-dialog__hint" x="176" y="122">
        Press a mnemonic key or use j/k then enter
      </text>
      {views.map(([key, label]) => (
        <text
          key={key}
          className={`tui-dialog__item${key === selectedKey ? " is-selected" : ""}`}
          x="176"
          y={145 + views.findIndex(([viewKey]) => viewKey === key) * 13}
        >
          {key === selectedKey ? "▶" : " "} [{key}] {label}
        </text>
      ))}
      <text className="tui-dialog__detail" x="500" y="392">
        {selected[2]}
      </text>
      <text className="tui-dialog__footer" x="176" y="444">
        [key] jump [↑/↓] move [enter] jump [esc] cancel
      </text>
    </g>
  );
}
