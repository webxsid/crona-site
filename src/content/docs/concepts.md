---
title: Concepts
description: The work model behind repos, streams, issues, sessions, stashes, scratchpads, habits, and daily check-ins.
order: 3
---

Crona is a local-first work tracker. The local engine owns the canonical state, and the TUI and CLI act as clients.

## Terminology

The codebase still uses the term `kernel` for the internal engine process and its CLI namespace. Public docs usually call it the local engine or background engine.

## The Core Hierarchy

### Repo

A repo is the top-level bucket for work. Common examples are `work`, `personal`, or `research`.

### Stream

A stream is a long-lived subdivision inside a repo. It lets you separate work without creating a brand new repo.

Examples:

- `main`
- `backend`
- `experiments`

### Issue

An issue is the smallest intentional unit of work. It can carry a title, notes, an estimate, lifecycle state, and an optional to-do date.

### Session

A session is focused work tied to an issue. Sessions are started and stopped by the timer and end with a commit-style summary message.

### Session Segment

A session is composed of one or more segments:

- `work`
- `short_break`
- `long_break`
- `rest`

## Active Context

The active context is the shared `{ repo -> stream -> issue }` path across local clients.

That means:

- checking out a repo or issue in the TUI affects the shared working context
- CLI commands can read or reuse the same active context
- focus and export commands can target the current context instead of forcing you to re-enter identifiers

## Issue Lifecycle

Crona's stable issue statuses are:

| Status | Meaning |
| --- | --- |
| `backlog` | captured but not yet scheduled |
| `planned` | intended work, often tied to the day or near-term queue |
| `ready` | prepared and unblocked |
| `in_progress` | actively being worked |
| `blocked` | waiting on something external or unresolved |
| `in_review` | work is done locally but still under review |
| `done` | completed |
| `abandoned` | intentionally dropped |

Focus can start from `planned`, `ready`, and `in_progress`. Starting focus automatically promotes `planned` or `ready` work to `in_progress`.

Assigning a to-do date also promotes `backlog` work into `planned`.

## Stashes

A stash suspends the current focus context and can preserve timer state.

This is what makes interrupted work recoverable without losing the earlier session intent. If you try to start focus on an issue that already has a stash, the local engine returns a structured stash conflict. Crona then asks you to:

- resume the existing stash
- or continue with a fresh session while keeping the stash available

It does not silently replace the old stash.

## Scratchpads

Scratchpads are filesystem-backed notes rather than database-only metadata.

The placeholder path from the TUI uses tokens like:

```text
notes/[[date]].md
```

They are useful for lightweight daily notes, running work logs, or capture files that you want outside the structured issue model.

## Daily Check-Ins

Daily check-ins capture self-report data for a specific date. The current fields surfaced by Crona are:

- mood from 1 to 5
- energy from 1 to 5
- optional sleep hours
- optional sleep score
- optional screen time
- optional notes

These feed the Wellbeing view and range rollups.

## Habits

Habits are recurring items tracked alongside daily work. Crona supports schedule-based habits and daily completion logging. In the Daily view they appear separately from issues so you can manage routines and work items together without flattening them into the same list.

## The Local Engine Ownership Model

The local engine owns more than storage. It is also responsible for:

- timers and segment transitions
- reminder evaluation
- local notifications and sounds
- export generation
- update checks
- local IPC

That ownership is why Crona can behave consistently whether you are driving it from the TUI or the CLI.

## Design Principles

The upstream project docs call out these core ideas:

- local-first state
- authoritative stored data over derived UI state
- replayable operations
- deterministic local artifacts
- a git-like mental model for work state

## Next Steps

- Read [Features Overview](/docs/features-overview/) for the product surface.
- Read [Issues and Planning](/docs/issues-and-planning/) for planning flows.
- Read [Focus Sessions](/docs/focus-sessions/) for timer and stash behavior.
