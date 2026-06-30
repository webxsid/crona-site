---
title: Exports and Reports
description: Generate Markdown, PDF, CSV, and iCalendar summaries of your workspace.
order: 5.7
---

Crona uses a local-first, template-driven export engine. Instead of sending data to a cloud service, it processes templates and database queries locally to write files to your machine.

## Output Formats

| Format | Output Type | Primary Use Case |
| --- | --- | --- |
| **Markdown** | Text files | Note taking, personal archives, Git-controlled documentation. |
| **PDF** | Formatted documents | Professional handoffs, weekly reviews, static printing. |
| **CSV** | Tabular data | Raw time sheets, spreadsheet importing, custom data analysis. |
| **iCalendar (.ics)** | Calendar feeds | Syncing time blocks and issues to local calendar clients. |

## Report Scopes

Crona organizes exports into five semantic levels:
- **Daily**: Summary of completed issues, habit checks, check-in scores, and focus durations.
- **Weekly**: Rollup of daily metrics, habit compliance over time, and focus breakdowns.
- **Repository**: Status, notes, and session logs scoped to a top-level workspace.
- **Stream**: Metrics and issue summaries restricted to a specific repository subdivision.
- **Issue Rollup**: Aggregated focus durations, status histories, and commit notes for a single issue.

## Local PDF Rendering

Markdown and CSV exports work out-of-the-box. PDF generation requires local renderer dependencies:
- **Daily & Weekly PDFs**: Rendered via `weasyprint`.
- **Repository, Stream, and Issue Rollup PDFs**: Processed via `pandoc` combined with one of these PDF engines:
  - `tectonic`
  - `weasyprint`
  - `wkhtmltopdf`
  - `xelatex`
  - `pdflatex`

Tool discovery is handled dynamically by the daemon and can be verified in the TUI **Config** view.

## Custom Templates & Specifications

Report assets are user-editable. In the **Config** view, you can access and open:
- **Handlebars (.hbs) Templates**: Used to structure Markdown and HTML outputs.
- **CSV Specs**: JSON files defining columns, date formatting, and database queries.
- **Export Paths**: Configurations to change the target directory for report and ICS output.
