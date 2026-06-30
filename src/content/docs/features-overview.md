---
title: Features Overview
description: A high-level map of Crona's core workflows, views, and surfaces.
order: 4
---

Crona is a command-line work hub designed to run completely off local IPC state. The core surfaces are described below.

## Planning & Issue Lifecycle

Crona models work using repositories, streams, and issues:
- **Repositories**: Top-level logical boundaries (e.g., `office`, `OSS`).
- **Streams**: Long-lived project streams or branches (e.g., `feature-sync`, `v2-release`).
- **Issues**: Individual tasks with statuses (`backlog`, `planned`, `ready`, `in_progress`, `blocked`, `in_review`, `done`, `abandoned`).

The active context `{ repo -> stream -> issue }` remains synchronized across TUI and CLI clients.

## Focus Sessions & Stashes

Focused work intervals are executed via the session timer:
- **Profiles**: Timers are configured per-issue (Pomodoro or continuous).
- **Stashes**: If interrupted, you can stash active timer metadata and resume it later, preventing context loss.
- **Commit Summaries**: Focus sessions end with a commit message summarizing the work done.

## Habits & Streak Tracking

Routines are tracked in parallel to issues:
- **Schedules**: Set daily, weekday, or weekly cadences.
- **History**: Completion logs are visualised on a calendar timeline.
- **Custom Momentum**: Configure naming, cadences, and target lists to track custom streaks.

## Wellbeing & Heatmaps

Self-reported tracking helps prevent burnout:
- **Metrics**: Log daily energy, mood, sleep hours, sleep score, and screen time.
- **Heatmaps**: A terminal-based activity heatmap visualizes focus session density and habit compliance over a rolling metrics window.

## Outputs & Local Automation

Crona enforces local ownership of your metrics:
- **Narrative Reports**: Generate daily or weekly summaries using Handlebars templates.
- **PDF/CSV exports**: Compile structured sheets or PDFs (requires local renderers like `pandoc` or `weasyprint`).
- **Calendar (.ics) exports**: Generate deterministic files for native calendars.
- **Daemon Alerts**: Background alerts deliver scheduled notifications, focus inactivity warnings, and update indicators.
