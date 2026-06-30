---
title: Alerts and Reminders
description: System notifications, sound profiles, inactivity tracking, and scheduled reminder rules.
order: 5.8
---

Crona processes alerts locally through the background daemon. While the TUI exposes configuration inputs, the daemon is the sole engine responsible for timing and delivering alerts.

## Trigger Scopes

The local alert layer fires on these events:
- **Timer Boundaries**: Transitions between work segments, short breaks, and long breaks.
- **Inactivity Warning**: Triggered if a focus session continues running without keypress activity from the TUI.
- **System Events**: Completion of exports, diagnostic support bundles, or update detections.
- **Scheduled Reminders**: Recurring alarms (such as check-in reminders).

## Scheduled Reminders

Check-in reminders can be configured via the **Alerts** view in the TUI:
- **Schedules**: Daily or weekly reminder alarms.
- **Action Group**: Create, edit, toggle, or delete rules directly from the interface.
- **Prerequisite**: Scheduled reminders only trigger while `crona-daemon` is running.

## Alert Customization & Presets

You can adjust how notifications behave per alert type:
- **Toggles**: Enable/disable visual toasts, audio cues, or both.
- **Urgency**: Set notification priority levels for system backends.
- **Audible Alerts**: Choose from bundled royalty-free sound effects:
  - `chime`
  - `soft_bell`
  - `focus_gong`
  - `minimal_click`

## Platform Notifications Backend

Alert delivery depends on platform-specific utilities:

| OS | Notification Helper | Audio Player |
| --- | --- | --- |
| **macOS** | `terminal-notifier` (fallback: `osascript`) | `afplay` |
| **Linux** | `notify-send` | `paplay`, `aplay`, `play` (fallback: `canberra-gtk-play`) |
| **Windows** | `BurntToast` (fallback: PowerShell toasts) | PowerShell `SoundPlayer` |

You can check active backend capabilities (e.g., subtitle, urgency, icon support) in the **Alerts** panel.
