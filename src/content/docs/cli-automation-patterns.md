---
title: CLI Automation Patterns
description: Use Crona’s scriptable CLI to inspect context, drive exports, and build small local automation flows around your work data.
order: 13
---

Crona already exposes a scriptable CLI surface. You do not need a separate automation API to start building small local workflows around context, timer state, and exported artifacts.

This page focuses on practical patterns you can build with the commands Crona already supports.

## What Makes Crona Scriptable

The `crona` command is not just a launcher for the TUI. It also exposes command groups that are useful in scripts and local tools:

- `context`
- `timer`
- `issue`
- `kernel`
- `export`
- `completion`

That means you can inspect state, trigger output generation, or target the currently checked-out issue without driving the TUI directly.

## Good Automation Jobs for the CLI

Crona’s CLI is a good fit for:

- generating reports on a schedule
- exporting calendar files into a watched directory
- checking current context before running another local task
- starting or inspecting a focus session from shell scripts
- collecting structured output for another local tool

It is less useful for workflows that depend on direct remote integrations or hosted synchronization, because Crona’s model is explicitly local-first.

## Use Checked-Out Context to Reduce Friction

One of the most useful automation ideas in Crona is the shared active context.

Because the TUI and CLI use the same local engine state, a script can reuse what you already have checked out instead of forcing you to repeat repo, stream, or issue identifiers every time.

Useful commands include:

```bash
crona context get
crona context switch-repo --id <repo-id>
crona context switch-stream --id <stream-id>
crona context switch-issue --id <issue-id>
```

This makes Crona easier to automate from shell aliases, shortcut tools, and local scripts that depend on “whatever I am working on right now.”

## Automating Focus and Timer Checks

The timer and issue command groups let you build lightweight execution helpers around focus sessions.

Examples:

```bash
crona timer status --json
crona timer start --from-context --json
crona timer pause --json
crona timer resume --json
crona timer end --json
crona issue start --from-context --json
```

These are useful when you want to:

- start a session from a shell workflow
- inspect whether a timer is already running
- build status scripts for prompts or other local surfaces

## Automating Exports

Exports are one of Crona’s strongest automation surfaces because they produce deterministic local files.

Common examples:

```bash
crona export daily --json
crona export weekly --json
crona export repo --json
crona export stream --json
crona export issue-rollup --json
crona export csv --json
crona export calendar --json
```

This works well for:

- scheduled daily or weekly review generation
- stream- or repo-specific summaries
- external spreadsheet analysis
- file-based local workflows built on calendar exports

## Use JSON Output When You Want Another Tool to Read It

Many Crona CLI commands expose `--json`. That is the simplest way to make Crona part of a larger local pipeline instead of only a terminal display tool.

Use JSON output when you want:

- a shell script to inspect specific fields
- a local app or wrapper to consume Crona output programmatically
- structured status checks instead of plain text parsing

If the next tool in your chain is a human, markdown or plain text may be enough. If the next tool is another program, prefer JSON where available.

## Practical Local Integrations

The safest automation patterns for Crona are local and file-based.

Good examples:

- shell aliases that start focus from the active context
- scheduled report generation through cron or platform schedulers
- macOS Shortcuts or Folder Actions watching exported files
- scripts that read timer or context state before performing another action

The common theme is that Crona produces local state and local artifacts that other local tools can consume.

## What to Read Next

- Read [macOS Shortcuts Workflows](/docs/macos-shortcuts-workflows/) for more concrete repo-, stream-, and export-oriented automation ideas on macOS.
- Read [Calendar and File Automation](/docs/calendar-and-file-automation/) for file-based workflows around reports and `.ics` exports.
- Read [CLI and Local Engine](/docs/cli-and-local-engine/) for the underlying command groups and terminology.
- Read [Exports and Reports](/docs/exports-and-reports/) for the user-facing meaning behind the export commands.
