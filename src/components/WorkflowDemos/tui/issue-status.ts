import type { IssueStatus } from "../../../data/crona-demo";

/** One palette for the daemon's complete issue lifecycle. */
export const issueStatusColor = (status: IssueStatus | string) => {
  switch (status) {
    case "backlog":
      return "var(--demo-muted)";
    case "planned":
      return "var(--color-warning)";
    case "ready":
      return "var(--color-accent-strong)";
    case "in_progress":
      return "var(--demo-accent)";
    case "blocked":
      return "var(--color-error)";
    case "in_review":
      return "#c49bea";
    case "done":
      return "var(--color-success)";
    case "abandoned":
      return "#9b746b";
    default:
      return "var(--demo-muted)";
  }
};
