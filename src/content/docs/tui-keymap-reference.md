---
title: TUI Keymap Reference
description: Use this page as the quick reference for Crona’s global navigation, work actions, dialog keys, and view-specific bindings.
order: 10
---

Use this page as a working reference, not as a tutorial. Crona’s bindings are context-aware, so the most important rule is still to trust the footer hints shown in the current view and pane.

The groups below are based on the current key registry, visible action hints, and dialog footer strings in the Crona source.

## Global Navigation

These keys are registered globally where they are valid:

| Key | Action |
| --- | --- |
| `v` | open the view jump menu |
| `[` / `]` | cycle workspace views, or session-safe views while a timer is active |
| `tab` / `shift+tab` | cycle panes |
| `j` / `down` | move selection down |
| `k` / `up` | move selection up |
| `/` | start filter edit in filterable panes |
| `?` | open help |
| `u` | jump to Updates |
| `q` / `ctrl+c` | quit the TUI |

Environment-specific globals:

| Key | Action |
| --- | --- |
| `f9` | beta support dialog on beta builds |
| `f6` | dev seed data in dev mode |
| `f7` | dev clear data in dev mode |
| `f8` | prepare local update in dev mode |
| `K` | request local-engine shutdown |

## Common Work Actions

These actions appear across many panes when the selection supports them:

| Key | Action |
| --- | --- |
| `a` | create new item |
| `c` | open checkout dialog or check out the selected item |
| `e` | edit or open in editor, depending on view |
| `d` | delete selected item in many list views |
| `enter` | open details, open item, or confirm the current selection |
| `f` | start focus from the selected issue |
| `m` | log manual session or habit data in context |
| `s` | open issue status actions |
| `A` | abandon selected issue |
| `D` | edit the selected issue’s to-do date |
| `Z` | open stash list |
| `w` | open check-in |
| `W` | toggle away mode |

Availability depends on the current pane and state.

## Planning and List Views

### Issues View

| Key | Action |
| --- | --- |
| `1` | Active Issues |
| `2` | Completed Issues |
| `c` | context checkout dialog |
| `enter` | view selected issue |
| `f` | start focus |
| `m` | log work or session-related action |
| `s` | change status |
| `D` | change to-do date |
| `e` / `d` | edit or delete |

### Daily View

| Key | Action |
| --- | --- |
| `1` | Planned Tasks pane |
| `2` | Habits Due pane |
| `,` / `.` | previous or next day |
| `g` | jump to today |
| `E` | export |
| `c` | context dialog |
| `w` | open check-in |
| `W` | toggle away mode |

Issues pane:

| Key | Action |
| --- | --- |
| `enter` | view selected issue |
| `a` | new issue |
| `f` | focus |
| `m` | log |
| `s` | status |
| `D` | due or to-do date |

Habits pane:

| Key | Action |
| --- | --- |
| `enter` | view selected habit |
| `a` | new habit |
| `x` | toggle completion |
| `F` | mark failed |
| `e` | edit |
| `m` | log completion |
| `d` | delete |

Daily and Wellbeing share the same `w` / `W` split, so the check-in and away-mode shortcuts are consistent across the main review surfaces.

### Meta Hierarchy Views

| Key | Action |
| --- | --- |
| `1` | Repos |
| `2` | Streams |
| `3` | Issues |
| `4` | Habits |

Repo and stream panes:

| Key | Action |
| --- | --- |
| `enter` | view |
| `c` | checkout |
| `a` | new |
| `e` | edit |
| `d` | delete |

### Reports, Config, and Ops

Reports:

| Key | Action |
| --- | --- |
| `1` | report browser pane |
| `e` | edit |
| `o` | open |
| `d` | delete |
| `enter` | details |

Config:

| Key | Action |
| --- | --- |
| `1` | main config pane |
| `e` | edit or open selected asset |
| `enter` | details |
| `c` / `space` | change directory or selected path value |
| `R` | rescan export tools |
| `r` | reset selected item when the timer is idle |

Ops:

| Key | Action |
| --- | --- |
| `+` / `=` | show more rows |
| `-` | show fewer rows |

## Session Workflows

### Active Session View

When the timer is idle in the session area:

| Key | Action |
| --- | --- |
| `f` | start focus |
| `Z` | open stashes |

When a session is running or paused:

| Key | Action |
| --- | --- |
| `p` | pause |
| `r` | resume |
| `x` | end |
| `z` | stash |
| `i` | open full context |
| `s` / `A` | issue actions while a session is active |

### Session History

| Key | Action |
| --- | --- |
| `enter` | details |
| `e` | amend or edit history notes |
| `f` | start focus from the selected past issue when allowed |
| `Z` | open stashes |

## Dialogs and Forms

### General Form Behavior

| Key | Action |
| --- | --- |
| `tab` / `shift+tab` | move between fields |
| `up` / `down` | move between fields in many forms |
| `esc` | cancel or close |
| `ctrl+s` | submit in dialogs |

The submit hint can vary visually, but `ctrl+s` is the actual shared submit chord exposed by the dialog helper.

### Textarea-Style Forms

| Key | Action |
| --- | --- |
| `enter` | newline inside the focused multiline field |
| `tab` | move to the next field |
| `ctrl+s` | submit |

### Selector Dialogs

| Key | Action |
| --- | --- |
| type text | filter options |
| `left` / `right` | choose across selector columns |
| `up` / `down` / `tab` | move |
| `enter` | confirm or create |
| `c` | clear current selector text in some dialogs |

### Confirmations and Choice Menus

| Key | Action |
| --- | --- |
| `enter` | confirm |
| `esc` | cancel |
| `y` / `n` | confirm or cancel in yes-no prompts |
| mnemonic key | run the highlighted jump or support action in menu dialogs |

## Dates, Pickers, and Range Controls

### Date Fields

| Key | Action |
| --- | --- |
| `f2` | open the calendar |
| `ctrl+e` | alternate open-calendar binding in date-sensitive dialogs |
| `ctrl+y` | alternate open-calendar binding in issue/date dialogs |
| `g` | fill today’s date |

### Date Picker

| Key | Action |
| --- | --- |
| `h` / `j` / `k` / `l` | move |
| `,` / `.` | previous or next month |
| `enter` | choose date |
| `space` | choose date in some picker flows |
| `c` | clear |
| `esc` | back |

### Rollup Date Controls

| Key | Action |
| --- | --- |
| `enter` | day details |
| `S` / `E` | open start or end calendar |
| `h` / `l` | move range start |
| `,` / `.` | move range end |
| `g` | reset to the weekly default |

## Settings, Alerts, Updates, and Support

Alerts:

| Key | Action |
| --- | --- |
| `h` / `l` | change selected value |
| `space` | toggle reminder enabled state or selected boolean |
| `enter` | edit reminder or run selected test action |
| `d` / `x` | delete reminder |

Settings:

| Key | Action |
| --- | --- |
| `1` | main settings pane |
| `h` / `left` | decrease or move left |
| `l` / `right` | increase or move right |
| `space` | toggle or activate selected row |
| `enter` | edit, toggle, or confirm |

Updates:

| Key | Action |
| --- | --- |
| `r` | check now |
| `o` | open release page |
| `i` | install when supported |
| `U` | dismiss current prompt |

Support:

| Key | Action |
| --- | --- |
| `o` | report bug |
| `d` | discussions |
| `r` | releases |
| `g` | roadmap |
| `c` | copy diagnostics |
| `b` | generate support bundle |

## Note on Context Sensitivity

The same key can intentionally mean different things in different contexts, especially `c`, `e`, `enter`, `space`, and `tab`. Use the page footer as the final authority for the current pane and state.
