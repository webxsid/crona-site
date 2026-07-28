---
title: TUI Keymap Reference
description: Quick-reference keybindings for global navigation, dialog controls, and view-specific commands.
order: 6.4
---

Crona's Terminal User Interface is keyboard-driven and context-aware. Use the footer of each pane for active key guides.

## Global Bindings

These shortcuts remain active across most standard views:

| Key | Description |
| --- | --- |
| `v` | Open the view selection jump menu |
| `[` / `]` | Cycle through views (restricted when timer is active) |
| `tab` / `shift+tab` | Cycle pane focus in the active view |
| `j` / `k` (or arrows) | Navigate selection list down / up |
| `/` | Initiate filter query in filterable lists |
| `?` | Toggle help overlay modal |
| `u` | Jump directly to the Updates dashboard |
| `q` / `ctrl+c` | Quit TUI |
| `K` | Request local daemon shutdown |

### Dev & Beta Build Hotkeys
- `f9`: Open support dialog (beta channels only)
- `f6`: Seed mock wellbeing and focus data (dev mode only)
- `f7`: Clear local database (dev mode only)

## Common Work Bindings

These apply to items in most planning tables or lists:
- `a`: Create a new entry (issue, habit, repo, stream).
- `c`: Checkout selection context or open checkout modal.
- `e`: Edit the selected item.
- `d`: Delete the selected item.
- `f`: Start focus session for the selected issue.
- `m`: Log manual work session or habit completion.
- `s`: Trigger status change popup menu.
- `A`: Abandon selected issue.
- `D`: Modify planning `todo_date`.
- `Z`: Open stash list.
- `w`: Open daily wellbeing check-in.
- `W`: Toggle away mode.

## View-Specific Shortcuts

### Summary
- `,` / `.`: Move the summary date backward / forward.
- `g`: Reset the summary date to today.
- `up` / `down`: Scroll a long summary.

### Daily Dashboard
- `,` / `.`: Page calendar date backward / forward.
- `g`: Reset view date to today.
- `x`: Toggle selected habit completion.
- `F`: Mark selected habit as failed.

### Active Focus Timer
- `p`: Pause running session.
- `r`: Resume paused session.
- `x`: Stop session (opens summary prompt).
- `z`: Stash active session state.
- `i`: Focus active issue details.

### Calendar Range Picker (Rollup View)
- `S`: Set range start date.
- `E`: Set range end date.
- `h` / `l`: Shift range window backward / forward.
- `g`: Reset range to current week.

## Dialog & Text Form Controls

- `esc`: Cancel, dismiss, or go back.
- `ctrl+s`: Submit form data.
- `tab`: Shift focus to the next input field.
- `ctrl+e` / `ctrl+y`: Open calendar picker in date fields.
- `g`: Set date field to today.
- `c`: Clear text in selector fields.
- `left` / `right` / `enter`: Cycle options and select in popups.
