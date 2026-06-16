const DOC_GROUPS = [
  {
    id: "install-and-migration",
    title: "Install and Migration",
    description: "Install Crona, switch channels, and move off the legacy script without losing state.",
    docs: ["install", "migration", "migration/legacy-to-brew", "migration/legacy-to-go", "migration/legacy-to-winget"],
  },
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Understand the runtime model, work objects, and the first few minutes in Crona.",
    docs: ["getting-started", "concepts", "features-overview"],
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
    docs: ["exports-and-reports", "alerts-and-reminders", "usage-and-diagnostics"],
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
