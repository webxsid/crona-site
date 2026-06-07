---
title: Features Overview
description: A map of the main Crona workflows across planning, issue-scoped focus, Rollup, Wellbeing, Momentum, checkout, exports, alerts, updates, and settings.
order: 4
---

This page is a product-level map of Crona's stable user-facing surface.

## Planning And Issue Lifecycle

Crona gives you structured work objects and issue-scoped timer behavior rather than a flat task list:

- repos and streams for organization
- issues with lifecycle status, notes, estimates, timer type, and optional to-do dates
- context checkout across TUI and CLI
- daily planning views that surface the current scope, due work, pinned issues, and overdue work

Issue state changes are explicit, and the TUI exposes dedicated actions for focus, logging, status changes, due dates, edit, delete, and per-issue timing.

Checkout context selection also behaves like a real selector, so repo and stream prompts stay usable even when the text inputs are empty.

## Habits And History

Habits are a first-class recurring object in Crona:

- schedule-based routines with daily, weekdays, and weekly cadence options
- habit completion logging
- habit history for reviewing the completion record over time
- custom streak periods so a streak can match the habit instead of forcing one fixed rhythm
- daily habit visibility in the Daily view

That makes habits a parallel workflow to issues rather than a second-class reminder list.

## Focus Sessions

Focus sessions are tied to issues and managed by the timer.

Key capabilities:

- start focus from a selected issue
- issue-scoped timer selection instead of a global timer mode
- stricter pomodoro-style cadence
- pause, resume, and extend active focus sessions
- end with a session summary
- stash the current work when interrupted
- recover from existing stashes instead of losing prior context
- review session history and amend notes later

## Rollup

Rollup combines focus and worktime visualization with the calendar so the current day stays readable at a glance.

Key capabilities:

- focus graph beside the calendar
- scrollable Breakdown pane
- pane budgeting that keeps the layout usable on smaller screens
- inline totals and score summaries that keep the current focus state visible

If you want to see it in context, read the [Screenshots and Walkthrough](/docs/screenshots-and-walkthrough/) page for the current Rollup screenshot.

## Check-Ins And Wellbeing

Crona is not only an issue tracker. It also includes a daily self-check workflow:

- mood and energy logging
- sleep and screen-time inputs
- burnout indicators and trend views
- a configurable Metrics Window for recent history
- Momentum for the longer-running custom-only wellbeing history
- accountability and plan-failure rollups

This data is kept local and shown in the Wellbeing dashboard, the compact Daily momentum block, and related range summaries.

## Momentum

Momentum is the long-view wellbeing surface for custom momentum history.

It now stays focused on:

- custom momentum cards
- descriptions on each card
- weekly labels with the week number prefix
- disabled-state rendering that reads as paused history

The [Screenshots and Walkthrough](/docs/screenshots-and-walkthrough/) page shows the current Momentum dashboard view.

## Checkout And Dialogs

Checkout dialogs act like selectors rather than dead inputs.

That means:

- `Select a repo` and `Select a stream` prompts still appear when the fields are blank
- arrow cycling works from the empty state
- help opens in a proper modal instead of distorting the active screen

## Dashboards And Views

The TUI includes dedicated views for:

- Daily
- Issues
- Rollup
- Wellbeing
- Reports
- Config
- Settings
- Alerts
- Updates
- Support
- Session history

The view jump menu and action footer are part of the day-to-day workflow, not a hidden power-user surface.

## Reports And Exports

Crona supports deterministic local artifacts rather than hosted reporting:

- markdown reports
- PDF reports when renderers are available
- CSV exports
- calendar `.ics` export
- repo, stream, weekly, issue-rollup, and daily report scopes
- editable report templates and CSV specs

Generated output is stored locally and can feed other tools or automation.

## Alerts And Reminders

Alerts are local-engine-owned and cover:

- timer boundaries
- focus inactivity
- update availability
- export completion
- support bundle completion
- scheduled check-in reminders

The Alerts view lets you inspect backend capability, toggle behaviors, pick bundled sound presets, and create reminder rules.

## Updates And Support Tools

Crona includes built-in support for:

- release checks
- release note viewing
- supported in-app install/update flows
- bug-report and discussion links
- lightweight diagnostics
- redacted support bundle generation

## Config And Settings

Two views handle different needs:

- `Settings` for week start, update channel, sorting, date display, prompt glyph mode, away mode, and destructive actions
- `Config` for report assets, templates, renderer tooling, export directories, and active file paths

Timer type selection now lives on the issue itself rather than in Settings.

## Developer And Internal Material

The public website docs stay user-first. For internal or contributor material, use the upstream repo docs:

- [Development](https://github.com/webxsid/crona/blob/main/docs/development.md)
- [Contributing](https://github.com/webxsid/crona/blob/main/docs/contributing.md)
- [Release Process](https://github.com/webxsid/crona/blob/main/docs/release.md)
- [Socket API](https://github.com/webxsid/crona/blob/main/docs/api/socket.md)
