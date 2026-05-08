const DOC_GROUPS = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Install Crona, understand the runtime model, and get oriented quickly.",
    docs: ["getting-started", "install", "concepts", "features-overview"],
  },
  {
    id: "daily-workflows",
    title: "Daily Workflows",
    description: "Plan work, manage habits, run focus sessions, and track wellbeing day to day.",
    docs: ["issues-and-planning", "habits", "focus-sessions", "check-ins-and-wellbeing"],
  },
  {
    id: "outputs-and-operations",
    title: "Outputs and Operations",
    description: "Handle exports, reminders, and the operational side of Crona.",
    docs: ["exports-and-reports", "alerts-and-reminders"],
  },
  {
    id: "scripting-and-automation",
    title: "Scripting & Automation",
    description: "Use Crona’s CLI, deterministic files, and local directories as automation building blocks.",
    docs: ["cli-automation-patterns", "calendar-and-file-automation", "macos-shortcuts-workflows"],
  },
  {
    id: "reference",
    title: "Reference",
    description: "Use detailed references for keymaps, CLI usage, and visual walkthroughs.",
    docs: ["tui-keymap-reference", "cli-and-local-engine", "screenshots-and-walkthrough"],
  },
];

export function sortDocs(docs) {
  return [...docs].sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));
}

export function getDocNeighbors(docs, currentId) {
  const sortedDocs = sortDocs(docs);
  const currentIndex = sortedDocs.findIndex((entry) => entry.id === currentId);

  return {
    sortedDocs,
    previousDoc: currentIndex > 0 ? sortedDocs[currentIndex - 1] : null,
    nextDoc: currentIndex >= 0 && currentIndex < sortedDocs.length - 1 ? sortedDocs[currentIndex + 1] : null,
  };
}

export function categorizeDocs(docs) {
  const docsById = new Map(docs.map((doc) => [doc.id, doc]));

  return DOC_GROUPS.map((group) => ({
    ...group,
    items: group.docs.map((id) => docsById.get(id)).filter(Boolean),
  })).filter((group) => group.items.length > 0);
}
