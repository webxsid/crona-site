---
title: Alerts and Reminders
description: Learn what Crona can alert on, how reminders work, and what to expect from its local-only notification model.
order: 9
---

Crona alerts are local-engine-owned. The TUI gives you places to configure and test them, but the background engine is the process that decides when they fire.

That matters because alerts in Crona are part of the same local workflow as sessions, exports, and runtime state. They are not a cloud notification system layered on top.

## What Crona Can Alert On

The alert layer covers the moments in the workflow where a local nudge is actually useful.

That includes:

- timer work and break boundaries
- focus inactivity reminders
- update-available alerts
- export completion alerts
- support bundle completion alerts
- scheduled reminders such as check-in reminders

The common thread is that these alerts exist to support work already happening inside Crona, not to become a separate notification center.

## How Reminders Work

The current public reminder type is a check-in reminder.

From the Alerts view, you can:

- create a reminder
- edit a reminder
- enable or disable it
- delete it

The schedule model supports:

- daily schedules
- weekly schedules

This makes reminders lightweight and practical. They are meant to keep the workflow moving, not turn Crona into a full personal scheduling app.

## Sounds, Urgency, and Appearance

Alerts can carry more than just a notification body. Crona also lets you configure how the alert feels when it fires.

That includes:

- notification on or off
- sound on or off
- alert urgency
- icon usage
- inactivity threshold
- inactivity repeat interval

Crona also includes bundled sound presets:

- `chime`
- `soft_bell`
- `focus_gong`
- `minimal_click`

The point is to give you enough control to make alerts noticeable without forcing one fixed delivery style.

## Test Actions and Backend Visibility

The Alerts view includes direct test actions for:

- notification delivery
- sound playback

It also shows what the current machine can actually support, including backend capability like subtitle handling, urgency, icon usage, and bundled sound support.

That is important because alert behavior depends partly on what the local platform helpers can do, not just what Crona itself would like to request.

## What to Expect from Local-Only Delivery

There are a few practical expectations that matter more than the settings list:

- alerts are local only
- scheduled reminders only fire while the local engine is running
- inactivity alerts depend on the engine plus recent TUI activity reporting
- the TUI can configure alerts, but it is not the timing authority

This model is one of the reasons Crona feels consistent. The same local system that owns sessions and exports also owns the reminder and alert decisions.

## Supported Notification Helpers

Current helper support in the install docs is:

| Platform | Notifications | Sound |
| --- | --- | --- |
| macOS | `terminal-notifier`, fallback `osascript` | `afplay` |
| Linux | `notify-send` | `paplay`, `aplay`, `play`, fallback `canberra-gtk-play` |
| Windows | `BurntToast` or PowerShell toast delivery | PowerShell `SoundPlayer` |

You do not need to memorize these helpers, but they are useful when diagnosing why delivery behaves differently on one machine versus another.

## Where Alerts Fit in the Product

Alerts are easiest to understand when seen as part of the full work loop:

- planning shapes the day
- focus sessions track the work
- exports produce artifacts
- alerts make the local workflow visible at the right moments

That is why alert behavior is more operational than decorative. It exists to keep the local system honest and responsive.

## What to Read Next

- Read [Install](/docs/install/) for setup and platform/runtime prerequisites behind alert delivery.
- Read [TUI Keymap Reference](/docs/tui-keymap-reference/) if you want the exact bindings used in the Alerts view.
- Read [Exports and Reports](/docs/exports-and-reports/) if you want to understand one of the main workflows that can trigger completion alerts.
