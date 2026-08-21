export const openCronaWorkflow = {
  id: "open",
  label: "Open Crona",
  description: "Open Crona and see the day in one local workspace.",
  duration: 20000,
  segments: [
    {
      id: "open-crona",
      label: "Open Crona",
      start: 0,
      end: 7000,
      description: "Open Crona and see the day in one local workspace.",
    },
    {
      id: "assign-issue",
      label: "Assign an issue to today",
      start: 7000,
      end: 20000,
      description: "Move from the daily dashboard into the work that needs doing today.",
    },
  ],
  scenes: [
    { at: 0, id: "prompt" },
    { at: 4000, id: "open" },
    { at: 7000, id: "view-switcher" },
    { at: 11000, id: "issues" },
    { at: 12500, id: "issue-next" },
    { at: 14000, id: "due-date" },
    { at: 18000, id: "daily-updated" },
  ],
} as const;
