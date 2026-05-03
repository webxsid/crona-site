---
title: Exports and Reports
description: Learn which Crona outputs to use, when to use them, and how local reports, PDFs, CSVs, and calendar exports fit into your workflow.
order: 8
---

Crona’s export model is local and deterministic. Instead of pushing summaries into a hosted reporting system, it writes artifacts to your machine so you can keep them, edit them, automate around them, or hand them off however you want.

This page is the best place to decide which output fits the kind of review, reporting, or automation you are trying to do.

## Choosing the Right Output

Crona supports four main output styles:

- markdown reports
- PDF reports when renderer tooling is available
- CSV exports
- calendar `.ics` exports

Each one is useful for a different kind of workflow.

Use markdown when you want readable narrative output that still lives comfortably in notes, docs, or versioned files. Use PDF when you need a shareable static document. Use CSV when you want external analysis or spreadsheet work. Use calendar export when you want local automation or a schedule feed outside Crona itself.

## Choosing the Right Scope

Exports are not just about format. They are also about scope.

Crona can generate outputs for:

- a day
- a week
- a repo
- a stream
- an issue rollup
- calendar data

That means you can use the same export system for very different purposes, such as:

- a personal daily review
- a weekly summary
- a repo-level work snapshot
- a stream-specific planning or handoff artifact
- an issue-focused retrospective

The goal is not one giant report. It is choosing the smallest useful slice of work for the job.

## When Markdown Is the Best Fit

Markdown is the most flexible export surface in Crona.

Use it when you want:

- readable narrative output
- something easy to keep in a notes system
- lightweight artifacts you can edit or repurpose later
- output that works even when PDF tooling is not installed

This is usually the best default if you are not sure where to start.

## When PDF Is the Best Fit

PDF export is for situations where you want a more fixed, presentation-ready artifact.

Use it when you want:

- a shareable weekly or daily summary
- a cleaner handoff document
- output that should not depend on the recipient’s markdown tooling

The tradeoff is local renderer setup. Markdown works without extra tooling, but PDF depends on the renderer chain available on your machine.

Current renderer expectations:

- daily and weekly narrative PDFs require `weasyprint`
- repo, stream, and issue-rollup PDFs require `pandoc` plus one supported PDF engine

Supported PDF engines:

- `tectonic`
- `weasyprint`
- `wkhtmltopdf`
- `xelatex`
- `pdflatex`

## When CSV Is the Best Fit

CSV export is useful when Crona’s narrative summaries are not the real destination.

Use it when you want:

- spreadsheet analysis
- custom external reporting
- your own downstream pipeline
- rawer structured output than a narrative report

Crona treats CSV as part of the same local-first export system, but its purpose is clearly more analytical than reader-facing.

## When Calendar Export Is the Best Fit

Calendar export writes deterministic local `.ics` files for external tools and automations.

This is most useful when you want Crona data to show up in a calendar-adjacent workflow without requiring Crona to integrate directly with a hosted calendar provider.

Typical pattern:

1. Crona writes `.ics` files into the configured export directory.
2. Another local tool watches, imports, or syncs that directory.
3. Your external calendar system consumes the generated files.

## Templates, Specs, and the Config View

The export system is not only about pressing export. Crona also exposes the assets behind that output.

The Config view can show and manage:

- report templates
- related renderer assets
- CSV export spec files
- active paths and source details

That means the public docs can stay focused on when to use exports, while the actual output remains locally customizable.

## Tooling Caveats to Expect

There are a few practical rules worth knowing upfront:

- missing renderer tools block PDF export, not markdown export
- the Config view can rescan tool availability
- local diagnostics and support bundles are useful when export setup behaves unexpectedly

In most cases, the simplest way to start is markdown first, then add renderer tooling only if PDF becomes part of your real workflow.

## Common Export Workflows

In practice, exports tend to be most useful for:

- personal daily or weekly reviews
- repo or stream summaries
- issue handoff notes
- external spreadsheet analysis
- local calendar automation

That range is why Crona keeps exports close to planning and sessions instead of treating them like a detached reporting add-on.

## What to Read Next

- Read [Alerts and Reminders](/docs/alerts-and-reminders/) if you want notifications around export completion and other local-engine-driven events.
- Read [CLI and Local Engine](/docs/cli-and-local-engine/) if you want the scriptable side of export commands.
- Read [Check-Ins and Wellbeing](/docs/check-ins-and-wellbeing/) if you want to understand how review-oriented outputs connect back to the rest of the workflow.
