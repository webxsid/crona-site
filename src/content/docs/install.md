---
title: Install
description: Platforms, installer flows, runtime prerequisites, shell completions, alerts, and PDF export notes.
order: 2
---

Crona ships installable binaries. You do not need Go installed to use the released builds.

Installed binaries:

- `crona`
- `crona-tui`
- `crona-kernel`

`crona-kernel` is the internal binary name for Crona's background local engine. In user docs, it is usually called the local engine.

## Supported Platforms

The published install docs cover:

- macOS
- Linux
- Windows

The default launcher is `crona`. `crona-tui` remains available as a compatibility entrypoint.

## Release Channels

- `stable` is the recommended channel for general users.
- `beta` is for pre-release testing and faster iteration.

Release downloads are published on [GitHub Releases](https://github.com/webxsid/crona/releases). The stable shell entrypoints are [crona.work/install.sh](https://crona.work/install.sh) and [crona.work/install.ps1](https://crona.work/install.ps1).

## Install With The Website Script

### macOS and Linux

Install from the stable website entrypoint:

```bash
curl -fsSL https://crona.work/install.sh | sh
```

Force a non-interactive reinstall:

```bash
curl -fsSL https://crona.work/install.sh | CRONA_INSTALL_FORCE=1 sh
```

Run the installer from a downloaded file:

```bash
curl -fsSL -o /tmp/crona-install.sh https://crona.work/install.sh
sh /tmp/crona-install.sh
```

### Windows

Install from PowerShell using the stable website entrypoint:

```powershell
Invoke-WebRequest "https://crona.work/install.ps1" -OutFile "$env:TEMP\crona-install.ps1"
powershell -NoProfile -ExecutionPolicy Bypass -File "$env:TEMP\crona-install.ps1"
```

Override the binary install location:

```powershell
$env:CRONA_INSTALL_DIR = "D:\tools\crona\bin"
powershell -NoProfile -ExecutionPolicy Bypass -File "$env:TEMP\crona-install.ps1"
```

## Manual Install

If you do not want to use the installer, download the platform bundle zip from the release page and extract:

- `crona`
- `crona-tui`
- `crona-kernel`

Keep the matching shared assets archive if you want the bundled report templates and export assets.

## Runtime Layout

### Runtime Data

Default runtime directories:

- macOS production: `~/Library/Application Support/Crona`
- macOS development: `~/Library/Application Support/Crona Dev`
- Linux production: `${XDG_DATA_HOME:-~/.local/share}/crona`
- Linux development: `${XDG_DATA_HOME:-~/.local/share}/crona-dev`
- Windows production: `%LocalAppData%\\Crona`
- Windows development: `%LocalAppData%\\Crona Dev`

Set `CRONA_HOME` to override the runtime home.

### Binary Install Location

Default binary install directories:

- macOS and Linux: `~/.local/bin`
- Windows: `%LocalAppData%\\Programs\\Crona\\bin`

Set `CRONA_INSTALL_DIR` to override the binary install directory.

## Shell Completions

Generate completions with:

```bash
crona completion zsh
crona completion bash
crona completion fish
```

The CLI emits the completion script to standard output, so you can wire it into your shell profile however you normally manage completions.

## Notifications And Alerts

Alerts are emitted by the local engine, not by the TUI process itself. The TUI configures them and exposes test actions, but the engine decides when to fire them.

That includes:

- timer boundary alerts
- focus inactivity alerts
- update-available alerts
- support bundle and export completion alerts
- scheduled reminders such as nightly check-in reminders

Scheduled reminders and inactivity alerts only fire while the local engine is running.

### OS Helpers

Supported helpers in the upstream install docs:

- macOS notifications: `terminal-notifier`, fallback `osascript`
- macOS sound playback: `afplay`
- Linux notifications: `notify-send`
- Linux sound playback: `paplay`, `aplay`, `play`, fallback `canberra-gtk-play`
- Windows notifications: `BurntToast` when installed, otherwise PowerShell toast delivery
- Windows sound playback: PowerShell `SoundPlayer`

The Alerts view shows which backend Crona can use on the current machine.

## PDF And Other Export Renderers

Markdown export works without extra tooling. PDF export requires local renderer support.

Current renderer expectations:

- Daily and weekly narrative PDF exports require `weasyprint`
- Repo, stream, and issue-rollup PDF exports require `pandoc` plus one supported PDF engine:
  - `tectonic`
  - `weasyprint`
  - `wkhtmltopdf`
  - `xelatex`
  - `pdflatex`

If the renderer chain is missing, markdown export still works and PDF export stays unavailable until the tools are installed.

The Config view can rescan export tools and show the active renderer status.

## Updates

General guidance:

- use the `stable` channel unless you want prerelease builds
- opt into `beta` from Settings if you want faster release validation
- use the Updates view to check, read release notes, and install supported updates

## Next Steps

- Read [Getting Started](/docs/getting-started/) for the runtime model.
- Read [Alerts and Reminders](/docs/alerts-and-reminders/) for day-to-day alert behavior.
- Read [CLI and Local Engine](/docs/cli-and-local-engine/) for command-line control.
