---
title: Getting Started
description: Learn what Crona is, who it fits best, and how to get from first launch to your first focused work session.
order: 1
---

Crona is a local-first work tracker for developers. It combines planning, issue-scoped focus sessions, reminders, exports, and session history into one terminal-native workflow.

What makes it different is where the workflow lives. Crona keeps the core system on your machine, so your current context, timer state, reminders, exports, and history stay local instead of depending on a hosted dashboard.

## What You Use Day to Day

Most users interact with Crona through three pieces:

- `crona`, the normal launcher and CLI entrypoint
- the terminal UI, where you plan work and run focus sessions
- the local engine, which keeps state, timers, reminders, and exports running behind the scenes

In practice, that means you usually start here:

```bash
crona
```

Use the TUI for interactive work like planning issues, reviewing dashboards, changing settings, and running sessions. Use the CLI when you want scriptable control, shell completions, or local-engine inspection commands.

## Who Crona Fits Best

Crona works best for people who want structured work tracking without leaving the terminal.

Typical fits include:

- solo developers who want a reliable local system for planning and focus
- maintainers juggling multiple streams of work across repos or personal projects
- people who prefer terminal-first tools over browser-based task trackers
- users who want reminders, exports, and session history tied to the same workflow

If what you want is a lightweight terminal to-do list, Crona will probably feel more structured than necessary. If you want a local system for planning intentional work and tracking how it actually gets done, it is much closer to the mark.

## Your First Five Minutes

On first launch, Crona creates its runtime home, starts the local engine if needed, and opens the terminal UI.

The simplest way to get oriented is:

1. create a repo for a top-level area of work
2. create a stream inside that repo
3. add one or more issues, including the timer type you want that work to use
4. check out the context you want to work in
5. start a focus session from an issue

The first workflow to understand is not every feature in the app. It is just this loop: choose your context, pick the issue, start focus, and let Crona keep the work session and follow-up state organized.

## How Crona Organizes Work

You do not need the full data model to get started, but four terms matter early:

- **Repo**: a top-level bucket like `work`, `personal`, or `research`
- **Stream**: a long-lived subdivision inside a repo
- **Issue**: the unit of planned work, including its timer type and estimate
- **Session**: a focused work interval tied to an issue

These same objects are shared across the TUI and CLI, so the context you choose in one place stays meaningful in the other.

For the full work model, including stashes, habits, check-ins, lifecycle states, and active context behavior, continue to [Concepts](/docs/concepts/).

## How Crona Stores and Owns Work

The local engine is the source of truth. The TUI and CLI are clients that talk to it over local IPC.

That matters because the engine owns:

- the runtime store
- active timer state and issue-scoped timer behavior
- reminder scheduling
- notification delivery decisions
- export generation
- update checks

You do not need to manage that directly during normal use, but it explains why reminders can keep working, why the TUI and CLI stay in sync, and why Crona behaves more like a local system than a collection of separate commands.

Runtime data lives in OS-appropriate app-data directories by default, and you can override the runtime home with `CRONA_HOME`. For the full path list and install/runtime details, continue to [Install](/docs/install/).

## Stable and Beta

Crona has two user-facing update channels:

- `stable` for normal use
- `beta` for prerelease testing

If you are just getting started, stay on `stable`. Switch to `beta` only if you want to validate upcoming releases and are comfortable seeing changes earlier.

## Where to Go Next

- Read [Install](/docs/install/) if you want platform-specific setup, runtime paths, shell completions, alerts, or export tooling details.
- Read [Concepts](/docs/concepts/) if you want the full model behind repos, streams, issues, sessions, context, and stashes.
- Read [Features Overview](/docs/features-overview/) if you want a map of Crona’s broader surface area before going deeper.
