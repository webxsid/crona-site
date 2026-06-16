---
title: CLI and Local Engine
description: Use Crona from the command line, inspect the local engine, and understand how the daemon command group maps to user-facing language.
order: 11
---

Crona is both an interactive terminal app and a scriptable command-line tool. This page is the user-facing reference for the CLI surface and the local engine it controls.

## `crona` as the Normal Entry Point

For most users, this is the normal way in:

```bash
crona
```

That launches the TUI and starts or attaches to the local engine as needed.

## Why the Command Group Is Named `daemon`

The command surface uses `daemon` for the internal engine process and its control commands:

```bash
crona daemon ...
```

In public-facing docs, it is usually clearer to say **local engine** or **daemon**. Those terms refer to the same runtime owner.

## Inspecting the Local Engine

Useful inspection commands include:

```bash
crona daemon attach --json
crona daemon status --json
crona daemon info --json
```

The broader `daemon` command group supports:

- `attach`
- `detach`
- `restart`
- `wipe-data`
- `info`
- `status`

`wipe-data` is destructive and should be treated accordingly.

## Context Commands

The CLI exposes shared-context commands that match the TUI concept of checked-out context:

- `crona context get`
- `crona context set`
- `crona context clear`
- `crona context clear-issue`
- `crona context switch-repo`
- `crona context switch-stream`
- `crona context switch-issue`

These commands are useful when you want the CLI and TUI to stay aligned around the same repo, stream, or issue path.

## Timer and Focus Commands

The timer command group supports:

- `status`
- `start`
- `pause`
- `resume`
- `end`

There is also an issue-focus start command:

- `crona issue start`

The CLI also supports `--from-context` flows, which let you use the current checked-out issue instead of repeating an identifier manually.

Timer behavior is now issue-scoped, so the selected issue determines the timer type and pomodoro cadence that the CLI drives.

## Export Commands

The export group supports:

- `daily`
- `weekly`
- `repo`
- `stream`
- `issue-rollup`
- `csv`
- `calendar`
- `reports`

This is the scriptable side of the same output system shown in the TUI.

## Shell Completions

Generate completions with:

```bash
crona completion zsh
crona completion bash
crona completion fish
```

The completion script is emitted to standard output so you can wire it into your shell setup however you normally manage completions.

## When to Go Deeper

This page is meant to explain the public CLI surface. If you need implementation-facing detail instead of operational guidance, continue to the upstream repo references:

- [Socket API](https://github.com/webxsid/crona/blob/main/docs/api/socket.md)
- [Development](https://github.com/webxsid/crona/blob/main/docs/development.md)

## What to Read Next

- Read [Exports and Reports](/docs/exports-and-reports/) for the user-facing meaning behind the export command group.
- Read [Install](/docs/install/) for runtime layout, shell completions, and machine setup details.
- Read [TUI Keymap Reference](/docs/tui-keymap-reference/) if you want the interactive counterpart to these command-line surfaces.
