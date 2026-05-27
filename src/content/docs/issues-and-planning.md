---
title: Issues and Planning
description: Learn how Crona shapes daily work through issue states, dates, context, issue timer type, and the Daily planning surface.
order: 5
---

Crona planning starts from structured issues. Instead of treating the day like one long flat task list, it gives you a way to shape work before you start focus.

This page is the best place to understand how work moves from captured idea to today’s planned session.

## How Work Moves Through the Day

Crona uses explicit issue states so you can tell the difference between work that exists, work that is prepared, and work that is actually underway.

The normal working flow looks like this:

1. capture work in `backlog`
2. move near-term work into `planned`
3. mark work `ready` when it is unblocked
4. start focus, which promotes eligible work into `in_progress`
5. finish in `done`, `in_review`, `blocked`, or `abandoned` depending on what actually happened

The point is not to force a rigid process. It is to make the day easier to reason about when you come back to unfinished work, switch streams, or review what really moved.

## What the Statuses Mean in Practice

These are the stable statuses Crona uses:

| Status | Typical use |
| --- | --- |
| `backlog` | captured for later |
| `planned` | expected work |
| `ready` | prepared and unblocked |
| `in_progress` | active work |
| `blocked` | waiting or stuck |
| `in_review` | implementation finished, under review |
| `done` | completed |
| `abandoned` | intentionally dropped |

Not every transition is allowed from every state. That is deliberate. Crona treats status changes as part of how you manage real work, not just cosmetic labels.

## Working With Dates

Issues can carry an optional planning date. In practice, that date helps Crona decide what belongs in the selected day’s planning surface.

Issues can also carry their own timer type, so the focus cadence is attached to the work item instead of a global timer setting.

Two behaviors matter most:

- assigning a to-do date promotes `backlog` work into `planned`
- the Daily view uses those dates to surface the work expected for the selected day
- the Daily summary keeps compact signals visible so the day stays scannable

This makes dates useful without turning Crona into a calendar-first tool. The date is there to support planning, not replace issue state.

## Choosing Context Before You Start

Crona treats checked-out context as part of the planning model, not just a convenience.

That means you can work with:

- a repo
- a stream
- an issue

The current context is shared across local clients, so when you change it in the TUI or CLI, the rest of the workflow stays aligned. That becomes especially important once you start focus, export reports, or move between several active work areas in the same day.

## Using the Daily View to Plan

The Daily view is where planning becomes operational.

It shows:

- planned tasks for the selected date
- pinned issues that need attention first
- overdue work that has not been resolved yet
- the current repo and stream scope
- habits due on that day
- summary signals for the selected window

That makes it the right place to answer questions like:

- what am I actually intending to do today?
- what is still open versus already resolved?
- which work belongs to this stream right now?
- what habits or routines are part of today’s plan as well?

The Daily view is not trying to be a board. It is trying to make the current day legible.

Pinned work gives you a way to keep a small set of important issues visible even when the day is crowded. Overdue work is separated from resolved work so the view stays focused on what still needs action.

## Why Planning and Focus Stay Separate

One of Crona’s strengths is that planning does not immediately collapse into active work.

You can:

- prepare work without starting a timer
- adjust context before choosing the issue
- review the day’s shape before moving into execution

That separation is what makes the next step clear: once planning is shaped, you move into focus with intent instead of just reacting to whichever task is nearest.

## What to Read Next

- Read [Focus Sessions](/docs/focus-sessions/) for how planned work turns into tracked work.
- Read [Habits](/docs/habits/) if you want the recurring routine side of the Daily view.
- Read [Concepts](/docs/concepts/) if you want the deeper lifecycle and context model behind these workflows.
- Read [TUI Keymap Reference](/docs/tui-keymap-reference/) if you want the exact bindings used in planning views.
