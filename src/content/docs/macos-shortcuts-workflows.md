---
title: macOS Shortcuts Workflows
description: Build practical macOS Shortcuts around Crona for repo launchers, start-focus flows, and calendar refresh tasks.
order: 15
---

If you use Crona on macOS, the Shortcuts app is the easiest way to turn common CLI actions into repeatable one-click workflows.

This page focuses on three useful setups: opening the right repo or stream, starting work on the current issue, and refreshing repo-specific calendar exports. Each one uses Crona's existing CLI surface, so you are building on supported commands rather than a separate automation layer.

## Before You Build a Shortcut

All of the workflows on this page use the same setup:

1. Open the **Shortcuts** app and create a new Shortcut.
2. Add a **Run Shell Script** action.
3. Paste the Crona command sequence into that action.

You can keep these as menu bar shortcuts, pin them for quick access, attach your own keyboard shortcut in macOS, or run them from Siri. The important part is that the Shortcut becomes a stable entry point for a repeated Crona action.

One constraint is worth keeping in mind: Crona does not currently document a native integration with Apple's system Focus modes. The practical macOS pattern today is to use Shortcuts to switch Crona context, launch Crona, or refresh local outputs.

## Workflow 1: Open the Right Work Area

The most useful first Shortcut is usually a launcher for a specific repo or stream.

This is a good fit when you regularly bounce between a few working areas and want each one to feel like its own entry point. Instead of opening Crona and navigating into the right context every time, the Shortcut does that setup first.

### Example: Open Work Repo

Create a Shortcut called `Open Work Repo` and use:

```bash
crona context switch-repo --id <repo-id> --json
crona
```

When you run it, Crona switches to that repo and then opens the TUI in the updated context.

### Example: Open Personal Stream

Create a Shortcut called `Open Personal Stream` and use:

```bash
crona context switch-stream --id <stream-id> --json
crona
```

This works well when the stream is the real unit of context for your day. It gives you a cleaner mental model than a generic launcher because each Shortcut represents a known working area.

## Workflow 2: Start the Current Issue Faster

The next good Shortcut is one that starts work instead of just opening Crona.

Crona's checked-out context is what makes this useful. If you already keep the right issue checked out, a Shortcut can turn that context into an active work session without asking you to navigate back through the TUI first.

### Example: Start Current Issue

Create a Shortcut called `Start Current Issue` and use:

```bash
crona issue start --from-context --json
```

This is the simplest daily-use Shortcut on the page. It assumes the checked-out issue is already correct and starts from there.

### Example: Start a Specific Recurring Issue

If you want a Shortcut for a known piece of work, switch the issue first and then start from context:

```bash
crona context switch-issue --id <issue-id> --json
crona issue start --from-context --json
```

This is useful for recurring workflows such as triage, review, or a regular maintenance task where the Shortcut itself represents the work you want to begin.

The difference between the two approaches is simple:

- use `Start Current Issue` when Crona's current context is already part of your routine
- use an issue-specific Shortcut when you want the Shortcut to choose the work for you

## Workflow 3: Refresh a Repo Calendar Export

Shortcuts are also useful for review and sync-adjacent tasks, especially when you want Crona to refresh a local file that another tool consumes.

Calendar export is the clearest example. Crona can generate repo-specific `.ics` files, and a Shortcut gives you a clean manual trigger for that workflow.

### Example: Refresh Backend Calendar

Create a Shortcut called `Refresh Backend Calendar` and use:

```bash
crona export calendar --repo-id <repo-id> --json
```

This updates the calendar artifacts for that repo in your configured ICS export directory. From there, you can attach the rest of the workflow to macOS tools that already understand local files:

- a Folder Action watching the export directory
- a local import step into another calendar surface
- a second Shortcut that opens the folder after export

This is often a better automation target than trying to wire Crona directly into another service. Crona produces the file, and the rest of your local macOS setup decides what to do with it.

## A Good First Setup

If you want a clean starting point, build these four Shortcuts first:

- `Open Work Repo`
- `Open Personal Stream`
- `Start Current Issue`
- `Refresh Backend Calendar`

That gives you one launcher for your main repo, one launcher for a secondary stream, one execution Shortcut for daily focus, and one export Shortcut for calendar-based workflows. It is enough to make Crona feel integrated into macOS without inventing a larger automation system than you need.

## What to Read Next

- Read [CLI Automation Patterns](/docs/cli-automation-patterns/) for the broader command surface behind these workflows.
- Read [Calendar and File Automation](/docs/calendar-and-file-automation/) if you want to build on `.ics` files, report directories, or watched folders.
- Read [CLI and Local Engine](/docs/cli-and-local-engine/) for the underlying command groups and terminology.
