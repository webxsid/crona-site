---
title: Calendar and File Automation
description: Use Crona’s report outputs, configurable directories, and deterministic `.ics` files as stable local automation inputs.
order: 14
---

Crona’s automation story is strongest when you treat its outputs as stable local files.

Reports, CSV exports, and calendar artifacts are written to your machine in predictable places. That makes them good building blocks for local workflows that do not depend on direct cloud integrations.

## Why File-Based Automation Fits Crona

Crona is a local-first system. Its output model reflects that.

Instead of pushing events or reports into remote services directly, it writes deterministic artifacts that other local tools can watch, import, or transform.

That is a good fit for:

- folder-based automations
- personal scripts
- local schedulers
- Shortcuts and desktop automation tools
- calendar import workflows

## Calendar Export as an Automation Surface

Crona can generate local `.ics` files for external calendar tooling.

That is useful because it lets you connect Crona to calendar-style workflows without requiring Crona itself to integrate directly with hosted calendar APIs.

The normal pattern is:

1. Crona writes calendar files into the configured ICS export directory.
2. Another local tool watches or imports that directory.
3. The external calendar workflow consumes the generated files.

The upstream roadmap and docs explicitly frame this as a stable local automation workflow.

## Reports as Local Inputs

Narrative reports and CSV exports are also useful automation surfaces.

They can feed workflows such as:

- weekly review archives
- personal work journals
- team handoff folders
- spreadsheet analysis pipelines
- local document processing flows

The important property is that the output is deterministic and local. You can treat the generated files as assets produced by Crona rather than one-off terminal output.

## Configurable Output Directories

Crona distinguishes between report output and ICS output.

That matters for automation because it lets you separate:

- generated reports
- generated calendar artifacts

This makes it easier to point different local watchers or import processes at the right directory instead of mixing every output type together.

## When to Prefer Calendar Files Over Reports

Use calendar export when the destination workflow is time- and event-oriented.

Examples:

- importing sessions into another calendar surface
- using a watched `.ics` directory as an automation trigger
- keeping issue and session time data in a calendar-adjacent system

Use reports when the destination workflow is more review- or narrative-oriented.

Examples:

- end-of-day summaries
- weekly review notes
- repo or stream handoff documents
- human-readable work records

## Typical Local Automation Patterns

Practical examples Crona supports well:

- write calendar exports into a directory watched by another local importer
- generate reports into a folder used by a notes app or archive process
- produce CSV output for spreadsheet or external analysis workflows
- keep report and calendar directories separate so different local automations can consume them independently

The product is strongest when you let Crona generate clean local artifacts and let another tool handle the final downstream action.

## What Crona Does Not Need to Do Directly

Crona does not need first-party integrations with Google Calendar or iCloud to support useful automation.

The file-based model is already enough for many workflows because:

- `.ics` files are portable
- markdown and CSV are widely usable
- local tools are good at watching folders and importing files

That keeps the Crona side of the system simpler and more predictable.

## What to Read Next

- Read [macOS Shortcuts Workflows](/docs/macos-shortcuts-workflows/) for more concrete Shortcuts and Folder Actions patterns on macOS.
- Read [CLI Automation Patterns](/docs/cli-automation-patterns/) for command-driven automation around context, timers, and exports.
- Read [Exports and Reports](/docs/exports-and-reports/) for the broader export model and output choices.
- Read [Install](/docs/install/) if you need runtime-layout or renderer details before setting up automation around output directories.
