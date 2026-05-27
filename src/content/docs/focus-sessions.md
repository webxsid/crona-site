---
title: Focus Sessions
description: Learn how Crona turns planned issues into tracked work sessions, including issue-scoped timer behavior, stashes, recovery, and session history.
order: 6
---

Focus sessions are the center of Crona’s execution model. Planning shapes the work, but sessions are where that work becomes real, timed, and recoverable.

This page explains what it feels like to move from “I should do this” to “I am actively doing this now.”

## Starting Focus

You start focus from a selected issue.

In normal use, Crona allows focus to begin from:

- `planned`
- `ready`
- `in_progress`

Starting focus from `planned` or `ready` automatically promotes that issue to `in_progress`. That keeps the active work state honest without forcing you to manually update the issue before every session.

The selected issue also carries its own timer type, so focus follows the work item instead of a global timer setting.

## What Happens During a Session

Once a session is active, Crona tracks the work interval as part of the issue history rather than treating it like a disposable timer.

Crona now uses a stricter pomodoro-style timer model, so the session cadence is consistent and issue-scoped instead of being driven by separate timer presets.

The timer still records the shape of work over time, but the public model now centers on the pomodoro cadence rather than older timer presets.

## Staying Oriented While You Work

During focus, Crona keeps the active issue and session context visible through the session view and related overlays. That helps when you pause, switch attention briefly, or come back after an interruption and need to remember what the current session is actually for.

The important mental model is simple: a session is tied to a specific issue, and Crona keeps that relationship visible while the timer is running.

## Handling Interruptions With Stashes

Stashes are Crona’s interruption model.

Use a stash when you need to suspend the current issue without pretending the work is finished. A stash preserves that work context so you can return to it later instead of losing the thread.

This matters most when the day changes unexpectedly. You might need to switch issues, move to a different stream, or stop one task without ending it cleanly. Stashes let you do that without flattening everything into incomplete timer history.

## What Happens If a Stash Already Exists

If you try to start focus on an issue that already has one or more stashes, Crona does not silently start another fresh session.

Instead, it asks you to choose between:

- resuming the existing stash
- continuing fresh while leaving the stash in place

That behavior is one of the clearest examples of Crona treating work continuity seriously. The app assumes interrupted work still matters unless you explicitly decide otherwise.

## Ending and Recovering Work

Sessions do not just disappear when you stop the timer.

Normal recovery paths include:

- pausing and resuming an active session
- ending a session with a summary
- reopening session context while working
- reviewing older sessions in Session History
- amending session details later if the original summary was incomplete

This is why Crona’s session history is more than a timer log. It becomes part of how you reconstruct what happened, what changed, and where work left off.

## Inactivity Alerts and Runtime Ownership

Focus inactivity alerts are owned by the local engine. If a session keeps running without recent TUI activity, Crona can remind you to review what is happening.

This is useful when the timer no longer matches reality, such as:

- stepping away unexpectedly
- getting pulled into another task
- leaving a session running longer than intended

The practical limitation is that these alerts only fire while the local engine is running.

## Manual Sessions and Amend Flows

Not every useful work block starts and ends in a perfect live timer session. Crona also supports manual session entry and amend-style edits so you can keep the record accurate when work happened outside the normal loop.

That makes the session model more forgiving without making it less structured.

## What to Read Next

- Read [Check-Ins and Wellbeing](/docs/check-ins-and-wellbeing/) for how Crona helps you review patterns around energy, burnout, and accountability.
- Read [Alerts and Reminders](/docs/alerts-and-reminders/) for the notification side of focus behavior.
- Read [Issues and Planning](/docs/issues-and-planning/) if you want to revisit how work gets shaped before focus starts.
