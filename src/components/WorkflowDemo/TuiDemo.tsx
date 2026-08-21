import { useEffect, useRef, useState, type CSSProperties } from "react";
import OpenCronaScene from "../WorkflowDemos/tui/open-crona/scenes/OpenCronaScene";
import { TuiProvider, useTui } from "../WorkflowDemos/tui/tui-context";
import { openCronaWorkflow } from "../WorkflowDemos/tui/open-crona/data";
import { demoToday } from "../../data/crona-demo";

function Player() {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [dueDates, setDueDates] = useState<Record<number, string>>({});
  const frame = useRef<number | undefined>(undefined);
  const { setFooterActions } = useTui();
  useEffect(() => {
    if (!playing) return;
    const tick = () => {
      setElapsed((value) => {
        const next = Math.min(value + 16, openCronaWorkflow.duration);
        if (next >= openCronaWorkflow.duration) setPlaying(false);
        return next;
      });
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [playing]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "1") {
        setElapsed(0);
        setPlaying(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const restart = () => {
    setElapsed(0);
    setDueDates({});
    setPlaying(true);
  };
  useEffect(() => {
    if (elapsed >= 18000) setDueDates({ 104: demoToday });
  }, [elapsed]);
  const activeSegment =
    openCronaWorkflow.segments.find(
      (segment) => elapsed >= segment.start && elapsed < segment.end,
    ) ?? openCronaWorkflow.segments[openCronaWorkflow.segments.length - 1];
  const seekToSegment = (start: number) => {
    setElapsed(start);
    setPlaying(true);
  };
  const scene =
    elapsed < 4000
      ? "prompt"
      : elapsed < 7000
        ? "open"
        : elapsed < 11000
          ? "view-switcher"
          : elapsed < 12250
            ? "issues"
            : elapsed < 13000
              ? "issue-next-1"
              : elapsed < 13750
                ? "issue-next-2"
                : elapsed < 14000
                  ? "issue-due-action"
                  : elapsed < 18000
                    ? "due-date"
                    : "daily-updated";
  const command = "crona".slice(0, Math.max(0, Math.min(5, Math.floor((elapsed - 600) / 180))));
  const showKeyHint = elapsed >= 2200 && elapsed < 4000;
  useEffect(() => {
    setFooterActions(
      scene === "prompt"
        ? [
            { key: "enter", label: "run command" },
            { key: "?", label: "keys" },
          ]
        : [
            {
              key:
                scene === "view-switcher"
                  ? "i"
                  : scene === "issues" || scene === "issue-due-action"
                    ? "d"
                    : scene === "issue-next-1" || scene === "issue-next-2"
                      ? "↓"
                      : "enter",
              label:
                scene === "view-switcher"
                  ? "jump to issues"
                  : scene === "issues" || scene === "issue-due-action"
                    ? "set due date"
                    : scene === "issue-next-1" || scene === "issue-next-2"
                      ? "next issue"
                      : "choose date",
            },
            { key: "?", label: "keys" },
            { key: "c", label: "change context" },
          ],
    );
  }, [scene, setFooterActions]);
  return (
    <>
      <div className="workflow-demo__stage">
        <OpenCronaScene
          scene={scene}
          command={command}
          showKeyHint={showKeyHint}
          dueDates={dueDates}
        />
      </div>
      <div className="workflow-demo__status" aria-live="polite">
        <span>Open TUI</span>
        <span>{`00:${String(Math.floor(elapsed / 1000)).padStart(2, "0")}`}</span>
      </div>
      <div className="workflow-demo__controls" aria-label="Workflow controls">
        <button type="button" onClick={() => setPlaying((value) => !value)}>
          {playing ? "pause" : "play"}
        </button>
        <button type="button" onClick={restart}>
          replay
        </button>
      </div>
      <div
        className="workflow-demo__flows"
        role="listbox"
        aria-label="Choose a workflow scene"
        style={{
          gridTemplateColumns: openCronaWorkflow.segments
            .map((segment) => `${segment.end - segment.start}fr`)
            .join(" "),
        }}
      >
        {openCronaWorkflow.segments.map((segment, index) => {
          const progress =
            elapsed <= segment.start
              ? 0
              : Math.min(100, ((elapsed - segment.start) / (segment.end - segment.start)) * 100);
          const isActive = activeSegment.id === segment.id;
          return (
            <button
              key={segment.id}
              className={isActive ? "is-active" : ""}
              type="button"
              role="option"
              aria-selected={isActive}
              aria-current={isActive ? "step" : undefined}
              style={
                {
                  "--segment-progress": `${progress}%`,
                  "--segment-width": `${((segment.end - segment.start) / openCronaWorkflow.duration) * 100}%`,
                } as CSSProperties
              }
              onClick={() => seekToSegment(segment.start)}
            >
              <span>[{index + 1}]</span> {segment.label}
            </button>
          );
        })}
      </div>
      <p className="workflow-demo__description">{activeSegment.description}</p>
    </>
  );
}
export default function TuiDemo() {
  return (
    <TuiProvider>
      <Player />
    </TuiProvider>
  );
}
