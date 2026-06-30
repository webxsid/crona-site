---
title: CLI Automation Patterns
description: Scripting the Crona CLI, query contexts, trigger timers, and parse JSON outputs.
order: 5.10
---

Crona exposes its entire feature surface through the scriptable `crona` CLI. The CLI shares daemon state with the TUI, allowing automation scripts to read from or write to your active session.

## Querying and Switching Context

The CLI provides commands to inspect or alter the active pointer `{ repository -> stream -> issue }`:
```bash
# Get the active checkout context
crona context get

# Switch context by numeric IDs
crona context switch-repo --id 1
crona context switch-stream --id 2
crona context switch-issue --id 45
```

## Controlling the Timer

You can command focus timers programmatically. Commands return structured JSON payloads when the `--json` flag is provided:
```bash
# Check if a session timer is running
crona timer status --json

# Start the timer for the checked-out issue context
crona timer start --from-context --json

# Pause or resume the active timer
crona timer pause --json
crona timer resume --json

# Terminate the timer and log the session
crona timer end --json
```

## Automating Exports

You can automate narrative report generation and data syncing via shell scripts or cron jobs:
```bash
# Generate a daily markdown report
crona export daily

# Export database entries as structured CSV sheets
crona export csv

# Rebuild the deterministic iCalendar feeds
crona export calendar
```

## Integration Patterns

### Shell Aliases for Execution
Add context-aware shortcuts to your shell configuration (`.zshrc` or `.bashrc`):
```bash
alias start-focus="crona timer start --from-context"
alias check-timer="crona timer status --json | jq '.elapsed_seconds'"
```

### Scheduled Local Backups
Set up a daily cron job to run the backup command and prune stale files:
```bash
0 22 * * * crona backup && find ~/Library/Application\ Support/Crona/backups/ -mtime +30 -delete
```
