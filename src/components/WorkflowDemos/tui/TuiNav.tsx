import { useTui } from "./tui-context";
export default function TuiNav({ groups }: { groups: { label: string; items: string[] }[] }) {
  const {
    layout: { nav },
    activeView,
    setActiveView,
  } = useTui();
  const height = (g: { items: string[] }) => g.items.length * nav.textLineHeight + nav.groupGap;
  return (
    <g className="tui-nav">
      <text className="tui-nav__title" x={nav.x} y={nav.titleY}>
        Views
      </text>
      <text className="tui-nav__hint" x={nav.x} y={nav.firstHintY}>
        [↑↓] switch
      </text>
      <text className="tui-nav__hint" x={nav.x} y={nav.secondHintY}>
        [v] jump
      </text>
      {groups.map((group, groupIndex) => {
        const offset = groups.slice(0, groupIndex).reduce((sum, item) => sum + height(item), 0);
        return (
          <g key={group.label}>
            <text className="tui-nav__label" x={nav.x} y={nav.startY + offset}>
              {group.label}
            </text>
            {group.items.map((item, index) => (
              <text
                key={item}
                className={item === activeView ? "tui-nav__item is-selected" : "tui-nav__item"}
                onClick={() => setActiveView(item)}
                x={nav.x + 12}
                y={nav.startY + offset + (index + 1) * nav.textLineHeight}
              >
                {item === activeView ? "▶ " : "  "}
                {item}
              </text>
            ))}
          </g>
        );
      })}
    </g>
  );
}
